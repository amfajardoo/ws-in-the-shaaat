import { Component, inject } from '@angular/core';
import { Firebase } from '../../services/firebase';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.css',
  host: {
    class: 'bg-gray-100 flex items-center justify-center min-h-screen',
  },
})
export default class Login {
  private firebase = inject(Firebase);

  loginWithGoogle() {
    this.firebase.loginWithGoogle();
  }
}
