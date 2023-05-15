const generateUtils = (instance) => {
  const newInstance = instance;

  return {
    getFileExtention(fileType, enableLowerCase = false) {
      const extention = fileType.split("/")[1];

      return enableLowerCase ? extention.toLowerCase() : extention;
    },
    enhanceFileName(file) {
      // animals.sd.png ===> png
      // const extention = this.getFileExtention(file.type);
      // const extensionWithDot = `.${extention}`;
      // const name = file.name.split(extensionWithDot)[0];
      const dotLastIndex = file.name.lastIndexOf(".");
      const name = file.name.slice(0, dotLastIndex);
      const extensionWithDot = file.name.slice(dotLastIndex);

      const displayedName = newInstance.enableFullnameDisplay
        ? name
        : name.slice(0, newInstance.maxDisplayNameLength);

      return `${displayedName}${extensionWithDot.toLowerCase()}`;
    },
    onEditSelectedImage() {
      newInstance.showModal = true;
    },
    onDeleteSelectedImage() {
      this.onReset();
      newInstance.croppedData = {};

      newInstance.error = "الرجاء التحقق من هذا الحقل";
      newInstance.$emit("cropImage", newInstance.updatedValue);
    },
    onDownloadSelectedImage() {
      const { selectedFile, enableServerSide } = newInstance;

      const a = document.createElement("a");

      const href = enableServerSide
        ? window.URL.createObjectURL(selectedFile.file)
        : selectedFile.downloadUrl;

      const fileName = enableServerSide
        ? selectedFile.file.displayName
        : selectedFile.displayName;
      a.setAttribute("href", href);
      a.setAttribute("download", fileName);

      a.click();
    },
    onUploadImage() {
      newInstance.$refs.imageInput.click();
    },
    onReset(allowResetSelectedFile = true) {
      newInstance.showModal = false;
      newInstance.fileExtention = null;
      newInstance.error = "";

      if (allowResetSelectedFile) {
        newInstance.selectedFile = null;
      }
      // reset the value of the input
      newInstance.$refs.imageInput.value = "";
      newInstance.imageSrc = null;
    },
    onSelectImage(e) {
      const { files } = e.target;
      const file = files[0];
      const isImageSelected = file && file.type.includes("image");

      if (isImageSelected) {
        const fileReader = new FileReader();

        file.displayName = this.enhanceFileName(file);
        /**
         * SelectedFile in:
         *  - clientSideMode is: newInstance of File() constructor
         *  - serverSideMode is: { id, attachmentTypeId, contentType, sharepointId, file }
         */
        newInstance.selectedFile = newInstance.enableServerSide
          ? { file }
          : file;

        newInstance.fileExtention = file.type;

        fileReader.readAsDataURL(file);

        fileReader.onload = (event) => {
          newInstance.imageSrc = event.target.result;
          // open the modal
          newInstance.showModal = true;
        };
      }
    },
    onSaveClientModeCroppedImage(data) {
      this.onReset(false);

      newInstance.croppedData = data;
      newInstance.$emit("cropImage", newInstance.updatedValue);
      // reset the value of the input
      newInstance.$refs.imageInput.value = "";
    },
    async onSaveServerModeCroppedImage(data) {
      const { selectedFile } = newInstance;
      this.onReset(false);
      newInstance.isServerLoading = true;
      newInstance.croppedData = data;

      const base64Meta = this.getBase64Meta(data.croppedImage);

      if ("base64" in base64Meta) {
        const { uploadCallback } = newInstance.enhancedServerSideConfigs;
        let sharepointId;

        if (uploadCallback && typeof uploadCallback === "function") {
          sharepointId = await uploadCallback(base64Meta);
        } else {
          sharepointId = await this.uploadFile(base64Meta);
        }

        if (sharepointId) {
          const constructedAttachment = {
            id: 0,
            attachmentTypeId: newInstance.attachmentTypeId,
            contentType: base64Meta.contentType,
            sharepointId,
            fileName: selectedFile.file.name,
            // save the cropped part as file not the entire file
            file: await this.base64ToFilesConverter(
              base64Meta.source,
              selectedFile.file.name
            ),
          };

          newInstance.selectedFile = constructedAttachment;
          newInstance.$emit("cropImage", newInstance.updatedValue);
        }
      }

      newInstance.$refs.imageInput.value = "";

      newInstance.isServerLoading = false;
    },
    getBase64Meta(base64Source) {
      const splittedBase64 = base64Source.split(",")[1];
      const contentType = base64Source.match(/[^:]\w+\/[\w-+\d.]+(?=;|,)/)[0];

      return {
        source: base64Source,
        base64: splittedBase64,
        contentType,
      };
    },
    // converters
    base64ToFilesConverter(base64 = "", name = "untitled") {
      return new Promise((resolve) => {
        fetch(base64)
          .then((res) => res.blob())
          .then((blob) => {
            const createdFileExtention = base64.split(";")[0].split(":")[1];
            const createdFile = new File([blob], name, {
              type: createdFileExtention,
            });

            createdFile.displayName = this.enhanceFileName(createdFile);

            resolve(createdFile);
          });
      });
    },
    async downloadFile(fileData) {
      newInstance.isServerLoading = true;

      const { enhancedServerSideConfigs } = newInstance;
      const { encodedSharepointId, fileGenerator } = fileData;
      const { downloadUrl, appName, systemCode } = enhancedServerSideConfigs;

      if (!appName || !systemCode) {
        newInstance.isServerLoading = false;

        throw new Error(
          `Either appName or systemCode is not valid, you must provide them in serverSideConfigs prop`
        );
      }

      try {
        const url = `${downloadUrl}/${encodedSharepointId}/${appName}/${systemCode}`;

        const downloadRes = await fetch(url);
        const fileName = downloadRes.headers.get("filename") || "";
        const fileType =
          downloadRes.headers.get("Content-Type") || "image/jpeg";

        const fileBuffer = await downloadRes.arrayBuffer();

        return fileGenerator({
          fileName,
          fileType,
          data: fileBuffer,
        });
      } finally {
        newInstance.isServerLoading = false;
      }
    },
    async uploadFile(base64Meta) {
      const { base64: fileBase64 } = base64Meta;
      const { enhancedServerSideConfigs } = newInstance;
      const { uploadUrl, appName, systemCode } = enhancedServerSideConfigs;

      if (!appName || !systemCode) {
        newInstance.isServerLoading = false;

        throw new Error(
          `Either appName or systemCode is not valid, you must provide them in serverSideConfigs prop`
        );
      }

      const downloadRes = await fetch(uploadUrl, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fileBase64,
          appName,
          systemCode,
        }),
      });

      return downloadRes.json();
    },
  };
};

export default generateUtils;
