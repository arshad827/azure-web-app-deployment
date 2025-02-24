import { Component, signal } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';

import {MatButtonModule} from '@angular/material/button';
import { Router } from '@angular/router';
import { SignalService } from '../signal.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
const ELEMENT_DATA: any[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-listing',
  standalone: true,
  imports: [MatTableModule, MatButtonModule,MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './listing.component.html',
  styleUrl: './listing.component.css'
})
export class ListingComponent {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  searchForm = new FormGroup({
    search: new FormControl(''),
  });
  signalData = signal({});
  search = new FormControl();
  constructor(private router: Router, private singalService:SignalService ) {}

  onRowClick(row:any){
    this.singalService.triggerAction(row);
    this.router.navigate(['/details', row.name])
   }
   filterTable(){
    if(this.searchForm.get('search')?.value){
      this.dataSource.filter = this.searchForm.get('search')?.value as string;
      return
    }
    this.dataSource.filter ='';
   }
}
