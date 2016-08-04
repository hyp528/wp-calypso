/**
 * Internal dependencies
 */
import wpcom from 'lib/wp';
import {
	SITE_STICKERS_REQUEST,
	SITE_STICKERS_REQUEST_SUCCESS,
	SITE_STICKERS_REQUEST_FAILURE
} from 'state/action-types';

export function requestSiteStickers( siteId ) {
	return ( dispatch ) => {
		dispatch( {
			type: SITE_STICKERS_REQUEST,
			siteId
		} );
		return wpcom.undocumented().getStickers( siteId ).then( ( stickersArray ) => {
			const stickers = {};
			stickersArray.forEach( key => stickers[ key ] = true );
			dispatch( {
				type: SITE_STICKERS_REQUEST_SUCCESS,
				siteId,
				stickers
			} );
		} ).catch( ( error ) => {
			dispatch( {
				type: SITE_STICKERS_REQUEST_FAILURE,
				siteId,
				error
			} );
		} );
	};
}
