/**
 * External dependencies
 */

import get from 'lodash/get';

export function siteHasSticker( state, siteId, sticker ) {
	return !! get( state, [ 'sites', 'stickers', 'items', siteId, sticker ], false );
}

export function isRequestingSiteStickers( state, siteId ) {
	return !! state.sites.stickers.fetchingItems[ siteId ];
}
