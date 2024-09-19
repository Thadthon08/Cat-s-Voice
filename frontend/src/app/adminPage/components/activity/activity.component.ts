import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivityService } from '../../../services/activity.service';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css'],
})
export class ActivityComponent implements OnInit  {

  activitys: any[] = [];
  // status: string | null = null;
  // rows = 8; 
  // totalRecords = 0; 
  // currentPage = 1; 
  

  constructor(
    private router: Router,
    private activityService: ActivityService,
    // private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // this.route.queryParamMap.subscribe((params) => {
    //   this.status = params.get('status');
    //   // this.loadActivity();
      
    // });
    this.getActivitys();
  }

  // loadActivity(page: number = 1, rows: number = this.rows) {
  //   this.activityService
  //     .getActivity(this.status ?? undefined, rows, page)
  //     .subscribe(
  //       (data) => {
  //         this.activitys = data.activitys;
  //         this.totalRecords = data.totalRecords;
  //         this.currentPage = data.currentPage;
  //         this.rows = rows; 
  //       },
  //       (error) => {
  //         console.error('Error fetching animals:', error);
  //       }
  //     );
  // }

  getActivitys(): void {
    this.activityService.getActivitys().subscribe(
      (data) => {
        this.activitys = data.map((activity: any) => {
          return {
            _id: activity._id,
            name: activity.animal_id.name,
            image_url: activity.animal_id.image_url,
          };
        });
      },
      (error) => {
        console.error('Error fetching health activitys:', error);
      }
    );
  }

  // paginate(event: any) {
  //   this.currentPage = event.page + 1; 
  //   this.getActivitys(this.currentPage, event.rows); 
  // }

  navigateToAddData() {
    this.router.navigate(['/admin/even/add-data']);
  }

  onActivitysCardClick(id: number) {
    console.log('activity ID:', id);
    this.router.navigate(['/admin/even', id]);
  }

}
