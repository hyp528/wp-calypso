/* eslint strict: "off" */

'use strict';

module.exports = function( report ) {
	// deep clone the report, so we can create a new one
	// to tweak and edit in place - as this function remains pure.
	const newReport = [];

	report.forEach( file => {
		let areParsingErrors = false;
		file.messages.forEach( message => {
			if ( message.fatal ) {
				// A file contains only 1 message if there are parsing errors
				// so it would be safe to push the file to the report
				// at this point. Just in case, use a flag a push it outside
				// this bucle.
				areParsingErrors = true;
			}
		} );
		if ( areParsingErrors ) {
			newReport.push( file );
		}
	} );

	return newReport;
};
