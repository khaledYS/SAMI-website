import { onAuthStateChanged } from "@firebase/auth";
import React, { createContext, useContext, useEffect, useLayoutEffect, useState } from "react";
import {app, auth, db} from "../firebase.js";
import {doc, getDocs, getDocFromServer, setDoc, Timestamp, serverTimestamp} from "@firebase/firestore"
import { LoadingContext } from "../Loading/Loading.jsx";

export const AuthContext = createContext();

export function AuthProvider({children}) {
    const {setLoading} = useContext(LoadingContext);
    const [currentUser, setCurrentUser] = useState(null)
    useEffect(() => {
        onAuthStateChanged(auth, async (user)=>{
            console.log(user)
            if(!user){
                setCurrentUser(null);
                setLoading(false)
                return null;
            } 
    
            setCurrentUser(user);
            try{
                
                const docRef = doc(db, "users", user?.email);
                const docSnap = await getDocFromServer(docRef);
                if(!docSnap.exists()){
                    await setDoc(docRef, {
                        createdAt: serverTimestamp(),
                        displayName: user.displayName,
                        email: user.email,
                        emailVerified: user.emailVerified,
                        photoURl: user.providerData[0].photoURL,
                        uid: user.uid
                    })
                }
                console.log("hahha")
    
            } catch (err){
                console.log(err)
                alert(err)
            }finally{
                setLoading(false)
                console.log("turned of here")
            }
        });
    }, []);

    return (
        <AuthContext.Provider
            value={{
                currentUser
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
