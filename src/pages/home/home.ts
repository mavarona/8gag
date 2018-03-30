import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { UploadPage } from '../upload/upload';

// Providers
import { UploadFileProvider } from '../../providers/upload-file/upload-file';
import { UploadFile } from '../../models/uploadFile.model';

import { SocialSharing } from '@ionic-native/social-sharing';

// import { AngularFireDatabase } from 'angularfire2/database';
// import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  // posts: Observable<Array<any>>
  anyMore: boolean = true;

  constructor( public modalCtrl: ModalController,
               public _ufp: UploadFileProvider,
               private _socialSharing: SocialSharing ) {

      // this.posts = _afDB.list('post').valueChanges();
  }

  showModal () {

    const modal = this.modalCtrl.create( UploadPage );

    modal.present();

  }

  shared(post: UploadFile) {

    this._socialSharing.shareViaFacebook( post.title, post.img, post.img )
                       .then( () => {} )
                       .catch( () => {});

  }

  doInfinite(infiniteScroll) {

    this._ufp.loadImages()
             .then( (anyMore: boolean) => {
                this.anyMore = anyMore;
                infiniteScroll.complete()
             });

  }

}
