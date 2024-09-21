import { log } from 'node:console';
import { Component, OnInit } from '@angular/core';

interface NavbarItem {
  id: number;
  item: string;
  name: string;
  routerLink: string;
  queryParams?: object;
}
@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrl: './menubar.component.css',
})
export class MenubarComponent implements OnInit {
  navbar: NavbarItem[] = [
    {
      id: 1,
      item: 'findHome',
      name: 'หาบ้านให้น้อง',
      routerLink: '/admin/findhome',
      queryParams: { status: 'available' },
    },
    {
      id: 2,
      item: 'loveProject',
      name: 'จัดการคำขอรับเลี้ยง',
      routerLink: '/admin/adoption',
      queryParams: { status: 'pending' },
    },
    {
      id: 3,
      item: 'recovering',
      name: 'เคสรักษา',
      routerLink: '/admin/recovering',
    },
    {
      id: 4,
      item: 'activities',
      name: 'กิจกรรม',
      routerLink: '/admin/even',
    },
  ];

  constructor() {}

  ngOnInit(): void {}

  logout() {
    localStorage.removeItem('user');
    location.reload();
  }
}
