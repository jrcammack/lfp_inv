import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SubCategory } from '../subcategory.model';

@Component({
  selector: 'app-sub-cat-link',
  templateUrl: './sub-cat-link.component.html',
  styleUrls: ['./sub-cat-link.component.css']
})
export class SubCatLinkComponent {
  @Input() subcategory: SubCategory = new SubCategory(0, 0, 'Undefined');
  @Output() subCatSelected = new EventEmitter<SubCategory>();

  onSelectLink() {
    this.subCatSelected.emit(this.subcategory);
  }

}
