import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FindHomeService } from '../../services/find-home.service';
import { ActivityService } from '../../services/activity.service';
import { timeout } from 'rxjs/operators';

@Component({
  selector: 'app-news-details',
  templateUrl: './news-details.component.html',
  styleUrls: ['./news-details.component.css']
})
export class NewsDetailsComponent  {

  @Input() title :string = '';
  activityId!: string | null ;
  news : any = {}; 
  isModalOpen = false;
  modalImage = '';
  modalCaption = '';

  loading: boolean = false; 




  constructor(
    private newService: ActivityService,
    private route: ActivatedRoute, 
    private router: Router
  ) {}


  ngOnInit(): void {
    this.activityId = this.route.snapshot.paramMap.get('id');
    this.loadNews();

  }
  
  loadNews() {
    this.newService.getActivityById(this.activityId ?? 'defaultId').pipe(
      timeout(5000) 
    ).subscribe(
      (data) => {
        this.news = data;
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
  
  openModal(imageSrc: string, caption: string): void {
    this.isModalOpen = true;
    this.modalImage = imageSrc;
    this.modalCaption = caption;
   
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  Click(): void {

  }
}
