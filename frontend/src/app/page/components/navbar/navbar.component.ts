import { Component, OnInit } from '@angular/core';

interface NavbarItem {
  id: number;
  item: string;
  name: string;
  routerLink: string;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  navbar: NavbarItem[] = [
    { id: 1, item: 'home', name: 'หน้าหลัก', routerLink: '/about' },
    { id: 2, item: 'about', name: 'เกี่ยวกับเรา', routerLink: '/about' },
    { id: 3, item: 'case', name: 'เคสรักษา', routerLink: '#' },
    {
      id: 4,
      item: 'findHome',
      name: 'หาบ้านให้น้อง',
      routerLink: '/find_home',
    },
    {
      id: 5,
      item: 'loveProject',
      name: 'โครงการอุ้มรัก',
      routerLink: '/project',
    },
    { id: 6, item: 'neuterProject', name: 'โครงการทำหมัน', routerLink: '#' },
    { id: 7, item: 'activities', name: 'กิจกรรม', routerLink: '#' },
  ];

  currentChoice: string = 'home';

  setActive(choice: string): void {
    this.currentChoice = choice;
  }

  getActive(choice: string): string {
    return this.currentChoice === choice ? 'active' : 'not';
  }

  hasMenuItem(itemName: string): boolean {
    return this.navbar.some((item) => item.item === itemName);
  }

  constructor() {}

  ngOnInit(): void {}
}
