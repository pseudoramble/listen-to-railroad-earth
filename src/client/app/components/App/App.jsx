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
        ShowStore.addPlaylistConfiguredListener(this.onPlaylistConfigured);
    }

    componentWillUnmount() {
        ShowStore.removeChangeListener(this.recalculateState);
        ShowStore.removePlaylistConfiguredListener(this.onPlaylistConfigured);
    }

    recalculateState = (params) => {
        const year = params.year || this.state.year;
        const show = params.show || this.state.show;
        
        this.setState({
            year : year,
            shows : ShowStore.getShows(year),
            setlist : params.setlist || ShowStore.getSetlist(show),
        });
    }

    onPlaylistConfigured = (params) => {
        this.setState({
            track : params.startTrack
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

    yearEntries(years) {
        return years.map((year) => <div key={year}>{year}</div>);
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
        return setlist.map((track) => {
            return (
                <div key={track.id}>
                    <span>{track.title}</span>
                </div>
            );
        });
    }
   
    render() {
        const years = this.yearEntries(this.yearRange("2001", "2015")),
              shows = this.showEntries(this.state.shows),
              setlist = this.setlistEntries(this.state.setlist),
              startTrack = this.state.track;

        return (
            <div className={styles.app}>
                <div className={styles.listings}>
                    <Listing id="years-listing" title="Years" entries={years}></Listing>
                    <Listing id="shows-listing" entries={shows}></Listing>
                    <Listing id="setlist-listing" entries={setlist}></Listing>
                </div>
                <Player startTrack={startTrack}></Player>
            </div>
        );
    }
}
