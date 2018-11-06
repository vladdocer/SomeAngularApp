import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule} from "@angular/router";
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/map";

import { AppComponent } from './app.component';
import { ArticleComponent } from './article/article.component';
import { LoginComponent } from './login/login.component';
import { ArticleService } from "./article.service";
import { AuthService } from "./services/auth.service";
import { AuthGuard } from "./services/auth-guard.service";
import { HomePageComponent } from './home-page/home-page.component';
import { ParallaxModule, ParallaxConfig } from '../../node_modules/ngx-parallax';
import { CreateArticleComponent } from './create-article/create-article.component';
import { ShortArticleString } from "./shortArticle.pipe";
import { SafeUrlPipe, SafeStylePipe } from "./safeUrl.pipe";
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from "angularfire2/storage";
import { AngularFireAuth } from "angularfire2/auth";
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AngularFirestore } from 'angularfire2/firestore';
import { firebaseconfig } from "./firebaseconfig";

const routes = [
  {path:"", component: HomePageComponent, data: {title: "App - Home"}},
  {path:"article/:id", component: ArticleComponent, data: {title: "App - article"}},
  {path:"createarticle/:id", component: CreateArticleComponent, data: {title: "App - edit article"}, canActivate:[AuthGuard]},
  {path:"createarticle", component: CreateArticleComponent, data: {title: "App - create article"}, canActivate:[AuthGuard]},
  {path:"login", component: LoginComponent, data: {title: "Login"}},
  { path: '**', component: PageNotFoundComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    ArticleComponent,
    HomePageComponent,
    CreateArticleComponent,
    ShortArticleString,
    SafeUrlPipe,
    SafeStylePipe,
    LoginComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    ParallaxModule,
    FormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(firebaseconfig),
    AngularFireStorageModule,
    
  ],
  providers: [
    ArticleService,
    AuthService,
    AuthGuard,
    AngularFireAuth,
    AngularFirestore
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
