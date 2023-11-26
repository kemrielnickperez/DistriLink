import { useContext, useEffect, useRef, useState } from "react";
import { useRestDealer } from "../../RestCalls/DealerUseRest";
import { IDealer, IDealerDocument, IDealerPaymentProof, IOrder } from "../../RestCalls/Interfaces";
import axios from "axios";
import { Button, Card, Grid, Icon, Modal, Paper, Stack, Typography, styled, Tab, Box, Tabs, Snackbar, Alert, AlertTitle, SlideProps, Slide, TextFieldProps, TextField } from "@mui/material";
import AutorenewOutlinedIcon from '@mui/icons-material/AutorenewOutlined';
import PersonIcon from '@mui/icons-material/Person';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import profilepic from "./profilepic.png"
import profilepicture from "../../Global Components/Images/profilepicture.png"
import { useNavigate, useParams } from "react-router-dom";
import { relative } from "path";
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import { DataGrid, GridColDef } from "@mui/x-data-grid";




interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function SlideTransitionDown(props: SlideProps) {
    return <Slide {...props} direction="down" />;
}

const ContentNameTypography = styled(Typography)({
    position: "absolute",
    marginTop: 100,
    marginLeft: 190,
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
const StyledButton = styled(Button)({
    backgroundColor: '#2D85E7',
    color: '#FFFFFF',
    fontFamily: 'Inter, sans-serif',
    fontSize: '15px',
    width: '50px',
    height: 35,
    ':hover': {
        backgroundColor: '#2D85E7',
        transform: 'scale(1.1)'
    },
    transition: 'all 0.4s'
})

const StackStyle = styled(Stack)({
    position: 'absolute',
    top: '230px',
    left: '-12%',
    fontFamily: 'Inter',

})
const StyleLabel = styled(Typography)({
    // position: 'absolute',
    textAlign: 'left',
    fontWeight: '550',
    // left: '165px',
    marginTop: 40,
    marginLeft: 10,
    color: '#707070',
    fontSize: '17px',
    width: 'max-content',
    fontFamily: 'Inter',
})
const StyleData = styled(Typography)({
    textAlign: 'left',
    width: 250,
    marginLeft: 30,
    marginTop: 15,
    color: '#203949',
    fontSize: '17px',
    fontFamily: 'Inter, sans - serif',
})
const StyleLabel2 = styled(Typography)({
    // position: 'absolute',
    textAlign: 'left',
    fontWeight: '550',
    // left: '165px',
    marginTop: 30,
    marginLeft: 210,
    color: '#707070',
    fontSize: '22px',
    width: 'max-content',
    fontFamily: 'Inter',
})

const StyleMainLabel = styled(Typography)({
    //display:'flex',
    marginTop: 160,
    textAlign: 'left',
    fontWeight: '550',
    marginLeft: 90,
    marginRight: 50,
    color: '#707070',
    fontSize: '18px',
    fontFamily: 'Inter',
})
const StyleMainInfo = styled(Typography)({
    //display:'flex',
    position: 'relative',
    fontWeight: '550',
    textAlign: 'left',
    marginLeft: 110,
    marginRight: 10,

    // left: 565,
    // top: 220,
    color: '#203949',
    fontSize: '18px',
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
const IconStyle = styled(Icon)({
    color: '#2A9221',
    ':hover': {
        color: '#1E6717',
        transform: 'scale(1.1)'
    },
    transition: 'all 0.4s'
})
const IconStyle2 = styled(Icon)({
    marginLeft: 5,
    color: '#E77D7D',
    ':hover': {
        color: 'red',
        transform: 'scale(1.1)'
    },
    transition: 'all 0.4s'
})
const ButtonCredit = styled(Button)({
    background: "#F5F7F9",
    color: "#203949",
    fontSize: 15,
    fontWeight: 'bold',
    width: '20px',
    height: '35px',
    ':hover': {
        backgroundColor: '#F5F7F9',
        transform: 'scale(1.1)'
    },
    transition: 'all 0.4s'
});
const TabStyle = styled(Tab)({
    width: 320,
    fontWeight: '550',
    label: {
        color: '#707070',
        fontWeight: 'bold',
        fontFamily: 'Inter',
    }
})
const ButtonClose = styled(Button)({
    backgroundColor: '#E77D7D',
    width: 40,
    height: 40,
    ':hover': {
        backgroundColor: 'red',
        transform: 'scale(1.1)'
    },
    transition: 'all 0.4s'
})
const ButtonDocument = styled(Button)({
    background: "#D9D9D9",
    color: "#203949",
    fontSize: 10,
    marginLeft: 160,
    marginTop: 15,
    marginBottom: -5,
    paddingLeft: 3,
    paddingRight: 3,
    fontWeight: 'lighter',
    borderRadius: 5,
    width: 300,
    height: '40px',
    ':hover': {
        backgroundColor: '#F5F7F9',
        transform: 'scale(1.1)'
    },
    transition: 'all 0.4s'
});
const ProfileCard = styled(Card)({
    display: 'flex',
    borderRadius: 22,
    width: 300,
    height: 240,
    marginTop: 150,
    marginLeft: 160
})
const ModalCard = styled(Card)({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
    width: 750,
    height: '90%',
    backgroundColor: 'background.paper',
    border: '2px',
    p: 4,
})


export default function DealerProfileDetails() {


    const [value, setValue] = useState(0);

    const [getDealerByID, getDealerByDistributor, newDealer, confirmDealer, markDealerAsPending, declineDealer, resetDealer, updateDealerCreditLimit, isDealerFound, isDealerConfirmed, dealer, dealerRemainingCredit] = useRestDealer();

    const [dealerDocuments, setDealerDocuments] = useState<IDealerDocument[]>([]);

    // const [setDealer]= useState<>

    const [open, setOpen] = useState(false);

    const [openProfile, setOpenProfile] = useState(false);

    const [selectedDocument, setSelectedDocument] = useState<IDealerDocument | null>(null);

    const [isEditing, setIsEditing] = useState(false);

    const [dealers, setDealers] = useState<IDealer[] | null>(null);

    const [isEditIcon, setIsEditIcon] = useState(true);

    const [openAlert, setOpenAlert] = useState(false);

    const [alerttitle, setTitle] = useState('');

    const [alertMessage, setAlertMessage] = useState('');

    const [alertSeverity, setAlertSeverity] = useState('success');

    const creditLimitRef = useRef(null);

    const [orders, setOrders] = useState<IOrder[]>([]);

    const navigate = useNavigate();




   



    {/*Tabs*/ }
    function CustomTabPanel(props: TabPanelProps) {
        const { children, value, index, ...other } = props;
        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <Box sx={{ p: 3 }}>
                        <Typography>{children}</Typography>
                    </Box>
                )}
            </div>
        );
    }
    function a11yProps(index: number) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }
    {/**Handler for Alert - Function to define the type of alert*/ }
    function headerHandleAlert(title: string, message: string, severity: 'success' | 'warning' | 'error') {
        setTitle(title);
        setAlertMessage(message);
        setAlertSeverity(severity);
        setOpenAlert(true);
    }

    {/**Handler to Close Alert Snackbar*/ }
    const handleCloseAlert = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenAlert(false);
    };


    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };


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




    const handleOpenDocument = (document: IDealerDocument) => {
        if (document) {
            setSelectedDocument(document);
            setOpen(true);

        }
    }

    const handleCloseDocument = () => {
        setOpen(false);
        setOpenProfile(false)
    }

   
    const getOrderByDealerId = (dealerID: string) => {
        axios.get(`http://localhost:8080/order/getOrderByDealerId/${dealerID}`)
            .then((response) => {
                console.log("Getting Order by Dealer is Successful!");
                setOrders(response.data);
            })
            .catch((error) => {
                console.error('Error retrieving Order by Dealer Data!')
            });
    }

    function getAllDealerDocuments() {
        axios.get<IDealerDocument[]>(`http://localhost:8080/dealerdocument/findAllDocumentsByDealerId/${objectId!}`)
            .then((response) => {
                setDealerDocuments(response.data);
            })
            .catch((error) => {
                alert("Error retrieving dealer documents. Please try again.");
            });
    };

    const handleFindDealer = () => {
        getDealerByID(objectId!);
        getOrderByDealerId(objectId!);
    };




    const business = dealer?.hasbusiness ? (
        <>
            <Grid container>
                <Grid item>
                    <StyleLabel>Business Name</StyleLabel>
                    <StyleData>{dealer?.businessname}</StyleData>
                </Grid>
                <Grid item>
                    <StyleLabel>Business Number</StyleLabel>
                    <StyleData>{dealer?.businessphone}</StyleData>
                </Grid>
                <Grid item>
                    <StyleLabel>Business Address</StyleLabel>
                    <StyleData>{dealer?.businessaddress}</StyleData>
                </Grid>
            </Grid>
            <Grid container style={{ marginTop: 25 }}>
                <Grid item>
                    <StyleLabel>TIN Number</StyleLabel>
                    <StyleData>{dealer?.businesstin}</StyleData>
                </Grid>
            </Grid>
        </>
    ) : (<Typography>Dealer Has No Business Information.</Typography>)



    useEffect(() => {
        try {
            if (objectId) {
                handleFindDealer();
                getAllDealerDocuments();
                // headerHandleAlert('Success', "Dealer records retrieved successfully.", 'success');    
                getOrderByDealerId(objectId);
            }
        } catch (error) {
            headerHandleAlert('Error', "Failed to retrieve dealer information. Please try again.", 'error');
        }
        
      
    }, [objectId, dealer, dealerDocuments]);



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
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#203949" height={15} style={{ marginRight: 10, marginLeft: -15, marginTop: -2 }}>
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                        </svg>
                        {docname}
                    </ButtonDocument>
                );
            } else if (fileType.startsWith('image') && !docname.endsWith('_profilepicture')) {
                return (
                    <ButtonDocument variant={"contained"} onClick={() => handleOpenDocument({
                        content: base64Content,
                        type: fileType,
                        name: docname,
                        documentid: documentid,
                        dealer: dealerparam!
                    })}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#203949" height={15} style={{ marginRight: 10, marginLeft: -15, marginTop: -2 }} >
                            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                        </svg>
                        {docname}
                    </ButtonDocument>
                );
            } else {
                // Display a generic download link for other file types
                if (!docname.endsWith('_profilepicture')) {
                    return (
                        <a href={`data:${fileType};base64,${base64Content}`} download={`document.${fileType}`}>
                            Download Document
                        </a>
                    );
                }

            }
        }
        else {
            return <div>No content available</div>;
        }
    };

    const handleEditCreditLimit = () => {
        setIsEditing(true);
        setIsEditIcon(!isEditIcon);
    };


    const handleUpdateCreditLimit = (objectId: string) => {
        const newCreditLimit = Number((creditLimitRef.current as unknown as HTMLInputElement)?.value);

        // Check if the newCreditLimit is a valid number before calling the updateDealerCreditLimit
        if (!isNaN(newCreditLimit)) {
            updateDealerCreditLimit(objectId, newCreditLimit);
            setIsEditing(false); // Assuming you want to exit editing mode after updating
            setIsEditIcon(!isEditIcon);
            console.log("Dealer Credit Limit is Updated!");
        } else {
            // Handle the case where the input is not a valid number
            // You may want to display an error message or take other appropriate action
            console.error('Invalid credit limit input');
        }
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        // Reset the edited credit limit to the current value.
        setIsEditIcon(true);

    };

    const handleViewButtonClick = (objectId: string) => {
        console.log(objectId);
        // Use the `navigate` function to navigate to the details page with the objectId as a parameter

        navigate(`/orderTransactionDetails/${objectId}`);
    };

    const handleViewButtonFalse = (objectId: string) => {
        console.log(objectId);
        navigate(`/orderConfirmation/${objectId}`);
    }

    const profilePic = dealerDocuments.find(image => image.name === dealer?.lastname + '_profilepicture');
    const imageSource = profilePic ? `data:${profilePic?.type} ;base64,${profilePic?.content}`
        : profilepicture
    const handleOpenProfile = () => {
        setOpenProfile(true);
    }

    // Define columns for the orders table
    const columnsOrder: GridColDef[] = [
        { field: 'id', headerName: 'Order ID', width: 150 },
        { field: 'orderDate', headerName: 'Order Date', width: 180 },
        { field: 'distributionDate', headerName: 'Distribution Date', width: 180 },
        { field: 'orderAmount', headerName: 'Order Amount', width: 180 },
        {
            field: 'confirmed',
            headerName: 'Status',
            width: 120,
            renderCell: (params: { row: any; }) => {
                const dealer = params.row;
                const isConfirmed = params.row.confirmed;

                return (
                    <div>
                        {isConfirmed ? <span>Confirmed</span> : <span>Pending</span>}
                    </div>
                );
            }
        },
        {
            field: 'view', headerName: '', width: 100,
            renderCell: (params: { row: any; }) => {
                const order = params.row;
                return (
                    <StyledButton
                        onClick={() => {
                            // Handle button click for this row here
                            console.log('Button clicked for row:', order.id);
                            if (order.confirmed === false) {
                                handleViewButtonFalse(order.id);
                            } else {
                                handleViewButtonClick(order.id);
                            }
                        }}
                    >
                        View
                    </StyledButton>
                )
            }
        },
    ];

    // Map orders data to rows
    const rowsOrder = orders.map((order) => ({
        id: order.orderid,
        orderDate: order.orderdate,
        distributionDate: order.distributiondate,
        orderAmount: `Php ${order.orderamount}`,
        orderStatus: order.confirmed,

    }));



    return (
        <div>
            <Grid container spacing={3}>
                <ContentNameTypography>Dealer Information </ContentNameTypography>
                <Grid item style={{ marginRight: -70 }}>
                    <Grid>
                        <ProfileCard onClick={handleOpenProfile} style={{ cursor: 'pointer' }}>
                            <img src={imageSource} style={{ inset: 0, margin: 'auto', maxHeight: '100%', maxWidth: '100%' }}></img>
                        </ProfileCard>
                    </Grid>
                    <Grid>
                        <StyleLabel2>
                            <svg width="24" height="24" style={{ marginBottom: -5, marginRight: 16 }} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M18.375 12.7393L10.682 20.4323C9.83811 21.2762 8.69351 21.7503 7.50003 21.7503C6.30655 21.7503 5.16195 21.2762 4.31803 20.4323C3.47411 19.5883 3 18.4437 3 17.2503C3 16.0568 3.47411 14.9122 4.31803 14.0683L15.258 3.12825C15.5367 2.84972 15.8675 2.6288 16.2315 2.47811C16.5956 2.32742 16.9857 2.24991 17.3797 2.25C17.7737 2.25009 18.1639 2.32779 18.5278 2.47865C18.8918 2.62951 19.2225 2.85059 19.501 3.12925C19.7796 3.40792 20.0005 3.73872 20.1512 4.10276C20.3019 4.4668 20.3794 4.85696 20.3793 5.25096C20.3792 5.64496 20.3015 6.03508 20.1506 6.39906C19.9998 6.76303 19.7787 7.09372 19.5 7.37225L8.55203 18.3203C8.26801 18.5925 7.88839 18.7413 7.49497 18.7363C7.10156 18.7313 6.72585 18.572 6.44883 18.2926C6.1718 18.0132 6.01564 17.6362 6.01399 17.2427C6.01234 16.8493 6.16535 16.4709 6.44003 16.1893L14.25 8.37925M8.56103 18.3103L8.55103 18.3203" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            Attachments
                        </StyleLabel2>
                    </Grid>
                    <Grid>
                        {dealerDocuments.map((document) => (
                            <div key={document.documentid} style={{ marginRight: '10px', marginBottom: '10px' }}>
                                {displayFile(document.content, document.type, document.name, document.documentid, document.dealer!)}
                            </div>
                        ))}
                    </Grid>
                    {/* Profile Picture Modal */}
                    <Modal
                        open={openProfile}
                        onClose={handleCloseDocument}
                    >
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'flex-end', marginRight: 300, marginTop: 40 }}>
                                <ButtonClose variant='contained' onClick={handleCloseDocument}><CloseIcon /></ButtonClose>
                            </div>
                            <ModalCard>
                                <img src={imageSource} style={{ position: 'absolute', inset: 0, margin: 'auto', maxHeight: '100%', maxWidth: '100%' }}></img>
                            </ModalCard>
                        </div>
                    </Modal>

                    {/* Attachments Modal */}
                    <Modal
                        open={open}
                        onClose={handleCloseDocument}
                    >
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'flex-end', marginRight: 300, marginTop: 40 }}>
                                <ButtonClose variant='contained' onClick={handleCloseDocument}><CloseIcon /></ButtonClose>
                            </div>
                            {selectedDocument && (
                                <ModalCard>
                                    {selectedDocument.type === 'application/pdf' ? (
                                        <iframe
                                            title="PDF Document"
                                            src={`data:application/pdf;base64,${selectedDocument.content}`}
                                            width="100%"
                                            height="100%"
                                        />
                                    ) : selectedDocument.type.startsWith("image") ? (

                                        <img
                                            src={`data:${selectedDocument.type};base64,${selectedDocument.content}`}
                                            alt="Document"
                                            style={{
                                                position: 'absolute',
                                                inset: 0,
                                                margin: 'auto',
                                                width: 'auto',
                                                height: "100%"
                                            }}
                                        />
                                    ) : (
                                        <a href={`data:${selectedDocument.type};base64,${selectedDocument.content}`} download={`document.${selectedDocument.type}`}>
                                            Download Document
                                        </a>
                                    )}
                                </ModalCard>
                            )}
                        </div>
                    </Modal>
                </Grid>

                <Grid item style={{ marginLeft: 15 }}>
                    <Grid container style={{ marginTop: 15 }}>
                        <Grid item>
                            <StyleMainLabel>Dealer's Name</StyleMainLabel>
                            <StyleMainInfo style={{ marginTop: 15 }}>{dealer?.firstname} {dealer?.middlename} {dealer?.lastname}</StyleMainInfo>
                        </Grid>
                        <Grid item >
                            <StyleMainLabel style={{ marginLeft: 91 }}>Dealer ID</StyleMainLabel>
                            <StyleMainInfo style={{ marginTop: 15, marginLeft: 111 }}>{dealer?.dealerid}</StyleMainInfo>
                        </Grid>
                        <Grid item>
                            <StyleMainLabel>
                                Credit Limit
                                {isEditIcon ? (
                                    <svg width="25" height="25" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg" style={{
                                        marginLeft: 6, marginBottom: -5,
                                    }} onClick={handleEditCreditLimit}>
                                        <path d="M23.1852 6.16996L25.5049 3.84896C25.9884 3.36541 26.6443 3.09375 27.3281 3.09375C28.012 3.09375 28.6678 3.36541 29.1514 3.84896C29.6349 4.33252 29.9066 4.98836 29.9066 5.67221C29.9066 6.35607 29.6349 7.01191 29.1514 7.49547L14.5502 22.0966C13.8233 22.8231 12.9269 23.3571 11.9419 23.6503L8.25 24.7503L9.35 21.0585C9.64326 20.0735 10.1772 19.177 10.9037 18.4501L23.1852 6.16996ZM23.1852 6.16996L26.8125 9.79721M24.75 19.2503V25.7816C24.75 26.6021 24.4241 27.389 23.8439 27.9692C23.2637 28.5494 22.4768 28.8753 21.6562 28.8753H7.21875C6.39824 28.8753 5.61133 28.5494 5.03114 27.9692C4.45095 27.389 4.125 26.6021 4.125 25.7816V11.3441C4.125 10.5236 4.45095 9.73667 5.03114 9.15648C5.61133 8.57629 6.39824 8.25034 7.21875 8.25034H13.75" stroke="#2D85E7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                ) : (
                                    <IconStyle2 onClick={handleCancelEdit} >
                                        <CloseIcon style={{ marginTop: 5 }} />
                                    </IconStyle2>
                                )}
                            </StyleMainLabel>

                            {isEditing ? (
                                <div>
                                    <div style={{ display: "grid", gridTemplateColumns: "1fr auto auto", gridGap: "10px", alignItems: "left" }}>
                                        <input
                                            type="number"
                                            ref={creditLimitRef}
                                            style={{ height: 20, width: 120, marginTop: 15, marginLeft: 115 }}
                                        />
                                        <div>
                                            <ButtonCredit variant="contained" style={{ marginTop: 10 }} onClick={() => handleUpdateCreditLimit(dealer!.dealerid)}>
                                                <CheckIcon style={{ color: '#2A9221' }} />
                                            </ButtonCredit>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <StyleMainInfo style={{ marginTop: 15 }}>
                                    Php {dealer?.creditlimit}
                                </StyleMainInfo>
                            )}
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item>
                            <Box sx={{ width: '92%', marginLeft: 10, marginTop: 5 }}>
                                <Box sx={{ borderBottom: 0.5, borderColor: 'divider' }}>
                                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" >
                                        <TabStyle icon={<PermIdentityIcon />} iconPosition="start" label="Basic Information" {...a11yProps(0)} />
                                        <TabStyle icon={<WorkOutlineIcon />} iconPosition="start" label="Business Information" {...a11yProps(1)} />
                                        <TabStyle icon={<ReceiptLongOutlinedIcon />} iconPosition="start" label="Orders" {...a11yProps(2)} />
                                    </Tabs>
                                </Box>
                                <CustomTabPanel value={value} index={0}>
                                    {/* Basic Information */}
                                    <Grid container>
                                        <Grid item>
                                            <StyleLabel>Gender</StyleLabel>
                                            <StyleData>{dealer?.gender}</StyleData>
                                        </Grid>
                                        <Grid item>
                                            <StyleLabel style={{ marginLeft: -100 }}>Birthdate</StyleLabel>
                                            <StyleData style={{ marginLeft: -90 }}>{dealer?.birthdate}</StyleData>
                                        </Grid>
                                        <Grid item>
                                            <StyleLabel style={{ marginLeft: -80 }}>Contact Information</StyleLabel>
                                            <StyleData style={{ marginLeft: -70 }}>{dealer?.contactnumber}</StyleData>
                                        </Grid>
                                        <Grid item>
                                            <StyleLabel style={{ marginLeft: -20 }}>Email Address</StyleLabel>
                                            <StyleData style={{ marginLeft: -10 }}>{dealer?.emailaddress}</StyleData>
                                        </Grid>
                                    </Grid>
                                    <Grid container style={{ marginTop: 25 }}>
                                        <Grid item>
                                            <StyleLabel>Current Address</StyleLabel>
                                            <StyleData>{dealer?.currentaddress}</StyleData>
                                        </Grid>
                                        <Grid item>
                                            <StyleLabel>Permanent Address</StyleLabel>
                                            <StyleData>{dealer?.permanentaddress}</StyleData>
                                        </Grid>
                                        <Grid item>
                                            <StyleLabel style={{ marginLeft: 50 }}>Starting Date</StyleLabel>
                                            <StyleData style={{ marginLeft: 60 }}>{dealer?.submissiondate}</StyleData>
                                        </Grid>
                                    </Grid>
                                </CustomTabPanel>
                                {/* Business Information */}
                                <CustomTabPanel value={value} index={1}>
                                    {business}
                                </CustomTabPanel>

                                {/* Orders */}
                                <CustomTabPanel value={value} index={2}>
                                    <div>
                                        {/* Your other components for displaying order-related information */}
                                        <DataGrid
                                            rows={rowsOrder} columns={columnsOrder}
                                            initialState={{
                                                pagination: {
                                                    paginationModel: {
                                                        pageSize: 5,
                                                    },
                                                },
                                            }}
                                            pageSizeOptions={[5]} />
                                    </div>
                                </CustomTabPanel>
                            </Box>
                        </Grid>
                    </Grid>

                </Grid>

                {/* Alerts */}
                <Snackbar open={openAlert} autoHideDuration={3000} onClose={handleCloseAlert} anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center'
                }} TransitionComponent={SlideTransitionDown}>
                    <Alert onClose={handleCloseAlert} severity={alertSeverity as 'success' | 'warning' | 'error'} sx={{ width: 500 }} >
                        <AlertTitle style={{ textAlign: 'left', fontWeight: 'bold' }}>{alerttitle}</AlertTitle>
                        {alertMessage}
                    </Alert>
                </Snackbar>
            </Grid>



            {/* {dealer ? (
                <div>
                    <Grid item>
                        <Grid item>
                            <ContentNameTypography>Dealer Information</ContentNameTypography>
                            <img src={imageSource} style={{ width:'auto',height: '250px', margin: '30px 500px 0px -550px' }}></img> 
                         
                           
                        </Grid>
                    </Grid>
                    Render dealer details 
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
                                        <ButtonCredit variant="contained" onClick={handleCancelEdit} >
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
            )} */}

        </div>
    );
}