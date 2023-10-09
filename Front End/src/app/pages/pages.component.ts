import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

  }

  get window() {
    return window
  }

  scrollTo(id : string){
    document?.getElementById(id)?.scrollIntoView();
  }
}
