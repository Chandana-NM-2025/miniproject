// src/main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

bootstrapApplication(App, {
  providers: [
    provideRouter(routes),         // routing
    provideHttpClient(),           // HttpClient for backend calls
    importProvidersFrom(FormsModule),
    importProvidersFrom(ReactiveFormsModule)
  ]
}).catch(err => console.error(err));
