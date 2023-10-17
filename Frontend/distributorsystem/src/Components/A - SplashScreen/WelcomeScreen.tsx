import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function WelcomeScreen(){
   const navigate=useNavigate();
   const signUpHandler=()=>{
    navigate(`/SignUpScreen`)
   }
   const signInHandler=()=>{
    navigate(`/SignIn`)
   }
    return(
        <div>
            <Button variant="contained" onClick={signUpHandler}>Sign up</Button>
            <Button variant="contained" onClick={signInHandler}>Sign in</Button>
        </div>
    );
}