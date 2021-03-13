import React from 'react'
import Layout from './Layout.jsx'
import Form from './Form.jsx'
import Results from './Results.jsx'

const SearchPage = (props) => {
    return (
        <>
            <Layout sider={<Form />} content={<Results />} />
        </>
    )
}

export default SearchPage