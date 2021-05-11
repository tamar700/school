import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { Student } from '../student.model';
import { StudentsService } from '../students.service';
import { MatDialog } from '@angular/material/dialog';
import { StudentsDataSource } from './students-datasource';
import { StudentDetailsComponent } from '../student-details/student-details.component';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],
})
export class StudentsComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table: MatTable<Student>;
  dataSource: StudentsDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'studentId', 'firstName', 'lastName', 'gender'];

  constructor(
    private _studService: StudentsService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.dataSource = new StudentsDataSource(this._studService);
    this.SearchSub1.pipe(debounceTime(500), distinctUntilChanged()).subscribe(
      (res) => {
        this._studService.FilterByName(res).subscribe((d) => {
          this.dataSource.data = d;
        });
      }
    );
    this.SearchSub2.pipe(debounceTime(500), distinctUntilChanged()).subscribe(
      (res) => {
        this._studService.FilterById(res).subscribe((d) => {
          this.dataSource.data = d;
        });
      }
    );
  }

  details(stud) {
    this.dialog.open(StudentDetailsComponent, {
      data: { student: stud },
      height: '85%',
      width: '85%',
    });
    // this.router.navigate(['/student-details', stud.id]);
  }

  SearchSub1: Subject<string> = new Subject();
  SearchName(str) {
    this.SearchSub1.next(str);
  }

  SearchSub2: Subject<string> = new Subject();
  SearchId(str) {
    this.SearchSub1.next(str);
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
