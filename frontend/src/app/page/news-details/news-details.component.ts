import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FindHomeService } from '../../services/find-home.service';


@Component({
  selector: 'app-news-details',
  templateUrl: './news-details.component.html',
  styleUrls: ['./news-details.component.css']
})
export class NewsDetailsComponent  {

  @Input() title :string = '';
  animalId: string | null = null;
  animals: any[] = []; 
  isModalOpen = false;
  modalImage = '';
  modalCaption = '';
  show: boolean = true;
  




  constructor(
    private findHomeService: FindHomeService, 
    private route: ActivatedRoute, 
    private router: Router
  ) {}


  ngOnInit(): void {
    this.animalId = this.route.snapshot.paramMap.get('id');
    this.route.queryParams.subscribe(params => {
      this.show = params['show'] === 'false' ? false : true; 

    });

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
    this.show = !this.show;
    this.router.navigate(['/adopter',this.animalId], { queryParams: { show: !this.show.toString() } }); 
 
  }
}
