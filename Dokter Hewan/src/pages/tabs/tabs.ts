import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { RekamMedikPage } from "../rekam-medik/rekam-medik";
import { ListKonsultasiPage } from '../list-konsultasi/list-konsultasi';
import { LabsPage } from '../labs/labs';

@Component({
  templateUrl: 'tabs.html'
})
 
export class TabsPage {
  tab1Root = ListKonsultasiPage;
  tab2Root = LabsPage;

  idAntrian; no_reg; idAmb; 
  kode_hewan; idDrh; 
  namaDrh: String;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public http: HttpClient) { 

    this.idAntrian = navParams.get("idAntrian");
    this.navParams = navParams;
    this.idAntrian = this.navParams.data;
 
    this.idAmb = navParams.get("idAmb");
    this.navParams = navParams;
    this.idAmb = this.navParams.data;

    this.no_reg = navParams.get("no_reg");
    this.navParams = navParams;
    this.no_reg = this.navParams.data;
    
    this.kode_hewan = navParams.get("kode_hewan");
    this.navParams = navParams;
    this.kode_hewan = this.navParams.data;

    this.idDrh = navParams.get("idDrh");
    this.navParams = navParams;
    this.idDrh = this.navParams.data;

    this.namaDrh = navParams.get("namaDrh");
    console.log('namaDrh ListKonsultasiPage '+this.namaDrh);
    this.navParams = navParams;
    console.log(this.navParams); // returns NavParams {data: Object}
    this.namaDrh = this.navParams.data;
    
    this.tab1Root = ListKonsultasiPage;
    this.tab2Root = LabsPage;
  }

  rm(no_reg){
    console.log("no reg kirim "+no_reg);
    this.navCtrl.push(RekamMedikPage, {
      'idAmb' : this.idAmb, 
      'no_reg' : no_reg,
      'idAntrian' : this.idAntrian,
      'kode_hewan' : this.kode_hewan, 
      'idDrh' : this.idDrh,
      'namaDrh' : this.namaDrh
    });
  }
     
}
