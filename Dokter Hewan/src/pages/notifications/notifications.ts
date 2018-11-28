import {Component} from "@angular/core";
import {ViewController } from "ionic-angular";
import { KlienLamaPage } from "../klien-lama/klien-lama";
import { NavController } from 'ionic-angular';


@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html'
})

export class NotificationsPage {
  constructor(public viewCtrl: ViewController, public navCtrl: NavController) {}

  close() {
    this.viewCtrl.dismiss();
  }

   

    lama() {
      this.navCtrl.push(KlienLamaPage);
    }
}
