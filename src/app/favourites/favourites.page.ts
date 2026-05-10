import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import {
  IonContent, IonHeader, IonTitle, IonToolbar,
  IonButton, IonButtons, IonIcon, IonImg, IonLabel, IonItem, IonList
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { home } from 'ionicons/icons';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  styleUrls: ['./favourites.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent, IonHeader, IonTitle, IonToolbar,
    IonButton, IonButtons, IonIcon, IonImg, IonLabel, IonItem, IonList
  ]
})
export class FavouritesPage implements OnInit {
  favourites: any[] = [];

  constructor(private storage: Storage, private router: Router) {
    addIcons({ home });
  }

  async ngOnInit() {
    await this.storage.create();
    this.favourites = await this.storage.get('favourites') || [];
  }

  goToMovieDetails(movie: any) {
    this.router.navigate(['/movie-details'], { state: { movie } });
  }

  goToHome() {
    this.router.navigate(['/home']);
  }
}
