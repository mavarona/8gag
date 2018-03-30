
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
                    .subscribe( () => {
                      this.loadImages();
                    });

  }

  loadLastKey ( ) {

    return this._afDB.list('/post', ref=> ref.orderByKey().limitToLast(1) )
    .valueChanges()
    .map( (post:any) =>{

      console.log(post);
      this.lastKey = post[0].key;

      this.images.push( post[0] );

    });

  }

  loadImages ( ) {
    return new Promise( (resolve, reject)=>{

      this._afDB.list('/post',
        ref=> ref.limitToLast(3)
                 .orderByKey()
                 .endAt( this.lastKey )
       ).valueChanges()
        .subscribe(  (posts:any)=>{

          posts.pop();

          console.log('lenght: ' + posts.length);

          if( posts.length === 0 ){
            console.log('Ya no hay más registros');
            resolve(false);
            return;
          }

          this.lastKey = posts[0].key;

          for( let i = posts.length-1;  i >=0; i-- ){
            let post = posts[i];
            this.images.push(post);
          }

          resolve(true);

        });

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
