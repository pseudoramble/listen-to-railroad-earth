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

  render() {
    return (
        <div className={styles.app}>
            <div className={styles.listings}>
                <Listing></Listing>
                <Listing></Listing>
                <Listing></Listing>
            </div>
            <Player></Player>
        </div>
    );
  }
}
