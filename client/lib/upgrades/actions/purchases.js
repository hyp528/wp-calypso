/**
 * External dependencies
 */
import debugFactory from 'debug';

/**
 * Internal dependencies
 */
import wp from 'lib/wp';

const debug = debugFactory( 'calypso:upgrades:actions:purchases' ),
	wpcom = wp.undocumented();

function cancelPurchase( purchaseId, onComplete ) {
	wpcom.cancelPurchase( purchaseId, ( error, data ) => {
		debug( error, data );

		const success = ! error && data.success;

		onComplete( success );
	} );
}

function cancelAndRefundPurchase( purchaseId, data, onComplete ) {
	wpcom.cancelAndRefundPurchase( purchaseId, data, onComplete );
}

export {
	cancelAndRefundPurchase,
	cancelPurchase,
};
