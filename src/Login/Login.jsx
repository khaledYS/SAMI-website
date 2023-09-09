import { GoogleAuthProvider, signInWithPopup, signInWithRedirect, getAuth } from "@firebase/auth";
import { useContext, useEffect } from "react";
import {useNavigate} from "react-router"
import { AuthContext } from "../Auth/Auth";
import { app, auth } from "../firebase";
import { FcGoogle } from "react-icons/fc"

function Login() {
    const navigate = useNavigate();
    const {currentUser} = useContext(AuthContext);

    useEffect(() => {
        console.log(currentUser)
        if(currentUser)
        navigate("/")
    }, [currentUser]);

    return (
        <div className="w-full h-full grid place-items-center text-xl">
            <button className="bg-[#A3CCAB] px-4 py-2 rounded-lg Roboto-font text-center mx-auto hover:brightness-75 transition-all" onClick={()=>{
                (async ()=>{
                    try {
                        const provider = new GoogleAuthProvider();
                        const user = await signInWithRedirect(auth, provider);
                        console.log(user)
                        navigate("/")
                    }catch (err){
                        console.log(err )
                        alert(err)
                    }
                })()
            }}>Signin with Google <FcGoogle className="mx-auto text-4xl" /> </button>
        </div> 
    );
}

export default Login;