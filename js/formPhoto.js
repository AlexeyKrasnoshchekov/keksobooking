'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var ImgSize = {
    AVATAR_WIDTH: 40,
    AVATAR_HEIGHT: 44,
    HOUSING_PHOTO_WIDTH: 70,
    HOUSING_PHOTO_HEIGHT: 70
  };

  var fileChooser = document.querySelector('input[type=file]');
  var avatarPreviewElement = document.querySelector('.ad-form-header__preview img');
  var housingPhotoPreviewElement = document.querySelector('.ad-form__photo');

  fileChooser.addEventListener('change', function () {
    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        avatarPreviewElement.src = reader.result;
        avatarPreviewElement.width = ImgSize.AVATAR_WIDTH;
        avatarPreviewElement.height = ImgSize.AVATAR_HEIGHT;

        var housingPhoto = document.createElement('img');
        housingPhoto.src = reader.result;
        housingPhoto.width = ImgSize.HOUSING_PHOTO_WIDTH;
        housingPhoto.height = ImgSize.HOUSING_PHOTO_HEIGHT;
        housingPhotoPreviewElement.appendChild(housingPhoto);
      });

      reader.readAsDataURL(file);
    }
  });
})();
