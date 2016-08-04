/* eslint strict: "off" */

'use strict';

const childProcess = require( 'child_process' );
const linesAndRules = require( './lines-modified-and-specific-rules' );
const parsingErrors = require( './parsing-errors' );

module.exports = function( report ) {
	let branchName = process.env.ESLINES_BRANCH;
	if ( ! branchName ) {
		const argsBranchName = [ 'rev-parse', '--abbrev-ref', 'HEAD' ];
		branchName = childProcess.spawnSync( 'git', argsBranchName ).stdout.toString().trim();
	}

	if ( branchName === 'master' ) {
		return parsingErrors( report );
	}
	return linesAndRules( report );
};
