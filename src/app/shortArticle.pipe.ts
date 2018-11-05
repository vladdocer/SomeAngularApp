import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'shortArticleString'
  })
  export class ShortArticleString implements PipeTransform{
    transform(text: String){
        return text.split(' ').slice(0,10).join(' ')+'...';
    }
  }