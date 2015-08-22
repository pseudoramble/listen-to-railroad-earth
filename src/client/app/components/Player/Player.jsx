import styles from './_Player.scss';

import React from 'react';

export default class Player extends React.Component {
    shouldComponentUpdate(nextProps) {
        return !!nextProps.track && this.props.track !== nextProps.track;
    }
    
    render() {
        const currentTrack = this.props.track,
              trackList = this.props.tracklist.map((track) => <source key={track.url} src={track.url} />)

        return (
            <audio src={this.props.track} className={styles.player} controls="controls" autoPlay="autoplay">
                {trackList}
            </audio>
        );
    }
}
