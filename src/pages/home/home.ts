import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { UploadPage } from '../upload/upload';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor( public modalCtrl: ModalController ) {

  }

  showModal () {

    const modal = this.modalCtrl.create( UploadPage );

    modal.present();

  }

}
