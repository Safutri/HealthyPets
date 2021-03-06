import { Component } from '@angular/core';
import { NavController,
  NavParams,
  AlertController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { TambahRmPage } from '../tambah-rm/tambah-rm';
import { FileOpener } from '@ionic-native/file-opener';
import { File } from '@ionic-native/file';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { AmbulatorKlienPage } from '../ambulator-klien/ambulator-klien';
import { LabAmbPage } from '../lab-amb/lab-amb';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'page-rm-klien',
  templateUrl: 'rm-klien.html',
})
export class RmKlienPage {
  urls ='https://admin-web-dot-healthypets-webservice.appspot.com/_ah/api/'
  // urlRM = 'https://healthypets-webservice.appspot.com/_ah/api/rekammedik/v1/ambilData/';
  urlHewan = 'https://healthypets-webservice.appspot.com/_ah/api/hewan/v1/cari/';
  urlKlien = 'https://healthypets-webservice.appspot.com/_ah/api/klien/v1/klien/'; 
  rm;       
  klien;
  kode_hewan
  idAntrian;
  no_reg;
  idDrh; idAmb;
  hewan; nama:string;
  namahewan: string;
  ras: string; 
  jenis: string;
  umur: string;
  gender: string;
  lain: string;
  tgl: string;
  obat: string;
  status_awal: string;
  terapi: string;
  diagnosa: string;
  nama_drh:string;
  idHewan; id_hewan;
  idKlien; idRM; namaDrh;
  pdfObj=null; namaklien:String;
  alamat:string; telp:string;
  constructor(public navCtrl: NavController,
    public http: HttpClient, 
    public navParams: NavParams,
    public alertCtrl:AlertController,
    private file: File,
    private fileOpener: FileOpener) {
      
    this.idDrh = navParams.get("idDrh");
    console.log("idDrh "+this.idDrh);

    this.idHewan = navParams.get("idHewan");
    console.log("idHewan "+this.idHewan);

    this.idKlien = navParams.get("idKlien");
    console.log("idKlien "+this.idKlien);

    this.idRM = navParams.get("idRM");
    console.log("idRM "+this.idRM);

    this.kode_hewan = navParams.get("kode_hewan");
    console.log("kode_hewan "+this.kode_hewan);

    this.no_reg = navParams.get("no_reg");
    console.log("no_reg "+this.no_reg);

    this.namaDrh = navParams.get("namaDrh");
    console.log("namaDrh masuk : "+this.namaDrh);

    this.idAmb = navParams.get(" this.idAmb = this.rm.idAmb");

    this.getRM();
    this.getKlien();
    this.getHewan();
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RmKlienPage');
  }

  getRM(){ 
    this.http.get(this.urls+'rekammedik/v1/ambilData/'+this.idRM).subscribe(
      data=> { 
        this.rm = data;
        this.idAmb = this.rm.idAmb;
          this.tgl = this.rm.tgl;  
          this.nama_drh = this.rm.nama_drh;
          this.lain = this.rm.lain;
          this.obat = this.rm.obat;
          this.status_awal = this.rm.status_awal;
          this.terapi = this.rm.terapi;
          this.diagnosa = this.rm.diagnosa;  
          console.log("id Ambs tampil "+this.idAmb)        
      },
      err => {
        console.log(err); 
      }
    );
  } 

  getKlien(){ 
    this.http.get(this.urlKlien+this.idKlien).subscribe(
      data=> { 
        this.klien = data;  
        this.namaklien = this.klien.nama; 
          this.no_reg = this.klien.no_reg; 
          this.alamat = this.klien.alamat;
          this.telp = this.klien.telp;
      },
      err => {
        console.log(err);
      }
    );
  } 

  getHewan(){ 
    this.http.get(this.urlHewan+this.idHewan).subscribe(
      data=> { 
        this.hewan = data;
          this.namahewan = this.hewan.nama;  
          this.ras = this.hewan.ras;
          this.jenis = this.hewan.jenis;
          this.umur = this.hewan.umur; 
          this.gender = this.hewan.gender; 
      },
      err => {
        console.log(err);
      }
    );
  }  

    tbhRM(){
      this.navCtrl.setRoot(TambahRmPage,{
        "idDrh":this.idDrh,
        "idHewan":this.idHewan,
        "kode_hewan":this.kode_hewan,
        "idKlien":this.idKlien,
        "no_reg":this.no_reg,
        "namaDrh": this.namaDrh
    });
  }  

  anam(){
    this.navCtrl.push(AmbulatorKlienPage,{
      "idAmb": this.idAmb, 
      'idDrh' : this.idDrh, 
      'idHewan': this.idHewan, 
      'idKlien': this.idKlien,
      'namaDrh': this.namaDrh
  });
}

labamb(){ 
  this.navCtrl.push(LabAmbPage,{ 
    "idAmb": this.idAmb,
      'idDrh' : this.idDrh,  
      "no_reg":this.no_reg,
      "kode_hewan":this.kode_hewan,
      "namaDrh":this.namaDrh,
      "idRM": this.idRM,
      "idKlien":this.idKlien,
      "idHewan":this.idHewan,
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
              [ {text: 'Nama', bold: true}, ':', this.namahewan, {text: 'Nama Klien', bold: true}, ':', this.namaklien],
              [ {text: 'Kode Hewan', bold: true}, ':', this.kode_hewan, {text: 'No. Registrasi', bold: true}, ':', this.no_reg],
              [ {text: 'Jenis', bold: true}, ':', this.jenis, {text: 'Alamat', bold: true}, ':', this.alamat],
              [ {text: 'Gender', bold: true}, ':', this.gender, {text: 'Telp', bold: true}, ':', this.telp],
              [ {text: '', margin: [0, 0, 0, 30]}, '','', {text: '', margin: [0, 0, 0, 30]},'','']
            ]
          }
        },  
        
        {text: 'REKAM MEDIK' , bold: true, alignment: 'center'},
        {text: this.tgl, alignment: 'center'},
        {
          layout: 'lightHorizontalLines',  
          table: { 
            headerRows: 1,
            widths: [ 'auto', '10%', '*'],
            body: [
              [ '', '', ''],
              [ {text: 'Dokter Tugas', bold: true}, ':', this.nama_drh],
                  [ {text: 'Status Present', margin: [30, 1]}, ':', this.status_awal],
                  [ {text: 'Diagnosa', margin: [30, 1]}, ':', this.diagnosa],
                  [ {text: 'Terapi', margin: [30, 1]}, ':', this.terapi],
                  [ {text: 'Pengobatan', margin: [30, 1]}, ':',this.obat],
                  [ {text: 'Lain-lain', margin: [30, 1]}, ':', this.lain]                                 
            ]
          }
        },  
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
        },
        subheader: {
          fontSize: 12,
          bold: true,
          margin: [0, 15, 0, 0]
        },
        story: {
          italic: true,
          alignment: 'center',
          width: '50%',
        }
      }
    }
   this.pdfObj=pdfMake.createPdf(docDefinition).getBlob(buffer => {
    this.file.resolveDirectoryUrl(this.file.externalRootDirectory)
      .then(dirEntry => {
        this.file.getFile(dirEntry, 'Ambulator.pdf', { create: true })
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
