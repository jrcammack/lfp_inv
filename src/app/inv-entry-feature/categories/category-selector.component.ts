import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Partner } from 'src/shared/partner.model';
import { Shipment } from 'src/shared/shipment.model';
import { Product } from '../../../shared/product.model';
import { Category } from '../../../shared/category.model';
import { SubCategory } from '../../../shared/subcategory.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-selector',
  templateUrl: './category-selector.component.html',
  styleUrls: ['./category-selector.component.scss'],
})
export class CategorySelectorComponent  implements OnInit {
  categories: Category[] = [];
  subcategories: SubCategory[] = [];
  selectedCat: Category = new Category(0, 'undefined');
  filteredSubcategories: SubCategory[] = [];
  selectedSubCat : SubCategory = new SubCategory(0, 0, 'Undefined');
  shipmentContext: Shipment = new Shipment(0, new Date(), 'none')
  allShipments: Shipment[] = [];
  newShipment: boolean = false;
  allPartners: Partner[] = [];
  partnerIdToCodePairings: Map<number, string> = new Map();
  shipmentIdToShipmentPairings: Map<number, Shipment> = new Map();
  searchStr: string = '';
  currentProductContext: Product = new Product(null, new SubCategory(null, null, null), null, null, null)
  displayProductDetails: boolean = false;

  
  constructor(private http: HttpClient, private router: Router) { 
    http.get(/*'https://lfp-inv.herokuapp.com/categories'*/'http://localhost:4201/categories').subscribe(rspData => {
      let data: any = rspData;
      for (let row of data.rows) {
        this.categories.push(new Category(row.category_id, row.category_name));
      }
    });

    http.get(/*'https://lfp-inv.herokuapp.com/subcategories'*/ 'http://localhost:4201/subcategories').subscribe(rspData => {
      let data: any = rspData;
      for (let row of data.rows) {
        this.subcategories.push(new SubCategory(row.sub_category_id, row.category_id, row.sub_category_name));
      }
    });

    http.get(/*'https://lfp-inv.herokuapp.com/subcategories'*/ 'http://localhost:4201/partners').subscribe(rspdata => {
      let data: any = rspdata;
      for (let row of data.rows) {
        this.allPartners.push(new Partner(row.partner_id, row.partner_name, row.partner_code));
        this.partnerIdToCodePairings.set(row.partner_id, row.partner_code);
      }
    })

    http.get(/*'https://lfp-inv.herokuapp.com/subcategories'*/ 'http://localhost:4201/shipments').subscribe(rspdata => {
      let data: any = rspdata;
      for (let row of data.rows) {
        let currentShipmentIteration: Shipment = new Shipment(row.shipment_id, row.date_received, this.partnerIdToCodePairings.get(parseInt(row.partner_id)))
        this.allShipments.push(currentShipmentIteration)
        this.shipmentIdToShipmentPairings.set(row.shipment_id, currentShipmentIteration)
      }
    })
  }

  ngOnInit() {}

  onCatSelected(CatData: { id: number, name: string }) {
    this.selectedCat = new Category(CatData.id, CatData.name);

    this.filteredSubcategories = this.subcategories.filter((currentSubCat: SubCategory) => {
      return this.selectedCat.id == currentSubCat.categoryID
    })
    console.log('The ' + CatData.name + ' has been selected!');
    console.log(this.filteredSubcategories);
  }

  onSubCatItemSelect(subCat: SubCategory) {
    this.selectedSubCat = subCat;
  }

  onNewShipment() { this.newShipment = true; }

  onPreviousShipment() {
    this.updateShipmentList(); 
    this.newShipment = false;
  }

  onFormSubmit(form: NgForm) {
    let id = 0;
    let name = '';
    this.http.post(/*'https://lfp-inv.herokuapp.com/enterItem'*/ 'http://localhost:4201/addShipment', form.value).subscribe(rsp => {
      alert(rsp);
    });

    this.http.get(/*'https://lfp-inv.herokuapp.com/enterItem'*/ 'http://localhost:4201/ShipmentID').subscribe(rsp => {
      let data: any = rsp;
      for (let row of data.rows) {
        id = row.max;
      }
      this.shipmentContext = new Shipment(id, form.value.date, this.partnerIdToCodePairings.get(parseInt(form.value.partner)));
    })
  }

  onPreviousShipmentSelect(event: PointerEvent) {
      this.shipmentContext = this.shipmentIdToShipmentPairings.get(parseInt((<HTMLLinkElement>event.target).id));
  }

  updateShipmentList() {
    this.http.get(/*'https://lfp-inv.herokuapp.com/subcategories'*/ 'http://localhost:4201/shipments').subscribe(rspdata => {
      let data: any = rspdata;
      for (let row of data.rows) {
        let currentShipmentIteration: Shipment = new Shipment(row.shipment_id, row.date_received, this.partnerIdToCodePairings.get(parseInt(row.partner_id)))
        if (this.allShipments.find(function(item) { return item.shipmentID == currentShipmentIteration.shipmentID })) {
          console.log('this shipment already is in the list')
          continue;
        } else {
          console.log('found a shipment not in current shipment list')
          this.allShipments.push(currentShipmentIteration)
          this.shipmentIdToShipmentPairings.set(row.shipment_id, currentShipmentIteration)
        }
      }
    })
  }

  onSearch() {
    let myObj = {"search": this.searchStr}
    this.http.post(/*'https://lfp-inv.herokuapp.com/searchProd'*/ 'http://localhost:4201/searchProd', myObj).subscribe(rsp => {
      let data: any = rsp;
      if (data.rowCount < 1) {
        alert('No Product with that SKU could be found');
        return;
      } else {
        let detailsArr: any = data.rows;
        if (detailsArr == undefined || detailsArr == null) {
          alert('could not get product details');
          return;
        }
        this.currentProductContext = new Product(detailsArr[0].product_sku, this.subcategories.find((value, index) => {return value.id == detailsArr[0].sub_category_id}) ,detailsArr[0].shipment_id, detailsArr[0].chargerback_id, detailsArr[0].status_id);
        for (let prodDetail of data.rows) {
          this.currentProductContext.detailsMap.set(prodDetail.detail_name, prodDetail.detail_value)
        }
      }

      this.displayProductDetails = true;
      
      console.log(this.currentProductContext)

      $("#prodDetailModal").modal('show')
    })
  }

}
