import { Component, Input } from "@angular/core";
import { ControlContainer, NgForm } from "@angular/forms";
import { Product } from "src/shared/product.model";
import { SubCategory } from "src/shared/subcategory.model";

@Component({
  selector: "app-electronics-form-layout",
  templateUrl: "./electronics-form-layout.component.html",
  styleUrls: ["./electronics-form-layout.component.css"],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }],
})
export class ElectronicsFormLayoutComponent {
  @Input() currentProdContext: Product = new Product(
    null,
    new SubCategory(null, null, null),
    null,
    null,
    null,
    null
  );

  display() {
    console.log(this.currentProdContext.detailsMap.get("Brand"));
  }
}
