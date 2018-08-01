import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";


import { AppComponent } from './app.component';
import { ArticleComponent } from './article/article.component';
import { ArticleService } from "./article.service";
import { HomePageComponent } from './home-page/home-page.component';
import { ParallaxModule, ParallaxConfig } from '../../node_modules/ngx-parallax';
import { CreateArticleComponent } from './create-article/create-article.component';



const routes = [
  {path:"", component: HomePageComponent},
  {path:"article/:id", component: ArticleComponent},
  {path:"createarticle", component: CreateArticleComponent}
]




@NgModule({
  declarations: [
    AppComponent,
    ArticleComponent,
    HomePageComponent,
    CreateArticleComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    ParallaxModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    ArticleService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
