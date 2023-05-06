import { Component, Input } from '@angular/core';
import { SubCategory } from 'src/shared/subcategory.model';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Product } from 'src/shared/product.model';

@Component({
  selector: 'app-item-edit-form',
  templateUrl: './item-edit-form.component.html',
  styleUrls: ['./item-edit-form.component.css']
})
export class ItemEditFormComponent {

  @Input() SubCategoryContext: SubCategory = new SubCategory(0, 0, 'Undefined');
  @Input() currentProdContext: Product = new Product(null, new SubCategory(null, null, null), null, null, null)

  constructor(private http: HttpClient) {

  }

  onFormSubmit(formObj: NgForm) {

  }

}
