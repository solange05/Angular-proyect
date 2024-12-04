import { Component } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';
import { Observable, map } from 'rxjs';
import items, { NavItem } from './nav-items';
import { User } from '../core/models/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
 navItems = items;
 authUser$: Observable<User | null>;

 constructor(private authService: AuthService){
  this.authUser$ = this.authService.getUser();
 }

 logout(): void{
  this.authService.logout();
}

verifyRole(link: NavItem): Observable<boolean> {
  return this.authUser$.pipe(
    map((userAuth) =>
      link.roles.some((r) => r === userAuth?.role) // true | false
    )
  );
}
}
