import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AnimalService } from '../../../services/animal.service';
import { HealthRecordService } from '../../../services/healthrecord.service';

@Component({
  selector: 'app-recovery-add-data',
  templateUrl: './recovery-add-data.component.html',
  styleUrls: ['./recovery-add-data.component.css'], // ใช้ styleUrls ที่ถูกต้อง
})
export class RecoveryAddDataComponent implements OnInit {
  animalForm: FormGroup;
  animals: any[] = [];
  selectedFile: File | null = null;
  imageBase64: string = ''; // สำหรับเก็บรูปภาพ Base64

  constructor(
    private fb: FormBuilder,
    private animalService: AnimalService,
    private healthRecordService: HealthRecordService
  ) {
    this.animalForm = this.fb.group({
      animal_id: ['', Validators.required], // ใช้ animal_id แทน name
      checkup_date: [''],
      diagnosis: [''],
      treatment: [''],
      notes: [''],
    });
  }

  ngOnInit(): void {
    this.loadAnimals(); // ดึงข้อมูลสัตว์เมื่อคอมโพเนนต์ถูกโหลด
  }

  loadAnimals() {
    this.animalService.getAnimals().subscribe(
      (response) => {
        // Assuming the response is an array of animal objects
        this.animals = response.map((animal: any) => ({
          name: animal.name, // ใช้ชื่อที่ต้องการแสดงใน dropdown
          value: animal._id, // ใช้ _id แทน id ถ้าคุณใช้ MongoDB
        }));
      },
      (error) => {
        console.error('Error fetching animals:', error);
      }
    );
  }

  onSubmit() {
    if (this.animalForm.valid) {
      // แทนที่จะส่งทั้ง object ให้ส่งเฉพาะค่า ObjectId
      const formData = {
        ...this.animalForm.value,
        animal_id: this.animalForm.value.animal_id.value, // ส่งเฉพาะ value ของ ObjectId
        image: this.imageBase64, // ถ้าคุณมีการอัปโหลดรูปภาพ
      };

      this.healthRecordService.addHealthRecord(formData).subscribe(
        (res) => {
          console.log('Health record added:', res);
        },
        (error) => {
          console.error('Error adding health record:', error);
        }
      );
    }
  }
}
