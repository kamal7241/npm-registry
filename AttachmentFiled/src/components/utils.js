const generateUtils = instance => ({
  getFileSizeInBytes(size) {
    return size * 1024 * 1024;
  },
  getFileExtention(fileName, enableLowerCase = false) {
    const extention = fileName.substring(fileName.lastIndexOf('.'));
  
    return enableLowerCase ? extention.toLowerCase() : extention;
  },
  enhanceFileName(fileName) {
    // animals.sd.png ===> .png
    const extention = this.getFileExtention(fileName);
    const name = fileName.split(extention)[0];

    const displayedName = instance.enableFullnameDisplay ? name : name.slice(0, instance.maxDisplayNameLength)
    
    return `${displayedName}${extention.toLowerCase()}`;
  },
  base64ToFilesConverter(file) {
    return new Promise((resolve) => {
        fetch(file.baseFile)
        .then((res) => res.blob())
        .then((blob) => {
          const createdFileExtention = file.baseFile.split(';')[0].split(':')[1];
          const createdFileName = `${file.name}.${createdFileExtention.split('/')[1]}`;
          const createdFile = new File([blob], file.name, { type: createdFileExtention });
  
          createdFile.displayName = this.enhanceFileName(createdFileName);
  
          resolve(createdFile)
        })
  
    });
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
    // console.log('onDownloadFile',file);
  },
  dispatchError(target='', name= '') {
    const error =  this.getSelectedError(name)[target];
    instance.error = error;

    instance.$emit('error', {
      name: this.name,
      error
    });
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
    const file = instance.selectedFiles[index];
    instance.selectedFiles.splice(index, 1);
    
    if(!instance.selectedFiles.length && instance.isRequired) {
      instance.generatedUtils.dispatchError('fieldIsRequired');
    }

    // update total size
    instance.currentTotalSize -= file.size;

    // update parent
    instance.$emit("select", instance.updatedValue);
  },
  isValidFile(file) {
    const enhancedAcceptedExtentions = instance.accept.toLowerCase();
    // .ZIP ==> ZIP
    const extention = this.getFileExtention(file.name, true).slice(1);
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
      this.dispatchError();
    }
  
    if(!instance.isMultiple && this.isValidFile(firstFile)) {
      firstFile.displayName = this.enhanceFileName(firstFile.name);
      instance.selectedFiles = [firstFile];
    }

    if(instance.isMultiple) {
      for(let i = 0; i < files.length; i++) {
        const file = files[i];

        if(instance.addAttachmentAllowed && this.isValidFile(file)) {
          file.displayName = this.enhanceFileName(file.name);
          instance.selectedFiles.push(file);
          // update total size
          instance.currentTotalSize += file.size;
        }
      }
    }
    // reset field value
    instance.$refs.file.value = "";

    instance.$emit("select", instance.updatedValue);
  }
})


export { generateUtils }