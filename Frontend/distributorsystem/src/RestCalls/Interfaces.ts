//Interfaces for models

export interface IDealer {
    dealerid:string,
    firstname: string,
    middlename: string,
    lastname: string,
    email :String,
    password: String,
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
    orderids: string[], // naa ta gihapon ni dapat
    documentids: string[],
}

export interface IDealerDocument {
    documentid: string;
    name: string;
    type: string;
    content: Uint8Array; // You can specify the correct data type for the 'content' property.
    dealer: IDealer | null; // You can reference the 'IDealer' interface you've already defined.
}

export interface IEmployee {
    employeeid:string,
    firstname: string,
    middlename: string,
    lastname: string,
    emailaddress :String,
    password: String,
    birthdate: string,
    gender: string,
    currentaddress: string,
    permanentaddress: string,
    contactnumber: string,
    tinnumber: String,
    is_cashier: boolean,
    is_salesassociate: boolean,
    is_collector: boolean,
    submissiondate: string,
    orders: IOrder[],
    collectionpaymentids: string[],
    documentids: string[],
}

export interface IEmployeeDocument {
    documentid: string;
    name: string;
    type: string;
    content: Uint8Array; // You can specify the correct data type for the 'content' property.
    employee: IEmployee | null; // You can reference the 'IDealer' interface you've already defined.
}


export interface IOrderedProducts {
    orderedproductid: string;
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
    confirmed: boolean
    
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

export interface IPaymentReceipt {
    paymentreceiptid: number,
    remarks: string,
    paymenttype: string,
    paymenttransaction: IPaymentTransaction, 
    cashier: IEmployee | null
}

export interface IDirectPaymentReceipt extends IPaymentReceipt{
    remarks: string,
    datepaid: string,  
    amountpaid: number,
    daterecorded: string,   
}

export interface ICollectionPaymentReceipt extends IPaymentReceipt{
    collectiondate: string,
    collectionamount: number,     
    remitteddate: string,
    remittedamount: number,  
    confirmationdate: string,
    confirmed: boolean,  
}

export interface ICollectorRemittanceProof {
    collectorremittanceproofid: string;
    name: string;
    type: string;
    content: Uint8Array; // You can specify the correct data type for the 'content' property.
    collectionPaymentReceipt: ICollectionPaymentReceipt | null; // You can reference the 'IDealer' interface you've already defined.
}

export interface IDealerPaymentProof {
    dealerpaymentproofid: string;
    name: string;
    type: string;
    content: Uint8Array; // You can specify the correct data type for the 'content' property.
    collectionPaymentReceipt: ICollectionPaymentReceipt | null; // You can reference the 'IDealer' interface you've already defined.
}
