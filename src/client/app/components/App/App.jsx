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
            setlist : [],
            displayedListing : "year"
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
            selectedShow : show,
            shows : ShowStore.getShows(year),
            setlist : params.setlist || ShowStore.getSetlist(show)
        });
    }

    onPlaylistConfigured = (params) => {
        this.setState({
            track : params.startTrack
        });
    }

    onTitleClicked(listingName) {
        this.setState({
            displayedListing : listingName
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

    playerInfo(year, showId, trackSelected) {
        const showInfo = ShowStore.getShowInfo(year, showId);

        if (showInfo.venue && showInfo.location && trackSelected)
            return (<a href={"https://archive.org/details/" + showInfo.id} target="_blank">
                      {showInfo.venue + " in " + showInfo.location}
                    </a>);
        else
            return "";
    }
    
    render() {
        const years = this.yearEntries(this.yearRange("2001", "2015")),
              shows = this.showEntries(this.state.shows),
              setlist = this.setlistEntries(this.state.setlist),
              startTrack = this.state.track,
              displayInfo = this.playerInfo(this.state.year, this.state.selectedShow, !!startTrack);

        return (
            <div className={styles.app}>
                <div className={styles.listings}>
                    <Listing id="years-listing"
                             title="Years"
                             entries={years}
                             onTitleClick={this.onTitleClicked.bind(this, "year")}>
                    </Listing>
                    <Listing id="shows-listing"
                             title="Shows"
                             entries={shows}
                             onTitleClick={this.onTitleClicked.bind(this, "shows")}>
                    </Listing>
                    <Listing id="setlist-listing"
                             title="Setlist"
                             entries={setlist}
                             onTitleClick={this.onTitleClicked.bind(this, "setlist")}>
                    </Listing>
                </div>
                <Player startTrack={startTrack} displayInfo={displayInfo}></Player>
            </div>
        );
    }
}
