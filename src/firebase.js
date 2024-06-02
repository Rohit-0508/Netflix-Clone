
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, getFirestore,collection } from "firebase/firestore";
import { toast } from "react-toastify";


const firebaseConfig = {
  apiKey: "AIzaSyAvFmKAcDb9-6mcQb74kMoQu0VKOGsZ2F4",
  authDomain: "netflixclone-a325e.firebaseapp.com",
  projectId: "netflixclone-a325e",
  storageBucket: "netflixclone-a325e.appspot.com",
  messagingSenderId: "809369819513",
  appId: "1:809369819513:web:982cd044fcf989d2e7b7a8",
  measurementId: "G-FWLMYHPSV6"
};


const app = initializeApp(firebaseConfig);

const auth= getAuth(app);
const db=getFirestore(app);

const signup=async(name,email,password)=>{
    try{
        const res= await createUserWithEmailAndPassword(auth,email,password);
        const user=res.user;
        await addDoc(collection(db,"user"),{
            uid:user.uid,
            name,
            authProvider:'local',
            email,
        });
    }catch(error){
        
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}
const login= async(email,password)=>{
    try{
        const res= await signInWithEmailAndPassword(auth,email,password);
    }
    catch(error){
        
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}
const logout= async()=>{
    await signOut(auth);
}
export {auth,login,signup,logout}