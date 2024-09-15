import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimalService } from '../../../services/animal.service';

@Component({
  selector: 'app-findhome',
  templateUrl: './findhome.component.html',
  styleUrls: ['./findhome.component.css'],
})
export class FindhomeComponent implements OnInit {
  animals: any[] = [];
  status: string | null = null;
  rows = 8; 
  totalRecords = 0; 
  currentPage = 1; 

  constructor(
    private router: Router,
    private animalService: AnimalService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      this.status = params.get('status');
      this.loadAnimals();
    });
  }

  loadAnimals(page: number = 1, rows: number = this.rows) {
    this.animalService
      .getAnimals(this.status ?? undefined, rows, page)
      .subscribe(
        (data) => {
          this.animals = data.animals;
          this.totalRecords = data.totalRecords;
          this.currentPage = data.currentPage;
          this.rows = rows; 
        },
        (error) => {
          console.error('Error fetching animals:', error);
        }
      );
  }

  paginate(event: any) {
    this.currentPage = event.page + 1; 
    this.loadAnimals(this.currentPage, event.rows); 
  }

  navigateToAddData() {
    this.router.navigate(['/admin/findhome/add-data']);
  }

  onAnimalCardClick(id: number) {
    console.log('Animal ID:', id);
    this.router.navigate(['/admin/findhome', id]);
  }
}
