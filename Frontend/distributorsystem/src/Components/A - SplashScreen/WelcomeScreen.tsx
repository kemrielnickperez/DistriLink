import { Button, Grid, Icon, Typography, styled } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Splash from '../../Global Components/Splash.png'
import logo4 from '../../Global Components/logo4.png'
import logo6 from '../../Global Components/logo6.png'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
const Logo=styled(Typography)({
    margin:'5% 10% 0 5% ',
    display: 'flex',
    fontFamily:'Inter',
    fontWeight:'bold',
    fontSize:'25px',
    color:'#203949',
    justifyContent:'space-between',
})
const ImageStyles = styled(Typography)({
    position:'absolute',
    display:'flex',
    alignItems:'center',
    //  marginRight:'50px',
    //  marginTop:'-30px'
    top:150, 
    left:1270,
})
const ImageStyles2 = styled(Typography)({
    position:'absolute',
    display:'flex',
    alignItems:'center',
    //  marginRight:'50px',
    //  marginTop:'-30px'
    top:70, 
    left:645,
})
const SplashGrid = styled(Grid)({
    position: "relative",
    left: -520,
    top:-120
})
const HeaderTypo = styled(Typography)({
    position: "relative",
    top: 200,
    left: 700,
    width: "200px",
    fontWeight: "bold",
    fontFamily: "Inter, sans-serif",
    color: "#ffffff",
    fontSize: 95
})
const SubHeaderTypo = styled(Typography)({
    position: "relative",
    top: 195,
    left: 720,
    textAlign:'left',
    width: "500px",
    fontFamily: "Inter, sans-serif",
    color: "#ffffff",
    fontSize: 24
})
const SignUpButton = styled(Button)({
    position: "relative",
    top: 240,
    left: 720,
    borderRadius:50,
    height:70,
    width: "430px",
    backgroundColor:"#ffffff",
    fontWeight:480,
    fontSize:25,
    color:"#0A1C34",
    ':hover':{
        backgroundColor: '#ffffff',
        transform: 'scale(1.1)'
    },
    transition: 'all 0.4s'
})
const SignInButton=styled(Button)({
    width:200, 
    height:50,
    color:'#ffffff', 
    fontWeight:'bold',
    fontFamily:'Inter',
    fontSize:'20px',
    left:60,
    textDecorationLine: 'underline',
    ':hover':{
        backgroundColor: 'rgba(45, 133, 231, 0.5)',
        transform: 'scale(1.1)'
    },
    transition: 'all 0.4s'
})

const ContentFieldGrid= styled(Grid)({

})
export default function WelcomeScreen(){
   const navigate=useNavigate();
  
   const signUpHandler=()=>{
    navigate(`/SignUpScreen`)
   }
   const signInHandler=()=>{
    navigate(`/SignIn`)
   }
   
   
    return(
        <div style={{backgroundColor:'#2D85E7', width: '100vw', height: '100vh', position: 'fixed'}}>
            {/* <Button variant="contained" onClick={signUpHandler}>Sign up</Button>
            <Button variant="contained" onClick={signInHandler}>Sign in</Button> */}
            {/** Logo*/}
            <Logo>
                    <img src={logo6} style={{height:'150px',width:'270px',marginTop:'-5%'}}/>
            {/** Sign-In*/}
                    <SignInButton onClick={signInHandler}>Sign In</SignInButton>
            </Logo>
            <SplashGrid item container>
            <ContentFieldGrid container spacing={8}>
                <Grid item>
                    <ImageStyles2>
                        <img src={logo4} style={{width:'auto',height:'220px'}}/>
                    </ImageStyles2>
                 </Grid>
            </ContentFieldGrid>
            <ContentFieldGrid container spacing={8}>
                <Grid item>
                    <HeaderTypo>Welcome</HeaderTypo>
                 </Grid>
            </ContentFieldGrid>
            <ContentFieldGrid container spacing={8}>
                <Grid item>
                    <SubHeaderTypo>Streamline Credit Handling</SubHeaderTypo>
                    <SubHeaderTypo>for Distributors and Dealers with Ease.</SubHeaderTypo>
                 </Grid>
            </ContentFieldGrid>
            <ContentFieldGrid container spacing={8}>
                <Grid item>
                    <SignUpButton variant="contained" onClick={signUpHandler}>
                        Get Started
                        <Icon style={{color:'#0A1C34', display:'flex', height:25, width:'auto', top:5, marginLeft:'20x', fontWeight:'bold'}}>
                            <input hidden accept="image/*" type="file"/>
                            <ArrowForwardIosIcon/>
                        </Icon>
                    </SignUpButton>
                    
                 </Grid>
            </ContentFieldGrid>
            
            
            <Grid item>
                <ImageStyles>
                    <img src={Splash} style={{width:'auto',height:'450px'}}></img>
                </ImageStyles>
            </Grid>
            </SplashGrid>
        </div>
    );
}