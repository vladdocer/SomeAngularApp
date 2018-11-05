import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Article } from './article'
import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from "@angular/fire/firestore";
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

export const config = {
  collection_endpoint: "Article"
};

@Injectable()
export class ArticleService {

  private articleURL = "http://localhost:3000/api/articles";
  private articleCollection: AngularFirestoreCollection<Article>;
  private articles: Observable<Article[]>;

  constructor(
    private http: HttpClient,
    private afs: AngularFirestore
  ) {
    this.articleCollection = this.afs.collection('Article');
   }

  public getArticles(): Observable<Article[]> {
    /*return this.http.get(this.articleURL).pipe(
      map(res => {
        console.log('fetched articles');
        return res["data"]["docs"] as Article[]
      }
      ));*/
      console.log(this.articleCollection.valueChanges());
      return this.articleCollection.valueChanges();
  }


  public getArticleById(id: String): Observable<Article> {
    /*const url = `${this.articleURL}/${id}`;
    return this.http.get(url).pipe(
      map(res => {
        return res["data"] as Article
      })
    );*/
    this.articleCollection = this.afs.collection('Article', res => {
      return res.where('_id', '==', id);
    });
    return this.articleCollection.valueChanges()[0];
  }

  /** POST: add a new hero to the server */
  public postArticle(article: Article) {
    try {
      return this.http.post(`${this.articleURL}`, article);
    } catch (e) {
      console.log(e);
    }
  }

  public updateArticle(article: Article) {
    try {
      return this.http.put(`${this.articleURL}` + "/" + article._id, article);
    } catch (e) {
      console.log(e)
    }
  }

  public deleteArticle(id: String): any {
    const url = `${this.articleURL}/${id}`;
    try {
      return this.http.delete(url).pipe(map(res => {
        return res;
      }));
    } catch (e) {
      console.log(e);
    }
  }
}
