import styles from './_Listing.scss';
import ListingActions from '../../actions/ListingActions';

import React from 'react';

export default class Listing extends React.Component {
    onEntryClick() {
        const listingNode = this.refs.listingNode.getDOMNode();
        const index = listingNode.value;

        if (index > -1) {
            const entry = this.props.entries[index];
            ListingActions.listingSelected(this.props.id, entry.key);
        }
    }
    
    render() {
        const entries = this.props.entries || [];
        
        return (
            <select ref="listingNode" className={styles.listing} onChange={this.onEntryClick.bind(this)}>
                <option value={-1}>Make a selection</option>
                {
                    entries.map((entry, i) => {
                        return (<option key={entry.key} value={i}>{entry}</option>)
                    })
                 }
            </select>
        );
    }
}
