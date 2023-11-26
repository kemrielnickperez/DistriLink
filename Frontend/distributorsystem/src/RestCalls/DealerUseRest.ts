import axios, { } from "axios";
import { useState } from "react";
import { IDealer, IDealerDocument } from "./Interfaces";
import { toast } from "react-toastify";
import { error } from "console";
import de from "date-fns/locale/de";
import { response } from "express";





export const useRestDealer = (): [
    (dealerID: string) => void,
    (dealerID: String, distributorid: string) => void,
    (dealer: IDealer, dealerDocuments: IDealerDocument[]) => void,
    (dealerID: string, creditlimit: number) => void,
    (dealerID: string, remarks: string) => void,
    (dealerID: string, remarks: string, dateArchived: string) => void,
    () => void,
    (dealerID: string, creditLimit: number) => void,
    boolean | undefined,
    boolean | undefined,
    IDealer | undefined, number | undefined] => {

    const [dealer, setDealer] = useState<IDealer | null>();
    const [isDealerFound, setIsDealerFound] = useState(false);
    const [isDealerConfirmed, setIsDealerConfirmed] = useState(false);
    const [dealerCreditLimit, setDealerCreditLimit] = useState(0);
    const [dealerRemainingCredit, setDealerRemainingCredit] = useState(0);

    let creditLimit = 0;


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


        axios.put(`http://localhost:8080/dealer/confirmDealer/${dealerID}`, null, {
            params: {
                creditlimit: creditLimit,
            }
        })
            .then((response) => {
                // alert('The dealer confirmed successfully!');
                toast.success('Dealer has now been confirmed!', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                })
            })
            .catch((error) => {
                // alert('Error dealer confirmation. Please try again.');
                toast.error('Unexpected dealer upon confirming dealer. Please try again.', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                })
            });
    }

    function markDealerAsPending(dealerID: string, reason: string) {


        axios.put(`http://localhost:8080/dealer/updateDealerPending/${dealerID}`, null, {
            params: {
                remarks: reason,
            }
        })
            .then((response) => {
                // alert('Dealer status updated to pending successfully!');
                toast.success("Dealer's status is on pending!", {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                })
            })
            .catch((error) => {
                //alert('Error updating dealer status to pending. Please try again.');
                toast.error("Unexpected Error pending a dealer. Please try again", {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                })
            });
    }

    function declineDealer(dealerID: string, reason: string, dateArchived: string) {
        console.log(dealerID + dateArchived)

        axios.put(`http://localhost:8080/dealer/updateDealerDecline/${dealerID}`, null, {
            params: {
                remarks: reason,
                datearchived: dateArchived,
            }
        })
            .then((response) => {
                //alert('Dealer declined successfully!');
                toast.success("Dealer declined successfully!", {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                })
            })
            .catch((error) => {
                console.log(error)
                //alert('Error declininig dealer. Please try again.');
                toast.error("Unexpected Error decline a dealer. Please try again", {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                })
            });
    }

    function updateDealerCreditLimit(dealerID: string, creditLimit: number) {
        axios.put(`http://localhost:8080/dealer/updateCreditLimit/${dealerID}`, null, {
            params: {
                creditlimit: creditLimit,
            }
        })
            .then((response) => {
                // alert('Dealer status updated to pending successfully!');
                toast.success("Dealer Credit Limit is Updated!", {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                })
            })
            .catch((error) => {
                //alert('Error updating dealer status to pending. Please try again.');
                toast.error("Unexpected Error Updating Credit Limit. Please try again", {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                })
            });
    }


    function getDealerByID(dealerID: string) {
        let creditLimit = 0;
        let remainingCredit = 0;
        axios.get(`http://localhost:8080/dealer/getDealerByID/${dealerID}`)
            .then((response) => {


                if (response.data !== null) {
                    if (response.data.isconfirmed !== false) {
                        setDealer(response.data);
                        setIsDealerFound(true);
                    }
                    else {
                        alert("wala pa ni siya na confirm, use lain dealer please")
                    }
                    creditLimit = response.data.creditlimit;
                    setDealerCreditLimit(creditLimit)
                    toast.success("Dealer found successfully! Dealer Credit Limit: ₱" + response.data.creditlimit, {
                        position: "bottom-right",
                        autoClose: 5000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    })

                }
                else {
                    setIsDealerFound(false);
                }
            })
            .catch((error) => {
                console.error('Error retrieving dealer data:', error);
            });

        axios.get(`http://localhost:8080/dealer/getTotalOrderAmountByDealerID/${dealerID}`)
            .then((response) => {
                setDealerCreditLimit(response.data);
                remainingCredit = creditLimit - response.data;
                console.log("remaining credit" + remainingCredit);
                setDealerRemainingCredit(remainingCredit);
                toast.success("Total Ordered Amount: ₱" + response.data + ". Remaining Credit: ₱" + remainingCredit, {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                })
            })
            .catch((error) => {
                console.error('Error retrieving dealer credit limit:', error);
            });

    }

    function getDealerByDistributor(dealerID: String, distributorid: string) {
        axios.get(`http://localhost:8080/dealer/getDealerByDistributor/${dealerID}/${distributorid}`)
            .then((response) => {
                if (response.data !== '') {
                    if (response.data.isconfirmed !== false) {
                        setDealer(response.data);
                        setIsDealerFound(true);
                        setIsDealerConfirmed(true);
                        setDealerCreditLimit(response.data.creditlimit)
                        creditLimit = response.data.creditlimit;
                        toast.success("Dealer found successfully! Dealer Credit Limit: ₱" + response.data.creditlimit, {
                            position: "bottom-right",
                            autoClose: 5000,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "colored",
                        })
                        setDealerRemainingCredit(getRemainingDealerCredit(response.data.dealerid));
                    }
                    else {
                        //setIsDealerFound(true);
                        setIsDealerConfirmed(false);
                        toast.warning("Dealer not yet confirmed. Please confirm in the Dealer Profiles List.", {
                            position: "bottom-right",
                            autoClose: 5000,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "colored",
                        })

                    }

                }
                else {
                    setIsDealerFound(false);
                    setIsDealerConfirmed(false);
                    toast.error("Dealer not found! Please try again.", {
                        position: "bottom-right",
                        autoClose: 5000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    })

                }
            })
            .catch((error) => {
                console.error('Error retrieving dealer data:', error);
            });
    }

    function getRemainingDealerCredit(dealerID: string) {

        let remainingCredit = 0;
        axios.get(`http://localhost:8080/dealer/getTotalOrderAmountByDealerID/${dealerID}`)
            .then((response) => {

                remainingCredit = creditLimit - response.data;
                setDealerRemainingCredit(remainingCredit);
                toast.success("Total Ordered Amount: ₱" + response.data + ". Remaining Credit: ₱" + remainingCredit, {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                })

            })
            .catch((error) => {
                console.error('Error retrieving dealer credit limit:', error);
            });

        return remainingCredit;
    }


    function resetDealer() {
        setIsDealerFound(false);
        setDealer(null);
    }


    return [getDealerByID, getDealerByDistributor, newDealer, confirmDealer, markDealerAsPending, declineDealer, resetDealer, updateDealerCreditLimit, isDealerFound, isDealerConfirmed, dealer!, dealerRemainingCredit]
}

