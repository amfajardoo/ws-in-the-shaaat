import { Component, inject } from '@angular/core';
import { Firebase } from '../../services/firebase';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export default class Home {
  firebase = inject(Firebase);

  logout() {
    this.firebase.logout();
  }
}
