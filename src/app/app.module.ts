import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";

import { AppComponent } from './app.component';
import { ArticleComponent } from './article/article.component';
import { ArticleService } from "./article.service";
import { HomePageComponent } from './home-page/home-page.component';
import { ParallaxModule, ParallaxConfig } from '../../node_modules/ngx-parallax'

const routes = [
  {path:"", component: HomePageComponent},
  {path:"article/:id", component: ArticleComponent}
]




@NgModule({
  declarations: [
    AppComponent,
    ArticleComponent,
    HomePageComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    ParallaxModule
  ],
  providers: [
    ArticleService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
