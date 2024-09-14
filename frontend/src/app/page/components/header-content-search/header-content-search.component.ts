import { Component , Input } from '@angular/core';

@Component({
  selector: 'app-header-content-search',
  templateUrl: './header-content-search.component.html',
  styleUrls: ['./header-content-search.component.css']
})

export class HeaderContentSearchComponent {
  @Input() header: string = '';
  @Input() content: string = ''; 
  @Input() color: string = ''; 
  @Input() fontColor: string = ''; 
}
