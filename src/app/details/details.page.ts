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
  person: any;
  movies: any[] = [];
  apiKey: string = '11d6aeff4b8bbf69957e9cc426e0d127';

  constructor(private http: HttpClient, private router: Router) {
    addIcons({ home, heart });
  }

  ngOnInit() {
    this.person = history.state.person;
    if (this.person) {
      this.loadPersonDetails();
      this.loadMovieCredits();
    }
  }

  loadPersonDetails() {
    const url = `https://api.themoviedb.org/3/person/${this.person.id}?api_key=${this.apiKey}`;
    this.http.get<any>(url).subscribe(data => {
      this.person = data;
    });
  }

  loadMovieCredits() {
    const url = `https://api.themoviedb.org/3/person/${this.person.id}/movie_credits?api_key=${this.apiKey}`;
    this.http.get<any>(url).subscribe(data => {
      this.movies = data.cast;
    });
  }

  goToMovieDetails(movie: any) {
    this.router.navigate(['/movie-details'], { state: { movie } });
  }

  goToHome() {
    this.router.navigate(['/home']);
  }

  goToFavourites() {
    this.router.navigate(['/favourites']);
  }
}