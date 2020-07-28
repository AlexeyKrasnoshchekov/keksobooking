'use strict';

window.formPhoto = (function () {
  var FILE_TYPES = ['image/gif', 'image/jpg', 'image/jpeg', 'image/png'];
  var ImgSize = {
    AVATAR_WIDTH: 40,
    AVATAR_HEIGHT: 44,
    HOUSING_PHOTO_WIDTH: 70,
    HOUSING_PHOTO_HEIGHT: 70
  };

  var InputId = {
    AVATAR: 'avatar',
    IMAGES: 'images'
  };

  var avatarField = document.querySelector('.ad-form__field input[type=file]');
  var avatarPreviewElement = document.querySelector('.ad-form-header__preview img');
  var housingPhotoField = document.querySelector('.ad-form__upload input[type=file]');
  var housingPhotoPreviewElement = document.querySelector('.ad-form__photo');
  var oldPreviewSrc = avatarPreviewElement.src;

  function validFileType(file) {
    return FILE_TYPES.includes(file.type);
  }

  function addAvatarPreview(image) {
    avatarPreviewElement.src = image;
    avatarPreviewElement.width = ImgSize.AVATAR_WIDTH;
    avatarPreviewElement.height = ImgSize.AVATAR_HEIGHT;
  }

  function addHousingPhoto(image) {
    if (!housingPhotoPreviewElement.hasChildNodes()) {
      var housingPhoto = document.createElement('img');
      housingPhoto.className = 'housingImg';
      housingPhoto.src = image;
      housingPhoto.width = ImgSize.HOUSING_PHOTO_WIDTH;
      housingPhoto.height = ImgSize.HOUSING_PHOTO_HEIGHT;
      housingPhotoPreviewElement.appendChild(housingPhoto);
    } else {
      housingPhotoPreviewElement.querySelector('.housingImg').src = image;
    }
  }

  function removeHousingPhoto() {
    while (housingPhotoPreviewElement.firstChild) {
      housingPhotoPreviewElement.removeChild(housingPhotoPreviewElement.lastChild);
    }
  }

  avatarField.addEventListener('change', onChooseImage);
  housingPhotoField.addEventListener('change', onChooseImage);

  function onChooseImage(evt) {
    var element = evt.target;
    var file = element.files[0];
    var matches = validFileType(file);

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        switch (element.id) {
          case InputId.AVATAR:
            addAvatarPreview(reader.result);
            break;
          case InputId.IMAGES:
            addHousingPhoto(reader.result);
        }
      });

      reader.readAsDataURL(file);
    }
  }
  return {
    oldPreviewSrc: oldPreviewSrc,
    avatarPreviewElement: avatarPreviewElement,
    removeHousingPhoto: removeHousingPhoto
  };
})();
