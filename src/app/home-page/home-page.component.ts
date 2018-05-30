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
  articales: Article[];

  ngOnInit() {
    this.getAtricles();
  }

  getAtricles(): void {
    this.articleService.getArticles().subscribe(
      articles => this.articales = articles
    );
  }

}
