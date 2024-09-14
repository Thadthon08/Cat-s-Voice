import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

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
    { id: 1, item: 'home', name: 'หน้าหลัก', routerLink: '/home' },
    { id: 2, item: 'about', name: 'เกี่ยวกับเรา', routerLink: '/about' },
    { id: 3, item: 'case', name: 'เคสรักษา', routerLink: '/case_treatment' },
    { id: 4, item: 'findHome', name: 'หาบ้านให้น้อง', routerLink: '/find_home' },
    { id: 5, item: 'loveProject', name: 'โครงการอุ้มรัก', routerLink: '/shelter' },
    { id: 6, item: 'aumruk', name: 'โครงการทำหมัน', routerLink: '/spayed' },
    { id: 7, item: 'news', name: 'กิจกรรม', routerLink: '/news' },
  ];

  currentChoice: string = 'home';

  constructor(private router: Router) {}

  ngOnInit(): void {
       this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const currentUrl = this.router.url;
      const foundItem = this.navbar.find(item => currentUrl.startsWith(item.routerLink));
      if (foundItem) {
        this.currentChoice = foundItem.item;
      }
    });
  }

  setActive(choice: string): void {
    this.currentChoice = choice;
  }

  getActive(choice: string): string {
    const currentUrl = this.router.url;
    const activeItem = this.navbar.find(item => currentUrl.startsWith(item.routerLink));
    return activeItem && activeItem.item === choice ? 'active' : 'not';
  }

  hasMenuItem(itemName: string): boolean {
    return this.navbar.some((item) => item.item === itemName);
  }


}
