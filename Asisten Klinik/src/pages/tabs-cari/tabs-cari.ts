import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CariKtpPage } from '../cari-ktp/cari-ktp';
import { KlienLamaPage } from '../klien-lama/klien-lama';

@Component({
  selector: 'page-tabs-cari',
  templateUrl: 'tabs-cari.html',
})
export class TabsCariPage {
  tab1Root = KlienLamaPage;
  tab2Root = CariKtpPage;
  idResepsionis;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.idResepsionis = localStorage.getItem('idResepsionisLocal');
      console.log("id local: "+this.idResepsionis); 
      this.tab1Root = KlienLamaPage;
    this.tab2Root = CariKtpPage;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }

}
