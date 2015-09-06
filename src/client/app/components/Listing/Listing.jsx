import styles from './_Listing.scss';
import ListingActions from '../../actions/ListingActions';

import React from 'react';

export default class Listing extends React.Component {
    onClick(entry) {
        ListingActions.listingSelected(this.props.id, entry.key);
    }
    
    render() {
        const entries = this.props.entries || [];        
        return (
            <div className={styles.listing}>
                <span className={styles.title}>{this.props.title}</span>
                {
                    entries.map((entry) => {
                        return (<button key={entry.key} onClick={this.onClick.bind(this, entry)}>{entry}</button>)
                    })
                 }
            </div>
        );
    }
}
