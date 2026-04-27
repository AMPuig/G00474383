import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import {
  IonContent, IonHeader, IonTitle, IonToolbar,
  IonButton, IonButtons, IonIcon, IonImg, IonLabel, IonItem, IonList
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { home, heart } from 'ionicons/icons';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent, IonHeader, IonTitle, IonToolbar,
    IonButton, IonButtons, IonIcon, IonImg, IonLabel, IonItem, IonList
  ]
})
export class MovieDetailsPage implements OnInit {
  movie: any;
  cast: any[] = [];
  crew: any[] = [];
  isFavourite: boolean = false;
  apiKey: string = '11d6aeff4b8bbf69957e9cc426e0d127';

  constructor(private http: HttpClient, private router: Router, private storage: Storage) {
    addIcons({ home, heart });
  }

  async ngOnInit() {
    await this.storage.create();
    this.movie = history.state.movie;
    if (this.movie) {
      this.loadCredits();
      this.checkFavourite();
    }
  }

  loadCredits() {
    const url = `https://api.themoviedb.org/3/movie/${this.movie.id}/credits?api_key=${this.apiKey}`;
    this.http.get<any>(url).subscribe(data => {
      this.cast = data.cast;
      this.crew = data.crew;
    });
  }

  async checkFavourite() {
    const favourites = await this.storage.get('favourites') || [];
    this.isFavourite = favourites.some((f: any) => f.id === this.movie.id);
  }

  async toggleFavourite() {
    let favourites = await this.storage.get('favourites') || [];
    if (this.isFavourite) {
      favourites = favourites.filter((f: any) => f.id !== this.movie.id);
    } else {
      favourites.push(this.movie);
    }
    await this.storage.set('favourites', favourites);
    this.isFavourite = !this.isFavourite;
  }

  goToPerson(person: any) {
    this.router.navigate(['/details'], { state: { person } });
  }

  goToHome() {
    this.router.navigate(['/home']);
  }

  goToFavourites() {
    this.router.navigate(['/favourites']);
  }
}