import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.page.html',
  styleUrls: ['./email-verification.page.scss'],
})
export class EmailVerificationPage implements OnInit {
  emailVerified!: boolean;
  emailResent: boolean = false;

  constructor(private authService: AuthService, private toastService: ToastService) { }

  ngOnInit() {
    this.checkEmailVerification();
  }

  /**
   * Checkea verificacion de email del usuario logeado, lo guarda en emailVerified.
   * @returns void
   */
  checkEmailVerification(): void {
    this.authService.emailVerified().then((answer) => {this.emailVerified = answer});
  }

  /**
   * Reenvia email de verificacion al usuario logeado.
   * @returns promise<void>
   */
  async resendEmail(): Promise<void> {
    try {
      await this.authService.sendVerification();

      this.emailResent = true;

      await this.toastService.showToast('Email reenviado correctamente.', 'green', 'warning');
    } catch (error) {
      console.log('Error al reenviar verificación: ', error);
      await this.toastService.showToast('Error al reenviar el email.', 'danger', 'warning');
    }
  }
}