import { Button, Grid, Modal, Stack, Typography, styled } from "@mui/material";
import { useEffect, useLayoutEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRestPaymentReceipt } from "../../RestCalls/PaymentReceiptUseRest";
import { useRestOrder } from "../../RestCalls/OrderUseRest";
import { ICollectionPaymentReceipt, ICollectorRemittanceProof, IDealerPaymentProof } from "../../RestCalls/Interfaces";
import AutorenewOutlinedIcon from '@mui/icons-material/AutorenewOutlined';
import axios from "axios";
import { PaymentReceiptDetailsPrint } from "./PaymentReceiptDetailsPrint";

const ContentNameTypography = styled(Typography)({
    marginTop: 60,
    marginLeft: '10%',
    fontFamily: 'Inter',
    fontWeight: 'bold',
    textAlign: 'left',
    fontSize: '25px',
    color: '#203949'
})

const StyledCollectorHeader = styled(Typography)({
    marginTop: '435px',
    marginLeft: '12%',
    fontFamily: 'Inter',
    fontWeight: 'bold',
    textAlign: 'left',
    fontSize: '20px',
    color: '#203949'
})
const StyledDealerHeader = styled(Typography)({
    marginTop: '-207px',
    marginLeft: '52%',
    fontFamily: 'Inter',
    fontWeight: 'bold',
    textAlign: 'left',
    fontSize: '20px',
    color: '#203949'
})

const StackStyle = styled(Stack)({
    position: 'absolute',
    top: '150px',
    //left: '32%'
})
const StyleLabel = styled(Typography)({
    position: 'absolute',
    textAlign: 'left',
    fontWeight: '550',
    left: '30px',
    color: '#707070',
    fontSize: '15px',
    width: 'max-content',
    fontFamily: 'Inter',
})
const StyleData = styled(Typography)({
    fontWeight: '550',
    position: 'absolute',
    textAlign: 'left',
    width: 600,
    left: '50px',
    top: '35px',
    color: '#203949',
    fontSize: '15px',
    fontFamily: 'Inter, sans - serif',
})

const ButtonDealerProof = styled(Button)({
    background: "#F5F7F9",
    color: "#203949",
    fontSize: 15,
    marginLeft: 600,
    marginTop: 25,
    marginBottom: 5,
    fontWeight: 'bold',
    borderRadius: 10,
    width: '220px',
    height: '60px',
    ':hover': {
        backgroundColor: '#F5F7F9',
        transform: 'scale(1.1)'
    },
    transition: 'all 0.4s'
});

const ButtonColectorProof = styled(Button)({
    background: "#F5F7F9",
    color: "#203949",
    fontSize: 15,
    marginLeft: -720,
    marginTop: 25,
    marginBottom: 5,
    fontWeight: 'bold',
    borderRadius: 10,
    width: '220px',
    height: '60px',
    ':hover': {
        backgroundColor: '#F5F7F9',
        transform: 'scale(1.1)'
    },
    transition: 'all 0.4s'
});

const StyledPrintDiv = styled('div')({

    '& Button': {
        fontSize: 12,
        color: '#000',
        fontFamily: 'Inter',
        width: '50px',
        height: 40,
        marginLeft: 20,
        ':hover': {
            backgroundColor: '#2C85E7',
            transform: 'scale(1.1)'
        },
        transition: 'all 0.4s',
    },

    // Print-specific styles using the @media print query
    '@media print': {

        '@page': {
            size: 'landscape',
        },
    },
});


