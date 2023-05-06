export class Shipment {
    shipmentID: number;
    dateReceived: Date;
    partnerCode: string;

    constructor(id: number, date: Date, code: string) {
        this.shipmentID = id;
        this.dateReceived = date;
        this.partnerCode = code;
    }
}