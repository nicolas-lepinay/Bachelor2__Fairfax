import React from 'react'
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";

function Category() {

    const [category, setCategory] = useState({});
    const categoryName = useParams().categoryName;

    useEffect ( () => {
        const fetchCategory = async () => {
            // Fetch d'API
            //setCategory(res.data);
        }
        fetchCategory();
    }, [categoryName])

    return (
        <div>
            <h1>Page "Category" : {categoryName}</h1>
        </div>
    )
}

export default Category
