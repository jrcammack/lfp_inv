import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Category } from './category.model';
import { SubCategory } from './subcategory.model';

@Component({
  selector: 'app-category-selector',
  templateUrl: './category-selector.component.html',
  styleUrls: ['./category-selector.component.scss'],
})
export class CategorySelectorComponent  implements OnInit {
  categories: Category[] = [];
  subcategories: SubCategory[] = [];
  selectedCat: Category = new Category(0, 'undefined');
  filteredSubcategories: SubCategory[] = [];
  selectedSubCat : SubCategory = new SubCategory(0, 0, 'Undefined');
  
  constructor(private http: HttpClient) { 
    http.get('http://localhost:4201/categories').subscribe(rspData => {
      let data: any = rspData;
      for (let row of data.rows) {
        this.categories.push(new Category(row.category_id, row.category_name));
      }
    });

    http.get('http://localhost:4201/subcategories').subscribe(rspData => {
      let data: any = rspData;
      for (let row of data.rows) {
        this.subcategories.push(new SubCategory(row.sub_category_id, row.category_id, row.sub_category_name));
      }
    });

    console.log(this.subcategories);
  }

  ngOnInit() {}

  onCatSelected(CatData: { id: number, name: string }) {
    this.selectedCat = new Category(CatData.id, CatData.name);

    this.filteredSubcategories = this.subcategories.filter((currentSubCat: SubCategory) => {
      return this.selectedCat.id == currentSubCat.categoryID
    })
    console.log('The ' + CatData.name + ' has been selected!');
  }

  onSubCatItemSelect(subCat: SubCategory) {
    this.selectedSubCat = subCat;
  }


}
