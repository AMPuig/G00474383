import { Routes } from '@angular/router';

// App routes routes for lazy loading of components and navigation
export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home', // Redirect to home by default
    pathMatch: 'full',
  },
  {
    path: 'movie-details',
    loadComponent: () => import('./movie-details/movie-details.page').then( m => m.MovieDetailsPage)
  },
  {
    path: 'details',
    loadComponent: () => import('./details/details.page').then( m => m.DetailsPage)
  },
  {
    path: 'favourites',
    loadComponent: () => import('./favourites/favourites.page').then( m => m.FavouritesPage)
  },
];
