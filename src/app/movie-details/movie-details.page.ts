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
  movie: any; // Movie data passed from home page
  cast: any[] = []; // Array to hold cast data
  crew: any[] = []; // Array to hold crew data
  isFavourite: boolean = false; // If movie is in favourites
  apiKey: string = '11d6aeff4b8bbf69957e9cc426e0d127'; // TMDb API key

  constructor(private http: HttpClient, private router: Router, private storage: Storage) {
    addIcons({ home, heart }); // Add home and heart icons to IonIcon
  }

  async ngOnInit() {
    await this.storage.create();  // Initialize Ionic Storage
    this.movie = history.state.movie; // Get movie data from navigation state
    if (this.movie) {
      this.loadCredits(); // Load cast and crew data
      this.checkFavourite();  // Check if movie is in favourites
    }
  }

  // Fetch cast and crew data from TMDb API
  loadCredits() {
    const url = `https://api.themoviedb.org/3/movie/${this.movie.id}/credits?api_key=${this.apiKey}`;
    this.http.get<any>(url).subscribe(data => {
      this.cast = data.cast;
      this.crew = data.crew;
    });
  }

  //  Check if the current movie is in the favourites list
  async checkFavourite() {
    const favourites = await this.storage.get('favourites') || [];
    this.isFavourite = favourites.some((f: any) => f.id === this.movie.id);
  }

  //  Add or remove the current movie from the favourites list in Ionic Storage
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

  // Navigate to person details page with selected person data
  goToPerson(person: any) {
    this.router.navigate(['/details'], { state: { person } });
  }

  // Navigate back to home page
  goToHome() {
    this.router.navigate(['/home']);
  }

  // Navigate to favourites page
  goToFavourites() {
    this.router.navigate(['/favourites']);
  }
}
