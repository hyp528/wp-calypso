/**
 * External dependencies
 */
import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

/**
 * Internal dependencies
 */
import { isRequestingSiteStickers } from 'state/sites/stickers/selectors';
import { requestSiteStickers } from 'state/sites/stickers/actions';

class QuerySiteStickers extends Component {
	componentWillMount() {
		if ( ! this.props.isRequestingSiteStickers ) {
			this.props.requestSiteStickers( this.props.siteId );
		}
	}

	render() {
		return null;
	}
}

QuerySiteStickers.propTypes = {
	isRequestingSiteStickers: PropTypes.bool,
	requestSiteStickers: PropTypes.func,
	siteId: PropTypes.number
};

QuerySiteStickers.defaultProps = {
	requestSiteStickers: () => {}
};

export default connect(
	( state, props ) => ( {
		isRequestingSiteStickers: isRequestingSiteStickers( state, props.siteId )
	} ),
	{ requestSiteStickers }
)( QuerySiteStickers );
