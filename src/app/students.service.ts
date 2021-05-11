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

  getStud() {
    return this.studentsList;
  }

  GetName1(): Observable<string> {
    return new Observable((observ) => {
      this.studentsList.forEach((d) => {
        observ.next(d.firstName + ' ' + d.lastName);
      });
    });
  }

  GetName2(): Observable<Student> {
    return from(this.studentsList);
  }

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
