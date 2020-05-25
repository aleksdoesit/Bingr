import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Home from './Components/Home'
import ShowDetails from './Components/ShowDetails';
import Popular from './Components/Popular';
import HighRated from './Components/HighRated';
import Newest from './Components/Newest';
import './styles/styles.scss'

export class App extends Component {
    constructor() {
        super()
        this.state = {
            getCollage: []
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
                first_air_date_year: '2020',
                page: 1
            }
        }).then((result) => {
            console.log(result);
            this.setState({
                getCollage: result.data.results
            })
        })
    }
    render() {
        return (
            <Router>
                <div>
                    <nav className='mainNav'>
                        <h2>Bingr</h2>
                        <ul>
                            <Link className='routerNavigation' to='/'>Home</Link>
                            <Link className='routerNavigation' to='/popular'>Trending</Link>
                            <Link className='routerNavigation' to='/new'>New</Link>
                            <Link className='routerNavigation' to='/rated'>Highly Rated</Link>
                        </ul>
                    </nav>
                    <Route exact path='Bingr/' component={ Home }/>
                    <Route exact path='/tv/:id' component={ ShowDetails } />
                    <Route exact path='/popular' component={ Popular } />
                    <Route exact path='/new' component={ Newest } />
                    <Route exact path='/rated' component={ HighRated } />
                </div>
            </Router>
        )
    }
}

export default App
