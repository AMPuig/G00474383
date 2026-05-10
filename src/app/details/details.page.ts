import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {
  IonContent, IonHeader, IonTitle, IonToolbar,
  IonButton, IonButtons, IonIcon, IonImg
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { home, heart } from 'ionicons/icons';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent, IonHeader, IonTitle, IonToolbar,
    IonButton, IonButtons, IonIcon, IonImg
  ]
})
export class DetailsPage implements OnInit {
  person: any;  // Cast data passed from home page
  movies: any[] = []; // Movies the person appears in
  apiKey: string = '11d6aeff4b8bbf69957e9cc426e0d127'; // TMDb API key

  constructor(private http: HttpClient, private router: Router) {
    addIcons({ home, heart }); // Add home and heart icons to IonIcon
  }

  ngOnInit() {
    this.person = history.state.person; // Get person data from navigation state
    if (this.person) {
      this.loadPersonDetails(); // Load  person data
      this.loadMovieCredits();  // Load movies the person appears in
    }
  }

    // Fetch  cast details from TMDb API
  loadPersonDetails() {
    const url = `https://api.themoviedb.org/3/person/${this.person.id}?api_key=${this.apiKey}`;
    this.http.get<any>(url).subscribe(data => {
      this.person = data;
    });
  }

  // Fetch movies the person appears in from TMDb API
  loadMovieCredits() {
    const url = `https://api.themoviedb.org/3/person/${this.person.id}/movie_credits?api_key=${this.apiKey}`;
    this.http.get<any>(url).subscribe(data => {
      this.movies = data.cast;
    });
  }

  // Navigate to movie details page with selected movie data
  goToMovieDetails(movie: any) {
    this.router.navigate(['/movie-details'], { state: { movie } });
  }

  // Navigate to Home page
  goToHome() {
    this.router.navigate(['/home']);
  }

  //  Navigate to Favourites page
  goToFavourites() {
    this.router.navigate(['/favourites']);
  }
}
