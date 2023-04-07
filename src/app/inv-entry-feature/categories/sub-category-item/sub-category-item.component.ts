import { Component, Input, OnInit } from '@angular/core';
import { SubCategory } from '../subcategory.model';

@Component({
  selector: 'app-sub-category-item',
  templateUrl: './sub-category-item.component.html',
  styleUrls: ['./sub-category-item.component.scss'],
})
export class SubCategoryItemComponent  implements OnInit {
  @Input() subcategory: SubCategory = new SubCategory(0, 0, 'Undefined');

  constructor() { }

  ngOnInit() {}

}
