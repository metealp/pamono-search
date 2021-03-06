import React, {useState} from 'react'
import ResultCard from './ResultCard.jsx';
import { useSelector } from 'react-redux'
import { Col, Row, Spin, Modal  } from 'antd';
import { useDispatch } from 'react-redux'
import { fetchMovieById, setMovieDetailsFromCache } from "./searchSlice.js"
import DetailModal from "./DetailModal.jsx"

const Results = () => {
    const fetchedMovies = useSelector(state => state.search.searchResult);
    const cachedMovies = useSelector(state => state.search.cachedMovieDetails);

    const status = useSelector(state => state.search.status);
    const error = useSelector(state => state.search.error);
    const dispatch = useDispatch();

    const fetchDetail = (movie)=>{
        const isMovieCached = cachedMovies.filter( item => item.imdbID === movie.imdbID);
        if(isMovieCached.length > 0) {
            dispatch(setMovieDetailsFromCache(isMovieCached[0]));
        } else {
            dispatch(fetchMovieById(movie.imdbID));
        }
        toggleModal();
    }
    const [showModal, setShowModal] = useState(false);
    const toggleModal = () => setShowModal(!showModal)

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
        content = fetchedMovies.map( movie => <Col onClick={()=>fetchDetail(movie)}><ResultCard  movie={movie} /></Col>)
    }

    return (
        <>
            <div id="search-result-container">
                <Row align="middle">
                    {content}
                </Row>
                <Modal
                    title="Movie Details"
                    visible={showModal}
                    onOk={toggleModal}
                    onCancel={toggleModal}
                    footer={[]}
                    >
                    <DetailModal />
                </Modal>
            </div>
        </>
    )
}

export default Results