import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonButton, IonButtons, IonInput, IonItem, IonList, IonImg,
  IonIcon, IonLabel
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { heart } from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    CommonModule, FormsModule,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonButton, IonButtons, IonInput, IonItem, IonList, IonImg,
    IonIcon, IonLabel
  ],
})
export class HomePage implements OnInit {
  movies: any[] = [];
  searchTerm: string = '';
  pageTitle: string = "Today's Trending Movies";
  apiKey: string = '11d6aeff4b8bbf69957e9cc426e0d127';

  constructor(private http: HttpClient, private router: Router) {
    addIcons({ heart });
  }

  ngOnInit() {
    this.loadTrending();
  }

  loadTrending() {
    this.pageTitle = "Today's Trending Movies";
    const url = `https://api.themoviedb.org/3/trending/movie/day?api_key=${this.apiKey}`;
    this.http.get<any>(url).subscribe(data => {
      this.movies = data.results;
    });
  }

  search() {
    if (!this.searchTerm.trim()) {
      this.loadTrending();
      return;
    }
    this.pageTitle = `${this.searchTerm} Movies`;
    const url = `https://api.themoviedb.org/3/search/movie?query=${this.searchTerm}&api_key=${this.apiKey}`;
    this.http.get<any>(url).subscribe(data => {
      this.movies = data.results;
    });
  }

  goToMovieDetails(movie: any) {
    this.router.navigate(['/movie-details'], { state: { movie } });
  }

  goToFavourites() {
    this.router.navigate(['/favourites']);
  }
}