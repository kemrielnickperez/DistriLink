import { useEffect, useState } from "react";
import { useRestDealer } from "../../RestCalls/DealerUseRest";
import { IDealer, IDealerDocument } from "../../RestCalls/Interfaces";
import axios from "axios";
import { Button, Grid, Icon, Modal, Paper, Stack, Typography, styled } from "@mui/material";
import AutorenewOutlinedIcon from '@mui/icons-material/AutorenewOutlined';
import PersonIcon from '@mui/icons-material/Person';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import profilepic from "./profilepic.png"
import { useParams } from "react-router-dom";


const ContentNameTypography = styled(Typography)({
    marginTop: 60,
    marginLeft: '8%',
    fontFamily: 'Inter',
    fontWeight: 'bold',
    textAlign: 'left',
    fontSize: '25px',
    color: '#203949'
})


const StyldeInfoHeader = styled(Typography)({
    marginTop: '170px',
    marginBottom: '20px',
    marginLeft: '10%',
    fontFamily: 'Inter',
    fontWeight: 'bold',
    textAlign: 'left',
    fontSize: '20px',
    color: '#203949'
})


const StackStyle = styled(Stack)({
    position: 'absolute',
    top: '230px',
    left: '-12%',
    fontFamily: 'Inter',

})
const StyleLabel = styled(Typography)({
    position: 'absolute',
    textAlign: 'left',
    fontWeight: '550',
    left: '-165px',
    color: '#707070',
    fontSize: '17px',
    width: 'max-content',
    fontFamily: 'Inter',
})
const StyleData = styled(Typography)({

    position: 'absolute',
    textAlign: 'left',
    width: 250,
    left: '-140px',
    top: '35px',
    color: '#203949',
    fontSize: '17px',
    fontFamily: 'Inter, sans - serif',
})

const StyleMainInfo = styled(Typography)({
    fontWeight: 'bold',
    position: 'absolute',
    textAlign: 'left',
    width: 300,
    left: '-140px',
    top: '35px',
    color: '#203949',
    fontSize: '20px',
    fontFamily: 'Inter',
})

const StyleCredit = styled(Paper)({
    backgroundColor: '#ffffff',
    fontFamily: 'Inter',
    fontSize: '20px',
    fontWeight: 'bold',
    textAlign: 'center',
    border: 'light',
    borderRadius: '20px',
    position: 'absolute',
    width: '150px',
    height: '25px',
    left: '-150px',
    top: '35px',

  })

const ButtonInfo = styled(Button)({
    background: "#F5F7F9",
    color: "#203949",
    fontSize: 20,
    marginLeft: 100,
    marginTop: -170,
    paddingLeft: 6,
    paddingRight: 6,
    fontWeight: 'bold',
    borderRadius: 10,
    width: '320px',
    height: '60px',
    ':hover': {
        backgroundColor: '#F5F7F9',
        transform: 'scale(1.1)'
    },
    transition: 'all 0.4s'
});

const ButtonCredit = styled(Button)({
    background: "#F5F7F9",
    color: "#203949",
    fontSize: 15,
    fontWeight: 'bold',
    borderRadius: 10,
    width: '90px',
    height: '40px',
    ':hover': {
        backgroundColor: '#F5F7F9',
        transform: 'scale(1.1)'
    },
    transition: 'all 0.4s'
});

