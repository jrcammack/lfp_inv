import { Component, Input } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';

@Component({
  selector: 'app-electronics-form-layout',
  templateUrl: './electronics-form-layout.component.html',
  styleUrls: ['./electronics-form-layout.component.css'],
  viewProviders: [{provide: ControlContainer, useExisting: NgForm}]
})
export class ElectronicsFormLayoutComponent {
  

}
