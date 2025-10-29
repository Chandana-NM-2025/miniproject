// src/main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideHttpClient ,withInterceptors } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { authInterceptor } from './app/interceptors/auth.interceptor';

bootstrapApplication(App, {
  providers: [
    provideRouter(routes),         // routing
    provideHttpClient(withInterceptors([authInterceptor])),          // HttpClient for backend calls
    importProvidersFrom(FormsModule),
    importProvidersFrom(ReactiveFormsModule)
  ]
}).catch(err => console.error(err));
