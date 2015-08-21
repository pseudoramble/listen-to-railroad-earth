import styles from './_App.scss';

import React from 'react';

import AppActions from '../../actions/AppActions';
import ItemsStore from '../../stores/ItemsStore';

import Listing from '../Listing/Listing';
import Player from '../Player/Player';

function getAppState() {
    return {
        items: ItemsStore.getAll()
    };
}

export default class App extends React.Component {
    state = getAppState()
        
    componentDidMount() {
        ItemsStore.addChangeListener(this.onChange);
        AppActions.getItems();
    }

    componentWillUnmount() {
        ItemsStore.removeChangeListener(this.onChange);
    }

    onChange = () => {
        this.setState(getAppState());
    }

    yearRange(startYear, endYear) {
        let current = parseInt(startYear), end = parseInt(endYear);
        const range = [];
        
        while (current <= end) {
            range.push(current);
            current++;
        }

        return range;
    }
    
    render() {
        const years = this.yearRange("2001", "2015");
        
        return (
            <div className={styles.app}>
                <div className={styles.listings}>
                    <Listing entries={years}></Listing>
                    <Listing></Listing>
                    <Listing></Listing>
                </div>
                <Player></Player>
            </div>
        );
    }
}
