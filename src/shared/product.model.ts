import { SubCategory } from "./subcategory.model";

export class Product {
    product_sku: string = null;
    subCatContext: SubCategory = new SubCategory(null, null, null)
    shipment_id: number = null;
    chargerback_id: string = null;
    status_id: number = null;
    detailsMap: Map<string, string> = new Map();
    has_details: boolean = null;

    constructor(sku: string, subCat: SubCategory, shipId: number, cbID: string, statusId: number, details: boolean) {
        this.product_sku = sku;
        this.subCatContext = subCat;
        this.shipment_id = shipId;
        this.chargerback_id = cbID;
        this.status_id = statusId;
        this.has_details = details;
    }


}