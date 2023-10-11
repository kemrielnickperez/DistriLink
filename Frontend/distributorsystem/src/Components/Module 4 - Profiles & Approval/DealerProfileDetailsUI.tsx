import { useEffect, useLayoutEffect, useState } from "react";
import { useRestDealer } from "../../RestCalls/DealerUseRest";
import { IDealer, IDealerDocument } from "../../RestCalls/Interfaces";
import axios from "axios";
import { Box, Button, Grid, Modal, Stack, Typography, styled } from "@mui/material";
import AutorenewOutlinedIcon from '@mui/icons-material/AutorenewOutlined';


const ContentNameTypography = styled(Typography)({
    marginTop: 60,
    marginLeft: '8%',
    fontFamily: 'Inter',
    fontWeight: 'bold',
    textAlign:'left',
    fontSize: '25px',
    color:'#203949'
})


const StyldeInfoHeader= styled(Typography)({
    marginTop: '85px',
    marginBottom: '90px',
    marginLeft: '10%',
    fontFamily: 'Inter',
    fontWeight: 'bold',
    textAlign:'left',
    fontSize: '20px',
    color:'#203949'
})
const StackStyle = styled(Stack)({
    position: 'absolute', 
    top: '230px', 
    left: '-12%',
    fontFamily: 'Inter',

})
const StyleLabel=styled(Typography)({
    position: 'absolute',
    textAlign: 'left',
    fontWeight: '550',
    left: '-165px',
    color: '#707070',
    fontSize: '15px',
    width:'max-content',
    fontFamily: 'Inter',  
}) 
const StyleData=styled(Typography)({

    position: 'absolute',
    textAlign: 'left',
    width: 200,
    left: '-140px',
    top:'35px',
    color: '#203949',
    fontSize: '15px',
    fontFamily: 'Inter, sans - serif',
})


export default function DealerProfileDetails() {


    const [getDealerByID, newDealer, isDealerFound, dealer] = useRestDealer();


    const [dealerDocuments, setDealerDocuments] = useState<IDealerDocument[]>([]);



    const [open, setOpen] = useState(false);
    const [selectedDocument, setSelectedDocument] = useState<IDealerDocument | null>(null);

    const handleOpenDocument = (document: IDealerDocument) => {
        if (document) {
            setSelectedDocument(document);
            setOpen(true);
        }
    }
    const handleCloseDocument = () => {
        setOpen(false);
    }


    const handleFindDealer = () => {
     
        getDealerByID("1aca2058");
    };


    function getAllDealerDocuments() {
        axios.get<IDealerDocument[]>('http://localhost:8080/dealerdocument/findAllDocumentsByDealerId/1aca2058')
            .then((response) => {
                setDealerDocuments(response.data);

            })
            .catch((error) => {
                alert("Error retrieving dealer documents. Please try again.");
            });
    }

    useLayoutEffect(() => {
        handleFindDealer();
        getAllDealerDocuments();
    }, [dealer, dealerDocuments]);

    const displayFile = (base64Content: Uint8Array | null, fileType: string, docname: string, documentid: string, dealerparam: IDealer) => {
        if (base64Content) {
            // Determine the appropriate way to display the file based on the file type
            if (fileType === 'application/pdf') {
                return (
                    <Button variant={"contained"} onClick={() => handleOpenDocument({
                        content: base64Content,
                        type: fileType,
                        name: docname,
                        documentid: documentid,
                        dealer: dealerparam!
                    })} >
                        Open PDF
                    </Button>
                );
            } else if (fileType.startsWith('image')) {
                return (
                <Button variant={"contained"} onClick={() => handleOpenDocument({
                    content: base64Content,
                    type: fileType,
                    name: docname,
                    documentid: documentid,
                    dealer: dealerparam!
                })}>
                    Open Image
                </Button>
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

    return (
        <div>
    <ContentNameTypography>Dealer Profile Details</ContentNameTypography>
    {dealer ? (
      <div>
        {/* Render dealer details */}
            <StyldeInfoHeader>Dealer Information</StyldeInfoHeader>
            <StackStyle sx={{left:'30%'}}>
                <StyleLabel>Dealer Name</StyleLabel>
                <StyleData>{dealer?.firstname} {dealer?.middlename} {dealer?.lastname}</StyleData>
            </StackStyle>
            <StackStyle sx={{left:'50%'}}>
                <StyleLabel>Dealer ID</StyleLabel>
                <StyleData>{dealer?.dealerid}</StyleData>
            </StackStyle>
            <StackStyle sx={{left:'65%'}}>
                <StyleLabel>Credit Limit</StyleLabel>
                <StyleData>Php {dealer?.creditlimit}</StyleData>
            </StackStyle>
            <StyldeInfoHeader>Basic Information</StyldeInfoHeader>
            <StackStyle sx={{left:'30%', top:'350px'}}>
                <StyleLabel>Gender</StyleLabel>
                <StyleData>{dealer?.gender}</StyleData>
            </StackStyle>
            <StackStyle sx={{left:'45%', top:'350px'}}>
                <StyleLabel>Birthdate</StyleLabel>
                <StyleData>{dealer?.birthdate}</StyleData>
            </StackStyle>
            <StackStyle sx={{left:'60%', top:'350px'}}>
                <StyleLabel>Contact Number</StyleLabel>
                <StyleData>{dealer?.contactnumber}</StyleData>
            </StackStyle>
            <StackStyle sx={{left:'75%', top:'350px'}}>
                <StyleLabel>Current Address</StyleLabel>
                <StyleData>{dealer?.currentaddress}</StyleData>
            </StackStyle>
            <StackStyle sx={{left:'90%', top:'350px'}}>
                <StyleLabel>Permanent Address</StyleLabel>
                <StyleData>Php {dealer?.permanentaddress}</StyleData>
            </StackStyle>
           
            <h1>Dealer Documents</h1>
            {dealerDocuments.map((document) => (
                <div key={document.documentid}>
                    <h2>{document.type}</h2>
                    {displayFile(document.content, document.type, document.name, document.documentid, document.dealer!)}

                </div>
            ))}
            <Modal
                open={open}
                onClose={handleCloseDocument}
            >
                <div>
                    <button onClick={handleCloseDocument}>Close</button>
                    {selectedDocument && (
                        <div>
                            {selectedDocument.type === 'application/pdf' ? (
                                <iframe
                                    title="PDF Document"
                                    src={`data:application/pdf;base64,${selectedDocument.content}`}
                                    width="100%"
                                    height="1000px"
                                />
                            ) : selectedDocument.type.startsWith("image") ? (
                                <img
                                    src={`data:${selectedDocument.type};base64,${selectedDocument.content}`}
                                    alt="Document"
                                    style={{ maxWidth: '100%', maxHeight: '10000px' }}
                                />
                            ) : (
                                <a href={`data:${selectedDocument.type};base64,${selectedDocument.content}`} download={`document.${selectedDocument.type}`}>
                                    Download Document
                                </a>
                            )}
                        </div>
                    )}
                </div>
            </Modal>
      </div>
      
            ) : (
                <Grid sx={{ justifyContent: "center", marginTop: '200px' }}>
                {dealer === null ? (
                  <>
                    <AutorenewOutlinedIcon />
                    <h4>Loading...</h4>
                  </>
                ) : (
                  <p>Dealer not found.</p>
                )}
              </Grid>
            )}
        </div>  
    );
    




}