import styles from './_Player.scss';

import React from 'react';

export default class Player extends React.Component {
    shouldComponentUpdate(nextProps) {
        return !!nextProps.track && this.props.track !== nextProps.track;
    }
    
    render() {
        const currentTrack = <source src={this.props.track} />

        return (
            <audio src={this.props.track} className={styles.player} controls="controls" autoPlay="autoplay">
                {currentTrack}
            </audio>
        );
    }
}
