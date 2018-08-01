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
  private isopen: boolean;
  private ishighlight: boolean;
  
  private uploadProgress = []
  private progressBarValue: number;

 

  initializeProgress(numFiles) {
    this.progressBarValue = 0;
    this.uploadProgress = []
  
    for(let i = numFiles; i > 0; i--) {
      this.uploadProgress.push(0)
    }
  }

 

  handleFiles(files){
    files = [...files];
    this.initializeProgress(files.length);
    files.forEach(this.uploadFile);
    files.forEach(this.previewFile);
  }

  //Showing minified pic of uploading image
  previewFile(file) {
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = function() {
      let img = document.createElement('img')
      img.src = reader.result
      document.getElementById('gallery').appendChild(img)
    }
  }

  //Update progress bar of upload
  updateProgress(fileNumber, percent) {
    this.uploadProgress[fileNumber] = percent
    let total = this.uploadProgress.reduce((tot, curr) => tot + curr, 0) / this.uploadProgress.length
    console.debug('update', fileNumber, percent, total)
    this.progressBarValue = total
  }

  //Uploading files to CLOUDINARY
  uploadFile(file, i) {
    var url = 'https://api.cloudinary.com/v1_1/YOU/image/upload'
    var xhr = new XMLHttpRequest()
    var formData = new FormData()
    xhr.open('POST', url, true)
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
  
    // Update progress (can be used to show progress indicator)
    xhr.upload.addEventListener("progress", e => {
      this.updateProgress(i, (e.loaded * 100.0 / e.total) || 100);
    })
  
    xhr.addEventListener('readystatechange', e => {
      if (xhr.readyState == 4 && xhr.status == 200) {
        this.updateProgress(i, 100) // <- Add this
      }
      else if (xhr.readyState == 4 && xhr.status != 200) {
        // Error. Inform the user
      }
    })
  
    formData.append('upload_preset', 'YOU')
    formData.append('file', file)
    xhr.send(formData)
  }
 
  preventDefaults (e) {
    e.preventDefault()
    e.stopPropagation()
  }

  submit(title: string, text: string, pic: string){
    if (title == "") {
      document.getElementById('firstname').style.borderColor = "red";
    }
    const art = new Article();
    art.title = title;
    art.text = text;
    art.pic = pic;
    this.isopen = true;
    this.articleService.postArticle(art).subscribe((res) => {
      console.log("OK article created, id:"+res["data"]["_id"]);
    });
    
  }

  WrongDataInput(): boolean{

    return true;
  }



  ngOnInit() {
    this.article = new Article();
    this.article.title = " ";
    this.article.text = " ";
    this.article.pic = " ";
    this.isopen = false;
    this.ishighlight = false;
    let dropArea = document.getElementById('drop-area');
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
      dropArea.addEventListener(eventName, this.preventDefaults, false)
    });
    ['dragleave', 'drop'].forEach(eventName => {
      dropArea.addEventListener(eventName, event => this.ishighlight=false , false)
    });
    ['dragenter', 'dragover'].forEach(eventName => {
      dropArea.addEventListener(eventName, event => this.ishighlight=true, false)
    });
    dropArea.addEventListener('drop', handleDrop, false)
    function handleDrop(e) {
      var dt = e.dataTransfer;
      var files = dt.files;  
      this.handleFiles(files);
    } 
  }
}
