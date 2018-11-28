import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { AllLabPage } from '../all-lab/all-lab';
import { RmPage } from '../rm/rm';

 
@Component({
  selector: 'page-tabs-data',
  templateUrl: 'tabs-data.html',
})
export class TabsDataPage {
  // tab1Root = AllKonsultasiPage;
  tab1Root = RmPage;
  tab2Root = AllLabPage;
 

  idHewan; no_reg; idKlien; 
  kode_hewan; idDrh; namaDrh

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public http: HttpClient) {   

    this.idHewan = navParams.get("id");
    console.log('id '+this.idHewan); 
    this.navParams = navParams;
    this.idHewan = this.navParams.data;

    this.namaDrh = navParams.get("namaDrh");
    console.log("namaDrh masuk : "+this.namaDrh);
    this.navParams = navParams;
    this.namaDrh= this.navParams.data;
 
    this.idKlien = navParams.get("idKlien");
    console.log('idKlien '+this.idKlien);
    this.navParams = navParams;
    this.idKlien = this.navParams.data;
    
    this.kode_hewan = navParams.get("kode_hewan");
    console.log('kode_hewan '+this.kode_hewan); 
    this.navParams = navParams; 
    this.kode_hewan = this.navParams.data;

    this.idDrh = navParams.get("idDrh");
    console.log('idDrh '+this.idDrh); 
    this.navParams = navParams; 
    this.idDrh = this.navParams.data;

    this.no_reg = navParams.get("no_reg");
    console.log('no_reg '+this.no_reg); 
    this.navParams = navParams; 
    this.no_reg = this.navParams.data;

    // this.tab1Root = AllKonsultasiPage;
    this.tab1Root = RmPage;
    this.tab2Root = AllLabPage;
    
  } 
}