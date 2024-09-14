import { Component, OnInit, Input } from '@angular/core';
import { FindHomeService } from '../../services/find-home.service';
import { Router ,NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { setTimeout } from 'timers';


@Component({
  selector: 'app-sterilization-program',
  templateUrl: './sterilization-program.component.html',
  styleUrls: ['./sterilization-program.component.css']
})
export class SterilizationProgramComponent {

  animals: any[] = []; 
  animalID!: number;
  content: string = `
  สัตว์จรจัดทุกตัวอยากมีชีวิตที่ดีเสมอ.. แต่พวกเขากลับมีชีวิตที่เลือกไม่ได้ <br/><br/>

การทำหมันซึ่งเป็นการแก้ไขปัญหาที่ปลายเหตุ แต่เป็นเพียงวิธีเดียวเท่านั้นที่เราสามารถทำได้ในตอนนี้และเป็นวิธีที่เร็วที่สุด เห็นผลชัดเจนที่สุด ถ้าย้อนกลับไปถึงสาเหตุของปัญหาทั้งหมด หลีกเลี่ยงไม่ได้เลยจริงๆที่เราต้องบอกว่าเกิดจากมนุษย์ทั้งสิ้น เริ่มจากไม่ได้ศึกษาข้อมูลอย่างดีก่อนรับมาเลี้ยง พอรับมาแล้วปัญหาที่เกิดขึ้นหลังจากนั้นไม่สามารถจัดการได้ ก็เลือกที่จะปล่อยปะละเลยปัญหานี้จนนำมาซึ่งปัญหาต่อสังคมต่อมา ถ้าพูดให้ลงลึกลงไปให้เห็นภาพชัดขึ้น โดนปล่อยปะละเลย แพร่พันธุ์ต่อไปเรื่อยๆ ไม่มีที่สิ้นสุด นำพาซึ่งปัญหาตามท้องถนน ปัญหาเกิดขึ้นกับมนุษย์ เช่น อุบัติเหตุตามท้องถนน เป็นต้น`;
  
  constructor(private findHomeService: FindHomeService, private router: Router) {}

  ngOnInit(): void {

      this.loadAnimals();

  }
  


  ngOnChanges(): void {
    this.loadAnimals();
  }

  loadAnimals() {

      this.animals = this.findHomeService.getAllanimals();
 
  }

  selectAnimal(id: number) {
    this.router.navigate(['/case_treatment', id]);
  }
  

  Click(): void {

      this.router.navigate(['/donate']); 
  
  }
  

}
