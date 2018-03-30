import { Component } from '@angular/core';
import { IonicPage, ViewController } from 'ionic-angular';

// Plugins
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker';

// Providers
import { UploadFileProvider } from '../../providers/upload-file/upload-file';
import { UploadFile } from '../../models/uploadFile.model';

@IonicPage()
@Component({
  selector: 'page-upload',
  templateUrl: 'upload.html',
})
export class UploadPage {

  title: string = '';
  imagePreview: string = '';
  image64: string = '';

  constructor( private _viewCtrl: ViewController,
               private _camera: Camera,
               private _imagePicker: ImagePicker,
               private _ufp: UploadFileProvider ) {
  }

  closeModal () {

    this._viewCtrl.dismiss();

  }

  showCamera () {

    const options: CameraOptions = {
      quality: 100,
      destinationType: this._camera.DestinationType.DATA_URL,
      encodingType: this._camera.EncodingType.JPEG,
      mediaType: this._camera.MediaType.PICTURE
    }

    this._camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64:
     this.imagePreview = 'data:image/jpeg;base64,' + imageData;
     this.image64 = imageData;
    }, (err) => {
      console.log('Error in camera', JSON.stringify(err));
    });

  }

  selectPhoto () {

    const options:ImagePickerOptions = {
      quality: 100,
      outputType: 1,
      maximumImagesCount: 1
    }

    this._imagePicker.getPictures(options).then((results) => {
      for (var i = 0; i < results.length; i++) {
          this.imagePreview = 'data:image/jpeg;base64,' + results[i];
          this.image64 = results[i];
      }
    }, (err) => {
      console.log('Error in select Picker image', JSON.stringify(err));
    });

  }

  createPost () {

      const imageUpload: UploadFile = {
        img: this.image64,
        title: this.title
      }

      this._ufp.loadImageFirebase ( imageUpload )
               .then( () => this.closeModal() );

  }

}
