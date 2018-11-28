import { Component } from '@angular/core';
import { NavController, 
        NavParams, App,
        AlertController,
        ViewController, 
        ToastController} from 'ionic-angular';
import { FormAmbulatorPage  } from '../form-ambulator/form-ambulator'; 
import { PilihDrhPage  } from '../pilih-drh/pilih-drh'; 
import { HasilLabPage  } from '../hasil-lab/hasil-lab'; 
import { HomePage  } from '../home/home'; 
import { HttpClient } from '@angular/common/http';

import { FileOpener } from '@ionic-native/file-opener';
import { File } from '@ionic-native/file';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts'; 
pdfMake.vfs = pdfFonts.pdfMake.vfs;
 
@Component({
  selector: 'page-daftar-ambulator',
  templateUrl: 'daftar-ambulator.html',
})
export class DaftarAmbulatorPage {
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
  public alertCtrl: AlertController, 
  public viewCtrl:ViewController,
  private file: File,
  private app:App,
  public toastCtrl: ToastController,
  private fileOpener: FileOpener) {

      this.idHewan = navParams.get("id");
      console.log("id Hewan di page list amb "+this.idHewan);

      this.idResepsionis = localStorage.getItem('idResepsionisLocal');
      console.log("id local: "+this.idResepsionis);  

      this.idUser = navParams.get("idUser");
      console.log("id User "+this.idUser);
      
      this.getAmbulator();
      this.getHewan();
      this.getKlien();
}


getAmbulator(){
  this.http.get(this.url+'ambulator/v1/jsonambulator/'+this.idHewan).subscribe(
    data => {
       console.log("amb"+this.idHewan);
       console.log(data);
       this.datam = data;
       this.amb = this.datam.items; 

    }, err => {
      console.log(err);  
      let toast = this.toastCtrl.create({
        message: 'Hewan ini belum memilik ambulator',
        duration: 2000,
        position: 'middle'
      });    
      toast.present(toast);  
    }

  );
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
 
      ionViewDidLoad() {
        console.log('ionViewDidLoad DaftarAmbulatorPage');
      }

      labs(id){
        this.navCtrl.push(HasilLabPage, {
          "id": id,
          "idHewan": this.idHewan,
          "idResepsionis": this.idResepsionis
        }); 
      }
    
      famb(id){
        this.navCtrl.push(FormAmbulatorPage, {
          "id": id,
          "idHewan": this.idHewan,
          "idResepsionis": this.idResepsionis,
          "idUser": this.idUser
        }); 
      } 
    
      tbhamb(id){
        this.app.getRootNav().push(PilihDrhPage, {
              "id": this.idHewan,
              "idResepsionis":  this.idResepsionis
            });   
          }

      goToHome() { 
        this.app.getRootNav().push(HomePage, { 
            "id":this.idResepsionis
          });
         } 

         createPdf(){
          var docDefinition = {
            content: [
              { text: new Date().toTimeString(), alignment: 'right', margin: [10, 0, 0, 40]},  
       
              {
                layout: 'lightHorizontalLines',  
                table: { 
                  // headerRows: 1,
                  widths: [ 'auto', '10%', '*', 'auto', '10%', '*' ],
                  body: [ 
                    [ {text: 'Nama', bold: true}, ':', this.nama, {text: 'Nama', bold: true}, ':', this.namaklien],
                    [ {text: 'Kode Hewan', bold: true}, ':', this.kode_hewan, {text: 'No. Registrasi', bold: true}, ':', this.no_reg],
                    [ {text: 'Jenis', bold: true}, ':', this.jenis, {text: 'Alamat', bold: true}, ':', this.alamat],
                    [ {text: 'Gender', bold: true}, ':', this.gender, {text: 'Telp', bold: true}, ':', this.telp],
                    [ {text: '', margin: [0, 0, 0, 30]}, '','', {text: '', margin: [0, 0, 0, 30]},'','']
                  ]
                }
              },  
               
            ], 
          }

          this.pdfObj=pdfMake.createPdf(docDefinition).getBlob(buffer => {
            this.file.resolveDirectoryUrl(this.file.externalRootDirectory)
              .then(dirEntry => {
                this.file.getFile(dirEntry, 'KartuBerobat.pdf', { create: true })
                  .then(fileEntry => {
                    fileEntry.createWriter(writer => {
                      writer.onwrite = () => {
                        this.fileOpener.open(fileEntry.toURL(), 'application/pdf')
                          .then(res => { })
                          .catch(err => {
                            const alert = this.alertCtrl.create({ message: err.message, buttons: ['Ok'] });
                            alert.present();
                          });
                      }
                      writer.write(buffer);
                    })
                  })
                  .catch(err => {
                    const alert = this.alertCtrl.create({ message: err, buttons: ['Ok'] });
                    alert.present();
                  });
              })
              .catch(err => {
                const alert = this.alertCtrl.create({ message: err, buttons: ['Ok'] });
                alert.present();
              });
      
          }); 
        }        
}
