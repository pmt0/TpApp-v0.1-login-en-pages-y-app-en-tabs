import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/authentication.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  // loginForm : FormGroup

   loginForm = this.formBuilder.group({
     email: ['', [Validators.required, Validators.email]],
     password: ['', [Validators.required, Validators.minLength(8)]]
   });

  constructor(
    // private toastController: ToastController, 
    // private alertController: AlertController,    
    private authService: AuthService, 
    private router: Router,
    private loadingController: LoadingController,
    public formBuilder: FormBuilder, 
    public loadingCtrl: LoadingController, 
    private toastService: ToastService
 ) { }

 ngOnInit() {
  // this.loginForm = this.formBuilder.group({   
  //   email:['',[
  //     Validators.required,
  //     Validators.email,
  //     Validators.pattern("[a-z0-9._%+\-]+\.[a-z]{2,}$")]],        
      
  //   password: ['',
  //     Validators.required,
  //     Validators.pattern("(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}")]
  // })
}


//   get errorControl(){
//     return this.loginForm?.controls;
//   }  

//   async login(){
//     const loading = await this.loadingController.create();
//     await loading.present();
//     // console.log(this.email + this.password);
//     if (this.loginForm.valid){         //if(this.loginForm?.valid){ 
//       if(this.loginForm?.valid){
//         const user = await this.authService.loginUser(this.loginForm.value.email,this.loginForm.value.password).catch((error) =>{
//         console.log(error)
//         loading.dismiss();
//       })

//         if(user){
//           loading.dismiss()
//           this.router.navigate(['/home'])
//         }else{
//           return console.log('valores incorrectos')
//         }
//       }    
//   } 
// }

/**
   * inicia sesion con email y password ingresados.
   * @param event Primer parametro Event
   * @returns Promise<void>
   */
async emailLogin(event: Event): Promise<void>{
  event.preventDefault();

  if(this.loginForm.valid){
    try{
      let email = this.loginForm.value.email as string;
      let password = this.loginForm.value.password as string;

      const loggedUser = await this.authService.loginEmailPassword(email, password);
      if(loggedUser){
        const isVerified: boolean = await this.authService.emailVerified();
        this.redirectUser(isVerified);
        await this.toastService.showToast(
          'Bienvenid@', 
          'green', 
          'checkmark');
      } else {
        await this.toastService.showToast(
          'Datos incorrectos', 
          'red', 
          'warning');
      }      
    } catch (error){
      console.log('Error al iniciar sesión: ', error);
      await this.toastService.showToast(
        'Error al iniciar sesion, intente nuevamente.', 
        'red', 
        'warning');
    }    
  } else{
    await this.toastService.showToast(
      'Informacion incorrecta, revise los datos y vuelva a intentar.',
      'red', 
      'warning');
  }
}

async googleLogin(): Promise<void>{
  try{
    const loggedUser: any = await this.authService.googleLogin();

    if(loggedUser){
      const isVerified = await this.authService.emailVerified();
      this.redirectUser(isVerified);
      await this.toastService.showToast(
        'Bienvenid@',
        'green',
        'checkmark')      
    } 
    else{
      await this.toastService.showToast(
        'Error al iniciar sesion, intente nuevamente.',
        'red',
        'warning');
    }  
  }catch(error){
    console.log('Error al iniciar sesión: ', error);
    await this.toastService.showToast(
      'Informacion incorrecta, revise los datos y vuelva a intentar.',
      'red',
      'warning');
  }
}

private redirectUser(isVerified: boolean): void {
  if (isVerified) {
     this.router.navigate(['home']);
   } else {
     this.router.navigate(['verificar-email']);   // checkear la pagina verificar email
   }
 }


// async presentToast(message: undefined){
//   console.log(message);

//   const toast = await this.toastController.create({
//     message: message,
//     duration: 1500,
//     position: 'top'
//   });

//   await toast.present();

}

