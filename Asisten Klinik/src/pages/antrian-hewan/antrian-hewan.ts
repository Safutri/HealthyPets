import { Component } from '@angular/core';
import { NavController, 
        LoadingController, 
        ToastController, 
        NavParams } from "ionic-angular";
import { HttpClient } from '@angular/common/http';
import {HomePage} from "../home/home";

@Component({
  selector: 'page-antrian-hewan',
  templateUrl: 'antrian-hewan.html',
})
export class AntrianHewanPage {
    idHewan;
    idResepsionis;
    users;
    id;
    nama: String; 
    gender: String;; 
    jenis: String; 
    ttl: any; 
    umur: String; 
    ras: String; 
    warna: String;
    no_reg: any;
    ktp: String;
    kode_warna: any;
    urls = "https://admin-web-dot-healthypets-webservice.appspot.com/_ah/api/hewan/v1/cari/";
  constructor(public navCtrl: NavController, 
        public navParams: NavParams, 
        public http: HttpClient,
        public loadingCtrl: LoadingController, 
        public toastCtrl: ToastController) {
      
          this.idHewan = navParams.get("idHewan");
          console.log("id Hewan di Page antrian "+this.idHewan);

          this.id= navParams.get("id");
          console.log("id Resepsionis di Page antrian "+this.id);
          this.getHewan();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AntrianHewanPage');
  }

  getHewan()  {
  this.http.get(this.urls+this.idHewan).subscribe(
    data=> {
      console.log(data);
      this.users = data;
        this.nama = this.users.nama;
        this.gender = this.users.gender;
        this.jenis = this.users.jenis;
        this.umur =this.users.umur;
        this.ras = this.users.ras;
        this.ttl = this.users.ttl;
        this.warna = this.users.warna;
        this.no_reg = this.users.no_reg;
        this.ktp = this.users.ktp;
        this.kode_warna = this.users.kode_warna;
    },
    err => {
      console.log(err);
    }
  );
}

home() {
  var body = { 
    "id":this.idHewan,
    "idResepsionis": this.id,
    "nama":this.nama,
    "jenis":this.jenis,
    "ras":this.ras,
    "gender":this.gender,
    "umur":this.umur,
    "ttl":this.ttl, 
    "warna":this.warna,
    "no_reg":this.no_reg,
    "ktp":this.ktp,
    "kode_warna":this.kode_warna
  };

      this.http
      .post('https://admin-web-dot-healthypets-webservice.appspot.com/_ah/api/antrian/v1/Antrianbaru/', body)
      .subscribe(
          data => {
            console.log(data);

          let loader = this.loadingCtrl.create({
            content: "Please wait..."
          });
          // show message
            let toast = this.toastCtrl.create({
              showCloseButton: true, 
              message: 'Sending Success!',
              duration: 3000,
              position: 'bottom'
            }); 
            loader.present();

            setTimeout(() => {
              loader.dismiss();
              toast.present();
              // back to home page
              this.navCtrl.setRoot(HomePage, {
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
