import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes, RouterOutlet } from '@angular/router';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CategoryItemComponent } from './inv-entry-feature/categories/category-item/category-item.component';
import { CategorySelectorComponent } from './inv-entry-feature/categories/category-selector.component';
import { SubCategoryItemComponent } from './inv-entry-feature/categories/sub-category-item/sub-category-item.component';
import { appRoutes } from './app.routes';
import { SubCatLinkComponent } from './inv-entry-feature/categories/sub-cat-link/sub-cat-link.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CategorySelectorComponent,
    CategoryItemComponent,
    SubCategoryItemComponent,
    SubCatLinkComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterOutlet,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
