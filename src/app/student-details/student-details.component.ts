import { Component, Inject, OnChanges, OnDestroy, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';
import { Student } from '../student.model';
import { StudentsService } from '../students.service';

export interface DialogData {
  student: Student;
}

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css'],
})
export class StudentDetailsComponent implements OnInit {
  constructor(
    private _studService: StudentsService,
    private router: Router,
    private _acr: ActivatedRoute,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<AlertDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}
  student: Student;
  sub: Subscription;
  studId: number;

  ngOnInit() {
    this.student = this.data['student'];
  }

  students() {
    this.dialogRef.close();
    this.router.navigate(['/students']);
  }
}
