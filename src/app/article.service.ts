import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Article } from './article'
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable()
export class ArticleService {

  private articleURL = "http://localhost:3000/api/articles";

  constructor(
    private http: HttpClient
  ) { }

  public getArticles() : Observable<Article[]> {
    console.log('fetched articles');
    return this.http.get(this.articleURL).pipe(
      map( res => {
        console.log('fetched articles');
        return res["data"]["docs"] as Article[]
      }
    ));
  }


  public getArticleById(id:String): Observable<Article>{
    const url = `${this.articleURL}/${id}`;
    return this.http.get(url).pipe(
      map(res => {
        return res["data"] as Article
      })
    );
  }

    /** POST: add a new hero to the server */
  public postArticle (article: Article) {
    try{
      return this.http.post(`${this.articleURL}`, article);
    }catch(e){
      console.log(e);
    }
  }

  public deleteArticle(id: String): any{
    const url = `${this.articleURL}/${id}`;
    return this.http.delete(url).pipe(map(res => {
      return res;
    }));
  }
}
