import { Component, OnInit } from '@angular/core';
import { Article } from "../article";
import { ArticleService } from "../article.service";
import { ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';
import { ParallaxModule, ParallaxConfig } from '../../../node_modules/ngx-parallax'


@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  
  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private location: Location
  ) { }
  articl: Article;
  

  ngOnInit() {
    this.getAtricle();
  }

  ngAfterViewInit(){
    document.getElementById('paralax');
  }

  getAtricle(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.articleService.getArticleById(id).subscribe(
      articl => this.articl = articl
    );
  }

}
