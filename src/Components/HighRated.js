import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class HighRated extends Component {
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
                sort_by: 'vote_average.desc',
                'vote_count.gte': 50,
                'vote_average.gte': 8,
                first_air_date_year: 2017
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
            <div className='viewMoreWrapper'>
                <h1>Checkout What's Trending</h1>
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
        )
    }
}

export default HighRated