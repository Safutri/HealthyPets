import { Component } from '@angular/core';
import {NavController, 
      LoadingController, 
      ToastController, 
      NavParams} from "ionic-angular";
import {HomePage} from "../home/home"; 
import { HttpClient } from '@angular/common/http';
import { Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'page-daftar-hewan',
  templateUrl: 'daftar-hewan.html',
})
export class DaftarHewanPage {
  klien;
  data: any; 
  id;
  idResepsionis;
  nama: any; 
  jenis: any;
  ras: any; 
  umur: any; 
  ttl: any;
  gender: any;
  warna: any; 
  no_reg:any; 
  email_klinik:string;
  ktp:any;
  kode_hewan:any;
  idklien; 
  isenabled=null;
  send:any;
  kode:any;
  url='https://admin-web-dot-healthypets-webservice.appspot.com/_ah/api/';
  
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public http: HttpClient,
    public loadingCtrl: LoadingController, 
    public toastCtrl: ToastController,
    private formBuilder: FormBuilder) {

      this.idklien = this.navParams.get("idklien");
      console.log("id klien page daftar hewan "+this.idklien);
  
    this.idResepsionis = localStorage.getItem('idResepsionisLocal');
    console.log("id local di halaman daftar hewan: "+this.idResepsionis);   

      this.email_klinik= localStorage.getItem('emailLocal');
      console.log("email klinik local dihalaman daftar hewan : "+this.email_klinik); 
      this.getKlien(); 

      this.send = this.formBuilder.group(
        {
          nama: ['', Validators.required],
          ttl: ['', Validators.required],
          umur: ['', Validators.required],
          jenis: ['', Validators.required],
          ras: ['', Validators.required],
          gender: ['', Validators.required],
          warna: ['', Validators.required]
        });
  }

  ionViewDidLoad() {
    console.log('DaftarHewanPage');
  }
 
 
  getKlien(){
    this.http.get(this.url+'klien/v1/klien/'+this.idklien).subscribe(
      datas => { 
         console.log(datas); 
          this.klien = datas;
          this.no_reg = this.klien.no_reg;
          this.ktp = this.klien.ktp; 
          
        console.log("no_reg " +this.no_reg);
        console.log("ktp "+this.ktp);
      }, err => {
        console.log(err); 
      }

    );
  } 
 
  home() {     
          var body = { 
            "id":this.idklien,
            "email_klinik":this.email_klinik, 
            "no_reg": this.no_reg, 
            "ktp":this.ktp,
            "nama": this.send.value['nama'], 
            "jenis": this.send.value['jenis'], 
            "ras": this.send.value['ras'],
            "gender": this.send.value['gender'], 
            "umur": this.send.value['umur'],
            "ttl": this.send.value['ttl'],
            "warna": this.send.value['warna'],            
            "kode_hewan": this.no_reg+this.send.value['nama']       
          };

          let loader = this.loadingCtrl.create({
            content: "Please wait..."
          });
          this.http
          .post(this.url+'hewan/v1/baru/', body)
          .subscribe(
              data => {
                console.log(data);
       
              // show message
                let toast = this.toastCtrl.create({
                  showCloseButton: true,
                  // cssClass: 'profile-bg',
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
                    'id' : this.id
                  }); 
                }, 3000)
          },
          err => {
            console.log("ERROR!: ", err);
          }
        );
  }

}
