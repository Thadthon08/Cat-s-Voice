import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivityService } from '../../../services/activity.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-activity-management',
  templateUrl: './activity-management.component.html',
  styleUrls: ['./activity-management.component.css'],
})
export class ActivityManagementComponent implements OnInit {

  activityId: string | null = null;
  data: any = {};

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private activityService: ActivityService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}
  ngOnInit(): void {
    this.activityId = this.route.snapshot.paramMap.get('id');
    if (this.activityId) {
      this.loadactivityData(this.activityId);
    }
  }

  confirmDelete() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this activity?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteActivity();
      },
      reject: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Cancelled',
          detail: 'Deletion cancelled',
          life: 3000,
        });
      },
    });
  }

  loadactivityData(id: string) {
    this.activityService.getActivityById(id).subscribe(
      (response) => {
        this.data = response;
      },
      (error) => {
        console.error('Error fetching animal data:', error);
      }
    );
  }

  navigateToEditData() {
    this.router.navigate(['/admin/even/edit-data/', this.activityId]);
  }

  deleteActivity() {
    if (this.activityId) {
      this.activityService.deleteActivityById(this.activityId).subscribe(
        (response) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'activity deleted successfully!',
            life: 3000,
          });
          setTimeout(() => this.router.navigate(['/admin/even']), 3000);
        },
        (error) => {
          console.error('Error deleting activity:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to delete activity.',
            life: 3000,
          });
        }
      );
    } else {
      console.error('Activity ID is null');
    }
  }

}
