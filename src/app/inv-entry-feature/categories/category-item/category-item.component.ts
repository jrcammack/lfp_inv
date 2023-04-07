import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Category } from '../category.model';

@Component({
  selector: 'app-category-item',
  templateUrl: './category-item.component.html',
  styleUrls: ['./category-item.component.scss'],
})
export class CategoryItemComponent  implements OnInit {
  @Input() category: {id: number, name: string};
  @Output() CatSelected = new EventEmitter<{id: number, name: string}>();
  
  constructor() { }

  ngOnInit() {}

  onSelectCategory() {
    this.CatSelected.emit({id: this.category.id, name: this.category.name});
  }

}
