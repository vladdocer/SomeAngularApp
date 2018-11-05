import { Component } from '@angular/core';
import { Observable } from "rxjs";
import { Title } from "@angular/platform-browser";
import { AuthService } from "./services/auth.service";
import { Router, NavigationEnd, ActivatedRouteSnapshot } from "@angular/router";
declare var jquery:any;
declare var $ :any;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private title: Observable<string>;
  constructor(private router: Router, private titleService: Title, private authService: AuthService) {
    this.title = this.router.events
      .filter((event) => event instanceof NavigationEnd)
      .map(() => this.getDeepestTitle(this.router.routerState.snapshot.root));
    this.title.subscribe(title =>  titleService.setTitle(title)); 
  }  

  private getDeepestTitle(routeSnapshot: ActivatedRouteSnapshot) {
    var title = routeSnapshot.data ? routeSnapshot.data['title'] : '';
    if (routeSnapshot.firstChild) {
      title = this.getDeepestTitle(routeSnapshot.firstChild) || title;
    }
    return title;
  }
}
