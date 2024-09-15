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

  loadAnimals() {
    this.animalService.getAnimals(this.status ?? undefined).subscribe(
      (data) => {
        this.animals = data;
      },
      (error) => {
        console.error('Error fetching animals:', error);
      }
    );
  }

  navigateToAddData() {
    this.router.navigate(['/admin/findhome/add-data']);
  }

  onAnimalCardClick(id: number) {
    console.log('Animal ID:', id);
    this.router.navigate(['/admin/findhome', id]);
  }
}
