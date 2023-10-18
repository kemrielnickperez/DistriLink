import logo5 from '../../Global Components/logo5.png'
import dealer from '../../Global Components/dealer.png'
import distributor from '../../Global Components/distributor.png'
import employee from '../../Global Components/employee.png'


import { Button, Card, Typography, styled } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
const Logo=styled(Typography)({
    margin:'5% 10% 0 5% ',
    display: 'flex',
    fontFamily:'Inter',
    fontWeight:'bold',
    fontSize:'25px',
    color:'#203949',
    justifyContent:'space-between',
})
const ContentNameTypography = styled(Typography)({
    marginTop: 10,
    fontFamily: 'Inter',
    fontWeight: 'bold',
    textAlign:'center',
    fontSize: '50px',
    color:'#203949'
})
const LabelTypography= styled(Typography)({
    marginTop: 20,
    fontFamily: 'Inter',
    fontWeight: '500',
    textAlign:'center',
    fontSize: '20px',
    color:'#707070'
})
const ButtonCard= styled(Button)({
    margin:'79px 45px 0px 45px',
    height:280,
    width:400,
    borderRadius:25,
    backgroundColor:'#FFFFFF',
    ':hover':{
        backgroundColor: '#F5F7F9',
        transform: 'scale(1.1)'
    },
    transition: 'all 0.4s'
})
const CardStyle=styled(Card)({
    margin:'-10px 0 0 0',
    height:170,
    width:330,
    display:'flex',
    borderRadius:25,
    backgroundColor:'#2D85E7',
    
})
const ButtonStyle=styled(Button)({
    width:200, 
    height:50,
    color:'#203949', 
    fontWeight:'bold',
    fontFamily:'Inter',
    fontSize:'20px',
    textDecorationLine: 'underline',
    ':hover':{
        backgroundColor: '#F5F7F9',
        transform: 'scale(1.1)'
    },
    transition: 'all 0.4s'
})
export default function SignupScreen(){
     
    const navigate = useNavigate();
    const handleEmployeeButtonClick = () => {
       navigate(`/EmployeeRegistration`)
    };
    const handleDealerButtonClick = () => {
        navigate(`/DealerRegistration`)
    };
    const signInHandler=()=>{
        navigate(`/SignIn`)
    }
       
    return(
        <div>
            {/** Logo*/}
            <Logo>
                    <img src={logo5} style={{height:'150px',width:'270px',marginTop:'-5%'}}/>
            {/** Sign-In*/}
                    <ButtonStyle onClick={signInHandler}>Sign In</ButtonStyle>
            </Logo>
            <ContentNameTypography>Tell us About Yourself</ContentNameTypography>
            <LabelTypography>Choose Who You Want to Sign Up As</LabelTypography>

            <div style={{flexDirection:'row'}}>
                 {/** Sign Up as Distributor */}
                <ButtonCard variant='contained' style={{flexDirection:'column'}}>
                    <CardStyle>
                        <img src={distributor} style={{height:'215px',width:'415px',margin:'-14px 0 0 -28px'}}/>
                    </CardStyle>
                    <LabelTypography>
                        Sign Up as Distributor
                    </LabelTypography>
                </ButtonCard>
                {/** Sign Up as Employee */}
                <ButtonCard variant='contained' style={{flexDirection:'column'}} onClick={handleEmployeeButtonClick}>
                    <CardStyle>
                        <img src={employee} style={{height:'215px',width:'415px',margin:'-14px 0 0 -28px'}}/>
                    </CardStyle>
                    <LabelTypography>
                        Sign Up as Employee
                    </LabelTypography>
                </ButtonCard>
                 {/** Sign Up as Dealer */}
                <ButtonCard variant='contained' style={{flexDirection:'column'}} onClick={handleDealerButtonClick} >
                    <CardStyle>
                        <img src={dealer} style={{height:'200px',width:'400px',margin:'-5px 0 0 -15px'}}/>
                        </CardStyle>
                        <LabelTypography>
                            Sign Up as Dealer
                        </LabelTypography>
                </ButtonCard>

            </div>
        </div>
   );

}