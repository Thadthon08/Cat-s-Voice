import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-findhome',
  templateUrl: './findhome.component.html',
  styleUrl: './findhome.component.css',
})
export class FindhomeComponent {
  constructor(private router: Router) {}

  animals = [
    {
      id: 1,
      name: 'เมอซี่',
      image:
        'https://cdn.pixabay.com/photo/2014/11/30/14/11/cat-551554_1280.jpg',
    },
    {
      id: 2,
      name: 'ชอนแจ',
      image:
        'https://cdn.pixabay.com/photo/2014/04/13/20/49/cat-323262_1280.jpg',
    },
    {
      id: 3,
      name: 'สายฝน',
      image:
        'https://cdn.pixabay.com/photo/2017/08/07/12/27/cat-2603300_1280.jpg',
    },
    {
      id: 4,
      name: 'พลอย',
      image:
        'https://cdn.pixabay.com/photo/2015/11/10/20/10/dog-1037702_1280.jpg',
    },
    {
      id: 5,
      name: 'เพชร',
      image:
        'https://cdn.pixabay.com/photo/2018/05/17/14/12/dog-3408667_1280.jpg',
    },
    {
      id: 6,
      name: 'ก้อนเมฆ',
      image:
        'https://cdn.pixabay.com/photo/2018/10/30/11/34/golden-retriever-puppy-3783500_960_720.jpg',
    },
    {
      id: 7,
      name: 'เก็บรัก',
      image:
        'https://cdn.pixabay.com/photo/2022/01/18/07/38/cat-6946505_1280.jpg',
    },
    {
      id: 8,
      name: 'ดอกไม้',
      image:
        'https://cdn.pixabay.com/photo/2018/02/21/05/17/cat-3169476_1280.jpg',
    },
  ];

  navigateToAddData() {
    this.router.navigate(['/admin/add-data']);
  }
  onAnimalCardClick(id: number) {
    console.log('Animal ID:', id);
    this.router.navigate(['/admin/findhome', id]);
  }
}
