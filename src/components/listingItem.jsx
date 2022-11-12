import React from 'react';
import {ReactComponent as DeleteIcon} from "../assets/svg/deleteIcon.svg";
import bedIcon from '../assets/svg/bedIcon.svg'
import bathIcon from '../assets/svg/bathtubIcon.svg'
import {Link} from "react-router-dom";

function ListingItem({listing,id,onDelete}) {
    return (
        <li className='categoryListing'>
            <Link to={`/category/${listing.type}/${id}`} className='categoryListingLink'>
                <img
                    src={listing.imageUrls[0]}
                    alt={listing.name}
                    className='categoryListingImg'/>

                <div className='categoryListingDetails'>
                    <p className='categoryListingName'>{listing.name}</p>
                    <p className='categoryListingLocation'>{listing.series}-{listing.seriesItem}</p>
                    <p className='categoryListingLocation'>"{listing.description}"</p>
                    <p className='categoryListingPrice'>{listing.type ==="sale" ? listing.price : listing.forward}</p>
                    <div className='categoryListingInfoDiv'>
                        <img src={bedIcon} alt='bed'/>
                        <p className='categoryListingInfoText'>{listing.exchangable? 'True' :'False'}</p>
                        <img src={bathIcon} alt='bed'/>
                        <p className='categoryListingInfoText'>{listing.unpack? 'True' :'False'}</p>
                    </div>
                </div>
            </Link>
            {onDelete && (
                <DeleteIcon className='removeIcon'
                            fill='rgb(231,76,60)'
                            onclick={()=>onDelete(listing.id,listing.name)}/>
            )
            }
        </li>
    )}

export default ListingItem;
