import React from 'react';
import { useDispatch } from 'react-redux'
import { Input } from 'antd';

import { searchMovie } from "./searchSlice.js"

const FormView = () => {
    const dispatch = useDispatch();
    const onSearch = async (values) => {
        if(values){
            dispatch(searchMovie(values))
        }
    };
    return (
        <>
            <Input.Search placeholder="Search our outstanding movie archive with more than 10,000 movies!" 
            onSearch={onSearch} 
            enterButton />
        </>
    )
}

export default FormView