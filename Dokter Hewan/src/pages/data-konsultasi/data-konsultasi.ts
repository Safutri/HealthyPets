import { Component } from '@angular/core';
import {NavController, 
  LoadingController, 
  ToastController, 
  NavParams, 
  AlertController } from "ionic-angular";
import { HttpClient } from '@angular/common/http';
// import { ListKonsultasiPage } from "../list-konsultasi/list-konsultasi";
import { FormRmPage } from "../form-rm/form-rm"; 
import { FileOpener } from '@ionic-native/file-opener';
import { File } from '@ionic-native/file';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { ApiProvider } from '../../providers/api/api';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'page-data-konsultasi',
  templateUrl: 'data-konsultasi.html',
})
export class DataKonsultasiPage {
  idAntrian;  pdfObj=null;
  amb; klien; alamat:string;
  hewan; id_hewan; namaDrh;
  namahewan:String; namaklien:string;
  ras:String; diagnosa:String
  gender:String; obat:String;
  jenis: String; status_awal:String;
  umur:String; terapi:String;
  nama:String; id:any; idDrh;
  telp:String; idAmb; lain_rm:String;
  tgl:any; sinyalmen: any; anamnesa: any; gizi: any; tempramen: any; habitat: any; frek_nafas: any;
  frek_pulsus: any; suhu_tubuh: any; kulit_bulu: any; sedir_mata: any; sedir_hidung: any; sedir_mulut: any;
  sedir_anus: any; k_limfase: any; a_darah: any; a_nafas: any; a_cerna: any; a_kelamin: any; u_saraf: any;
  ang_gerak: any; lain: any; drh_jaga: any; ktp:any;
  no_reg:any; kode_hewan; 
  urlHewan = 'https://healthypets-webservice.appspot.com/_ah/api/hewan/v1/data/';
  urlAmb = 'https://healthypets-webservice.appspot.com/_ah/api/ambulator/v1/ambulator/';
  urlKlien = 'https://healthypets-webservice.appspot.com/_ah/api/klien/v1/klien/search/';
  KlienReg = {
    namaklien: "",
    no_reg:"",
    alamat:"",
    telp:""
  };
  hewanss={
    namahewan:"",
    jenis:"",
    gender:"",
    umur:"",
    ras:""
  }
constructor (public navCtrl: NavController, 
  public navParams: NavParams, 
  public http: HttpClient,
  public loadingCtrl: LoadingController, 
  public toastCtrl: ToastController, 
  public alertCtrl: AlertController,
  private file: File,
  private fileOpener: FileOpener,
  public dataKons: ApiProvider) {
       
        this.idAntrian = navParams.get("idAntrian");
        console.log('id Antrian '+this.idAntrian);
 
        this.no_reg = navParams.get("no_reg");
        console.log('no reg '+this.no_reg);

        this.kode_hewan = navParams.get("kode_hewan");
        console.log('nama hewan '+this.kode_hewan); 

        this.idDrh = navParams.get("idDrh");
        console.log('idDrh '+this.idDrh); 

        this.namaDrh = navParams.get("namaDrh");
        console.log('idDrh '+this.namaDrh); 

        this.idAmb= navParams.get("idAmb");
        console.log('idAmb '+this.idAmb); 


        // this.idAntrian = localStorage.getItem('idAntrian');
        // this.idAmb = localStorage.getItem('idAmb');
        // this.kode_hewan = localStorage.getItem('kode_hewan'); 
        // this.namaDrh = localStorage.getItem('namaLocal');
        // this.no_reg= localStorage.getItem('no_reg'); 
        // this.idDrh = localStorage.getItem('idDrhLocal');    
 
        this.getKlien(this.no_reg); 
        this.getAmb();
        this.getHewan(this.kode_hewan);
         
  }

  ionViewDidLoad() {
    console.log('DataKonsultasiPage');
  }

  getKlien(no_reg){ 
    this.dataKons.getKlienReg(no_reg)
    .then((data)=>{
      this.KlienReg['namaklien'] = data['nama'];
      this.KlienReg['no_reg'] = data['no_reg'];
      this.KlienReg['alamat'] = data['alamat'];
      this.KlienReg['telp'] = data['telp'];
        })
        .catch((err) => {
          console.error('Terjadi kesalahan: '+err);
        })
        .catch(() => {
          console.error('Kembalian kosong!');
        }) 
    // this.http.get(this.urlKlien+this.no_reg).subscribe(
    //   data=> { 
    //     this.klien = data;  
    //       this.no_reg = this.klien.no_reg; 
    //       this.alamat = this.klien.alamat;
    //       this.telp = this.klien.telp;
    //       this.namaklien = this.klien.nama;
    //   },
    //   err => {
    //     console.log(err);
    //   }
    // );
  } 

  getAmb(){ 
    this.http.get(this.urlAmb+this.idAmb).subscribe(
      data=> { 
        this.amb = data; 
          this.tgl = this.amb.tgl;  
           this.anamnesa = this.amb.anamnesa;
          this.sinyalmen = this.amb.sinyalmen;
          this.gizi = this.amb.gizi;
          this.tempramen = this.amb.tempramen;
          this.habitat = this.amb.habitat;
          this.frek_nafas = this.amb.frek_nafas;
          this.frek_pulsus = this.amb.frek_pulsus;
          this.suhu_tubuh = this.amb.suhu_tubuh;
          this.kulit_bulu = this.amb.kulit_bulu;
          this.sedir_mata = this.amb.sedir_mata;
          this.sedir_hidung = this.amb.sedir_hidung;
          this.sedir_mulut = this.amb.sedir_mulut;
          this.sedir_anus = this.amb.sedir_anus;
          this.k_limfase = this.amb.k_limfase;
          this.a_nafas = this.amb.a_nafas;
          this.a_darah = this.amb.a_darah;
          this.a_cerna = this.amb.a_cerna;
          this.a_kelamin = this.amb.a_kelamin;
          this.u_saraf = this.amb.u_saraf;
          this.ang_gerak = this.amb.ang_gerak;
          this.lain = this.amb.lain;
          this.drh_jaga = this.amb.drh_jaga; 
      },
      err => {
        console.log(err);
      }
    );
  } 

