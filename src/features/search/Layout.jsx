import React from 'react'

const Layout = (props) => {

    return (
        <>
            <div id="sider-container">
                {props.sider}
            </div>
            <div id="search-result-container">
                {props.content}
            </div>
        </>
    )
}

export default Layout