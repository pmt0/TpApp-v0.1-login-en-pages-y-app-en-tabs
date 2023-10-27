import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
// import { error, log } from 'console';
import { AuthenticationService } from 'src/app/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(public router:Router, public authService:AuthenticationService) { }
  user= this.authService.getProfile()
  ngOnInit() {
  }

  async logout(){
    this.authService.singOut().then(()=>{
     this.router.navigate(['/landing'])
    }).catch((error)=>{
      console.log(error)
    })
  }
  

}
