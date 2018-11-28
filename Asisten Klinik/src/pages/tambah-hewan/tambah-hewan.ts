  import { Component } from '@angular/core';
  import {NavController, LoadingController, ToastController, NavParams} from "ionic-angular";
  import { HttpClient } from '@angular/common/http';
  import { ListHewanPage  } from '../list-hewan/list-hewan'; 
  import {Validators, FormBuilder } from '@angular/forms';
import { APIProvider } from '../../providers/api/api';

  @Component({
    selector: 'page-tambah-hewan',
    templateUrl: 'tambah-hewan.html',
  })
  export class TambahHewanPage {
    idUser: any;
    user = "";
    data: any; 
    id: any;
    nama: any; 
    jenis: any;
    ras: any; 
    umur: any; 
    ttl: any;
    gender: any;
    warna: any;
    idResepsionis:any;
    klien; 
    no_reg:any;
    ktp:any; 
    kode_hewan:any;
    email_klinik:string;
    kirim:any;
    datas = {
      nama: "",
      no_reg: "",
      alamat: "",
      email: "",
      ktp:"",
      telp:""
    };
    constructor(public navCtrl: NavController, 
      public navParams: NavParams, 
      public http: HttpClient,
      public loadingCtrl: LoadingController, 
      public toastCtrl: ToastController,
      private formBuilder: FormBuilder,
      public tambahHewan:APIProvider) {

        this.idUser = navParams.get("id");
        console.log("id Klien di page tbh hewan"+this.idUser); 
        
        this.idResepsionis = localStorage.getItem('idResepsionisLocal');
        console.log("id local di halaman tbh hewan: "+this.idResepsionis);   

        this.email_klinik= localStorage.getItem('emailLocal');
        console.log("email klinik local dihalaman tbh hewan: "+this.email_klinik); 

        this.no_reg = localStorage.getItem('noregLocal');
        console.log("noeg local di halaman tbh hewan: "+this.no_reg);  
        
        this.ktp = localStorage.getItem('ktpLocal');
        console.log("ktp local di halaman tbh hewan: "+this.ktp);  

      this.getKlien(this.idUser);

      this.kirim = this.formBuilder.group(
        {
          // kode_hewan: ['', Validators.required],
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
      console.log('TambahHewanPage');
      console.log("halaman tambah page"+this.idUser);
    }

    getKlien(idUser){
      this.tambahHewan.getUpdateKlien(idUser)
      .then((data)=>{             
        this.datas['nama'] = data['nama'];
        this.datas['no_reg'] = data['no_reg'];
        this.datas['alamat'] = data['alamat'];
        this.datas['telp'] = data['telp'];
        this.datas['email'] = data['email'];
        this.datas['ktp'] = data['ktp']; 
          })
          .catch((err) => {
            console.error('Terjadi kesalahan: '+err);
          })
          .catch(() => {
            console.error('data tidak ada di datastore!');
          })  
      // this.http.get('https://admin-web-dot-healthypets-webservice.appspot.com/_ah/api/klien/v1/klien/'+this.idUser).subscribe(
      //   datas => { 
      //     console.log(datas); 
      //       this.klien = datas;
      //       this.no_reg = this.klien.no_reg;
      //       this.ktp = this.klien.ktp; 
      //     console.log("no_reg " +this.no_reg);
      //     console.log("ktp "+this.ktp);
      //   }, err => {
      //     console.log(err); 
      //   }

      // );
    } 
    
    send(id){
      var body = { 
              "id":this.idUser,           
              "ktp":localStorage.getItem('ktpLocal'),
              "email_klinik":this.email_klinik,
              // "kode_hewan": this.kirim.value['kode_hewan'],
              "no_reg": this.no_reg,
              "nama": this.kirim.value['nama'],
              "jenis": this.kirim.value['jenis'], 
              "ras": this.kirim.value['ras'],
              "gender": this.kirim.value['gender'],
              "umur": this.kirim.value['umur'],
              "ttl": this.kirim.value['ttl'],
              "warna": this.kirim.value['warna'],
              "kode_hewan": this.no_reg+this.kirim.value['nama']
            };

            this.http
            .post('https://admin-web-dot-healthypets-webservice.appspot.com/_ah/api/hewan/v1/baru/', body)
            .subscribe(
                data => {
                  console.log(data);
        
                let loader = this.loadingCtrl.create({
                  content: "Please wait..."
                });
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

                    // back to page
                    this.navCtrl.push(ListHewanPage, {
                      "id": this.idUser,
                      "idResepsionis": this.idResepsionis
                    });

                    console.log("datanya:" +data);
                  }, 3000)
            },
            err => {
              console.log("ERROR!: ", err);
            }
          );
    }

  }
