import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimalService } from '../../../services/animal.service';


@Component({
  selector: 'app-animal-details-component',
  templateUrl: './animal-details.component.html',
  styleUrls: ['./animal-details.component.css']
})
export class AnimalDetailsComponent implements OnInit {

  @Input() title :string = '';
  animalId: string | null = null;
  animalData: any = {}; 
  show: boolean = true;


  isModalOpen = false;
  modalImage = '';
  modalCaption = '';

  
  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private animalService: AnimalService,
  ) {}


  ngOnInit(): void {
    this.animalId = this.route.snapshot.paramMap.get('id');
    this.route.queryParams.subscribe(params => {
      this.show = params['show'] === 'false' ? false : true; 
    });
    this.loadAnimal();

  }
  
  
  Click(): void {
    this.show = !this.show;
    this.router.navigate(['/adopter',this.animalId], { queryParams: { show: !this.show.toString() } }); 
  }

  loadAnimal(){
    this.animalService.getAnimalById(String(this.animalId)).subscribe
    (
      (data) => {
        this.animalData = data;
      },
      (error) => {
        console.error('Error fetching animals:', error);
      }
    );
  }
  

  openModal(imageSrc: string, caption: string): void {
    this.isModalOpen = true;
    this.modalImage = imageSrc;
    console.log(this.modalImage)
    this.modalCaption = caption;
  }
  closeModal(): void {
    this.isModalOpen = false;
  }


}
