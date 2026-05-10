import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { provideHttpClient } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage-angular';
import { importProvidersFrom } from '@angular/core';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

// Bootstrap the Angular application with the AppComponent and necessary providers
bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },  // Use Ionic's route reuse strategy for better performance
    provideIonicAngular(),  // Ionic setup for Angular
    provideRouter(routes, withPreloading(PreloadAllModules)), // App routes with preloading of all modules for faster navigation
    provideHttpClient(), //  HTTP client for API calls
    importProvidersFrom(IonicStorageModule.forRoot()),  // Storage for favourites
  ],
});
