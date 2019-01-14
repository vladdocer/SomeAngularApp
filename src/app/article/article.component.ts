import { Component, OnInit } from '@angular/core';
import { Article } from "../article";
import { ArticleService } from "../article.service";
import { AuthService } from "../services/auth.service";
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  
  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private authService: AuthService,
    private location: Location
  ) { }
  articl: Article;
  articleDeleted: boolean;

  ngOnInit() {
    this.getAtricle();
    this.articleDeleted = false;
  }
  ngAfterViewInit(){
    document.getElementById('paralax');
  }
  getAtricle(): void {
    let id: String;
    id = this.route.snapshot.paramMap.get('id');

    this.articleService.getArticleById(id).subscribe(
      articl => this.articl = articl
    );
  }
  deleteArticle(): void{    
    this.articleService.deleteArticle(this.articl._id).then(res =>{
      console.log('Article sucsessfully deleted!')
    }).catch(e => console.log(e));
    this.articleDeleted = true;                    
  }
}
