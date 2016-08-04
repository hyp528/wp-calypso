/**
 * External dependencies
 */
import { combineReducers } from 'redux';

/**
 * Internal dependencies
 */
import {
	SITE_STICKERS_REQUEST,
	SITE_STICKERS_REQUEST_SUCCESS,
	SITE_STICKERS_REQUEST_FAILURE
} from 'state/action-types';
import { createReducer } from 'state/utils';

export const items = createReducer( {}, {
	[ SITE_STICKERS_REQUEST_SUCCESS ]: ( state, action ) => Object.assign( {}, state, {
		[ action.siteId ]: action.stickers
	} )
} );

export const fetchingItems = createReducer( [], {
	[ SITE_STICKERS_REQUEST ]: ( state, action ) => Object.assign( {}, state, { [ action.siteId ]: true } ),
	[ SITE_STICKERS_REQUEST_SUCCESS ]: ( state, action ) => Object.assign( {}, state, { [ action.siteId ]: false } ),
	[ SITE_STICKERS_REQUEST_FAILURE ]: ( state, action ) => Object.assign( {}, state, { [ action.siteId ]: false } ),
} );

export default combineReducers( {
	items,
	fetchingItems
} );
