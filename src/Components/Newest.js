import React, { Component } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import axios from 'axios';

class Newest extends Component {
    constructor() {
        super()
        this.state = {
            showList: []
        }
    }
    componentDidMount() {
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
                showList: result.data.results
            })
        })
    }

    render() {
        return (
            <Router>
            <div className='viewMoreWrapper'>
                <h1>Checkout What's Just Released</h1>
                <ul className='viewMoreList'>
                    {
                        this.state.showList.map((show) => {
                            return (
                                <li className='shows'>
                                    <Link to={`/tv/${show.id}`}>
                                        <img src={`http://image.tmdb.org/t/p/w500/${show.poster_path}`} alt=""/>
                                    </Link>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
            </Router>
        )
    }
}

export default Newest