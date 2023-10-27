// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class ToastService {

//   constructor() { }
// }


import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastController: ToastController) { }

  /**
   * En base a los parametros pasados, muestra un toast (alert) al usuario.
   * @param mensaje Primer parametro string
   * @param color Segundo parametro string
   * @param icono Tercer parametro 
   * @returns Promise<void>
   */
  async showToast(mensaje: string, color: string, icono: string): Promise<void> {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 5000,
      position: 'top',
      color: color,
      icon: icono,
    });
    toast.present();
  }
}