  getHewan(kode_hewan){ 
    this.dataKons.getHewans(kode_hewan)
    .then((data)=>{
      this.hewanss['namahewan'] = data['nama'];
      this.hewanss['ras'] = data['ras'];
      this.hewanss['jenis'] = data['jenis'];
      this.hewanss['umur'] = data['umur'];
      this.hewanss['gender'] = data['gender'];

        })
        .catch((err) => {
          console.error('Terjadi kesalahan: '+err);
        })
        .catch(() => {
          console.error('Kembalian kosong!');
        }) 
    // this.http.get("https://healthypets-webservice.appspot.com/_ah/api/hewan/v1/data/"+this.kode_hewan).subscribe(
    //   data=> {  
    //     this.hewan = data;
    //       this.namahewan = this.hewan.nama;  
    //       this.ras = this.hewan.ras;
    //       this.jenis = this.hewan.jenis;
    //       this.umur = this.hewan.umur; 
    //       this.gender = this.hewan.gender;  
    //   },
    //   err => {
    //     console.log(err);
    //   }
    // );
  }  

    isi(){
      this.navCtrl.push(FormRmPage, {
      'no_reg' : this.no_reg,
      'kode_hewan' : this.kode_hewan,
      'idAmb' : this.idAmb,
      'idDrh' : this.idDrh,
      'namaDrh' : this.namaDrh,
      'idAntrian' : this.idAntrian
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
              [ {text: 'Nama', bold: true}, ':', this.hewanss['namahewan'], {text: 'Nama', bold: true}, ':', this.KlienReg['namaklien']],
              [ {text: 'Kode Hewan', bold: true}, ':', this.kode_hewan, {text: 'No. Registrasi', bold: true}, ':', this.no_reg],
              [ {text: 'Jenis', bold: true}, ':', this.hewanss['jenis'], {text: 'Alamat', bold: true}, ':', this.KlienReg['alamat']],
              [ {text: 'Gender', bold: true}, ':', this.hewanss['gender'], {text: 'Telp', bold: true}, ':', this.KlienReg['telp']],
              [ {text: '', margin: [0, 0, 0, 30]}, '','', {text: '', margin: [0, 0, 0, 30]},'','']
            ]
          }
        },  
        
        {text: 'HASIL ANAMNESA' , bold: true, alignment: 'center'},
        {text: this.tgl, alignment: 'center'},

        {
          layout: 'lightHorizontalLines',  
          table: { 
            headerRows: 1,
            widths: [ 'auto', '10%', '*'],
            body: [
              [ '', '', ''],
              [ {text: 'I. ANAMNESA', bold: true}, ':', this.anamnesa],
              [ {text: 'II. STATUS PRESENT', bold: true}, ':', ''],
              [ {text: '1. Keadaan Umum', margin: [10, 1]}, '',''],
                  [ {text: 'Gizi', margin: [30, 1]}, ':', this.gizi,],
                  [ {text: 'Tempramen', margin: [30, 1]}, ':', this.tempramen],
                  [ {text: 'Habitus', margin: [30, 1]}, ':', this.habitat],
              [ {text: '2. Frekuensi Keadaan', margin: [10, 1]}, ':',this.frek_nafas],
                  [ {text: 'Frekuensi Nafas', margin: [30, 1]}, ':',this.frek_nafas],
                  [ {text: 'Frekuensi Pulsus', margin: [30, 1]}, ':', this.frek_pulsus],
                  [ {text: 'Suhu Tubuh', margin: [30, 1]}, ':', this.suhu_tubuh],
              [ {text: '3. Kulit dan Bulu', margin: [10, 1]}, ':',this.kulit_bulu],
              [ {text: '4. Selaput Lendir', margin: [10, 1]}, ':',''],
                  [ {text: 'Mata', margin: [30, 1]}, ':', this.sedir_mata],
                  [ {text: 'Hidung', margin: [30, 1]}, ':', this.sedir_hidung],
                  [ {text: 'Mulut', margin: [30, 1]}, ':', this.sedir_mulut],
                  [ {text: 'Anus', margin: [30, 1]}, ':', this.sedir_anus],
              [ {text: '5. Kelenjar Limfe', margin: [10, 1]}, ':',this.k_limfase],
              [ {text: '6. Alat Pernafasan', margin: [10, 1]}, ':',this.a_nafas], 
              [ {text: '7. Alat Peredaran Darah', margin: [10, 1]}, ':',''],
              [ {text: '8. Alat Pencernaan', margin: [10, 1]}, ':',this.a_cerna],
              [ {text: '9. Alat Kelamin/Perkencingan', margin: [10, 1]}, ':',this.a_kelamin], 
              [ {text: '10. Urat Saraf', margin: [10, 1]}, ':',this.u_saraf], 
              [ {text: '11. Anggota Gerak', margin: [10, 1]}, ':',this.ang_gerak],  
              [ {text: '12. Lain-lain', margin: [10, 1]}, ':',this.lain]                    
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
    // this.pdfObj = pdfMake.createPdf(docDefinition);
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