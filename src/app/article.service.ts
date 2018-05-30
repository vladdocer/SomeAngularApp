import { Injectable } from '@angular/core';
import { Article } from './article'
import { Articles } from "./mockarticle";
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Injectable()
export class ArticleService {

  constructor() { }
  public getArticles() : Observable<Article[]> {
    return of(Articles);
  }
  public getArticleById(id:number) :Observable<Article>{
    return of(Articles.find(hero => hero.id===id));
  }

}
