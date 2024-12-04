import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { User } from 'src/app/core/models/user';
import { UserService } from './services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CreateUpdateComponent } from './dialogs/create-update/create-update.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  dataSource = new MatTableDataSource<User>();

  displayedColumns: string[] = [
    'actions',
    'id',
    'fullName',
    'email',
    'phone',
    'address',
    'role',
  ];

  constructor(
    public dialog: MatDialog,
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.userService.getUsers() 
    .subscribe({
      next: (users) => {
        if(users) this.dataSource.data = users
      },
      error: (e) =>  Swal.fire( e, '', 'error'),
    })

  }

  removeData(user: User) {
    this.userService.deleteUser(user.id);
    Swal.fire('', `${user.name} ha sido eliminado(a)`, 'success');
  }

  openCreateUserDialog(): void {
    const dialogRef = this.dialog.open(CreateUpdateComponent);
    dialogRef.afterClosed().subscribe((formData) => {
      if (formData) {
        this.userService.createUser(formData);
        Swal.fire('', `${formData.name} ha sido sido creado(a)`, 'success');
      }
    });
  }

  editData(user: User): void {
    const dialogRef = this.dialog.open(CreateUpdateComponent, {
      data: {
        user
      },
    });
    dialogRef.afterClosed().subscribe((formData) => {
      if (formData) {
        this.userService.editUser(user.id, formData, user.token)
        Swal.fire('', `${formData.name} ha sido modificado(a)`, 'success');
      }
    });
  }

  showDetails(userId: number): void {
    this.router.navigate([userId], {
      relativeTo: this.activatedRoute
    })
  }
}
