import { Component, Input, OnDestroy } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { NavigationEnd, Router, ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { User } from 'src/app/core/models/user';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
activateRoute: string = "";
authUser$: Observable<User | null>;

  @Input()
  InputSideNav!: MatSidenav;

  constructor(private authService: AuthService, private router: Router){
    this.authUser$ = this.authService.getUser();

    this.router.events.subscribe((event) => {
      if(event instanceof NavigationEnd && event.url) {
        this.activateRoute = event.url;
      }
    })
  }
}
