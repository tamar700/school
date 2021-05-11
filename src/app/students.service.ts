import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { Student } from './student.model';

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  studentsList: Student[];
  constructor(private http: HttpClient) {}

  GetStudentsfromServer(): Observable<Student[]> {
    return this.http.get<Student[]>('/api/students');
  }

  GetStudentById(studId: number): Observable<Student> {
    return this.http.get<Student>('api/students/' + studId + '/GetById');
  }

  FilterByName(name: string): Observable<Student[]> {
    return this.http.get<Student[]>('api/students/' + name + '/SearchName');
  }

  FilterById(id: string): Observable<Student[]> {
    return this.http.get<Student[]>('api/students/' + id + '/SearchId');
  }
}
