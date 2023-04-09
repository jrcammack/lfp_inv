import { Component, Input } from '@angular/core';
import { SubCategory } from '../subcategory.model';

@Component({
  selector: 'app-item-entry-form',
  templateUrl: './item-entry-form.component.html',
  styleUrls: ['./item-entry-form.component.css']
})
export class ItemEntryFormComponent {

  @Input() SubCategoryContext: SubCategory = new SubCategory(0, 0, 'Undefined');

}
