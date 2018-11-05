import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Article } from "../article";
import { ActivatedRoute } from "@angular/router";
import { ArticleService } from "../article.service";
import { AngularFireStorage } from '@angular/fire/storage';
import { when } from 'q';

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.css']
})
export class CreateArticleComponent implements OnInit {

  @ViewChild("gallery") gallery: ElementRef;
  @ViewChild("title") title: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private _renderer: Renderer2,
    private storage: AngularFireStorage
  ) { }

  
  private article: Article;
  private headTitle: String;
  private isopen: boolean;
  private ishighlight: boolean;
  private isNewArticle: boolean;
  private fileList: File[];

  private uploadProgress = []
  private progressBarValue: number;

  initializeProgress(numFiles) {
    this.progressBarValue = 0;
    this.uploadProgress = []

    for (let i = numFiles; i > 0; i--) {
      this.uploadProgress.push(0)
    }
  }

  appendImg(result){
    const img = this._renderer.createElement('img');
    img.src = result;
    this._renderer.appendChild(this.gallery.nativeElement, img);
  }
  //Showing minified pic of uploading image
  previewGallary(f){
    this.isopen;
    const reader = new FileReader();
    reader.readAsDataURL(f);
    reader.onloadend= x => {this.appendImg(reader.result)};
  }

  //Update progress bar of upload
  updateProgress(fileNumber, percent) {
    this.uploadProgress[fileNumber] = percent
    let total = this.uploadProgress.reduce((tot, curr) => tot + curr, 0) / this.uploadProgress.length
    console.debug('update', fileNumber, percent, total)
    this.progressBarValue = total
  }

  //Uploading files to CLOUDINARY
  uploadFile(file: File, i) { 
    const filePath = '/img/' + file.name;
    const task = this.storage.upload(filePath, file);
  }

  preventDefaults(e) {
    e.preventDefault()
    e.stopPropagation()
  }

  submit() {
    if (this.article.title == "") {
      document.getElementById('firstname').style.borderColor = "red";
      return;
    }
    this.isopen = true;
    if (this.fileList) {
      this.fileList.forEach((f,i) => this.uploadFile(f,i));
    }
    if (this.isNewArticle){
      this.articleService.postArticle(this.article).subscribe(res => 
        console.log("OK article created, id:" + res["data"]["_id"])
      );
    } else{
      this.articleService.updateArticle(this.article).subscribe(res => 
        console.log("OK article updated, id:" + res["data"]["_id"])
      );
    }
    
  }

  WrongDataInput(): boolean {
    return true;
  }

  handleFiles(files: File[]) {
    this.initializeProgress(files.length);
    files.forEach(f => this.previewGallary(f));
  }

  handleDrop(e: DragEvent) {
    let dt = e.dataTransfer;
    this.fileList = Array.from(dt.files);
    this.handleFiles(this.fileList);
  }

  getArticle(): void {
    let id: String;
    id = this.route.snapshot.paramMap.get('id');

    this.articleService.getArticleById(id).subscribe(
      article => this.article = article
    );
  }

  ngOnInit() {
    //проверяем на наличие вошедших параметров
    if(this.route.snapshot.paramMap.get('id')) {
      this.article = new Article();
      this.getArticle();
      this.isNewArticle = false;
      this.headTitle = "Редактирование статьи";
    }
    else {
      this.article = new Article();
      this.article.title = " ";
      this.article.text = " ";
      this.article.pic = " ";
      this.isNewArticle = true;
      this.headTitle = "Создание статьи";
    }
    
    
    this.isopen = false;
    this.ishighlight = false;
    let dropArea = document.getElementById('drop-area');
    /*['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
      dropArea.addEventListener(eventName, this.preventDefaults, false)
    });*/
    ['dragleave', 'drop', 'dragenter', 'dragover'].forEach(eventName => {
      dropArea.addEventListener(eventName, event => this.preventDefaults(event), false)
    });
    ['dragleave', 'drop'].forEach(eventName => {
      dropArea.addEventListener(eventName, event => this.ishighlight = false, false)
    });
    ['dragenter', 'dragover'].forEach(eventName => {
      dropArea.addEventListener(eventName, event => this.ishighlight = true, false)
    });
    
  }
}
