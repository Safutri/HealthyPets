import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { TambahLabPage } from '../tambah-lab/tambah-lab';

import { FileOpener } from '@ionic-native/file-opener';
import { File } from '@ionic-native/file';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { APIProvider } from '../../providers/api/api';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
 
@Component({
  selector: 'page-form-ambulator',
  templateUrl: 'form-ambulator.html',
})
export class FormAmbulatorPage {
  idAmb: any; 
  amb: any;
  tgl: any;
  sinyalmen: String;
  anamnesa: String;
  gizi: String; 
  tempramen: String;
  habitat: String;
  frek_nafas: String;
  frek_pulsus: String;
  suhu_tubuh: String;
  kulit_bulu: String;
  sedir_mata: String;
  sedir_hidung: String;
  sedir_mulut: String;
  sedir_anus: String;
  k_limfase: String; 
  a_darah: String;
  a_nafas: String;
  a_cerna: String;
  a_kelamin: String;
  u_saraf: String;
  ang_gerak: String;
  lain: String;
  drh_jaga: String;
  idHewan: any;
  idResepsionis; hewan; 
  nama:string; umur:string; gender:string
  ras:string; jenis:string; 
  idUser; users;
  namahewan:string; no_reg:string; alamat:string;
  telp:string; email:string; ktp:string;
  datas = {
  nama: "",
  umur: "",
  gender: "",
  ras: "",
  jenis:"",
  kode_hewan:""
};
  kode_hewan:string;
  pdfObj=null;
  datam = {
    namaklien:"",
    no_reg: "",
    alamat:"",
    telp:"",
    email:"",
    ktp:"" 
  }  
  ambs = {
    tgl:"",
    anamnesa:"",
    sinyalmen:"",
    gizi:"",
    tempramen:"",
    habitat:"",
    frek_nafas:"",
    frek_pulsus:"",
    suhu_tubuh:"",
    kulit_bulu:"",
    sedir_anus:"",
    sedir_hidung:"",
    sedir_mata:"",
    sedir_mulut:"",
    k_limfase:"",
    a_cerna:"",
    a_darah:"",
    a_kelamin:"",
    a_nafas:"",
    ang_gerak:"",
    u_saraf:"",
    lain:"",
    drh_jaga:""

  }

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public http: HttpClient, 
    private file: File,
    private fileOpener: FileOpener,
    public alertCtrl: AlertController,
    public Amb: APIProvider) {
      
    this.idAmb = navParams.get("id");
    console.log('id Ambulator '+this.idAmb);

    this.idHewan = navParams.get("idHewan");
        console.log('id Hewan '+this.idHewan);

   this.idResepsionis = localStorage.getItem('idResepsionisLocal'); 

    this.idUser = navParams.get("idUser");
        console.log('idUser '+this.idUser);

        this.getHewan(this.idHewan);
        this.getUser(this.idUser);
        this.getAmb(this.idAmb);

    }

  ionViewDidLoad() {
    console.log('FormAmbulatorPage');
  }

  getUser(idUser){ 
    this.Amb.getUpdateKlien(idUser)
      .then((data)=>{             
        this.datam['namaklien'] = data['nama'];
        this.datam['no_reg'] = data['no_reg'];
        this.datam['alamat'] = data['alamat'];
        this.datam['telp'] = data['telp'];
        this.datam['email'] = data['email'];
        this.datam['ktp'] = data['ktp'];
         })
            .catch((err) => {
              console.error('Terjadi kesalahan: '+err);
          })
          .catch(() => {
         console.error('data tidak ada di datastore!');
    })  
  } 

  getHewan(idHewan){
    this.Amb.getHewanById(idHewan)
        .then((data)=>{             
          this.datas['idHewan'] = data['id'];   
          this.datas['nama'] = data['nama'];
          this.datas['umur'] = data['umur'];
          this.datas['gender'] = data['gender'];
          this.datas['ras'] = data['ras'];
          this.datas['jenis'] = data['jenis'];
          this.datas['kode_hewan'] = data['kode_hewan'];
            })
            .catch((err) => {
              console.error('Terjadi kesalahan: '+err);
            })
            .catch(() => {
              console.error('data tidak ada di datastore!');
            })  
  }

  getAmb(idAmb){ 
      this.Amb.getAmbById(idAmb)
      .then((data)=>{             
        this.ambs['idAmb'] = data['idAmb'];   
        this.ambs['tgl'] = data['tgl'];
        this.ambs['anamnesa'] = data['anamnesa'];
        this.ambs['sinyalmen'] = data['sinyalmen'];
        this.ambs['gizi'] = data['gizi'];
        this.ambs['tempramen'] = data['tempramen'];
        this.ambs['habitat'] = data['habitat'];
        this.ambs['frek_nafas'] = data['frek_nafas'];
        this.ambs['frek_pulsus'] = data['frek_pulsus'];
        this.ambs['suhu_tubuh'] = data['suhu_tubuh'];
        this.ambs['kulit_bulu'] = data['kulit_bulu'];
        this.ambs['sedir_mata'] = data['sedir_mata'];
        this.ambs['sedir_hidung'] = data['sedir_hidung'];
        this.ambs['sedir_mulut'] = data['sedir_mulut'];
        this.ambs['sedir_anus'] = data['sedir_anus'];
        this.ambs['k_limfase'] = data['k_limfase'];
        this.ambs['a_nafas'] = data['a_nafas'];
        this.ambs['a_darah'] = data['a_darah'];
        this.ambs['a_cerna'] = data['a_cerna'];
        this.ambs['a_kelamin'] = data['a_kelamin'];
        this.ambs['u_saraf'] = data['u_saraf'];
        this.ambs['ang_gerak'] = data['ang_gerak'];
        this.ambs['lain'] = data['lain'];
        this.ambs['drh_jaga'] = data['drh_jaga'];
          })
          .catch((err) => {
            console.error('Terjadi kesalahan: '+err);
          })
          .catch(() => {
            console.error('data tidak ada di datastore!');
          })   
  } 
 
  hasil(){
    this.navCtrl.push(TambahLabPage, {
          "idHewan": this.idHewan,
          "idResepsionis": this.idResepsionis, 
          "idAmb": this.idAmb
        });
        console.log("idAmb send "+ this.idAmb);   
  }

  createPdf(){
    var docDefinition = {
      content: [
        { text: new Date().toTimeString(), alignment: 'right', margin: [10, 0, 0, 40]},  
 
        {
          layout: 'lightHorizontalLines',  
          table: { 
            widths: [ 'auto', '10%', '*', 'auto', '10%', '*' ],
            body: [ 
              [ {text: 'Nama', bold: true}, ':',  this.datas['nama'], {text: 'Nama', bold: true}, ':', this.datam['namaklien']],
              [ {text: 'Kode Hewan', bold: true}, ':',  this.datas['kode_hewan'], {text: 'No. Registrasi', bold: true}, ':', this.datam['no_reg']],
              [ {text: 'Jenis', bold: true}, ':',  this.datas['jenis'], {text: 'Alamat', bold: true}, ':', this.datam['alamat']],
              [ {text: 'Gender', bold: true}, ':',  this.datas['gender'], {text: 'Telp', bold: true}, ':', this.datam['telp']],
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
              [ {text: 'I. ANAMNESA', bold: true}, ':', this.ambs['anamnesa']],
              [ {text: 'II. STATUS PRESENT', bold: true}, ':', ''],
              [ {text: '1. Keadaan Umum', margin: [10, 1]}, '',''],
                  [ {text: 'Gizi', margin: [30, 1]}, ':', this.ambs['gizi'],],
                  [ {text: 'Tempramen', margin: [30, 1]}, ':', this.ambs['tempramen']],
                  [ {text: 'Habitus', margin: [30, 1]}, ':', this.ambs['habitat']],
              [ {text: '2. Frekuensi Keadaan', margin: [10, 1]}, ':',''],
                  [ {text: 'Frekuensi Nafas', margin: [30, 1]}, ':', this.ambs['frek_nafas']],
                  [ {text: 'Frekuensi Pulsus', margin: [30, 1]}, ':',  this.ambs['frek_pulsus']],
                  [ {text: 'Suhu Tubuh', margin: [30, 1]}, ':', this.ambs['suhu_tubuh']],
              [ {text: '3. Kulit dan Bulu', margin: [10, 1]}, ':',this.ambs['kulit_bulu']],
              [ {text: '4. Selaput Lendir', margin: [10, 1]}, ':',''],
                  [ {text: 'Mata', margin: [30, 1]}, ':', this.ambs['sedir_mata']],
                  [ {text: 'Hidung', margin: [30, 1]}, ':', this.ambs['sedir_hidung']],
                  [ {text: 'Mulut', margin: [30, 1]}, ':', this.ambs['sedir_mulut']],
                  [ {text: 'Anus', margin: [30, 1]}, ':', this.ambs['sedir_anus']],
              [ {text: '5. Kelenjar Limfe', margin: [10, 1]}, ':',this.ambs['k_limfase']],
              [ {text: '6. Alat Pernafasan', margin: [10, 1]}, ':',this.ambs['a_nafas']], 
              [ {text: '7. Alat Peredaran Darah', margin: [10, 1]}, ':',this.ambs['a_darah']],
              [ {text: '8. Alat Pencernaan', margin: [10, 1]}, ':',this.ambs['a_cerna']],
              [ {text: '9. Alat Kelamin/Perkencingan', margin: [10, 1]}, ':',this.ambs['a_kelamin']], 
              [ {text: '10. Urat Saraf', margin: [10, 1]}, ':',this.ambs['u_saraf']], 
              [ {text: '11. Anggota Gerak', margin: [10, 1]}, ':',this.ambs['ang_gerak']],  
              [ {text: '12. Lain-lain', margin: [10, 1]}, ':',this.ambs['lain']]                    
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
