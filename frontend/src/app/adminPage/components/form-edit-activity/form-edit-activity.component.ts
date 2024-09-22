import { Component, OnChanges,Input, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-edit-activity',
  templateUrl: './form-edit-activity.component.html',
  styleUrl: './form-edit-activity.component.css'
})
export class FormEditActivityComponent implements OnChanges {
  @Input() data: any;
  activityForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.activityForm = this.fb.group({
      name: [''],
      details: [''],
      date: [''],
      location: [''],
      time: [''],
      notes: [''],
      image: [{ value: '' }],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && this.data) {
      this.activityForm.patchValue(this.data);
    }
  }


}
