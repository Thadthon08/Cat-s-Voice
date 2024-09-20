import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../services/news.service';
import { Router ,NavigationEnd } from '@angular/router';
import { ActivityService } from '../../services/activity.service';
import { timeout } from 'rxjs/operators';
@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit{
  news: any[] = []; 

  loading: boolean = false; 
  constructor(private newService: ActivityService, private router: Router) {}

  ngOnInit(): void {
      this.loadNews();
  }
  


  ngOnChanges(): void {
    this.loadNews();
  }

  loadNews() {
    this.newService.getActivitys().pipe(
      timeout(5000) 
    ).subscribe(
      (data) => {
        this.news = data;
        console.log(this.news)
        this.loading = false;
      },
      (error) => {
        if (error.name === 'TimeoutError') {
          console.error('Request timed out');
        } else {
          console.error('Error fetching animals:', error);
        }
        this.loading = false; 
      }
    );
  }

  selectNews(id: number) {
    this.router.navigate(['/news', id]);
  }
  
}
