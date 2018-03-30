import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { UploadPage } from '../upload/upload';

import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  posts: Observable<Array<any>>

  constructor( public modalCtrl: ModalController,
               private _afDB: AngularFireDatabase ) {

      this.posts = _afDB.list('post').valueChanges();
  }

  showModal () {

    const modal = this.modalCtrl.create( UploadPage );

    modal.present();

  }

}
