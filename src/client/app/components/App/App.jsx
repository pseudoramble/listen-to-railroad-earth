import styles from './_App.scss';

import React from 'react';
let { Component, PropTypes } = React;

import AppActions from '../../actions/AppActions';
import ShowStore from '../../stores/ShowStore';

import Listing from '../Listing/Listing';
import Player from '../Player/Player';

export default class App extends Component {
    getInitialState() {
        return {
            year : "",
            shows : [],
            setlist : []
        }
    }

    componentWillMount() {
        this.setState(this.getInitialState());
    }
    
    componentDidMount() {
        ShowStore.addChangeListener(this.onChange);
    }

    componentWillUnmount() {
        ShowStore.removeChangeListener(this.onChange);
    }

    onChange = (year) => {
        this.setState({
            year : year,
            shows : ShowStore.getShows(year)
        });
    }

    yearRange(startYear, endYear) {
        let current = parseInt(startYear);
        const range = [], end = parseInt(endYear);
        
        while (current <= end) {
            range.push(current);
            current++;
        }

        return range;
    }

    showEntries(shows) {
        return shows.map((show) => {
            return <div key={show.id}>
                <span>{show.date} - </span>
                <span>{show.venue} - </span>
                <span>{show.location}</span>
            </div>
        });
    }
    
    onYearChange(year) {
        AppActions.yearSelected(year);
    }

    onShowSelected(show) {
        console.warn(show);
    }
    
    render() {
        const years = this.yearRange("2001", "2015");
        const shows = this.showEntries(this.state.shows);
        
        return (
            <div className={styles.app}>
                <div className={styles.listings}>
                    <Listing entries={years} onEntryClicked={this.onYearChange}></Listing>
                    <Listing entries={shows} onEntryClicked={this.onShowSelected}></Listing>
                    <Listing></Listing>
                </div>
                <Player></Player>
            </div>
        );
    }
}
