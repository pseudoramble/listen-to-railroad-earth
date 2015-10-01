import styles from './_Player.scss';
import PlayerActions from '../../actions/PlayerActions';

import {
    TRACK_FINISHED_NEXT,
    TRACK_FINISHED_PREV
} from '../../constants/AppConstants'

import React from 'react';

export default class Player extends React.Component {
    shouldComponentUpdate(nextProps) {
        return !this.props.startTrack || this.props.startTrack.id !== nextProps.startTrack.id;
    }
    
    componentDidMount() {
        const audioNode = React.findDOMNode(this.refs.audioTag);
        audioNode.addEventListener("ended", this.onTrackEnded.bind(this, TRACK_FINISHED_NEXT));
    }

    onTrackEnded(direction) {
        if (this.props.startTrack) {
            PlayerActions.trackFinished(this.props.startTrack, direction);
        }
    }
    
    render() {
        const startTrack = this.props.startTrack,
              trackTitle = this.props.startTrack ? this.props.startTrack.title
                                                 : "Nothing Playing Right Now";
        
        return (
            <div className={styles.player}>
                <div className={styles.controls}>
                    <span className={styles.button} onClick={this.onTrackEnded.bind(this, TRACK_FINISHED_PREV)}>&#x25C1;</span>
                    <audio className={styles.audio} ref="audioTag" src={startTrack && startTrack.url ? startTrack.url : ""} controls="controls" autoPlay="autoplay"></audio>
                    <span className={styles.button} onClick={this.onTrackEnded.bind(this, TRACK_FINISHED_NEXT)}>&#x25B7;</span>
                </div>
                <div className={styles.info}>
                    <span>Now Playing: </span>
                    <span className={styles.trackTitle}>{trackTitle}</span>
                    {this.props.displayInfo}
                </div>
            </div>
        );
    }
}
