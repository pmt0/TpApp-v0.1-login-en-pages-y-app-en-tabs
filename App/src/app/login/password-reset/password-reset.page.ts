import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.page.html',
  styleUrls: ['./password-reset.page.scss'],
})
export class PasswordResetPage implements OnInit {
email:any
  constructor(public route:Router, public authService:AuthenticationService) { }

  ngOnInit() {
  }


  async resetPassword(){
    this.authService.resetPassword(this.email).then(()=>
    this.route.navigate(['/login'])
    ).catch((error)=>
      console.log(error))
    
  }
}
