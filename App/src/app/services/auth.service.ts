// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {

//   constructor() { }
// }

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from '@angular/fire/auth';
import firebase from 'firebase/compat/app';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private ngFireAuth: AngularFireAuth) { }

  /**
   * Login con email y password para firebase.
   * @param email Primer parametro string
   * @param password Segundo parametro string
   * @returns Promise<any>
   */
  async loginEmailPassword(email: string, password: string): Promise<any> {
    try {
      const userCredential = await this.ngFireAuth.signInWithEmailAndPassword(email, password);
      return userCredential.user;
    } catch (error) {
      console.log('Error al iniciar sesión: ', error);
    }
  }

  /**
   * Pide un email de reset de password para el email del parametro
   * @param email Primer parametro string
   * @returns Promise<void>
   */
  async passwordReset(email: string): Promise<void> {
    try {
      return this.ngFireAuth.sendPasswordResetEmail(email);
    } catch (error) {
      console.log('Error al resetear contraseña: ', error);
    }
  }

  /**
   * intenta crear usuario con email y password, si lo hace envia email de verificacion.
   * @param email primer parametro string
   * @param password segundo parametro string
   * @returns promise<any>
   */  
  async createUser(email: string, password: string): Promise<any> {
    try {
      this.endSession();

      const { user } = await this.ngFireAuth.createUserWithEmailAndPassword(email, password);
      
      if(user){
        this.loginEmailPassword(email, password);
        await this.sendVerification();
      }
      
      return user;
    } catch (error) {
      console.log('Error al registrase: ', error);
    }
  }

  /**
   * Intenta iniciar sesion con una cuenta de google.
   * @returns Promise<any>
   */
  async googleLogin(): Promise<any> {
    try {
      this.endSession();

      const { user } = await this.ngFireAuth.signInWithPopup(new GoogleAuthProvider());
      return user;
    } catch (error) {
      console.log('Error al iniciar sesión: ', error);
    }
  }

  /**
   * Envia un email de verifiacion de cuenta, al usuario logeado.
   * @returns Promise<void>
   */
  async sendVerification(): Promise<void> {
    try {
      return (await this.ngFireAuth.currentUser)?.sendEmailVerification();
    } catch (error) {
      console.log('Error al enviar verificación: ', error);
    }
  }

  /**
   * Averigua si el email, del usuario logeado, esta verificado o no.
   * @returns Promise<boolean>
   */
  async emailVerified(): Promise<boolean> {
    try {
      const currentUser = await this.ngFireAuth.currentUser;
      return currentUser?.emailVerified === true;
    } catch (error) {
      console.log('Error de verificación de: ', error);
      return false;
    }
  }

  /**
   * No esta en uso.
   * Obtiene toda la informacion del usuario logeado actualmente.
   * @returns Promise<firebase.User | null>
   */
  async getCurrentUser(): Promise<firebase.User | null>{
    return await this.ngFireAuth.currentUser;
  }

  /**
   * Cierra sesion del usuario logeado.
   * @returns Promise<void>
   */
  async endSession(): Promise<void> {
    try {
      await this.ngFireAuth.signOut();
    } catch (error) {
      console.log('Error al cerrar sesión: ', error);
    }
  }
}
