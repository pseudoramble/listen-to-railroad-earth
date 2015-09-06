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
        PlayerActions.trackFinished(this.props.startTrack);
    }
    
    render() {
        const startTrack = this.props.startTrack;

        return (
            <div>
                <audio ref="audioTag" src={startTrack && startTrack.url ? startTrack.url : ""} className={styles.player} controls="controls" autoPlay="autoplay"></audio>
            </div>
        );
    }
}
