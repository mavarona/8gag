import { Component } from '@angular/core';
import { IonicPage, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-upload',
  templateUrl: 'upload.html',
})
export class UploadPage {

  constructor( private _viewCtrl: ViewController ) {
  }

  closeModal () {

    this._viewCtrl.dismiss();

  }

}
