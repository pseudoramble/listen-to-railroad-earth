import styles from './_Player.scss';

import React from 'react';

export default class Player extends React.Component {
    componentWillMount() {
        this.setState({});
    }

    componentWillReceiveProps(nextProps) {
        const nextTrackIndex = nextProps && nextProps.startTrack ? nextProps.startTrack : undefined;
        
        this.setState({
            index : nextTrackIndex
        });
    }
    
    shouldComponentUpdate(nextProps) {
        return !!nextProps.startTrack && this.props.track !== nextProps.startTrack;
    }

    setNextTrack() {
        const audioNode = React.findDOMNode(this.refs.audioTag);
        const nextTrack = (this.state.index || this.props.startTrack) + 1

        if (nextTrack < this.props.tracklist.length) {
            audioNode.src = this.props.tracklist[nextTrack].url;

            this.setState({
                index : nextTrack
            });
        }
    }
    
    componentDidMount() {
        const audioNode = React.findDOMNode(this.refs.audioTag);
        audioNode.addEventListener("ended", this.setNextTrack.bind(this));
    }
    
    render() {
        const startTrack = this.props.tracklist ? this.props.tracklist[this.props.startTrack || 0] : "";

        return (
            <div>
                <audio ref="audioTag" src={startTrack && startTrack.url ? startTrack.url : ""} className={styles.player} controls="controls" autoPlay="autoplay"></audio>
            </div>
        );
    }
}
