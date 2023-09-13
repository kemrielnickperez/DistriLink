//Interfaces for models

export interface IDealer {
    dealerid:number,
    firstname: string,
    middlename: string,
    lastname: string,
    birthdate: string,
    gender: string,
    currentaddress: string,
    permanentaddress: string,
    contactnumber: string,
    hasbusiness: boolean,
    businessname: string,
    businessphone: string,
    businessaddress: string,
    businesstin: string,
    creditlimit: number,
    submissiondate: string,
    attachments: string,
}


export interface IEmployee {
    employeeid:number,
    firstname: string,
    middlename: string,
    lastname: string,
    birthdate: string,
    gender: string,
    currentaddress: string,
    permanentaddress: string,
    contactnumber: string,
    is_cashier: boolean,
    is_salesassociate: boolean,
    is_collector: boolean,
    order: IOrder| null
}


export interface IOrderedProducts {
    product: IProduct;
    quantity: number;

}

export interface IOrder {
    orderid: number,
    distributiondate: string,
    orderdate: string,
    penaltyrate: number,
    paymentterms: number,
    orderamount:number,
    collector: IEmployee | null,
    dealer: IDealer,
    orderedProducts: IOrderedProducts[],
    paymentTransactions: IPaymentTransaction[] | null,
}


export interface IProduct {
    productid: number;
    commissionrate: number;
    name: string;
    price: number;
    unit: string;
}

export interface IPaymentTransaction {
    paymenttransactionid: number;
    amountdue: number;
    startingdate: string;
    enddate: string;
    installmentnumber: number;
    order: IOrder;
}
