import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../services/news.service';
import { Router ,NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit{
  news: any[] = []; 
  newsID!: number;

  constructor(private newService: NewsService, private router: Router) {}

  ngOnInit(): void {
      this.loadNews();
  }
  


  ngOnChanges(): void {
    this.loadNews();
  }

  loadNews() {
      this.news = this.newService.getAllNews();

  }

  selectNews(id: number) {
    this.router.navigate(['/news', id]);
  }
  
}
