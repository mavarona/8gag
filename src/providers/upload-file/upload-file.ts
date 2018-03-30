
import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';

// Firebase
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';
import 'rxjs/add/operator/map';

// Models
import { UploadFile } from '../../models/uploadFile.model';

@Injectable()
export class UploadFileProvider {

  images: Array<UploadFile> = new Array<UploadFile>();
  lastKey: string = null;

  constructor( private _toastCtrl: ToastController,
               private _afDB: AngularFireDatabase ) {

                this.loadLastKey()
                    .subscribe();

  }

  loadLastKey ( ) {

    return this._afDB.list('/post', ref => ref.orderByKey().limitToFirst(1))
              .valueChanges()
              .map( (posts: any) => {
                this.lastKey = posts[0].key;
                this.images.push( posts[0] );

              });

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
          const url = uploadTask.snapshot.downloadURL;
          this.createPost( uploadFile.title, url, fileName );
          resolve();
        }
       )
    });

  }

  private createPost ( title: string, img: string, fileName: string ) {

    const post: UploadFile = {
      img: img,
      title: title,
      key: fileName
    };

    this._afDB.object(`/post/${ fileName }`).update(post);

    this.images.push( post );

  }

  private showMessage ( message: string ) {

    const toast = this._toastCtrl.create({
      message: message,
      duration: 200
    });

    toast.present();

  }

}
