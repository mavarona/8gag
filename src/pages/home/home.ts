import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { UploadPage } from '../upload/upload';

// Providers
import { UploadFileProvider } from '../../providers/upload-file/upload-file';

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
               public _ufp: UploadFileProvider ) {

      // this.posts = _afDB.list('post').valueChanges();
  }

  showModal () {

    const modal = this.modalCtrl.create( UploadPage );

    modal.present();

  }

  doInfinite(infiniteScroll) {

    this._ufp.loadImages()
             .then( (anyMore: boolean) => {
                this.anyMore = anyMore;
                infiniteScroll.complete()
             });

  }

}
