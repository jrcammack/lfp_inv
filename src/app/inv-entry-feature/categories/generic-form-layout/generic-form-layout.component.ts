import { Component, Input } from '@angular/core';
import { Product } from 'src/shared/product.model';
import { SubCategory } from 'src/shared/subcategory.model';

@Component({
  selector: 'app-generic-form-layout',
  templateUrl: './generic-form-layout.component.html',
  styleUrls: ['./generic-form-layout.component.css']
})
export class GenericFormLayoutComponent {
  @Input() currentProdContext: Product = new Product(null, new SubCategory(null, null, null), null, null, null, null)

  constructor() {
    
  }

  display() {
    console.log(this.currentProdContext.detailsMap.get('Brand'))
  }

}
