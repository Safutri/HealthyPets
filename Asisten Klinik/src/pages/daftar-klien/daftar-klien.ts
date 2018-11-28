import { Component } from '@angular/core';
import { IonicPage, 
        NavController, 
        LoadingController, 
        NavParams, 
        ToastController,
        AlertController } from 'ionic-angular'; 
import { HttpClient } from '@angular/common/http';
import { DaftarHewanPage } from "../daftar-hewan/daftar-hewan";
import {Validators, FormBuilder } from '@angular/forms';
import { APIProvider } from '../../providers/api/api';

@IonicPage()
@Component({
  selector: 'page-daftar-klien',
  templateUrl: 'daftar-klien.html',
})
export class DaftarKlienPage { 
  user: any;
  data: any; 
  nama: any; 
  no_reg: any;
  email: any; 
  alamat: any; 
  ktp: any; users;
  email_klinik:string;
  telp: any; id:any;
  idResepsionis:any;
  isenabled=null; send:any;
  url = "https://admin-web-dot-healthypets-webservice.appspot.com/_ah/api/";
 
constructor(public navCtrl: NavController, 
  public http: HttpClient, 
  public loadingCtrl: LoadingController,
  public navParams: NavParams,
  public alertCtrl: AlertController,
  public toastCtrl: ToastController,
  private formBuilder: FormBuilder,
public daftarKlien: APIProvider) {
    this.send = this.formBuilder.group(
      {
        nama: ['', Validators.required],
        ktp: ['', Validators.required],
        telp: ['', Validators.required],
        alamat: ['', Validators.required],
        email: ['', Validators.required]
      }); 
    this.idResepsionis = localStorage.getItem('idResepsionisLocal');
    console.log("id local di halaman daftar: "+this.idResepsionis);   

      this.email_klinik= localStorage.getItem('emailLocal');
      console.log("email klinik local dihalaman daftar: "+this.email_klinik);
      
      
    this.id = [];
  }

  presentToast() {
    const toast = this.toastCtrl.create({
      message: this.idResepsionis,
      duration: 3000
    });
    toast.present();
  }

  daftarhewan(){
    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    console.log(this.idResepsionis = localStorage.getItem('idResepsionisLocal'));
    var body = { 
      "id" :this.idResepsionis, 
      "email_klinik":this.email_klinik= localStorage.getItem('emailLocal'),
      "nama": this.send.value['nama'],
      "email": this.send.value['email'], 
      "alamat": this.send.value['alamat'], 
      "ktp": this.send.value['ktp'],
      "no_reg" : this.send.value['ktp'],
      "telp": this.send.value['telp']      
    };
   
    this.http.get(this.url+'klien/v1/data/'+ this.idResepsionis + "/" + this.no_reg).subscribe(
      data => {
        console.log(data);  
       this.user = data;  
       this.users=this.user.items; 
       console.log("no reg sudah ada");
             const alert = this.alertCtrl.create({
              title: 'Information',
              subTitle: 'Klien sudah pernah terdaftar di aplikasi',
              buttons: ['OK']
            });
            alert.present();
         }, err => {
          this.http.post(this.url+'klien/v1/klien', body)
          .subscribe(
              data => {
                console.log(data);                  
  
                  setTimeout(() => {
                    loader.dismiss();
                    
                    this.navCtrl.push(DaftarHewanPage, {
                      'idklien': data["id"],
                      'id' : this.idResepsionis,
                      'email_klinik' : this.email_klinik
                    }); 
                  }, 3000)               
              },
              err => {
                console.log("ERROR!: ", err);
              }
          ); 
      });
    } 


}
