import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { NavController, AlertController } from '@ionic/angular';
import { TikectsService } from '../service/tikects.service';
import { Printer, PrintOptions } from '@ionic-native/printer/ngx';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  tikects: any[] = [];
  exito:any;
  error:any;
  constructor(
    public alertCtrl: AlertController,
    public tikect: TikectsService,
    private toas:ToastController,
    private printer: Printer
  ) {}
  async presentToast() {
    const toast = await this.toas.create({
      message: 'Recibo Generado .',
      duration: 2000
    });
    toast.present();
  }
  async presentToas2() {
    const toast = await this.toas.create({
      message: 'Error al generar el recibo Generado .',
      duration: 2000
    });
    toast.present();
  }
  get_data(tipo: any,precio: any,numero: any,imprimir:any){
    this.tikect.insert(tipo,precio,numero).then(rs => {
      if(rs){
        if(imprimir==1){
            let content ='<style type="text/css">.contenedor{position:relative;width:5.3cm;height:auto;font-family:sans-serif;overflow:auto;}.encabezado{position:relative;width:auto;height:auto;left:0cm;top:0cm;padding-top:0cm;text-align:center;font-size:14px;overflow:auto;}.numTicket{position:relative;width:auto;height:auto;left:0cm;top:0cm;text-align:center;font-family:sans-serif;font-size:14px;overflow:auto;}.detalles{position:relative;width:auto;height:auto;left:0cm;top:0cm;padding-left:0cm;padding-right:0cm;overflow:auto;}</style>';
            content += '<div class="contenedor"><div class="encabezado">Alcaldia Demo<br>Tel.: (503) 2222-2222<br/></div>';  
            content += 'Numero: <p style="font-size:36px;margin:0px;"><strong>'+numero+'</strong></p>';
            content += 'Monto: <p style="font-size:36px;margin:0px;"><strong>'+precio+'</strong></p>';
            content += 'Tipo: <p style="font-size:36px;margin:0px;"><strong>'+tipo+'</strong></p>';
            content += '</div>';
            this.printer.isAvailable().then(this.exito, this.error);

            let options: PrintOptions = {
                name: 'Imprimir Ticket',
                printerId: 'printer00'+numero,
                duplex: true,
                landscape: true,
                grayscale: true
              }
            
            this.printer.print(content, options).then(this.exito, this.error);
            console.log(this.exito);
        }
        this.presentToast();
      }else{
        this.presentToas2();
      }
    });
  }
  
}
