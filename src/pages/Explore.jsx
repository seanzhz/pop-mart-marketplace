import React from 'react';
import rentCategoryImage from '../assets/jpg/rentCategoryImage.jpg'
import saleCategoryImage from '../assets/jpg/sellCategoryImage.jpg'
import {Link} from "react-router-dom";

function Explore(props) {
    return (
        <div className='explore'>
            <header>
                <p className='pageHeader'>Explore</p>
            </header>

            <main>
                <p className='exploreCategoryHeading'>Categories</p>
                <div className='exploreCategories'>
                    <Link to='/category/rent'>
                        <img src={rentCategoryImage} alt='exchange' className='exploreCategoryImg'/>
                        <p className='exploreCategoryName'>Exchange</p>
                    </Link>

                    <Link to='/category/sale'>
                        <img src={saleCategoryImage} alt='sale' className='exploreCategoryImg'/>
                        <p className='exploreCategoryName'>Sale</p>
                    </Link>


                </div>
            </main>
        </div>
    );
}

export default Explore;