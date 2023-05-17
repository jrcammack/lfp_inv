import { HttpClient } from "@angular/common/http";
import { Component, Input } from "@angular/core";
import { NgForm } from "@angular/forms";
import { SubCategory } from "../../../../shared/subcategory.model";
import { HttpEntryRequest } from "../../../../shared/HttpEntryRequest.model";

@Component({
  selector: "app-item-entry-form",
  templateUrl: "./item-entry-form.component.html",
  styleUrls: ["./item-entry-form.component.css"],
})
export class ItemEntryFormComponent {
  @Input() SubCategoryContext: SubCategory = new SubCategory(0, 0, "Undefined");

  constructor(private http: HttpClient) {}

  onFormSubmit(form: NgForm) {
    var req = new HttpEntryRequest(this.SubCategoryContext, form);
    switch (this.SubCategoryContext.categoryID) {
      case 17:
        this.http
          .post(
            "https://lfp-inv.herokuapp.com/enterItem" /*'http://localhost:4201/enterItem'*/,
            JSON.stringify(req)
          )
          .subscribe((rsp) => {
            alert(rsp);
          });
        break;
      default:
        console.log("in default clause");
        console.log(form);
    }
  }
}
