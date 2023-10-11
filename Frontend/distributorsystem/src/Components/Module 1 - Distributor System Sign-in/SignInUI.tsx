import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function SignIn(){
    const navigate=useNavigate();
    const handler=()=>{
        navigate(`/dashboard`);
    }
    return( <div>
        <header>
            <h1> Sign  </h1>
        </header>
        <Button onClick={handler} variant="contained"> Sign In</Button>
    </div>
)
}