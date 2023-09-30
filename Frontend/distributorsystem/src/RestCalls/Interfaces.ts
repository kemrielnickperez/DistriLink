//Interfaces for models

export interface IDealer {
    dealerid:string,
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
    orderids: string[],
}

export interface IEmployee {
    employeeid:string,
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
    orderids: string[],
    collectionpaymentids: string[] 
}


export interface IOrderedProducts {
    product: IProduct;
    quantity: number;
    subtotal: number;

}

export interface IOrder {
    orderid: string,
    distributiondate: string,
    orderdate: string,
    penaltyrate: number,
    paymentterms: number,
    orderamount:number,
    collector: IEmployee | null,
    dealer: IDealer,
    orderedproducts: IOrderedProducts[],
    paymenttransactions: IPaymentTransaction[] | null,
}



export interface IProduct {
    productid: string;
    commissionrate: number;
    name: string;
    price: number;
    unit: string;
    orderedproductids: string[]
}

export interface IPaymentTransaction {
    paymenttransactionid: string;
    amountdue: number;
    startingdate: string;
    enddate: string;
    installmentnumber: number;
    paid: boolean;
    orderid: string;
    paymentreceiptid: string | null;
}

export interface IDirectPaymentReceipt {
    receiptid: number,
    remarks: string,
    datepaid: string,
    amountpaid: number,
    paymenttype: string,
   /*   cashier: IEmployee,  */
    paymenttransaction: IPaymentTransaction, 
       
}
