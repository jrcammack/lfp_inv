import { Component, Input, OnInit } from '@angular/core';
import { Shipment } from 'src/shared/shipment.model';
import { SubCategory } from '../../../../shared/subcategory.model';

@Component({
  selector: 'app-sub-category-item',
  templateUrl: './sub-category-item.component.html',
  styleUrls: ['./sub-category-item.component.scss'],
})
export class SubCategoryItemComponent  implements OnInit {
  @Input() subcategory: SubCategory = new SubCategory(0, 0, 'Undefined');
  @Input() shipmentContext: Shipment = null;
  bulkEntry: boolean = true;
  itemCount: number = 1;

  constructor() { }

  ngOnInit() {}

  resetItemCount() {
    this.itemCount = 0;
  }

}
