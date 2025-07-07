import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';

export type User = {
  id?: string;
  email: string;
  name: string;
};

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  private usersSubject = new BehaviorSubject<User[]>([]);
  public users$ = this.usersSubject.asObservable();

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`).pipe(
      tap((users) => this.usersSubject.next(users)), // Update BehaviorSubject
      catchError((error) => {
        console.error('Get users gagal', error);
        return throwError(() => new Error('Gagal mengambil data users'));
      })
    );
  }

  addUser(data: Omit<User, 'id'>): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/users`, data).pipe(
      catchError((error) => {
        console.error('Add gagal', error);
        return throwError(() => new Error('Gagal menambahkan user'));
      })
    );
  }

  editUser(id: number, data: Omit<User, 'id'>): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/users/${id}`, data).pipe(
      catchError((error) => {
        console.error('Edit gagal', error);
        return throwError(() => new Error('Gagal edit user'));
      })
    );
  }

  deleteUser(id: string) {
    return this.http.delete<void>(`${this.apiUrl}/users/${id}`).pipe(
      catchError((error) => {
        console.error('Delete gagal', error);
        return throwError(() => new Error('Gagal menghapus user'));
      })
    );
  }

  // Method untuk mendapatkan user berdasarkan ID
  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/${id}`).pipe(
      catchError((error) => {
        console.error('Get user by ID gagal', error);
        return throwError(() => new Error('Gagal mengambil data user'));
      })
    );
  }

  // Method untuk refresh data manual jika diperlukan
  refreshUsers(): void {
    this.getUsers().subscribe();
  }
}
