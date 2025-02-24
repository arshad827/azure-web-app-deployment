import { Component } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SignalService } from '../signal.service';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, MatTabsModule, FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule,MatButtonModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {
  form!:FormGroup;
  constructor(private route: ActivatedRoute, private signalService:SignalService) {}

  ngOnInit(){
    this.form = new FormGroup({
      name: new FormControl(),
      weight:new FormControl(),
      symbol:new FormControl(),
    })
    this.route.params.subscribe(params => {
      
      const signalData =  this.signalService.signalData$();
      const id = params;
      this.form.patchValue(signalData);

      // You can fetch the row data using the id
    });
  }
  onSubmit(){
    console.log(this.form.value)
  }
}
