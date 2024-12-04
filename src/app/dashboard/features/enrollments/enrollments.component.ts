import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Enrollment, EnrollmentModel } from './models/enrollment';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { EnrollmentService } from './services/enrollment.service';
import Swal from 'sweetalert2';
import { CreateUpdateComponent } from './dialogs/create-update/create-update.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-enrollments',
  templateUrl: './enrollments.component.html',
  styleUrls: ['./enrollments.component.scss']
})
export class EnrollmentsComponent implements OnInit {
  dataSource = new MatTableDataSource<EnrollmentModel>();

  displayedColumns: string[] = [
    'actions',
    'id',
    'course',
    'student',
    'date'
  ];

  constructor(
    public dialog: MatDialog,
    private enrollmentService: EnrollmentService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ){
  }

  ngOnInit(): void {
    this.enrollmentService.getEnrollments()
    .subscribe({
      next: (enrollments) => {
        if(enrollments) this.dataSource.data = enrollments
      },
      error: (e) => console.error(e),
    })
  }

  removeData(enrollment: Enrollment){
    this.enrollmentService.deleteEnrollment(enrollment.id);
    Swal.fire('', `La inscripción ha sido eliminada`, 'success');
  }

  openCreateEnrollmentDialog(): void{
    const dialogRef = this.dialog.open(CreateUpdateComponent);
    dialogRef.afterClosed().subscribe((formData) => {
      if(formData){
        this.enrollmentService.createEnrollment(formData);
        Swal.fire('', `La inscripción ha sido sido creada`, 'success');
      }
    });
  }

  editData(enrollment: Enrollment): void {
    const dialogRef = this.dialog.open(CreateUpdateComponent, {
      data: {
        enrollment
      },
    });
    dialogRef.afterClosed().subscribe((formData) => {
      if(formData) {
        this.enrollmentService.editEnrollment(enrollment.id, formData, enrollment.date);
        Swal.fire('', `La inscripción ha sido modificada`, 'success');
      }
    });
  }

  showDetails(enrollmentId: number): void {
    this.router.navigate([enrollmentId], {
      relativeTo: this.activatedRoute
    })
  }
}

