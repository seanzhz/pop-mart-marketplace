import React, {useEffect, useState} from 'react';
import {collection, getDocs,query,where,orderBy,limit,startAfter} from "firebase/firestore";
import {db} from "../firebase.config";
import {useParams} from "react-router-dom";
import {toast} from "react-toastify";
import Spinner from "../components/Spinner";
import ListingItem from "../components/listingItem";

function Category(props) {
    const [listings, setListings] =useState(null)
    const [loading, setLoading] = useState(null)
    const params = useParams()

    useEffect(() => {
        const fetchListings = async ()=>{
            try{
                //get reference
                const listingRef = collection(db,'listings')
                //Create a query
                // params.categoryName defined in App.js
                const q = query(listingRef,
                    where('type','==',params.categoryName),
                    orderBy('timestamp','desc'),
                    limit(10))
                //Execute query
                const querySnap = await getDocs(q)
                // initial
                let listings = []
                querySnap.forEach((doc)=>{
                   return listings.push({
                       id:doc.id,
                       data: doc.data()
                   })
                })

                setListings(listings)
                setLoading(false)
            }catch (e) {
                console.log(e)
                toast.error(e)
            }
        }

        fetchListings().then()

    })


    return (
        <div className='category'>
            <header>
                <p className='pageHeader'>
                    {params.categoryName === 'rent'? 'Rent':'Sale'}
                </p>
            </header>

            {loading ? (
                <Spinner/>
            ) : listings && listings.length>0 ?
                (<>
                    <main>
                        <ul className='categoryListings'>
                            {listings.map((item)=>(
                                <ListingItem listing={item.data} id={item.id} key={item.id}/>
                                ))}
                        </ul>
                    </main>
                </>):
                (<p>No content for {params.categoryName}</p>)}
        </div>
    );
}

export default Category;