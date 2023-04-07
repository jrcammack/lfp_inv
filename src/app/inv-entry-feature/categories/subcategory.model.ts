export class SubCategory {
    id: number;
    categoryID: number;
    name: string;

    constructor(subCatId: number, catId: number, subCatName: string) {
        this.id = subCatId;
        this.categoryID = catId;
        this.name = subCatName;
    }  
}