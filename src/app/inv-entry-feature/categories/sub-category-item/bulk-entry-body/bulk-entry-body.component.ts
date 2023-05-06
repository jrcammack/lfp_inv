import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Shipment } from 'src/shared/shipment.model';
import { SubCategory } from '../../../../../shared/subcategory.model';
import { BulkPostRequest } from '../../../../../shared/BulkPostRequest.model';

@Component({
  selector: 'app-bulk-entry-body',
  templateUrl: './bulk-entry-body.component.html',
  styleUrls: ['./bulk-entry-body.component.css']
})
export class BulkEntryBodyComponent {
  @Input() itemCount: number = 1;
  @Input() shipmentContext: Shipment = null;
  @Input() subCategoryContext: SubCategory = null;

  constructor(private http: HttpClient) {

  }

  onFormSubmit(formObj: NgForm) {
    // console.log('a bulk entry form has been submitted!')
    // console.log(formObj)
    // console.log(this.itemCount)
    // console.log(this.shipmentContext)
    // console.log(this.subCategoryContext)

    let formValues = formObj.form.value;
    let duplicateFound: boolean = false;

    // error checking
    if (this.shipmentContext.shipmentID == 0 || this.subCategoryContext.id == 0 || this.itemCount <= 0) {
      if (this.shipmentContext.shipmentID == 0) {
        alert('no shipment context has been selected');
        return;
      }
      if (this.subCategoryContext.id == 0) {
        alert('no subcategory has been selected');
        return;
      }
      if (this.itemCount <= 0) {
        alert('Cannot do bulk entry for 0 or less items');
        return;
      }
    }

    // get the number of SKUs we have and instantiate a new array of that size
    let numSKUs: number = Object.keys(formObj.form.value).length
    let skuArray: Array<string> = new Array()

    // add all SKUs to an array to check duplicity
    for (let sku in formValues) {
      skuArray.push(formValues[sku])
    }

    // check duplicity in array
    let dupeArr: Array<string> = skuArray.filter((currentValue, currentIndex) => {
      return skuArray.indexOf(currentValue) !== currentIndex;
    })

    // notify user of dupliates or send data
    if (dupeArr.length > 0) {
      alert('the following SKUs are duplicated ' + dupeArr)
      return;
    } else {
      // create a new bulk request object to hold data
      let bulkReq = new BulkPostRequest(this.shipmentContext, this.subCategoryContext, skuArray);
      this.http.post(/*'https://lfp-inv.herokuapp.com/bulkEntry'*/ 'http://localhost:4201/bulkEntry', bulkReq).subscribe(rsp => {
        console.log(rsp)
      })
    }


  }

}
