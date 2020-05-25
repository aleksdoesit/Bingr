import React, { Component } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import axios from 'axios';

class Home extends Component {
    constructor() {
        super()
        this.state = {
            popularList: [],
            newestList: [],
            highestRatedList: []
        }
    }
    
    componentDidMount() {
        axios({
            method: 'GET',
            url: 'https://api.themoviedb.org/3/discover/tv',
            params: {
                api_key: '5cd6b6a1e0f8042fd72b72658e13964c',
                language: 'en-US',
                sort_by: 'popularity.desc',
                first_air_date_year: 2018            
            }
        }).then((result) => {
            console.log(result);
            this.setState({
                popularList: result.data.results
            })
        })
        axios({
            method: 'GET',
            url: 'https://api.themoviedb.org/3/discover/tv',
            params: {
                api_key: '5cd6b6a1e0f8042fd72b72658e13964c',
                language: 'en-US',
                first_air_date_year: 2020
            }
        }).then((result) => {
            console.log(result);
            this.setState({
                newestList: result.data.results
            })
        })
        axios({
            method: 'GET',
            url: 'https://api.themoviedb.org/3/discover/tv',
            params: {
                api_key: '5cd6b6a1e0f8042fd72b72658e13964c',
                language: 'en-US',
                sort_by: 'vote_average.desc',
                'vote_count.gte': 50,
                'vote_average.gte': 8,
                first_air_date_year: 2017
            }
        }).then((result) => {
            console.log(result);
            this.setState({
                highestRatedList: result.data.results
            })
        })
    }

    render() {
        return (
            <Router>
            <div className='main'>
                <header className='mainHeader'>
                    <div className='intro'>
                        <h3>Welcome to</h3>
                        <h1>Bingr</h1>
                        <p>Discover Your New Favourite Show</p>
                        <button><a href="#">Get Started</a></button>
                    </div>

                    <div className='posterCollage'>
                        <div className='overlay'>
                        </div>
                        <div className='imageContainer'>
                        {
                            this.state.popularList.slice(0, 18).map((poster) => {
                                return (
                                    <img src={`http://image.tmdb.org/t/p/w500/${poster.poster_path}`} alt=""/>
                                )
                            })
                        }
                        </div>
                    </div>
                </header>
                <h2>Trending</h2>
                <ul className='popularShows'>
                {
                    this.state.popularList.slice(0, 5).map((show) => {
                        return (
                            <li className='shows'>
                                <Link to={`/tv/${show.id}`}>
                                    <img src={`http://image.tmdb.org/t/p/w500/${show.poster_path}`} alt=""/>
                                </Link>
                            </li>
                        )
                    })
                }
                <Link className='viewMoreContainer' to={`/popular`}>
                <button className='viewMore'><a href="#">View More ➡</a></button>
                </Link>
            </ul>
            <h2>Newest</h2>
            <ul className='newestShows'>
                {
                    this.state.newestList.slice(0, 5).map((show) => {
                        return (
                            <li className='shows'>
                                <Link to={`/tv/${show.id}`}>
                                    <img src={`http://image.tmdb.org/t/p/w500/${show.poster_path}`} alt=""/>
                                </Link>
                            </li>
                        )
                    })
                }
                <Link className='viewMoreContainer' to={`/new`}>
                    <button className='viewMore'n><a href="#">View More ➡</a></button>
                </Link>
            </ul>
            <h2>Highly Rated</h2>
            <ul className='highestRatedShows'>
                {
                    this.state.highestRatedList.slice(0, 5).map((show) => {
                        return (
                            <li className='shows'>
                                <Link to={`/tv/${show.id}`}>
                                    <img src={`http://image.tmdb.org/t/p/w500/${show.poster_path}`} alt=""/>
                                </Link>
                            </li>
                        )
                    })
                }
                <Link className='viewMoreContainer' to={`/rated`}>
                <button className='viewMore'><a href="#">View More ➡</a></button>
                </Link>
            </ul>
            </div>
            </Router>
        )
    }
}

export default Home
