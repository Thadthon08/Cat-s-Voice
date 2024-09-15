import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimalService } from '../../../services/animal.service';

@Component({
  selector: 'app-animal-management',
  templateUrl: './animal-management.component.html',
  styleUrls: ['./animal-management.component.css'],
})
export class AnimalManagementComponent implements OnInit {
  animalId: string | null = null;
  data: any = {};

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private animalService: AnimalService
  ) {}

  ngOnInit(): void {
    this.animalId = this.route.snapshot.paramMap.get('id');
    if (this.animalId) {
      this.loadAnimalData(this.animalId);
    }
  }

  loadAnimalData(id: string) {
    this.animalService.getAnimalById(id).subscribe(
      (response) => {
        this.data = response;
      },
      (error) => {
        console.error('Error fetching animal data:', error);
      }
    );
  }
  navigateToEditData() {
    this.router.navigate(['/admin/findhome/edit-data/', this.animalId]);
  }
}
