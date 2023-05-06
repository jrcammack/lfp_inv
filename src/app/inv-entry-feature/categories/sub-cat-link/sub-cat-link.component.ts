import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SubCategory } from '../../../../shared/subcategory.model';

@Component({
  selector: 'app-sub-cat-link',
  templateUrl: './sub-cat-link.component.html',
  styleUrls: ['./sub-cat-link.component.css']
})
export class SubCatLinkComponent implements OnInit {
  @Input() subcategory: SubCategory = new SubCategory(0, 0, 'Undefined');
  @Input() filteredSubCategories: SubCategory[] = [];
  @Output() subCatSelected = new EventEmitter<SubCategory>();

  onSelectLink(subCat: SubCategory) {
    this.subcategory = subCat;
    this.subCatSelected.emit(this.subcategory);
  }

  ngOnInit(): void {
      
  }

}
