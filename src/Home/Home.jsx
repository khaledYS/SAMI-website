import React, { useContext } from "react";
import {app, auth, db} from "../firebase.js"
import {getAuth, signOut} from "firebase/auth"
import { AuthContext } from "../Auth/Auth.jsx";
import {doc, getDocs, getDocFromServer, setDoc, Timestamp, serverTimestamp, addDoc, collection} from "@firebase/firestore"
import { LoadingContext } from "../Loading/Loading.jsx";

function Home() {
    const {currentUser} = useContext(AuthContext);
    const {setLoading} = useContext(LoadingContext);

    return ( 
        <div className="w-full h-full text-white">
            <div className="bg-white px-2 py-1 rounded-b-xl">
                <img src={currentUser.providerData[0].photoURL} onClick={()=>{signOut(getAuth(app))}} className="max-w-[45px] rounded-full mx-auto cursor-pointer hover:brightness-50 transition-all" />
            </div>
            <div className="h-full w-full grid place-items-center">
                <div className="w-full block">
                    <div className="grid place-items-center w-full Rboto-Font font-semibold text-2xl mb-5">
                        <h1>Hi {currentUser.displayName}</h1>
                    </div>
                    <form className="bg-white px-4 py-2 rounded-lg text-lg max-w-[500px] mx-auto text-black flex flex-col" onSubmit={async e =>{
                        e.preventDefault()

                        const instaMessageObject = {
                            instaUsername: e.target.username.value,
                            instaMessage: e.target.message.value,
                            sender: {
                                email: currentUser.email,
                                displayName: currentUser.displayName
                            },
                            createdAt: serverTimestamp()
                        }

                        setLoading(true)
                        
                        try {
                            e.target.username.value="";
                            e.target.message.value="";
                            let response = await fetch(`https://32i.netlify.app/api/send/anonymous/message/${instaMessageObject.instaUsername}/${instaMessageObject.instaMessage}`);
                            response = await response.json();
                            if(response.sent == true){
                                let collectionRef = collection(db, "users", currentUser.email, "messages");
                                await addDoc(collectionRef, instaMessageObject);
                            }
                            console.log(response)
                            
                        } catch (error) {
                            console.log(error)
                        }finally{
                            setLoading(false)
                        }

                    }}>
                        <div style={{lineHeight: "1"}} className="font-bold p-4 text-center ">Send A message to an Instagram User <br/> while being anonymous !</div>
                        <input required className="bg-gray-200 p-1 mb-2 rounded-md" placeholder="Username" type="text" name="username" />
                        <textarea required cols="30" rows="2" className="bg-gray-200 p-1 mb-2 rounded-md" placeholder="write a message" type="text" name="message" />
                        <div className="flex justify-between text-black items-center">
                            <div className="">
                                <input className="mr-2 cursor-pointer" required type="checkbox" value="hiiii" name="checkbox" />
                                <label htmlFor="checkbox">I promise no bad words</label>
                            </div>
                            <input required type="submit" className="bg-[#F26800] text-white font-bold px-4 p-2 rounded-lg cursor-pointer hover:brightness-75 transition-all" />
                        </div>
                    </form>
                </div>
            </div>
            {/* <button onClick={()=>{signOut(getAuth(app))}}>signout</button> */}
        </div>
     );
}

export default Home;