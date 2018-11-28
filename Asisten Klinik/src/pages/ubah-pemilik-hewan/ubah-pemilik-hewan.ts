import { Component } from '@angular/core';
import { NavController, 
      NavParams,
      ToastController, 
      LoadingController, } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { ListHewanPage } from '../list-hewan/list-hewan';
import { APIProvider } from '../../providers/api/api';

@Component({
  selector: 'page-ubah-pemilik-hewan',
  templateUrl: 'ubah-pemilik-hewan.html',
})
export class UbahPemilikHewanPage {
  idUser; users; nama:string; no_reg:string;
  alamat:string; telp:string; email:string;
  ktp:string; idResepsionis; id:any;
  email_klinik:string;
  urls = 'https://admin-web-dot-healthypets-webservice.appspot.com/_ah/api/klien/v1/ubah';
  datas = {
    nama: "",
    no_reg: "",
    alamat: "",
    telp:"",
    email:"",
    ktp:"",
    email_klinik:""
  };

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public http: HttpClient,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public Perbarui: APIProvider
    ) {

      this.idUser = navParams.get("idUser");
      console.log("ubah pemilik "+this.idUser); 

      this.idResepsionis = localStorage.getItem('idResepsionisLocal');
      console.log("id local di halaman ubah: "+this.idResepsionis);  

      this.getPemilik(this.idUser);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UbahPemilikHewanPage');
  }

  getPemilik(idUser){ 
    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    }); 

    this.Perbarui.getUpdateKlien(idUser)
        .then((data)=>{
              loader.present();
                setTimeout(() => {
                  loader.dismiss();
                }, 3000)
          this.datas['nama'] = data['nama'];
          this.datas['no_reg'] = data['no_reg'];
          localStorage.setItem('noregLocal', this.datas['no_reg']);
          this.datas['alamat'] = data['alamat'];
          this.datas['telp'] = data['telp'];
          this.datas['email'] = data['email'];
          this.datas['ktp'] = data['ktp'];
          this.datas['email_klinik'] = data['email_klinik'];
            })
            .catch((err) => {
              console.error('Terjadi kesalahan: '+err);
            })
            .catch(() => {
              console.error('Kembalian kosong!');
            }) 
  }  

  ubah(){
     var body = { 
      "id":this.idUser,
      "nama":this.nama,
      "email":this.email,
      "alamat":this.alamat,
      "telp":this.telp,
      "ktp":this.ktp,
      "email_klinik":this.email_klinik,
      "no_reg":this.no_reg
    }; 

    this.http.put(this.urls, body)
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
                  this.navCtrl.setRoot(ListHewanPage, { 
                    'id' : this.idUser,
                    'idResepsionis': this.idResepsionis
                  }); 
                }, 3000)
          },
          err => {
            console.log("ERROR!: ", err);
          }
        );
      }
  }
