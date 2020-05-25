import React, { Component } from 'react';
import axios from 'axios';

class ShowDetails extends Component {
    constructor() {
        super()
        this.state = {
            show: {},
            genres: []
        }
    }

    componentDidMount(){
        axios({
            method: 'GET',
            url: `https://api.themoviedb.org/3/tv/${this.props.match.params.id}`,
            params: {
                api_key: '5cd6b6a1e0f8042fd72b72658e13964c'
            }
        }).then((result) => {
            this.setState({
                show: result.data,
                genres: result.data.genres
            })
        })
    }

    render() {
        console.log(this.state);
        return (
            <div className='detailsWrapper'>
                <div className='posterContainer'>
                    <img src={`http://image.tmdb.org/t/p/w500/${this.state.show.poster_path}`} alt=""/>
                </div>
                <div className='showDescription'>
                    <h1>{this.state.show.name}</h1>
                    <div className='episodeGuide'>
                    <p>Seasons: {this.state.show.number_of_seasons}</p>
                    <p>Episodes {this.state.show.number_of_episodes}</p>
                    </div>
                    <p className='showOverview'>{this.state.show.overview}</p>
                    <button><a href={this.state.show.homepage} target="_blank">Visit Homepage</a></button>
                    <div className='genres'>
                        <p>Tags:</p>
                        {this.state.genres.map((genre) => {
                            return (
                                <p>{genre.name}</p>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }
}

export default ShowDetails
