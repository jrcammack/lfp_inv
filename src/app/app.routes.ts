import { Routes } from "@angular/router";
import { CategorySelectorComponent } from "./inv-entry-feature/categories/category-selector.component";
import { SubCategoryItemComponent } from "./inv-entry-feature/categories/sub-category-item/sub-category-item.component";

export const appRoutes: Routes = [
    { path: '', component: CategorySelectorComponent },
    { path: 'itemDetails', component: CategorySelectorComponent }
];