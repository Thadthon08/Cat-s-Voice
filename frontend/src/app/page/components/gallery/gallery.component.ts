import { Component , ViewChild  } from '@angular/core';
import { FindHomeService } from '../../../services/find-home.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent {
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
