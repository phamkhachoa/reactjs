import React, { useState, useEffect } from 'react';
// import { useSelector } from "react-redux";
// import { useDispatch } from 'react-redux';

const Product1 = (props) => {

    // const { test } = useSelector(state => ({...state}));
    const[bla, setBla] = useState(3);

    // let dispatch = useDispatch();

    // const increase = () => {
    //     let value = test.number_test + 1 ;
    //     dispatch({
    //         type: 'INCREASE',
    //         payload: {
    //             number_test : value
    //         }
    //     });
    // };

    const increaseBla = () => {
        setBla(bla + 1);
    }

    const decrease = () => {
        props.propTest = props.propTest + 1;
    }

    return (
        <div>
            Product1 : <br/>
            {bla}
            <br />
            Product1_2: {props.propTest}
            <br/>
            <button className="btn btn-outline-primary" >Increase</button>
            <button className="btn btn-outline-primary" onClick={increaseBla}>Increase Bla</button>
            <button className="btn btn-outline-primary" onClick={decrease}>Decrease Prop test</button>
        </div>
    )
};

export default Product1;