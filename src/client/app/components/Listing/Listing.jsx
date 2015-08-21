import styles from './_Listing.scss';

import React from 'react';

export default class Listing extends React.Component {
    render() {
        let entries = this.props.entries || [];
        
        return (
            <div className={styles.listing}>
                {
                    entries.map((entry) => {
                        return (<div key={entry}><a onClick={this.props.onEntryClicked.bind(this, entry)}>{entry}</a></div>)
                    })
                }
            </div>
        );
    }
}
