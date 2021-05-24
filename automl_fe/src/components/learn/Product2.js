import React, { useState, useEffect } from 'react';
// import { useSelector } from "react-redux";
// import { useDispatch } from 'react-redux';

const Product2 = () => {

    // const { test } = useSelector(state => ({...state}));

    // let dispatch = useDispatch();

    // const increase = () => {
    //     let value = test.number_test - 1 ;
    //     dispatch({
    //         type: 'INCREASE',
    //         payload: {
    //             number_test : value
    //         }
    //     });
    // }

    return (
        <div>
            Product2 :  <br/>
            <button className="btn btn-outline-primary" >Decrease</button>
        </div>
    )
};

export default Product2;