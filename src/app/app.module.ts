import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms'

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CategoryItemComponent } from './inv-entry-feature/categories/category-item/category-item.component';
import { CategorySelectorComponent } from './inv-entry-feature/categories/category-selector.component';
import { SubCategoryItemComponent } from './inv-entry-feature/categories/sub-category-item/sub-category-item.component';
import { appRoutes } from './app.routes';
import { SubCatLinkComponent } from './inv-entry-feature/categories/sub-cat-link/sub-cat-link.component';
import { ItemEntryFormComponent } from './inv-entry-feature/categories/item-entry-form/item-entry-form.component';
import { ElectronicsFormLayoutComponent } from './inv-entry-feature/categories/electronics-form-layout/electronics-form-layout.component';
import { BulkEntryBodyComponent } from './inv-entry-feature/categories/sub-category-item/bulk-entry-body/bulk-entry-body.component';
import { ItemEditFormComponent } from './inv-entry-feature/categories/item-edit-form/item-edit-form.component';
import { GenericFormLayoutComponent } from './inv-entry-feature/categories/generic-form-layout/generic-form-layout.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CategorySelectorComponent,
    CategoryItemComponent,
    SubCategoryItemComponent,
    SubCatLinkComponent,
    ItemEntryFormComponent,
    ElectronicsFormLayoutComponent,
    BulkEntryBodyComponent,
    ItemEditFormComponent,
    GenericFormLayoutComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterOutlet,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
