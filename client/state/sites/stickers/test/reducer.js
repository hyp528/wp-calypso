/**
 * External dependencies
 */
import { expect } from 'chai';
import deepFreeze from 'deep-freeze';

/**
 * Internal dependencies
 */
import {
	SITE_STICKERS_REQUEST,
	SITE_STICKERS_REQUEST_SUCCESS,
	SITE_STICKERS_REQUEST_FAILURE
} from 'state/action-types';
import reducer, {
	items,
	fetchingItems
} from '../reducer';

describe( 'reducer', () => {
	it( 'should export expected reducer keys', () => {
		expect( reducer( undefined, {} ) ).to.have.keys( [
			'items',
			'fetchingItems'
		] );
	} );

	describe( '#items()', () => {
		it( 'should default to an empty object', () => {
			const state = items( undefined, {} );

			expect( state ).to.eql( {} );
		} );

		it( 'should index stickers by site ID', () => {
			const siteId = 2916284;
			const stickers = deepFreeze( {
				mature: true
			} );
			const state = items( undefined, {
				type: SITE_STICKERS_REQUEST_SUCCESS,
				siteId,
				stickers: {
					mature: true
				}
			} );

			expect( state ).to.eql( {
				2916284: stickers
			} );
		} );

		it( 'should override previous stickers', () => {
			const original = deepFreeze( {
				2916284: {
					mature: true
				},
				77203074: {
					potato: true
				}
			} );
			const state = items( original, {
				type: SITE_STICKERS_REQUEST_SUCCESS,
				stickers: {
					wordads: true
				},
				siteId: 2916284
			} );

			expect( state ).to.eql( {
				2916284: {
					wordads: true
				},
				77203074: {
					potato: true
				}
			} );
		} );
	} );

	describe( '#fetchingItems()', () => {
		it( 'should default to an empty object', () => {
			const state = fetchingItems( undefined, {} );

			expect( state ).to.eql( {} );
		} );

		it( 'should index fetching state by site ID', () => {
			const state = fetchingItems( undefined, {
				type: SITE_STICKERS_REQUEST,
				siteId: 2916284
			} );

			expect( state ).to.eql( {
				2916284: true
			} );
		} );

		it( 'should update fetching state by site ID on success', () => {
			const originalState = deepFreeze( {
				2916284: true
			} );
			const state = fetchingItems( originalState, {
				type: SITE_STICKERS_REQUEST_SUCCESS,
				siteId: 2916284
			} );

			expect( state ).to.eql( {
				2916284: false
			} );
		} );

		it( 'should update fetching state by site ID on failure', () => {
			const originalState = deepFreeze( {
				2916284: true
			} );
			const state = fetchingItems( originalState, {
				type: SITE_STICKERS_REQUEST_FAILURE,
				siteId: 2916284
			} );

			expect( state ).to.eql( {
				2916284: false
			} );
		} );

		it( 'should accumulate fetchingItems by site ID', () => {
			const originalState = deepFreeze( {
				2916284: false
			} );
			const state = fetchingItems( originalState, {
				type: SITE_STICKERS_REQUEST,
				siteId: 77203074
			} );
			expect( state ).to.eql( {
				2916284: false,
				77203074: true
			} );
		} );
	} );
} );
