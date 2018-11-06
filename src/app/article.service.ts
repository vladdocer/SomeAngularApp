import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Article } from './article'
import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentSnapshot } from "angularfire2/firestore";
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
    return this.articleCollection.snapshotChanges().map(action => {
      return action.map(a => {
        const data = a.payload.doc.data() as Article;
        data._id = a.payload.doc.id;
        return data;
      })
    });
  }

  public getArticleById(id: String): Observable<Article> {
    return this.articleCollection.doc(id.toString()).snapshotChanges().map(a => {
        const data = a.payload.data() as Article;
        data._id = a.payload.id;
        return data;
    });
  }
  /** POST: add a new article to the server */
  public postArticle(article: Article) {
    return this.afs.collection(config.collection_endpoint).add({
      pic: article.pic,
      text: article.text,
      title: article.title
    });
  }

  public updateArticle(article: Article) {
    return this.articleCollection.doc(article._id).update(article);
  }

  public deleteArticle(id: String): any {
    return this.articleCollection.doc(id.toString()).delete();
  }
}
