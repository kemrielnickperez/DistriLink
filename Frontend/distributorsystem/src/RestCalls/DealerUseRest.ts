import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { IDealer, IDealerDocument } from "./Interfaces";
import { de } from "date-fns/locale";
import { error } from "console";





export const useRestDealer = (): [(dealerID: string) => void, (dealer: IDealer, dealerDocuments: IDealerDocument[]) => void, (dealerID: string, creditlimit: number) => void, (dealerID: string, remarks: string) => void, (dealerID: string, remarks: string, dateArchived: string) => void, boolean | undefined, IDealer | undefined] => {

    const [dealer, setDealer] = useState<IDealer>();
    const [isDealerFound, setIsDealerFound] = useState(false);

    function newDealer(dealer: IDealer, dealerDocuments: IDealerDocument[]) {


        //console.log(dealer.distributor.dealerids)
        const formData = new FormData();

        // Add dealer object properties to formData
        formData.append('dealerid', dealer.dealerid.toString());
        formData.append('firstname', dealer.firstname.toString());
        formData.append('middlename', dealer.middlename.toString());
        formData.append('lastname', dealer.lastname.toString());
        formData.append('emailaddress', dealer.emailaddress.toString());
        formData.append('password', dealer.password.toString());
        formData.append('birthdate', dealer.birthdate.toString());
        formData.append('gender', dealer.gender.toString());
        formData.append('currentaddress', dealer.currentaddress.toString());
        formData.append('permanentaddress', dealer.permanentaddress.toString());
        formData.append('contactnumber', dealer.contactnumber.toString());
        formData.append('hasbusiness', dealer.hasbusiness.toString());
        formData.append('businessname', dealer.businessname.toString());
        formData.append('businessphone', dealer.businessphone.toString());
        formData.append('businessaddress', dealer.businessaddress.toString());
        formData.append('businesstin', dealer.businesstin.toString());
        formData.append('creditlimit', dealer.creditlimit.toString());
        formData.append('submissiondate', dealer.submissiondate.toString());
        formData.append('confirmed', dealer.confirmed.toString());
        formData.append('remarks', dealer.remarks.toString());

        formData.append('distributor.distributorid', dealer.distributor.distributorid.toString());
        formData.append('distributor.firstname', dealer.distributor.firstname.toString());
        formData.append('distributor.middlename', dealer.distributor.middlename.toString());
        formData.append('distributor.lastname', dealer.distributor.lastname.toString());
        formData.append('distributor.emailaddress', dealer.distributor.emailaddress.toString());
        formData.append('distributor.password', dealer.distributor.password.toString());
        formData.append('distributor.birthdate', dealer.distributor.birthdate.toString());
        formData.append('distributor.gender', dealer.distributor.gender.toString());
        formData.append('distributor.currentaddress', dealer.distributor.currentaddress.toString());
        formData.append('distributor.permanentaddress', dealer.distributor.permanentaddress.toString());
        formData.append('distributor.contactnumber', dealer.distributor.contactnumber.toString());

        dealer.distributor.dealerids.forEach((dealerid) => {
            formData.append(`distributor.dealerids`, dealerid);
        });


        dealer.distributor.employeeids.forEach((employeeid) => {
            formData.append(`distributor.employeeids`, employeeid);
        });

        dealer.distributor.orderids.forEach((orderid) => {
            formData.append(`distributor.orderids`, orderid);
        });



        dealerDocuments.forEach((document) => {

            formData.append(`documentid`, document.documentid.toString());
            formData.append(`name`, document.name.toString());
            formData.append(`type`, document.type.toString());
            formData.append(`content`, new Blob([document.content], { type: 'application/octet-stream' }));
        });


        /* const dealerFormData: IDealer = {  
            dealerid:dealer.dealerid,
            firstname: dealer.firstname,
            middlename: dealer.middlename,
            lastname: dealer.lastname,
            email :dealer.email,
            password: dealer.password,
            birthdate: dealer.birthdate,
            gender: dealer.gender,
            currentaddress: dealer.currentaddress,
            permanentaddress: dealer.permanentaddress,
            contactnumber: dealer.contactnumber,
            hasbusiness: dealer.hasbusiness,
            businessname: dealer.businessname,
            businessphone: dealer.businessphone,
            businessaddress: dealer.businessaddress,
            businesstin: dealer.businesstin,
            creditlimit: dealer.creditlimit,
            submissiondate: dealer.submissiondate,
            confirmed: dealer.confirmed,
            remarks: dealer.remarks,
            distributor: dealer.distributor,
            orderids: dealer.orderids, // naa ta gihapon ni dapat
            documentids: [], }; */

        /* formData.forEach((value, key) => {
           console.log(key, value);
         });  */

        axios.post('http://localhost:8080/dealer/registerDealer', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then((response) => {



                alert('Success!');
            })
            .catch((error) => {
                console.log(error)
                alert('Error creating a new record. Please try again.');
            });


    }

    function confirmDealer(dealerID: string, creditLimit: number) {
        const confirmDealer = {
            dealerid: dealerID,
            confirmed: true,
            creditlimit: creditLimit,
        };

        axios.put(`http://localhost:8080/dealer/confirmDealer/${dealerID}`, confirmDealer, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((response) => {
                alert('The dealer confirmed successfully!');
            })
            .catch((error) => {
                alert('Error dealer confirmation. Please try again.');
            });
    }

    function markDealerAsPending(dealerID: string, reason: string) {
        const pendingDealer = {
            dealerid: dealerID,
            confirmed: false,
            remarks: reason,
        };

        axios.put(`http://localhost:8080/dealer/updateDealerPending/${dealerID}`, pendingDealer, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((response) => {
                alert('Dealer status updated to pending successfully!');
            })
            .catch((error) => {
                alert('Error updating dealer status to pending. Please try again.');
            });
    }

    function declineDealer(dealerID: string, reason: string, dateArchived: string) {
        console.log(dealerID + dateArchived)

        const declineDealer = {
            remarks: reason,
            datearchived: dateArchived,
        };

        axios.put(`http://localhost:8080/dealer/updateDealerDecline/${dealerID}`, null, {
            params: {
                remarks: reason,
                datearchived: dateArchived,
            }
        })
            .then((response) => {
                alert('Dealer declined successfully!');
            })
            .catch((error) => {
                console.log(error)
                alert('Error declininig dealer. Please try again.');
            });
    }


    function getDealerByID(dealerID: String) {
        axios.get(`http://localhost:8080/dealer/getDealerByID/${dealerID}`, {
            params: {
                dealerid: dealerID
            }
        })
            .then((response) => {
                setDealer(response.data);
                if (response.data !== null) {
                    setIsDealerFound(true);

                }
                else {
                    setIsDealerFound(false);
                }
            })
            .catch((error) => {
                console.error('Error retrieving dealer data:', error);
            });
    }
    return [getDealerByID, newDealer, confirmDealer, markDealerAsPending, declineDealer, isDealerFound, dealer,]
}
