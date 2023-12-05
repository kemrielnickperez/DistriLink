import { Button, Grid, Typography, styled } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Thank from '../../Global Components/Images/thankyou.png'
const SplashGrid = styled(Grid)({
    position: "relative",
    left: -520,
    top: -120
})
const ContentFieldGrid = styled(Grid)({
    position: 'relative',
    display: "flex",
    justifyContent: "center",

})
const ImageStyles = styled(Typography)({
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    //  marginRight:'50px',
    //  marginTop:'-30px'
    top: 50,

})
const ImageStyles2 = styled(Typography)({
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    //  marginRight:'50px',
    //  marginTop:'-30px'
    top: 70,
    left: 812,
})
const HeaderTypo = styled(Typography)({
    position: "relative",
    top: 130,
    left: -90,
    width: "600px",
    fontWeight: "bold",
    fontFamily: "Inter, sans-serif",
    color: "#203949",
    fontSize: 40
})
const SubHeaderTypo = styled(Typography)({
    position: "relative",
    top: 150,
    left: -65,
    textAlign: 'left',
    width: "500px",
    fontFamily: "Inter, sans-serif",
    color: "#203949",
    fontSize: 24
})
const SignUpButton = styled(Button)({
    position: "relative",
    top: 190,
    left: -80,
    borderRadius: 50,
    height: 70,
    width: "470px",

    fontWeight: 480,
    fontSize: 20,
    color: "#ffffff",
    ':hover': {

        transform: 'scale(1.1)'
    },
    transition: 'all 0.4s'
})
export default function ThankYouScreen() {
    const navigate = useNavigate();

    const signUpHandler = () => {
        navigate(`/WelcomeScreen`)
    }

    return (
        <div>

            <ContentFieldGrid container>
                <Grid item>
                    <ImageStyles>
                        <img src={Thank} style={{ width: 'auto', height: '500px' }}></img>
                    </ImageStyles>
                </Grid>

                <Grid item>
                    <ContentFieldGrid container spacing={8}>
                        <Grid item>
                            <HeaderTypo>You are Now Signed Up!</HeaderTypo>
                        </Grid>
                    </ContentFieldGrid>

                    <ContentFieldGrid container spacing={8}>
                        <Grid item>
                            <SubHeaderTypo>Thank you for registering with Distrilink. </SubHeaderTypo>
                            <SubHeaderTypo style={{ marginTop: 20 }}>Please wait for distributor confirmation to become an authorized dealer. We'll notify you via email once confirmed.</SubHeaderTypo>
                        </Grid>

                    </ContentFieldGrid>
                    <ContentFieldGrid container spacing={8}>
                    <Grid item>
                        <SignUpButton variant="contained" onClick={signUpHandler}>
                            Return to the Home Page
                        </SignUpButton>
                    </Grid>
                    </ContentFieldGrid>

                </Grid>

            </ContentFieldGrid>
        </div>
    );

}