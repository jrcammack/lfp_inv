export class Partner {
    partnerID: number;
    partnerName: string;
    partnerCode: string;

    constructor(id: number, name: string, code: string) {
        this.partnerID = id;
        this.partnerCode = code;
        this.partnerName = name;
    }
}