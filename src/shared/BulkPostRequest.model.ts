import { Shipment } from "src/shared/shipment.model";
import { SubCategory } from "./subcategory.model";

export class BulkPostRequest {
    shipmentContext: Shipment;
    subCategoryContext: SubCategory;
    skuList: Array<string>;

    constructor(shipment: Shipment, subCat: SubCategory, arr: Array<string>) {
        this.shipmentContext = shipment;
        this.subCategoryContext = subCat;
        this.skuList = arr;
    }

    
}