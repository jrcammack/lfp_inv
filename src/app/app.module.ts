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
import { ElectronicsFormLayoutComponent } from './inv-entry-feature/categories/item-entry-form/electronics-form-layout/electronics-form-layout.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CategorySelectorComponent,
    CategoryItemComponent,
    SubCategoryItemComponent,
    SubCatLinkComponent,
    ItemEntryFormComponent,
    ElectronicsFormLayoutComponent
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
