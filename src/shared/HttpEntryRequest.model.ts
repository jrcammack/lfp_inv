import { NgForm } from "@angular/forms";
import { SubCategory } from "./subcategory.model";

export class HttpEntryRequest {
    catID: number;
    formObj: any;
    
    constructor (aSubCategory: SubCategory, aForm: NgForm) {
        this.catID = aSubCategory.categoryID;
        this.formObj = aForm.value;
    }
}