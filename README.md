# Angular - 1.1 Handle API Exceptions Globally - POC

## Project Metadata
- Repository: https://github.com/neutral-00/poc-angular
- branch:  1-1-handle-api-exception-globally

## Learning Objective
1. [x] Handle API Exceptions Globally

## Pre-requisites
- Setup project as in https://github.com/neutral-00/poc-angular main branch

**INFO**
> The project is created with angular cli 21.x
> Tailwind CSS was also added while creating the project


## Initial Project Structure
```
src
├── app
│   ├── app.config.ts
│   ├── app.css
│   ├── app.html
│   ├── app.routes.ts
│   ├── app.spec.ts
│   ├── app.ts
│   └── component
│       └── home
│           ├── home.css
│           ├── home.html
│           ├── home.spec.ts
│           └── home.ts
├── index.html
├── main.ts
└── styles.css

```

## Completed Tutorial - Standalone Angular 21+ with Tailwind

## High Level Plan

1. **Create API Service** (standalone): `ng g service services/api`
2. **Create Demo Component**: `ng g component component/demo-api`
3. **Add HTTP Client & Interceptor** to `app.config.ts`
4. **Update Routes** in `app.routes.ts`
5. **Test Global Error Handling**

## Step-by-Step Implementation

### 1. Generate API Service
```bash
ng g service services/api
```

**`src/app/services/api.service.ts`**:
```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class Api {
  private baseUrl = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient) {}

  getPosts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/posts`);
  }

  getInvalid(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/invalid-endpoint`);
  }
}
```

### 2. Create Functional Interceptor
run  `ng g interceptor interceoptor/api-error --skip-tests`
**`src/app/interceptors/api-error.interceptor.ts`**:
```typescript
import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const apiErrorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      console.error('Global API Error:', error.status, error.message);
      alert(`API Error ${error.status}: ${error.message}`);
      return throwError(() => error);
    })
  );
};
```

### 3. Generate Demo Component
```bash
ng g component component/demo-api --skip-tests
```

**`src/app/component/demo-api/demo-api.ts`**:
```typescript
import { CommonModule } from '@angular/common';
import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { Api } from '../../service/api';

@Component({
  selector: 'app-demo-api',
  imports: [CommonModule],
  templateUrl: './demo-api.html',
  styleUrl: './demo-api.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DemoApi {
  response = signal<any>(null);
  loading = signal(false);

  constructor(private apiService: Api) {}

  callValidApi() {
    this.loading.set(true);
    this.response.set(null);
    this.apiService.getPosts().subscribe({
      next: (data) => {
        this.response.set(data.slice(0, 3)); // First 3 posts
        this.loading.set(false);
      },
      error: (err) => this.loading.set(false)
    });
  }

  callInvalidApi() {
    this.loading.set(true);
    this.response.set(null);
    this.apiService.getInvalid().subscribe({
      next: (data) => {
        this.response.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        this.loading.set(false);
        // Error handled by interceptor - won't reach here
      }
    });
  }
}
```
Update its template as below:
```html
<div class="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
<h2 class="text-2xl font-bold text-gray-800 mb-6">API Exception Demo</h2>

<div class="space-y-4 mb-8">
    <button (click)="callValidApi()"
    class="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition duration-200">
    ✅ Valid API Call (/posts)
    </button>

    <button (click)="callInvalidApi()"
    class="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-lg transition duration-200">
    ❌ Invalid API (Triggers Interceptor)
    </button>
</div>

@if (response()) {
    <div class="bg-gray-50 p-4 rounded-lg">
    <h3 class="font-semibold text-gray-700 mb-2">Response:</h3>
    <pre class="text-sm overflow-auto max-h-96">{{ response() | json }}</pre>
    </div>
}

@if (loading()) {
    <div class="text-center py-4">
    <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
    </div>
}
</div>

```

### 4. Update App Config (`app.config.ts`)
```typescript
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { apiErrorInterceptor } from './interceptors/api-error.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([apiErrorInterceptor])
    )
  ]
};
```

### 5. Update Routes (`app.routes.ts`)
```typescript
import { Routes } from '@angular/router';
import { DemoApi } from './component/demo-api/demo-api';

export const routes: Routes = [
    { path: 'demo-api', component: DemoApi }
];
```

### 6. Update Home Component Navigation
**`src/app/app.html`** (add link):
```html
<!-- Add to existing template -->
<div class="p-8">
  <a routerLink="/demo-api" class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold">
    🚀 Try API Exception Demo
  </a>
</div>
```

## Testing
1. Run `ng serve`
2. Navigate to `/demo-api`
3. **Valid API**: Shows first 3 posts
4. **Invalid API**: Console logs error + alert popup (interceptor triggered)
5. **No crashes**, clean global error handling

## Key Modern Features Used
- ✅ **Standalone components/services**
- ✅ **Functional interceptors** (`HttpInterceptorFn`)
- ✅ **`provideHttpClient()`** (no HttpClientModule)
- ✅ **Tailwind CSS** styling
- ✅ **Angular 21+** patterns[1]

**Result**: Production-ready global API error handling with modern Angular architecture.[2]

[1](https://angular.dev/guide/http/setup)
[2](https://github.com/neutral-00/poc-angular)