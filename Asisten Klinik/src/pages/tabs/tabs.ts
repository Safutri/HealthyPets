import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { HasilListPage } from '../settings/hasil-list';
import { DaftarAmbulatorPage } from '../daftar-ambulator/daftar-ambulator';

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  
  tab1Root = DaftarAmbulatorPage;
  tab2Root = HasilListPage;
 
  idHewan; idResepsionis; idUser;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public http: HttpClient, 
    public alertCtrl: AlertController) {
  
        this.idHewan = navParams.get("id");
        console.log("id Hewan di page list amb "+this.idHewan);
        this.navParams = navParams; 
        this.idHewan = this.navParams.data;
  
        this.idResepsionis = localStorage.getItem('idResepsionisLocal');
        console.log("id local: "+this.idResepsionis);  
        this.navParams = navParams; 
        this.idResepsionis = this.navParams.data;
  
        this.idUser = navParams.get("idUser");
        console.log("id User "+this.idUser);
        this.navParams = navParams; 
        this.idUser= this.navParams.data;

    }
  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');

    this.tab1Root = DaftarAmbulatorPage;
    this.tab2Root = HasilListPage;

  }

}
