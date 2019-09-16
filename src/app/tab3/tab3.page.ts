import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { NavController, AlertController } from '@ionic/angular';
import { TikectsService } from '../service/tikects.service';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(
    public tikect:TikectsService,
    private toas:ToastController,
    private alert:AlertController
  ) {}
  async presentToas2() {
    const toast = await this.toas.create({
      message: 'Error al generar el recibo Generado .',
      duration: 2000
    });
    toast.present();
  }
  subir_historial(){
    this.presentToas2();
  }
  async presentToast(text) {
    const toast = await this.toas.create({
      message: text,
      duration: 2000
    });
    toast.present();
  }
  async eliminar_historial() {
    const toast = await this.alert.create({
      header: '¿Estas seguro?',
      message: 'Se procedera a eliminar los recibos generados',
      buttons: [
        {
          text: 'Si, Eliminar',
          handler: () => {
            this.tikect.eliminar_historial().then(rs => {
              if(rs){
                this.presentToast("Borrado de recibos completado.");
              }else{
                this.presentToast("Ha ocurrido un Error favor intentelo mas tarde, Verifique su conexion a internet.");
              }
            });  
          }
        }, {
          text: 'No, Cancelar',
          role: 'cancel',
          handler: () => {
            this.presentToast("Cancelando");
          }
        }
      ]
    });
    toast.present();
  }
  async presentToastWithOptions() {
    const toast = await this.alert.create({
      header: '¿Estas seguro?',
      message: 'Esta por subir la informacion al sistema',
      buttons: [
        {
          text: 'Si, Subir',
          handler: () => {
            this.tikect.subir_informacion().then(rs => {
              if(rs){
                this.presentToast("Sincronizacion exitosa");
                this.eliminar_historial();
              }else{
                this.presentToast("Ha ocurrido un Error favor intentelo mas tarde, Verifique su conexion a internet.");
              }
            });  
          }
        }, {
          text: 'No, Cancelar',
          role: 'cancel',
          handler: () => {
            this.presentToast("Cancelando");
          }
        }
      ]
    });
    toast.present();
  }

}
