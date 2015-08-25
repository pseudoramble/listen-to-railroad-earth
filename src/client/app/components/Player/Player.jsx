import styles from './_Player.scss';

import React from 'react';

export default class Player extends React.Component {
    componentWillMount() {
        this.setState({});
    }

    componentWillReceiveProps(nextProps) {
        const nextTrackIndex = nextProps && nextProps.track ? nextProps.track.index : undefined;
        
        this.setState({
            index : nextTrackIndex
        });
    }
    
    shouldComponentUpdate(nextProps) {
        return !!nextProps.track && this.props.track !== nextProps.track;
    }

    nextTrack() {
        const audioNode = React.findDOMNode(this.refs.audioTag);
        const nextTrack = (this.state.index || this.props.track.index) + 1

        if (nextTrack < this.props.tracklist.length) {
            audioNode.src = this.props.tracklist[nextTrack].url;

            this.setState({
                index : nextTrack
            });
        }
    }

    componentDidMount() {
        const audioNode = React.findDOMNode(this.refs.audioTag);
        audioNode.addEventListener("ended", this.nextTrack.bind(this));
    }
    
    render() {
        const currentTrack = this.props.track ? this.props.track.url : "",
              audioTag =  (
                  <audio ref="audioTag" onEnded={this.nextTrack} src={currentTrack} className={styles.player} controls="controls" autoPlay="autoplay"></audio>
              );

        return audioTag;
    }
}