export function PaymentReceiptDetails() {
    

    const { objectId } = useParams();

    const [createDirectPaymentReceipt, getPaymentReceiptByID, confirmCollectionPaymentReceipt, paymentReceipt, directPaymentReceipt, collectionPaymentReceipt, isPaymentReceiptFound] = useRestPaymentReceipt();
    const [newOrder, getOrderByID, assignCollector, removeCollector, order, isOrderFound, assignedStatus, removeStatus] = useRestOrder();


    const [collectorRemittanceProofs, setCollectorRemittanceProofs] = useState<ICollectorRemittanceProof[]>([]);
    const [dealerPaymentProofs, setDealerPaymentProofs] = useState<IDealerPaymentProof[]>([]);

    const [openCollectorProof, setOpenCollectorProof] = useState(false);
    const [openDealerProof, setOpenDealerProof] = useState(false);

    const [selectedCollectorProof, setSelectedCollectorProof] = useState<ICollectorRemittanceProof | null>(null);

    const [selectedDealerProof, setSelectedDealerProof] = useState<IDealerPaymentProof | null>(null);

    const handleOpenCollectorProof = (document: ICollectorRemittanceProof) => {
        if (document) {
            setSelectedCollectorProof(document);
            setOpenCollectorProof(true);
        }
    }
    const handleCloseCollectorProof = () => {
        setOpenCollectorProof(false);
    }

    const handleOpenDealerProof = (document: IDealerPaymentProof) => {
        if (document) {
            setSelectedDealerProof(document);
            setOpenDealerProof(true);
        }
    }
    const handleCloseDealerProof = () => {
        setOpenDealerProof(false);
    }


    const handleFindPaymentReceipt = () => {
        getPaymentReceiptByID(objectId!)
        //console.log(isOrderFoundError + "error")
    };


    const handleFindOrder = () => {
        getOrderByID(paymentReceipt?.paymenttransaction.orderid!)
    };


    function getAllCollectorRemittanceProofDocuments() {
        axios.get<ICollectorRemittanceProof[]>(`http://localhost:8080/collectorremittanceproof/findAllCollectorProofByCollectionPaymentReceiptId/${objectId!}`)
            .then((response) => { 
                setCollectorRemittanceProofs(response.data);

            })
            .catch((error) => {
                alert("Error retrieving collector remittance proofs. Please try again.");
            });
    }

    function getAllDealerPaymentProofDocuments() {
        axios.get<IDealerPaymentProof[]>(`http://localhost:8080/dealerpaymentproof/findAllDealerProofByCollectionPaymentReceiptId/${objectId!}`)
            .then((response) => {
                setDealerPaymentProofs(response.data);

            })
            .catch((error) => {
                alert("Error retrieving dealer payment proofs. Please try again.");
            });
    }


    useEffect(() => {
        handleFindPaymentReceipt();
        handleFindOrder();
        getAllCollectorRemittanceProofDocuments();
        getAllDealerPaymentProofDocuments();

        console.log(paymentReceipt?.receivername)

    }, [paymentReceipt]);

    const displayCollectorRemittanceProofs = (base64Content: Uint8Array | null, fileType: string, docname: string, collectorproofid: string, collectionpaymentreceiptparam: ICollectionPaymentReceipt) => {
        if (base64Content) {
            // Determine the appropriate way to display the file based on the file type

            if (fileType === 'application/pdf') {
                return (
                    <ButtonColectorProof variant={"contained"} onClick={() => handleOpenCollectorProof({
                        content: base64Content,
                        type: fileType,
                        name: docname,
                        collectorremittanceproofid: collectorproofid,
                        collectionPaymentReceipt: collectionpaymentreceiptparam!
                    })} >
                        {docname}
                    </ButtonColectorProof>
                );
            } else if (fileType.startsWith("image")) {
                return (
                    <ButtonColectorProof variant={"contained"} onClick={() => handleOpenCollectorProof({
                        content: base64Content,
                        type: fileType,
                        name: docname,
                        collectorremittanceproofid: collectorproofid,
                        collectionPaymentReceipt: collectionpaymentreceiptparam!
                    })}>
                        {docname}
                    </ButtonColectorProof>
                );
            } else {
                // Display a generic download link for other file types
                return (
                    <a href={`data:${fileType};base64,${base64Content}`} download={`document.${fileType}`}>
                        Download Document
                    </a>
                );
            }
        }
        else {
            return <div>No content available</div>;
        }
    };


    const displayDealerPaymentProofs = (base64Content: Uint8Array | null, fileType: string, docname: string, dealerproofid: string, collectionpaymentreceiptparam: ICollectionPaymentReceipt) => {
        if (base64Content) {
            // Determine the appropriate way to display the file based on the file type
            if (fileType === 'application/pdf') {
                return (
                    <ButtonDealerProof variant={"contained"} onClick={() => handleOpenDealerProof({
                        content: base64Content,
                        type: fileType,
                        name: docname,
                        dealerpaymentproofid: dealerproofid,
                        collectionPaymentReceipt: collectionpaymentreceiptparam!
                    })} >
                        {docname}
                    </ButtonDealerProof>

                );

            } else if (fileType.startsWith("image")) {
                return (
                    <ButtonDealerProof variant={"contained"} onClick={() => handleOpenDealerProof({
                        content: base64Content,
                        type: fileType,
                        name: docname,
                        dealerpaymentproofid: dealerproofid,
                        collectionPaymentReceipt: collectionpaymentreceiptparam!
                    })}>
                        {docname}
                    </ButtonDealerProof>
                );
            } else {
                // Display a generic download link for other file types
                return (
                    <a href={`data:${fileType};base64,${base64Content}`} download={`document.${fileType}`}>
                        Download Document
                    </a>
                );
            }
        }
        else {
            return <div>No content available</div>;
        }
    };

    
    const [printing, setPrinting] = useState(false);

    const handlePrint = () => {

        const printSettings = {
            scale: 0.7, // Set the scale to 70%
            orientation: 'landscape', // Set the orientation to landscape
        };


        setPrinting(true);
        setTimeout(() => {
            window.print();
            setPrinting(false);
        }, 10); // Add a delay to ensure rendering before printing (optional)
    };




    return (
     <div>
        {!printing ? (
               <div>
               <StyledPrintDiv>
                < ContentNameTypography > Order Transaction Details
                  < Button variant="outlined" onClick={handlePrint} >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z" />
                    </svg></Button >
                </ContentNameTypography >
              </StyledPrintDiv>

               <StackStyle sx={{ left: '12%' }}>
                   <StyleLabel>Receipt ID</StyleLabel>
                   <StyleData>{paymentReceipt?.paymentreceiptid}</StyleData>
               </StackStyle>
               <StackStyle sx={{ left: '24%' }}>
                   <StyleLabel>Payment Transaction ID</StyleLabel>
                   <StyleData>{paymentReceipt?.paymenttransaction.paymenttransactionid}</StyleData>
               </StackStyle>
               <StackStyle sx={{ left: '42%' }}>
                   <StyleLabel>Dealer ID</StyleLabel>
                   <StyleData>{order?.dealer.dealerid}</StyleData>
               </StackStyle>
               <StackStyle sx={{ left: '58%' }}>
                   <StyleLabel>Dealer Name</StyleLabel>
                   <StyleData>{order?.dealer.firstname! + " " + order?.dealer.lastname!}</StyleData>
               </StackStyle>
               <StackStyle sx={{ left: '72%' }}>
                   <StyleLabel>Payment Type</StyleLabel>
                   <StyleData>{paymentReceipt?.paymenttype}</StyleData>
               </StackStyle>
   
               {paymentReceipt && paymentReceipt?.paymenttype === 'direct' ? (
                   <div>
   
                       <StackStyle sx={{ top: '40%', left: '12%' }}>
                           <StyleLabel>Date Paid</StyleLabel>
                           <StyleData>{new Date(directPaymentReceipt?.datepaid!).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</StyleData>
                       </StackStyle>
                       <StackStyle sx={{ top: '40%', left: '26%' }}>
                           <StyleLabel>Amount Collected</StyleLabel>
                           <StyleData>{directPaymentReceipt?.amountpaid}</StyleData>
                       </StackStyle>
                       <StackStyle sx={{ top: '40%', left: '44%' }}>
                           <StyleLabel>Receiver Name</StyleLabel>
                           <StyleData>{ paymentReceipt?.receivername
                               } </StyleData>
                       </StackStyle>
                       <StackStyle sx={{ top: '40%', left: '60%' }}>
                           <StyleLabel>Remarks</StyleLabel>
                           <StyleData>{paymentReceipt?.remarks}</StyleData>
                       </StackStyle>
   
                   </div>
   
               ) : (
                   <div>
                       <StackStyle sx={{ top: '40%', left: '12%' }}>
                           <StyleLabel>Date Collected</StyleLabel>
                           <StyleData>{new Date(collectionPaymentReceipt?.collectiondate!).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</StyleData>
                       </StackStyle>
                       <StackStyle sx={{ top: '40%', left: '26%' }}>
                           <StyleLabel>Amount Collected</StyleLabel>
                           <StyleData>{collectionPaymentReceipt?.collectionamount}</StyleData>
                       </StackStyle>
                       <StackStyle sx={{ top: '40%', left: '44%' }}>
                           <StyleLabel>Date Remitted</StyleLabel>
                           <StyleData>{new Date(collectionPaymentReceipt?.remitteddate!).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} </StyleData>
                       </StackStyle>
                       <StackStyle sx={{ top: '40%', left: '60%' }}>
                           <StyleLabel>Amount Remitted</StyleLabel>
                           <StyleData>{collectionPaymentReceipt?.remittedamount}</StyleData>
                       </StackStyle>
                       <StackStyle sx={{ top: '40%', left: '74%' }}>
                           <StyleLabel>Collector Name</StyleLabel>
                           <StyleData>{order?.collector!.firstname + " " + order?.collector!.lastname}</StyleData>
                       </StackStyle>
                       <StackStyle sx={{ top: '60%', left: '12%' }}>
                           <StyleLabel>Payment Status</StyleLabel>
                           <StyleData>{collectionPaymentReceipt?.isconfirmed ? "Confirmed" : "Unconfirmed"}</StyleData>
                       </StackStyle>
   
                       <StackStyle sx={{ top: '60%', left: '27%' }}>
                           <StyleLabel>Date Received</StyleLabel>
                           <StyleData>{new Date(collectionPaymentReceipt?.confirmationdate!).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</StyleData>
                       </StackStyle>
   
                       <StackStyle sx={{ top: '60%', left: '43%' }}>
                           <StyleLabel>Receiver Name</StyleLabel>
                           <StyleData>{paymentReceipt?.receivername}</StyleData>
                       </StackStyle>
   
                       <StackStyle sx={{ top: '60%', left: '60%' }}>
                           <StyleLabel>Remarks</StyleLabel>
                           <StyleData>{paymentReceipt?.remarks}</StyleData>
                       </StackStyle>
   
                       <div style={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap' }}>
                           <StyledCollectorHeader>Collector Proofs </StyledCollectorHeader>
                           {collectorRemittanceProofs!.map((document) => (
                               <div key={document.collectorremittanceproofid}>
                                   {displayCollectorRemittanceProofs(document.content, document.type, document.name, document.collectorremittanceproofid, document.collectionPaymentReceipt!)}
                               </div>
                           ))}
                       </div>
                       <Modal
                           open={openCollectorProof}
                           onClose={handleCloseCollectorProof} >
                           <div>
                               <button onClick={handleCloseCollectorProof}>Close</button>
                               {selectedCollectorProof && (
                                   <div>
                                       {selectedCollectorProof.type === 'application/pdf' ? (
                                           <iframe
                                               title="PDF Document"
                                               src={`data:application/pdf;base64,${selectedCollectorProof.content}`}
                                               width="100%"
                                               height="1000px"
                                           />
                                       ) : selectedCollectorProof.type.startsWith("image") ? (
                                           <img
                                               src={`data:${selectedCollectorProof.type};base64,${selectedCollectorProof.content}`}
                                               alt="Document"
                                               style={{ maxWidth: '100%', maxHeight: '10000px' }}
                                           />
                                       ) : (
                                           <a href={`data:${selectedCollectorProof.type};base64,${selectedCollectorProof.content}`} download={`document.${selectedCollectorProof.type}`}>
                                               Download Document
                                           </a>
                                       )}
                                   </div>
                               )}
                           </div>
                       </Modal>
   
   
                       <div style={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap' }}>
                       <StyledDealerHeader>Dealer Payment Proofs </StyledDealerHeader>
                       {dealerPaymentProofs!.map((document) => (
                           <div key={document.dealerpaymentproofid}>
                               {displayDealerPaymentProofs(document.content, document.type, document.name, document.dealerpaymentproofid, document.collectionPaymentReceipt!)}
   
                           </div>
                       ))}
                       </div>
                       <Modal
                           open={openDealerProof}
                           onClose={handleCloseDealerProof} >   
                           <div>
                               <button onClick={handleCloseDealerProof}>Close</button>
                               {selectedDealerProof && (
                                   <div>
                                       {selectedDealerProof.type === 'application/pdf' ? (
                                           <iframe
                                               title="PDF Document"
                                               src={`data:application/pdf;base64,${selectedDealerProof.content}`}
                                               width="100%"
                                               height="1000px"
                                           />
                                       ) : selectedDealerProof.type.startsWith("image") ? (
                                           <img
                                               src={`data:${selectedDealerProof.type};base64,${selectedDealerProof.content}`}
                                               alt="Document"
                                               style={{ maxWidth: '100%', maxHeight: '10000px' }}
                                           />
                                       ) : (
                                           <a href={`data:${selectedDealerProof.type};base64,${selectedDealerProof.content}`} download={`document.${selectedDealerProof.type}`}>
                                               Download Document
                                           </a>
                                       )}
                                   </div>
                               )}
                           </div>
                       </Modal>
                   </div >
               )
               }
           </div >
        ) : (
            <PaymentReceiptDetailsPrint paymentReceipt={paymentReceipt!} directPaymentReceipt={directPaymentReceipt!} collectionPaymentReceipt={collectionPaymentReceipt!} order={order!}/>
        )}
     </div>
    );
}
