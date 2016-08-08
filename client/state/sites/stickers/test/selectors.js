/**
 * External dependencies
 */
import { expect } from 'chai';

/**
 * Internal dependencies
 */
import {
	siteHasSticker,
	isRequestingSiteStickers
} from '../selectors';

describe( 'selectors', () => {
	const state = {
		sites: {
			stickers: {
				items: {
					2916284: {
						mature: false,
						wordads: true
					},
					77203074: {}
				},
				fetchingItems: {
					2916284: true,
					77203074: false
				}
			}
		}
	};
	describe( '#siteHasSticker()', () => {
		it( 'should return sticker value for a given site ID', () => {
			expect( siteHasSticker( state, 2916284, 'wordads' ) ).to.eql( true );
			expect( siteHasSticker( state, 2916284, 'mature' ) ).to.eql( false );
			expect( siteHasSticker( state, 2916284, 'wordads' ) ).to.eql( true );
		} );
		it( 'should return false when sticker absent', () => {
			expect( siteHasSticker( state, 2916284, 'potato' ) ).to.eql( false );
			expect( siteHasSticker( state, 77203074, 'mature' ) ).to.eql( false );
		} );
		it( 'should return false when site absent', () => {
			expect( siteHasSticker( state, 123, 'mature' ) ).to.eql( false );
		} );
	} );

	describe( '#isRequestingSiteStickers()', () => {
		it( 'should return fetching value for a site ID', () => {
			expect( isRequestingSiteStickers( state, 2916284 ) ).to.eql( true );
			expect( isRequestingSiteStickers( state, 77203074 ) ).to.eql( false );

		} );
		it( 'should return false when site ID value is absent', () => {
			expect( isRequestingSiteStickers( state, 12345 ) ).to.eql( false );
		} );
	} );
} );
