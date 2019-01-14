import { isPlatformBrowser , DOCUMENT} from '@angular/common';
import { environment } from '../environments/environment';
import { Component , OnInit, Inject, PLATFORM_ID} from '@angular/core';
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
export class AppComponent implements OnInit {
  private title: Observable<string>;

    public ngOnInit(): void {
        if (!isPlatformBrowser(this.platformId)) {
            let bases = this.document.getElementsByTagName('base');
    
            if (bases.length > 0) {
                bases[0].setAttribute('href', environment.baseHref);
            }
        }
    }

  constructor(@Inject(PLATFORM_ID) private platformId: any, @Inject(DOCUMENT) private document: any, private router: Router, private titleService: Title, private authService: AuthService) {
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
