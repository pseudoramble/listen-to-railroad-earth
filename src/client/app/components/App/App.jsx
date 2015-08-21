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
        ShowStore.addChangeListener(this.recalculateState);
    }

    componentWillUnmount() {
        ShowStore.removeChangeListener(this.recalculateState);
    }

    recalculateState = (params) => {
        const year = params.year || this.state.year;
        
        this.setState({
            year : year,
            shows : ShowStore.getShows(year),
            setlist : ShowStore.getSetlist(show),
            track : params.track
        });
    }

    onYearSelected(year) {
        AppActions.yearSelected(year);
    }
            
    onShowSelected(show) {
        AppActions.showSelected(show.key);
    }

    onTrackSelected(track) {
        this.recalculateState({ track : track.key });
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
            return (
                <div key={show.id}>
                    <span>{show.date} - </span>
                    <span>{show.venue} - </span>
                    <span>{show.location}</span>
                </div>
            );
        });
    }

    setlistEntries(setlist) {
        return setlist.map((track, i) => {
            return (
                <div key={track.url} number={i}>
                    <span>{track.title}</span>
                </div>
            );
        });
    }
   
    render() {
        const years = this.yearRange("2001", "2015");
        const shows = this.showEntries(this.state.shows);
        const setlist = this.setlistEntries(this.state.setlist);
        const track = this.state.track;
        
        return (
            <div className={styles.app}>
                <div className={styles.listings}>
                    <Listing entries={years} onEntryClicked={this.onYearSelected}></Listing>
                    <Listing entries={shows} onEntryClicked={this.onShowSelected}></Listing>
                    <Listing entries={setlist} onEntryClicked={this.onTrackSelected.bind(this)}></Listing>
                </div>
                <Player tracklist={setlist} track={track}></Player>
            </div>
        );
    }
}