const ButtonDocument = styled(Button)({
    background: "#F5F7F9",
    color: "#203949",
    fontSize: 15,
    marginLeft: 180,
    marginTop: -5,
    marginBottom: 20,
    paddingLeft: 3,
    paddingRight: 3,
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


export default function DealerProfileDetails() {


    const { objectId } = useParams();
    const BasicInfo = () => (
        <>
            <StackStyle sx={{ left: '40%', top: '380px' }}>
                <StyleLabel>Gender</StyleLabel>
                <StyleData>{dealer?.gender}</StyleData>
            </StackStyle>
            <StackStyle sx={{ left: '60%', top: '380px' }}>
                <StyleLabel>Birthdate</StyleLabel>
                <StyleData>{dealer?.birthdate}</StyleData>
            </StackStyle>
            <StackStyle sx={{ left: '80%', top: '380px' }}>
                <StyleLabel>Contact Number</StyleLabel>
                <StyleData>{dealer?.contactnumber}</StyleData>
            </StackStyle>
            <StackStyle sx={{ left: '40%', top: '470px' }}>
                <StyleLabel>Current Address</StyleLabel>
                <StyleData>{dealer?.currentaddress}</StyleData>
            </StackStyle>
            <StackStyle sx={{ left: '60%', top: '470px' }}>
                <StyleLabel>Permanent Address</StyleLabel>
                <StyleData>{dealer?.permanentaddress}</StyleData>
            </StackStyle>
        </>
    )

    const BusinessInfo = () => (
        <>
            <StackStyle sx={{ left: '40%', top: '380px' }}>
                <StyleLabel>Business Name</StyleLabel>
                <StyleData>{dealer?.businessname}</StyleData>
            </StackStyle>
            <StackStyle sx={{ left: '70%', top: '380px' }}>
                <StyleLabel>Business Phone No.</StyleLabel>
                <StyleData>{dealer?.businessphone}</StyleData>
            </StackStyle>
            <StackStyle sx={{ left: '40%', top: '470px' }}>
                <StyleLabel>Business Address</StyleLabel>
                <StyleData>{dealer?.businessaddress}</StyleData>
            </StackStyle>
            <StackStyle sx={{ left: '70%', top: '470px' }}>
                <StyleLabel>Tin No.</StyleLabel>
                <StyleData>{dealer?.businesstin}</StyleData>
            </StackStyle>
        </>
    )

    const [getDealerByID, newDealer, isDealerFound, dealer] = useRestDealer();

    const [dealerDocuments, setDealerDocuments] = useState<IDealerDocument[]>([]);



    const [open, setOpen] = useState(false);

    const [selectedDocument, setSelectedDocument] = useState<IDealerDocument | null>(null);

    const [displayInfo, setDisplayInfo] = useState(<BasicInfo />);

    const [isEditing, setIsEditing] = useState(false);

    const [editedCreditLimit, setEditedCreditLimit] = useState(dealer?.creditlimit);

    const basicInfoClickHandler = () => {
        setDisplayInfo(<BasicInfo />)
    };

    const businessInfoClickHandler = () => {
        setDisplayInfo(<BusinessInfo />)
    }

    const handleOpenDocument = (document: IDealerDocument) => {
        if (document) {
            setSelectedDocument(document);
            setOpen(true);
        }
    }
    const handleCloseDocument = () => {
        setOpen(false);
    }



    // Check if objectId is defined before calling the getDealerByID function
    useEffect(() => {
        if (objectId) {
            handleFindDealer();
            getAllDealerDocuments();
        }
    }, [objectId, dealer, dealerDocuments]);

    const handleFindDealer = () => {
     
        getDealerByID("1aca2058");
    };

    function getAllDealerDocuments() {
        axios.get<IDealerDocument[]>(`http://localhost:8080/dealerdocument/findAllDocumentsByDealerId/${objectId!}`)
            .then((response) => {
                setDealerDocuments(response.data);

            })
            .catch((error) => {
                alert("Error retrieving dealer documents. Please try again.");
            });
    }


    // useLayoutEffect(() => {
    //     handleFindDealer();
    //     getAllDealerDocuments();
    // }, [dealer, dealerDocuments]);

    const displayFile = (base64Content: Uint8Array | null, fileType: string, docname: string, documentid: string, dealerparam: IDealer) => {
        if (base64Content) {
            // Determine the appropriate way to display the file based on the file type
            if (fileType === 'application/pdf') {
                return (
                    <ButtonDocument variant={"contained"} onClick={() => handleOpenDocument({
                        content: base64Content,
                        type: fileType,
                        name: docname,
                        documentid: documentid,
                        dealer: dealerparam!
                    })} >
                        {docname}
                    </ButtonDocument>
                );
            } else if (fileType.startsWith('image')) {
                return (
                    <ButtonDocument variant={"contained"} onClick={() => handleOpenDocument({
                        content: base64Content,
                        type: fileType,
                        name: docname,
                        documentid: documentid,
                        dealer: dealerparam!
                    })}>
                        {docname}
                    </ButtonDocument>
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

    const handleEditCreditLimit = () => {
        setIsEditing(true);
    };

    const handleSaveCreditLimit = () => {
        // Send the updated credit limit to the server using an API call.
        // You'll need to implement the API endpoint for updating the credit limit.
        // After a successful update, you can set isEditing to false.

        // Example API call using Axios (make sure to import Axios):
        axios.put(`http://your-api-endpoint/update-credit-limit`, {
            dealerId: dealer?.dealerid,
            creditLimit: editedCreditLimit,
        })
            .then((response) => {
                setIsEditing(false);
                // You can update the 'dealer' object in the state with the updated credit limit here if needed.
            })
            .catch((error) => {
                console.error("Error updating credit limit:", error);
                // Handle the error appropriately.
            });
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        // Reset the edited credit limit to the current value.
        setEditedCreditLimit(dealer?.creditlimit);
    };


    return (
        <div>
            {dealer ? (
                <div>
                    <Grid item>
                        <Grid item>
                            <ContentNameTypography>Dealer Profile Details</ContentNameTypography>
                            <img src={profilepic} style={{ height: '250px', margin: '30px 500px 0px -550px' }}></img>
                        </Grid>
                    </Grid>
                    {/* Render dealer details */}
                    <StackStyle sx={{ left: '40%', top: '20%' }}>
                        <StyleLabel>Dealer Name</StyleLabel>
                        <StyleMainInfo>{dealer?.firstname} {dealer?.middlename} {dealer?.lastname}</StyleMainInfo>
                    </StackStyle>
                    <StackStyle sx={{ left: '61%', top: '20%' }}>
                        <StyleLabel>Dealer ID</StyleLabel>
                        <StyleMainInfo>{dealer?.dealerid}</StyleMainInfo>
                    </StackStyle>
                    <StackStyle sx={{ left: '75%', top: '19%' }}>
                        <StyleLabel>Credit Limit <Icon onClick={handleEditCreditLimit}> <EditOutlinedIcon /> </Icon></StyleLabel>
                        {isEditing ? (
                            <div>
                                <div style={{ display: "grid", gridTemplateColumns: "1fr auto auto", gridGap: "10px", alignItems: "left" }}>
                                    <input
                                        type="number"
                                        value={editedCreditLimit || ""}
                                        onChange={(e) => setEditedCreditLimit(parseInt(e.target.value, 10) || undefined)}
                                    />
                                    <div >
                                        <ButtonCredit variant="contained" onClick={handleSaveCreditLimit} >
                                            Save
                                        </ButtonCredit>
                                        </div>
                                    <div>
                                        <ButtonCredit variant="contained"  onClick={handleCancelEdit} >
                                            Cancel
                                        </ButtonCredit>
                                        </div>
                                </div>
                            </div>
                        ) : (
                            <StyleCredit>
                                Php {dealer?.creditlimit}
                            </StyleCredit>
                        )}
                    </StackStyle>
                    <ButtonInfo variant="contained" onClick={basicInfoClickHandler}>
                        <Icon style={{ color: '#203949', height: '50px', marginTop: '15px', marginRight: '15px' }}>
                            <PersonIcon />
                        </Icon>
                        Basic Information
                    </ButtonInfo>
                    <ButtonInfo variant="contained" onClick={businessInfoClickHandler} disabled={!dealer.hasbusiness}>
                        <Icon style={{ color: '#203949', height: '50px', marginTop: '15px', marginRight: '15px' }}>
                            <BusinessCenterIcon />
                        </Icon>
                        Business Information
                    </ButtonInfo>
                    {displayInfo}

                    <StyldeInfoHeader>Dealer Documents</StyldeInfoHeader>

                    <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                        {dealerDocuments.map((document) => (
                            <div key={document.documentid} style={{ marginRight: '10px', marginBottom: '10px' }}>
                                {displayFile(document.content, document.type, document.name, document.documentid, document.dealer!)}
                            </div>
                        ))}
                    </div>
                    <Modal
                        open={open}
                        onClose={handleCloseDocument}
                    >
                        <div>
                            <ButtonDocument onClick={handleCloseDocument}>Close</ButtonDocument>
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
                                            style={{ maxWidth: '100%', maxHeight: '10000px', justifyItems: 'center', justifyContent: 'center' }}
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