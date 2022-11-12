import React, {useState, useEffect, useRef} from 'react';
import {getAuth,onAuthStateChanged} from "firebase/auth";
import {useNavigate} from "react-router-dom";
import Spinner from "../components/Spinner";

function CreateListing(props) {
    const [geolocationEnabled, sergeolocationEnabled] = useState(true)
    const [loading, setLoading] = useState(false)
    const [formData, setfromData] = useState({
        type:'exchange',
        name:'empty',
        description:'None',
        contact:'None',
        exchangeable: false,
        forward: 'Not defined',
        negoInfo:'None',
        location: 'Earth',
        price: 15,
        secret: false,
        series:'None',
        seriesItem: 0,
        latitude:0,
        longitude:0,
        images:{},
        address:''
    })
    const auth = getAuth()
    const navigate = useNavigate()
    const isMounted = useRef(true)

    useEffect(()=>{
        if(isMounted){
            onAuthStateChanged(auth,(user)=>{
                if(user){
                    setfromData({...formData,userRef:user.uid})
                } else{
                    navigate('/sign-in')
                }
            })
        }
        return ()=>{
            isMounted.current = false
        }

    },[isMounted])

    if(loading){
        <Spinner/>
    }
    return (
        <div>
            creati'n'g
        </div>
    );
}

export default CreateListing;