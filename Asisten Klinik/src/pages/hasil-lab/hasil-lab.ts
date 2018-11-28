import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { HomePage  } from '../home/home'; 
import { APIProvider } from '../../providers/api/api';
import { LabAmbPage } from '../lab-amb/lab-amb';

@Component({
  selector: 'page-hasil-lab',
  templateUrl: 'hasil-lab.html',
})
export class HasilLabPage {
  k_parasit:String; 
  k_jamur:String;
  keadaan_feses:String;
  p_interna:String;
  protozoa:String;
  mikroba:String;
  warna:String;
  bau:String;
  uji_gula:String;
  uji_protein:String;
  uji_sedimentasi:String;
  warna_darah:String;
  sifat_darah:String;
  natif_protozoa:String;
  natif_bakteri:String; 
  bdm:String;
  bdp:String;
  netrofil:String;
  eosinofil:String;
  basofil:String;
  limfosit:String;
  monosit:String;
  stab:String;
  hb:String;
  ht:String;
  diagnosa:String;
  dif_diag:String 
  prognosa:String;
  terapi:String; 
  idAmb; idUser;
  lab; idHewan; idResepsionis; hasil;
   datas = {
    nama: "",
    umur: "",
    gender: "",
    ras: "",
    jenis:"",
    kode_hewan:""
  };
  items: Array<any> = [];
  itemString: string;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public http: HttpClient,
    public hasilLab: APIProvider) {
      this.idHewan = navParams.get("idHewan");
           console.log('id Hewan '+this.idHewan);

           this.idUser = navParams.get("idUser");
           console.log('id User '+this.idUser);


        this.idResepsionis = localStorage.getItem('idResepsionisLocal'); 

      this.getLabs(this.idHewan);
      this.getHewan(this.idHewan);
  }

  ionViewDidLoad() {
    console.log('HasilLabPage');
  }

  getHewan(idHewan){
    this.hasilLab.getHewanById(idHewan)
        .then((data)=>{             
          this.datas['idHewan'] = data['id'];   
          this.datas['nama'] = data['nama'];
          this.datas['umur'] = data['umur'];
          this.datas['gender'] = data['gender'];
          this.datas['ras'] = data['ras'];
          this.datas['jenis'] = data['jenis'];
            })
            .catch((err) => {
              console.error('Terjadi kesalahan: '+err);
            })
            .catch(() => {
              console.error('data tidak ada di datastore!');
            })  
    // this.http.get(this.url+this.idHewan).subscribe(
    //   datas => {
    //      console.log("data hewan"+this.idHewan);
    //      console.log(datas); 
    //       this.hewan = datas;
    //       this.nama = this.hewan.nama;
    //       this.umur = this.hewan.umur;
    //       this.gender = this.hewan.gender;
    //       this.ras = this.hewan.ras;
    //       this.jenis = this.hewan.jenis;

    //   }, err => {
    //     console.log(err); 
    //   }
    // );
  } 

  getLabs(idHewan){
    this.hasilLab.getLab(idHewan)
    .then(
      (lab) => {
        console.log('mengambil data Lab');
        this.items = [];
        
        for(let i = 0; i < lab['items'].length; i++) {
          this.items.push({
            idLab : lab['items'][i]['id'],
            idAmb : lab['items'][i]['idAmb'],
            tgl : lab['items'][i]['tgl'],
            prognosa: lab['items'][i]['prognosa'],
            k_parasit: lab['items'][i]['k_parasit'],
            k_jamur: lab['items'][i]['k_jamur'],
            keadaan_feses: lab['items'][i]['keadaan_feses'],
            p_interna: lab['items'][i]['p_interna'],
            protozoa: lab['items'][i]['protozoa'],
            mikroba: lab['items'][i]['mikroba'],
            warna: lab['items'][i]['warna'],
            bau: lab['items'][i]['bau'],
            uji_gula: lab['items'][i]['uji_gula'],
            uji_protein: lab['items'][i]['uji_protein'],
            uji_sedimentasi: lab['items'][i]['uji_sedimentasi'],
            warna_darah: lab['items'][i]['warna_darah'],
            sifat_darah: lab['items'][i]['sifat_darah'],
            natif_protozoa: lab['items'][i]['natif_protozoa'],
            natif_bakteri: lab['items'][i]['natif_bakteri'],
            bdm: lab['items'][i]['bdm'],
            bdp: lab['items'][i]['bdp'],
            eosinofil: lab['items'][i]['eosinofil'],
            basofil: lab['items'][i]['basofil'],
            limfosit: lab['items'][i]['netrofil'],
            monosit: lab['items'][i]['monosit'],
            netrofil: lab['items'][i]['netrofil'],
            stab: lab['items'][i]['stab'],
            hb: lab['items'][i]['hb'],
            ht: lab['items'][i]['ht'],
            diagnosa: lab['items'][i]['diagnosa'],
            dif_diag: lab['items'][i]['dif_diag'],
            terapi: lab['items'][i]['terapi']            
          }); 
        } 
      this.itemString = JSON.stringify(this.items);
      })
    .catch(
      error => {
        console.error('Terjadi kesalahan: '+error);
      })
      .catch(
        () => {
          console.error('data tidak ada di datastore!');
      });   
  } 

    labamb(idAmb) {
      this.navCtrl.push(LabAmbPage, {
      "idAmb": idAmb,
      "idHewan":this.idHewan,
      "idUser": this.idUser
    }); 
  }

  goToHome() {this.navCtrl.setRoot(HomePage);} 
} 