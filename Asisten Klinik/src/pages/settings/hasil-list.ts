import { Component } from '@angular/core';
import { NavController, 
        NavParams, App,
        AlertController, 
        ToastController} from 'ionic-angular';
// import { PilihDrhPage  } from '../pilih-drh/pilih-drh'; 
import { HasilLabPage  } from '../hasil-lab/hasil-lab'; 
import { HomePage  } from '../home/home'; 
import { HttpClient } from '@angular/common/http'; 

@Component({
  selector: 'page-hasil-list',
  templateUrl: 'hasil-list.html'
})
export class HasilListPage { 
  idHewan: any; 
datam: any;
amb: any;
hewan: any; 
url = "https://admin-web-dot-healthypets-webservice.appspot.com/_ah/api/"; 
nama: String; 
umur: any; 
jenis: String; 
gender: String; 
ras: String; idUser;
idResepsionis:any;
lab; pdfObj=null;
kode_hewan;
users; namaklien:string; no_reg:string; 
alamat:string; telp:string; ktp:string;
email:string;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public http: HttpClient, 
    private app:App,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController) {
  
        this.idHewan = navParams.get("id");
        console.log("id Hewan di page list amb "+this.idHewan);
  
        this.idResepsionis = localStorage.getItem('idResepsionisLocal');
        console.log("id local: "+this.idResepsionis);  
  
        this.idUser = navParams.get("idUser");
        console.log("id User "+this.idUser);
          
        this.getHewan();
        this.getHasilLab();
        this.getKlien();
  }   
  
  getHewan(){
    this.http.get(this.url+'hewan/v1/cari/'+this.idHewan).subscribe(
      datas => {
         console.log("data hewan"+this.idHewan);
         console.log(datas); 
          this.hewan = datas; 
          this.nama = this.hewan.nama;
          this.umur = this.hewan.umur;
          this.gender = this.hewan.gender;
          this.ras = this.hewan.ras;
          this.jenis = this.hewan.jenis;
          this.kode_hewan = this.hewan.kode_hewan;
  
      }, err => {
        console.log(err); 
      }
  
    );
  } 
  
  getKlien(){ 
    this.http.get(this.url+'klien/v1/klien/'+this.idUser).subscribe(
      data=> {
        console.log(data);
        this.users = data;
          this.namaklien = this.users.nama; 
          this.no_reg = this.users.no_reg; 
          this.alamat = this.users.alamat;
          this.telp = this.users.telp;
          this.email = this.users.email;
          this.ktp = this.users.ktp;
          console.log("nama klien "+ this.nama);
      },
      err => {
        console.log(err);
      }
    );
  } 
  
  getHasilLab(){
    this.http.get(this.url+'lab/v1/daftar/'+this.idHewan).subscribe(
      data => {
         console.log("Hasil Lab id Hewan: "+this.idHewan);
         console.log(data);
         this.datam = data;
         this.lab = this.datam.items; 
  
      }, err => {
        console.log(err);  
        let toast = this.toastCtrl.create({
          message: 'Hewan ini belum memiliki Hasil Laboratorium',
          duration: 2000,
          position: 'middle'
        });    
        toast.present(toast);
      }
  
    );
  
  }   
        labs(id){
          this.navCtrl.push(HasilLabPage, {
            "id": id,
            "idHewan": this.idHewan,
            "idResepsionis": this.idResepsionis,
            "idUser":this.idUser
          }); 
        }   
      
        goToHome() { 
          this.app.getRootNav().push(HomePage, { 
              "id":this.idResepsionis
            });
           }  
                
  }
  