import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
// import { loadavg } from 'os';
import { AuthenticationService } from 'src/app/authentication.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

  regForm: FormGroup;

  constructor(
  public formBuilder: FormBuilder, 
  public loadingCtrl: LoadingController, 
  public authService: AuthenticationService,
  public router: Router) {  }

  ngOnInit() {
    this.regForm = this.formBuilder.group({   
      fullname: ['',[
        Validators.required]],

      email:['',[
        Validators.required,
        Validators.email,
        Validators.pattern("[a-z0-9._%+\-]+@[a-z0-9.\-]\.[a-z]{2,}$")]],        
        
      password: ['',
        Validators.required,
        Validators.pattern("(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}")]

    })
  }

  get errorControl(){
    return this.regForm?.controls;
  }

  async signUp(){
    const loading = await this.loadingCtrl.create();
    await loading.present();
    if(this.regForm?.valid){
      const user = await 
      this.authService.registerUser(this.regForm.value.email,this.regForm.value.password).catch((error) =>
      console.log(error))
      loading.dismiss();

      if(user){
        loading.dismiss()
        this.router.navigate(['/home'])
      }else{
        console.log('valores incorrectos')
      }


    }


  }
}
