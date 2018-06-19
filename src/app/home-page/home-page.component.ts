import { Component, OnInit } from '@angular/core';
import { Article } from "../article";
import { ArticleService } from "../article.service";


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  
  constructor(private articleService: ArticleService) { }
  articles: Article[];

  ngOnInit() {
    this.getAtricles();
  }

  getAtricles(): void {
    this.articleService.getArticles().subscribe(
      articles => this.articles = articles
    );
  }
  
  deleteArticle(id:String): void{
    this.articles = this.articles.filter(a => a._id !== id);
    this.articleService.deleteArticle(id).subscribe(res =>{
      console.log('Article sucsessfully deleted!')
    }

    );
  }
}
