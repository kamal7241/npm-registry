const generateUtils = instance => ({
  getFileExtention(fileType, enableLowerCase = false) {
    const extention = fileType.split('/')[1];

    return enableLowerCase ? extention.toLowerCase() : extention;
  },
  enhanceFileName(file) {
    // animals.sd.png ===> png
    // const extention = this.getFileExtention(file.type);
    // const extensionWithDot = `.${extention}`;
    // const name = file.name.split(extensionWithDot)[0];
    const dotLastIndex = file.name.lastIndexOf('.');
    const name = file.name.slice(0, dotLastIndex);
    const extensionWithDot = file.name.slice(dotLastIndex);

    const displayedName = instance.enableFullnameDisplay ? name : name.slice(0, instance.maxDisplayNameLength)
    
    return `${displayedName}${extensionWithDot.toLowerCase()}`;
  },
  onEditSelectedImage() {
    instance.showModal = true;
  },
  onDeleteSelectedImage() {
    this.onReset();
    instance.croppedData = {};

    instance.error = 'الرجاء التحقق من هذا الحقل',
    instance.$emit('cropImage', instance.updatedValue);
  },
  onDownloadSelectedImage() {
    const { selectedFile, enableServerSide } = instance;

    const a = document.createElement("a"); 

    const href = enableServerSide ? window.URL.createObjectURL(selectedFile.file) : selectedFile.downloadUrl;
    const fileName = enableServerSide ? selectedFile.file.displayName: selectedFile.displayName
    a.setAttribute('href', href)
    a.setAttribute('download', fileName)

    a.click();
  },
  onUploadImage() {
    instance.$refs.imageInput.click();
  },
  onReset(allowResetSelectedFile = true) {
    instance.showModal = false;
    instance.fileExtention = null;
    instance.error = '';

    if(allowResetSelectedFile) {
      instance.selectedFile = null;
    }
    // reset the value of the input 
    instance.$refs.imageInput.value = '';
    instance.imageSrc = null;
  },
  onSelectImage(e) {
    const files = e.target.files;
    const file = files[0];
    const isImageSelected = file && file.type.includes('image');
    
    if (isImageSelected) {
      const fileReader = new FileReader();

      file.displayName = this.enhanceFileName(file);
      /**
       * SelectedFile in: 
       *  - clientSideMode is: instance of File() constructor
       *  - serverSideMode is: { id, attachmentTypeId, contentType, sharepointId, file }
       */
      instance.selectedFile = instance.enableServerSide ?  { file } : file;

      instance.fileExtention = file.type;

      fileReader.readAsDataURL(file);

      fileReader.onload = (event) => {
        instance.imageSrc = event.target.result;
        // open the modal
        instance.showModal = true;
      };
    }
  },
  onSaveClientModeCroppedImage(data) {
    this.onReset(false);

    instance.croppedData = data;
    instance.$emit('cropImage', instance.updatedValue);
    // reset the value of the input 
    instance.$refs.imageInput.value = '';
  },
  async onSaveServerModeCroppedImage(data) {
    const { selectedFile } = instance;
    this.onReset(false);
    instance.isServerLoading = true;
    instance.croppedData = data;

    const base64Meta = this.getBase64Meta(data.croppedImage);

    if('base64' in base64Meta) {
      const sharepointId = await instance.uploadCallback(base64Meta);
      
      const constructedAttachment = {
        id: 0,
        attachmentTypeId: instance.attachmentTypeId,
        contentType: base64Meta.contentType,
        sharepointId,
        fileName: selectedFile.file.name,
        // save the cropped part as file not the entire file
        file: await this.base64ToFilesConverter(base64Meta.source, selectedFile.file.name)
      };
      

      instance.selectedFile = constructedAttachment;
    }

    
    instance.$refs.imageInput.value = '';
    instance.$emit('cropImage', instance.updatedValue);

    instance.isServerLoading = false;
  },
  getBase64Meta(base64Source) {
    const splittedBase64 = base64Source.split(',')[1];
    const contentType = base64Source.match(/[^:]\w+\/[\w-+\d.]+(?=;|,)/)[0]

    return {
      source: base64Source,
      base64: splittedBase64,
      contentType
    };
  },
  // converters 
  base64ToFilesConverter(base64= '', name= 'untitled') {
    return new Promise((resolve) => {
      fetch(base64)
      .then((res) => res.blob())
      .then((blob) => {
        const createdFileExtention = base64.split(';')[0].split(':')[1];
        const createdFile = new File([blob], name, { type: createdFileExtention });

        createdFile.displayName = this.enhanceFileName(createdFile);

        resolve(createdFile)
      })
    });
  }
})


export { generateUtils }