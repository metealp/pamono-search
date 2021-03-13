import ResultCard from './ResultCard.jsx';
import { useSelector } from 'react-redux'
import { Col, Row, Spin  } from 'antd';

const Results = () => {
    const fetchedMovies = useSelector(state => state.search.searchResult);
    const status = useSelector(state => state.search.status);
    const error = useSelector(state => state.search.error);

    let content;

    if(status === "idle") {
        content = <h1 className="main-result-title">Search our outstanding movie archive with more than 10,000 movies!</h1>
    }
    else if (status === "loading") {
        content = <div className="spinner-container"><Spin size="large"  id="main-spinner" /></div>
    }
    else if (status === "failed") {
        content = <h1 className="main-result-title">{error}</h1>
    }
    else if(fetchedMovies.length > 0) {
        content = fetchedMovies.map( movie => <Col><ResultCard movie={movie} /></Col>)
    }

    // else {
    //     content = <div className="spinner-container"><Spin size="large"  id="main-spinner" /></div>
    // }



    return (
        <>
            <div id="search-result-container">
                <Row align="middle">
                    {content}
                </Row>

            </div>
        </>
    )
}

export default Results