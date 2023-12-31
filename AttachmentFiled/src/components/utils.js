const generateUtils = instance => ({
  getFileSizeInBytes(size) {
    return size * 1024 * 1024;
  },
  getFileExtention(fileType, enableLowerCase = false) {
    const extention = fileType.split('/')[1];

    return enableLowerCase ? extention.toLowerCase() : extention;
  },
  enhanceFileName(file) {
    // animals.sd.png ===> png
    const extention = this.getFileExtention(file.type);
    const extensionWithDot = `.${extention}`;
    const name = file.name.split(extensionWithDot)[0];

    const displayedName = instance.enableFullnameDisplay ? name : name.slice(0, instance.maxDisplayNameLength)
    
    return `${displayedName}${extensionWithDot.toLowerCase()}`;
  },
  getFileSizeInKiloByte(sizeInBytes) {
    const sizeInKiloByte = parseFloat(sizeInBytes / 1024).toFixed(2);

    return `${sizeInKiloByte} ك.ب`;
  },
  getAllowedMaxFileSizeText(maxFilesSizeInMega) {
    return `كحد أقصى ${maxFilesSizeInMega} م.ب`;
  },
  getAllowedFileTypesText(allowedExtentions) {
    return `نوع الملف يجب أن يكون ${allowedExtentions}`; 
  },
  generateFileDownloadUrl(url, name) {
    const a = document.createElement('a');
    a.href = url;
    a.download = name;
    a.click();
  },
  onDownloadFile(file) {
    const { baseFile, downloadUrl, name } = file;
    
    if (baseFile) {
      fetch(baseFile)
        .then((res) => res.blob())
        .then((blob) => {
          const url = window.URL.createObjectURL(blob);
          this.generateFileDownloadUrl(url, name);
        });
    } else if (downloadUrl) {
      this.generateFileDownloadUrl(downloadUrl, name);
    } else {
      const url = window.URL.createObjectURL(file);
      this.generateFileDownloadUrl(url, name);
    }
  },
  dispatchError(target='', name= '') {
    const error =  this.getSelectedError(name)[target];
    instance.error = error;

    instance.$emit('error', {
      name: this.name,
      code: target,
      error
    });
    
    instance.$refs.file.value = "";
  },
  getSelectedError(fileName) {
    const { maxFileSizeInMega, maxFilesSizeInMega } = instance;

    return {
      fieldIsRequired: 'هذا الحقل مطلوب',
      maxFileSizeExceeded: ` الملف ${fileName} تجاوز الحد المسموح به  وهو ${maxFileSizeInMega} م.ب`,
      maxFilesSizeExceeded: ` تم تجاوز الحد المسموح به لجميع الملفات وهو ${maxFilesSizeInMega} م.ب`,
      fileExtention: `امتداد الملف ${fileName} غير مسموح به`,
    };
  },
  onDeleteFile(index) {
    const file = instance.enableServerSide ? instance.selectedFiles[index].file : instance.selectedFiles[index];
    instance.selectedFiles.splice(index, 1);
    
    if(!instance.selectedFiles.length && instance.isRequired) {
      this.dispatchError('fieldIsRequired');
    }

    // update total size and (|| 0 ---> is For to validate that file is not NaN if the provided file is corrupted)
    instance.currentTotalSize -= (file.size || 0);
    // update parent
    instance.$emit("select", instance.updatedValue);
  },
  isValidFile(file) {
    const enhancedAcceptedExtentions = instance.accept.toLowerCase();
    // .ZIP ==> ZIP
    // const
    const extention = this.getFileExtention(file.type, true).slice(1);
    const isValidExtention = enhancedAcceptedExtentions.includes(extention);
    const isValidSize = this.isValidFileSize(file.size, file.name);

    if(!isValidExtention) {
      return this.dispatchError('fileExtention', file.name);
    } 

    return isValidExtention && isValidSize;
  },
  isValidFileSize(fileSize, fileName) {
    const isValidSizeLimit = fileSize <= this.getFileSizeInBytes(instance.maxFileSizeInMega);

    const isValidCurrentSize = instance.validateOnSingleFileSize ? isValidSizeLimit : true;
    const isValidWithTotalSize = (instance.currentTotalSize + fileSize) <= this.getFileSizeInBytes(instance.maxFilesSizeInMega);

    if(!isValidCurrentSize) {
      this.dispatchError('maxFileSizeExceeded', fileName);
    }      
    
    if(!isValidWithTotalSize) {
      this.dispatchError('maxFilesSizeExceeded');
    }

    return isValidCurrentSize && isValidWithTotalSize;
  },
  onClientSideSelect(e) {
    const files = e.target.files;
    const firstFile = files[0];

    if(instance.resetErrorOnSelect && instance.error) {
      instance.error = '';
    }
  
    if(!instance.isMultiple && this.isValidFile(firstFile)) {
      firstFile.displayName = this.enhanceFileName(firstFile);
      instance.selectedFiles = [firstFile];
    }

    if(instance.isMultiple) {
      for(let i = 0; i < files.length; i++) {
        const file = files[i];

        if(instance.addAttachmentAllowed && this.isValidFile(file)) {
          file.displayName = this.enhanceFileName(file);
          instance.selectedFiles.push(file);
          // update total size
          instance.currentTotalSize += file.size;
        }
      }
    }
    // reset field value
    instance.$refs.file.value = "";

    instance.$emit("select", instance.updatedValue);
  },
  async onServerSideSelect(e) {
    instance.isServerLoading = true;

    const files = e.target.files;
    const selectedFile = files[0];
 
    if(instance.resetErrorOnSelect && instance.error) {
      instance.error = '';
    }

    if(this.isValidFile(selectedFile)) {
      selectedFile.displayName = this.enhanceFileName(selectedFile);
      
      const base64Meta = await this.convertFileToBase64(selectedFile);
   
      if('base64' in base64Meta) {
        const sharepointId = await instance.uploadCallback(base64Meta);

        if(sharepointId) {
          const constructedAttachment = {
            id: 0,
            attachmentTypeId: instance.attachmentTypeId,
            contentType: base64Meta.contentType,
            sharepointId,
            fileName: selectedFile.name,
            file: selectedFile
          };
  
          if(instance.isMultiple) {
            instance.selectedFiles.push(constructedAttachment)
          } else {
            instance.selectedFiles = [constructedAttachment]
          }
  
          instance.currentTotalSize += selectedFile.size;
          instance.$emit("select", instance.updatedValue);
        }
      }
      // reset field value
      instance.$refs.file.value = "";
    }

    instance.isServerLoading = false;
  },
  // converters 
  base64ToFilesConverter(file) {
    return new Promise((resolve) => {
        fetch(file.baseFile)
        .then((res) => res.blob())
        .then((blob) => {
          const createdFileExtention = file.baseFile.split(';')[0].split(':')[1];
          const createdFile = new File([blob], file.name, { type: createdFileExtention });
  
          createdFile.displayName = this.enhanceFileName(createdFile);
  
          resolve(createdFile)
        })
  
    });
  },
  convertFileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          const source = reader.result;
          const base64 = source.split(',')[1];
          const contentType = source.match(/[^:]\w+\/[\w-+\d.]+(?=;|,)/)[0]

          resolve({
            source,
            base64,
            contentType
          })
        };
        reader.onerror = error => reject(error);
    })
  },
  // theming
  getThemeColor(target, prefix = 'layout') {
    const color = getComputedStyle(document.documentElement).getPropertyValue(`--${prefix}-${target}-color`);

    return color.trim();
  },
  updateAppVariable(appTarget, layoutTarget) {
    const root = document.documentElement.style;

    const color = this.getThemeColor(layoutTarget) || this.getThemeColor(appTarget, 'app');

    root.setProperty(`--package-${appTarget}-color`, color);
  },
  updatePackageVariables() {
    const variables = [
      'primary',
      'dark-primary',
      'light-primary',
      'lighter-primary',
      'secondary',
      'light-secondary',
    ];

    variables.forEach((variable) => this.updateAppVariable(variable, variable));
  }
})


export { generateUtils }