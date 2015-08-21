import styles from './_Player.scss';

import React from 'react';

export default class Player extends React.Component {
    render() {
        return (
            <audio className={styles.player} controls="controls"></audio>
        );
    }
}
