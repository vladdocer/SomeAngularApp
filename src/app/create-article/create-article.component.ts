import { Component, OnInit } from '@angular/core';
import { Article } from "../article";
import { ArticleService } from "../article.service";

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.css']
})
export class CreateArticleComponent implements OnInit {

  constructor(  
    private articleService: ArticleService  
  ) {}
  private article: Article;

  ngOnInit() {
    this.article = new Article();
    this.article.title = " ";
    this.article.text = " ";
    this.article.pic = " ";
  }

  submit(title: string, text: string, pic: string){
    if (title == "") {
      
      document.getElementById('firstname').style.borderColor = "red";
    }
    const art = new Article();
    art.title = title;
    art.text = text;
    art.pic = pic;
    this.articleService.postArticle(art).subscribe((res) => {
      console.log("OK article created, id:"+res["data"]["_id"]);
    });
  }

  WrongDataInput(): boolean{

    return true;
  }

}
