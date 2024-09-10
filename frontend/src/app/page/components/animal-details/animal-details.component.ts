import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FindHomeService } from '../../../services/find-home.service';
@Component({
  selector: 'app-animal-details-component',
  templateUrl: './animal-details.component.html',
  styleUrls: ['./animal-details.component.css']
})
export class AnimalDetailsComponent implements OnInit {
  animalId: string | null = null;
  animals: any[] = []; 
  isModalOpen = false;
  modalImage = '';
  modalCaption = '';


  constructor(private findHomeService: FindHomeService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.animalId = this.route.snapshot.paramMap.get('id');
  }
  openModal(imageSrc: string, caption: string): void {
    this.isModalOpen = true;
    this.modalImage = imageSrc;
    this.modalCaption = caption;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }
}
