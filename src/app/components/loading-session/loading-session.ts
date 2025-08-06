import { Component } from '@angular/core';

@Component({
  selector: 'app-loading-session',
  imports: [],
  templateUrl: './loading-session.html',
  styleUrl: './loading-session.css',
  host: {
    class:
      'min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white',
  },
})
export class LoadingSession {}
