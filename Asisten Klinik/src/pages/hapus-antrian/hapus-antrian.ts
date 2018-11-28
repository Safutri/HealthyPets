import { Component } from '@angular/core';
import {NavController, LoadingController, ToastController, NavParams, AlertController } from "ionic-angular";
import {HomePage} from "../home/home";
import { HttpClient } from '@angular/common/http';
import { APIProvider } from '../../providers/api/api';
 
@Component({
  selector: 'page-hapus-antrian',
  templateUrl: 'hapus-antrian.html',
})
export class HapusAntrianPage { 
  idHapusKlien: any;
  users: any;
  nama: any; 
  gender: any; 
  jenis: any;
  umur: any; 
  ras: any;
  idResepsionis; 
  urlDelete = "https://admin-web-dot-healthypets-webservice.appspot.com/_ah/api/";
  ambs;
  datas = {
    nama: "",
    jenis: "",
    ras: "",
    umur: "",
    gender:""
  };
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
      public alerCtrl: AlertController, 
      public loadingCtrl: LoadingController, 
      public toastCtrl: ToastController, 
      public http: HttpClient,
      public deleteKlien: APIProvider,
      public hapus: APIProvider
    ) {
        this.idHapusKlien = navParams.get("id");
        console.log("id antrian delete antrian "+this.idHapusKlien);

        this.ambs = navParams.get("ambs");
        console.log("ambs delete antrian "+this.ambs);

        this.idResepsionis = localStorage.getItem('idResepsionisLocal');
        console.log("id local: "+this.idResepsionis);  

        this.getUser(this.idHapusKlien);
  }  

  getUser(idHapusKlien){
    this.deleteKlien.getHapusKlien(idHapusKlien)
      .then((data)=>{
              this.datas['idHapus'] = data['id'];
              this.datas['nama'] = data['nama'];
              this.datas['jenis'] = data['jenis'];
              this.datas['ras'] = data['ras'];
              this.datas['umur'] = data['umur'];
              this.datas['gender'] = data['gender'];
              this.datas['ambs'] = data['ambs']; 
              this.datas['drhPilih']=data['drhPilih'];        
          })
          .catch((err) => {
            console.error('Terjadi kesalahan: '+err);
          })
          .catch(() => {
            console.error('Kembalian kosong!');
          }) 
  } 

   antrian(idHapus) {
    let confirm = this.alerCtrl.create({
      title: 'Konfirmasi',
      message: 'Apakah anda yakin ingin menghapus antrian? jika anda menghapus antrian ini maka ambulator juga akan terhapus dari data hewan',
      buttons: [
        {
          text: 'OK',
          handler: () => { 

          this.hapus.HapusKlien(idHapus)
            .then((data)=>{
              
              resp => console.log('deleted')
              this.http.delete(this.urlDelete+ 'ambulator/v1/ambs/' + this.datas['ambs']).subscribe(
                resp => console.log('deleted'),
                error => console.log('error occur, delete fail')
            );
            
                  resp => console.log('deleted')
                  this.http.delete(this.urlDelete+ 'pilihdrh/v1/pilihDrh/' + this.datas['drhPilih']).subscribe(
                    resp => console.log('deleted'),
                    error => console.log('error occur, delete fail')
                );
          
                  error => console.log('error occur, delete fail') 
                })
                .catch((err) => {
                  console.error('Terjadi kesalahan: '+err);
                })
                .catch(() => {
                  console.error('Kembalian kosong!');
                })
    
            let loader = this.loadingCtrl.create({
              content: "Please wait..."
            }); 
 
            let toast = this.toastCtrl.create({
              showCloseButton: true, 
              message: 'Delete Success!',
              duration: 3000,
              position: 'bottom'
            });
         
            loader.present();
         
            setTimeout(() => {
              loader.dismiss();
              toast.present();
              // back to home page
                  this.navCtrl.setRoot(HomePage, {
                    "id": this.idResepsionis
                });
            }, 3000)
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Cancel',
          handler: () => {
            console.log('Agree clicked');
          }
        }
      ]
    });
    confirm.present()
  }


  // antrian() {
  //   let confirm = this.alerCtrl.create({
  //     title: 'Konfirmasi',
  //     message: 'Apakah anda yakin ingin menghapus antrian ?',
  //     buttons: [
  //       {
  //         text: 'OK',
  //         handler: () => {
  
  //           this.http.delete('https://admin-web-dot-healthypets-webservice.appspot.com/_ah/api/klienantri/v1/daftarAntrian/'
  //           +this.idHapusKlien).subscribe(
  //             resp => console.log('deleted'),
  //             error => console.log('error occur, delete fail')
  //         );

  //         this.http.delete(this.urlDeleteAmb + this.ambs).subscribe(
  //                         resp => console.log('deleted'),
  //                         error => console.log('error occur, delete fail')
  //                     );          
  
  //           let loader = this.loadingCtrl.create({
  //             content: "Please wait..."
  //           });
  //           // show message
  //           let toast = this.toastCtrl.create({
  //             showCloseButton: true,
  //             // cssClass: 'profile-bg',
  //             message: 'Delete Success!',
  //             duration: 3000,
  //             position: 'bottom'
  //           });
         
  //           loader.present();
         
  //           setTimeout(() => {
  //             loader.dismiss();
  //             toast.present();
  //             // back to home page
  //                 this.navCtrl.setRoot(HomePage, {
  //                   "id": this.idResepsionis
  //               });
  //           }, 3000)
  //           console.log('Disagree clicked');
  //         }
  //       },
  //       {
  //         text: 'Cancel',
  //         handler: () => {
  //           console.log('Agree clicked');
  //         }
  //       }
  //     ]
  //   });
  //   confirm.present()
  // }
  
  }
