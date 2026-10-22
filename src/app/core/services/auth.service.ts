import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface LoginResponse {
  token: string;
}

@Injectable({
providedIn: 'root'
})
export class AuthService {
private http = inject(HttpClient);
private readonly API_URL =
`${environment.apiUrl}/api/auth`;
login(username: string, password: string): Observable<any> {
return this.http.post<LoginResponse>(
`${this.API_URL}/login`,
{ username, password }
).pipe(
tap(response => {
console.log('Respuesta login:', response);
console.log('Respuesta login2:', response.token);
// Si tu backend devuelve { token: '...' }
localStorage.setItem('token', response.token);
})
);
}
logout(): void {
localStorage.removeItem('token');
}
getToken(): string | null {
return localStorage.getItem('token');
}
isAuthenticated(): boolean {
return !!this.getToken();
}
}