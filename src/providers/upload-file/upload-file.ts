
import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';

// Firebase
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';

// Models
import { UploadFile } from '../../models/uploadFile.model';

@Injectable()
export class UploadFileProvider {

  constructor( private _toastCtrl: ToastController ) {



  }

  loadImageFirebase ( uploadFile: UploadFile ) {

    return new Promise ( (resolve, reject) => {
      this.showMessage('loading...');

      const storeRef = firebase.storage().ref();
      const fileName = new Date().valueOf().toString();

      const uploadTask: firebase.storage.UploadTask =
                         storeRef.child(`img/${fileName}`)
                                 .putString( uploadFile.img, 'base64', { contentType: 'image/jpeg' } );

      uploadTask.on( firebase.storage.TaskEvent.STATE_CHANGED,
        () => {},
        (err) => {
          console.log('Error in the charge');
          console.log(JSON.stringify( err ));
          this.showMessage(JSON.stringify( err ));
          reject();
        },
        () => {
          console.log('Upload file in firebase');
          this.showMessage('The image was loaded');
          resolve();
        }
       )
    });

  }

  private showMessage ( message: string ) {

    const toast = this._toastCtrl.create({
      message: message,
      duration: 200
    });

    toast.present();

  }

}