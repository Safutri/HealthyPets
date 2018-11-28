import { Component } from '@angular/core';
import { NavController, 
  LoadingController, 
  ToastController, 
  NavParams, App } from "ionic-angular";
import { HttpClient } from '@angular/common/http'; 
import { HomePage } from '../home/home';
 
@Component({
  selector: 'page-antri-drh',
  templateUrl: 'antri-drh.html',
})
export class AntriDrhPage {
  idHewan;
  idResepsionis;
  users;
  id; idAmb;
  nama: String; 
  gender: String;; 
  jenis: String; 
  ttl: any; 
  umur: String; 
  ras: String; 
  warna: String;
  no_reg: any;
  ktp: String;
  drh_jaga: any;
  kode_hewan: any;
  timestamp:any; drhPilih:any;
  urls = "https://admin-web-dot-healthypets-webservice.appspot.com/_ah/api/hewan/v1/cari/";
  urlAmb='https://admin-web-dot-healthypets-webservice.appspot.com/_ah/api/ambulator/v1/ambulator/';

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public http: HttpClient,
    public loadingCtrl: LoadingController, 
    public toastCtrl: ToastController,
    private app:App) {
    //  this.timestamp=new Date();
    this.idHewan = navParams.get("idHewan");
    console.log("id Hewan di Page antrian "+this.idHewan);

    this.kode_hewan = navParams.get("kode_hewan");
    console.log("kode_hewan di Page antrian "+this.kode_hewan);

    this.id= navParams.get("id");
    console.log("id Resepsionis di Page antrian "+this.id);

    this.idAmb= navParams.get("idAmb");
    console.log("id Amb di Page antrian "+this.idAmb);
    
    this.drh_jaga= navParams.get("drh_jaga");
    console.log("drh_jaga di Page antrian "+this.drh_jaga);

    this.drhPilih= navParams.get("drhPilih");
    console.log("drhPilih di Page antrian "+this.drhPilih); 
    
    this.getHewan();
    this.getAmb();
  }

  getHewan()  {
    this.http.get(this.urls+this.idHewan).subscribe(
      data=> {
        console.log(data);
        this.users = data;
          this.kode_hewan = this.users.kode_hewan;
          this.nama = this.users.nama;
          this.gender = this.users.gender;
          this.jenis = this.users.jenis;
          this.umur =this.users.umur;
          this.ras = this.users.ras;
          this.ttl = this.users.ttl;
          this.warna = this.users.warna;
          this.no_reg = this.users.no_reg;
          this.ktp = this.users.ktp;         
      },
      err => {
        console.log(err);
      }
    );
  }

  getAmb()  {
    this.http.get(this.urlAmb+this.idAmb).subscribe(
      data=> {
        console.log(data);
        this.users = data; 
          this.drh_jaga = this.users.drh_jaga;
      },
      err => {
        console.log(err);
      }
    );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AntriDrhPage');
  }

  home() {
    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    var body = { 
      "id":this.idHewan,
      "idResepsionis": this.id,
      "drh_jaga":this.drh_jaga,
      "ambs":this.idAmb,
      "kode_hewan":this.kode_hewan,
      "nama":this.nama,
      "jenis":this.jenis,
      "ras":this.ras,
      "gender":this.gender,
      "umur":this.umur,
      "ttl":this.ttl, 
      "warna":this.warna,
      "no_reg":this.no_reg,
      "ktp":this.ktp,
      "drhPilih":this.drhPilih
    }; 
    
    this.http
    .post('https://admin-web-dot-healthypets-webservice.appspot.com/_ah/api/klienantri/v1/Antri', body)
    .subscribe(
        data => {
          // let loader = this.loadingCtrl.create({
          //   content: "Please wait..."
          // });
          console.log(data);         
          loader.present();
          setTimeout(() => {
            loader.dismiss();
            this.app.getRootNav().push(HomePage, { 
              "id": this.id
            }); 
          }, 3000)
    },
    err => {
      console.log("ERROR!: ", err);
    }
  );
  }

}
