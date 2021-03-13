import React from 'react';
import { useSelector } from 'react-redux'
import { Spin  } from 'antd';

const DetailModalContent = () => {
    let content;
    const status = useSelector(state => state.search.detailStatus);
    const error = useSelector(state => state.search.error);
    const detailedMovie = useSelector(state => state.search.detailedMovie);

    if (status === "loading") {
        content = <div className="spinner-container"><Spin size="large"  id="main-spinner" /></div>
    }
    else if (status === "failed") {
        content = <h1 className="main-result-title">{error}</h1>
    }
    else if(detailedMovie) {
        content = (
            <>
                <h3>Title: {detailedMovie.Title}</h3>
                <p>Released Date: {detailedMovie.Released}</p>
                <p>Genre: {detailedMovie.Genre}</p>
                <p>Actors: {detailedMovie.Actors}</p>
                <p>Plot: {detailedMovie.Plot}</p>
                <p>Imdb Rating: {detailedMovie.imdbRating}</p>
            </>
        )
    }

    return (
        <>
            {content}
        </>
    )
}

export default DetailModalContent