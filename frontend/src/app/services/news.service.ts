import { Injectable } from '@angular/core';
import { news } from '../news.model';


@Injectable()
export class NewsService {
  constructor() { }

  private newsData : news = [
    {
      id: 1,
      title: 'ข่าวสาร 1',
      content: 'เนื้อหาข่าวสาร 1...',
      date: '2023-10-26',
      location: 'กรุงเทพ',
      time: '10:00',
      image: 'https://www.thevoicefoundation.org/src/views/login/promotion/images/20240712055259.jpg',
      addCondition: 'หมายเหตุเพิ่มเติม 1'
    },
    {
      id: 2,
      title: 'ข่าวสาร 2',
      content: 'เนื้อหาข่าวสาร 2...',
      date: '2023-10-27',
      location: 'เชียงใหม่',
      time: '14:30',
      image: 'https://www.thevoicefoundation.org/src/views/login/promotion/images/20240729014247.jpg',
      addCondition: 'หมายเหตุเพิ่มเติม 2'
    },
    // เพิ่มข้อมูลข่าวสารอื่น ๆ ได้ที่นี่
  ];

 

  // เพิ่ม method สำหรับจัดการข้อมูลข่าวสาร 
  getAllNews() {
    return this.newsData;
  }
 
}