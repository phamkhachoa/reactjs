import React, { useState, useEffect } from 'react';
import Product1 from './Product1';
import Product2 from './Product2';

const Product3 = () => {

    const[propTest, setPropTest] = useState(3);
    var fruits = ['Apple', 'Banana'];

    const increase = () => {
        setPropTest(propTest + 1);
        console.log(propTest);
    };

    useEffect(() => {
        console.log(fruits);
    }, []);

    return (
        <div>
            Product page : {propTest}
            <button className="btn btn-outline-primary" onClick={increase}>Increase</button>
            <Product1 propTest={propTest}/>
            <Product2 />
            {/* {fruits.forEach((e) => {
                return (
                    <div>In a: {e}</div>
                )
            })} */}
        </div>
    )
};

export default Product3;