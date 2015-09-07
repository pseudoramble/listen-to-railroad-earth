import styles from './_Player.scss';
import PlayerActions from '../../actions/PlayerActions';

import React from 'react';

export default class Player extends React.Component {
    shouldComponentUpdate(nextProps) {
        return !this.props.startTrack || this.props.startTrack.id !== nextProps.startTrack.id;
    }
    
    componentDidMount() {
        const audioNode = React.findDOMNode(this.refs.audioTag);
        audioNode.addEventListener("ended", this.onTrackEnded.bind(this));
    }

    onTrackEnded() {
        if (this.props.startTrack) {
            PlayerActions.trackFinished(this.props.startTrack);
        }
    }
    
    render() {
        const startTrack = this.props.startTrack,
              trackTitle = this.props.startTrack ? this.props.startTrack.title
                                                 : "Nothing Playing Right Now";
        
        return (
            <div className={styles.player}>
                <div className={styles.info}>
                    {trackTitle} ({this.props.displayInfo})
                </div>
                <div className={styles.controls}>
                    <span className={styles.button} onClick={this.onTrackEnded.bind(this)}>Previous</span>
                    <audio ref="audioTag" src={startTrack && startTrack.url ? startTrack.url : ""} controls="controls" autoPlay="autoplay"></audio>
                    <span className={styles.button} onClick={this.onTrackEnded.bind(this)}>Next</span>
                </div>
            </div>
        );
    }
}
