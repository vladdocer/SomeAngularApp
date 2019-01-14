import { Component, OnInit, Pipe } from '@angular/core';
import { Article } from "../article";
import { ArticleService } from "../article.service";
import { AuthService } from "../services/auth.service";


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  
  constructor(private articleService: ArticleService, private authService: AuthService) { }
  articles: Article[]; 

  ngOnInit() {
    this.getAtricles();
  }

  getAtricles(): void {
    this.articleService.getArticles().subscribe(
      articles => this.articles = articles
    );
  }
  
  deleteArticle(id): void {
    this.articleService.deleteArticle(id).then(res =>{
      console.log('Article sucsessfully deleted!')
    }).catch(e => console.log(e));
    this.articles = this.articles.filter(x => x._id != id);
  }
}
