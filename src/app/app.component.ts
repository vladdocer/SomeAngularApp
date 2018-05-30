import { Component } from '@angular/core';
import { HomePageComponent } from './home-page/home-page.component';
import { ArticleComponent } from './article/article.component';
declare var jquery:any;
declare var $ :any;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
}
