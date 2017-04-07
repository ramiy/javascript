import * as actions from "../../src/actions/sites";
import { getApiUrl } from "../../src/functions/api";

jest.mock( "../../src/functions/auth", () => {
	return {
		getUserId: jest.fn( () => { return 10 } ),
		getAccessToken: jest.fn( () => { return "access" } ),

	}
} );

jest.mock( "whatwg-fetch" );

let expectedRequest = new Request( getApiUrl() + "/MyYoastUsers/10/sites/?access_token=access", {
	method: "POST",
	body: JSON.stringify( {
		url: "http://yoast.com",
	} ),
	headers: {
		"Content-Type": "application/json",
	},
} );

test( 'opening link site pop-up action creator', () => {
	const expected = {
		type: actions.LINK_SITE_POPUP_OPEN,
	};

	const actual = actions.linkSitePopupOpen( );

	expect( actual ).toEqual( expected );
} );


test( 'closing link site pop-up action creator', () => {
	const expected = {
		type: actions.LINK_SITE_POPUP_CLOSE,
	};

	const actual = actions.linkSitePopupClose();

	expect( actual ).toEqual( expected );
} );

test( 'server request action creator', () => {
	const expected = {
		type: actions.LINK_SITE_REQUEST,
	};

	const actual = actions.linkSiteRequest();

	expect( actual ).toEqual( expected );
} );

test( 'link site success creator', () => {
	const expected = {
		type: actions.LINK_SITE_SUCCESS,
		site: {
			"id": "497490e6-eb8d-4627-be9b-bfd33fc217f1",
			"url": "http://yoast.com",
			"creationDate": "2017-03-21T08:54:09.415Z",
			"userId": 1
		},
	};
	const input = {
		"id": "497490e6-eb8d-4627-be9b-bfd33fc217f1",
		"url": "http://yoast.com",
		"creationDate": "2017-03-21T08:54:09.415Z",
		"userId": 1
	};

	const actual = actions.linkSiteSuccess( input );

	expect( actual ).toEqual( expected );
} );


test( 'link site failure creator', () => {
	const expected = {
		type: actions.LINK_SITE_FAILURE,
		linkSiteError: "Authorization Required",
	};
	const input = "Authorization Required";

	const actual = actions.linkSiteFailure( input );

	expect( actual ).toEqual( expected );
} );

test( 'link site action action creator with success', () => {
	global.fetch = jest.fn( () => {
		return Promise.resolve( {
			status: 200,
			json: () => { return {
				"id": "7e54b616-59a7-4389-af3e-c2e0c093b955",
				"url": "5",
				"creationDate": "2017-03-21T15:24:34.606Z",
				"userId": 5
			} },
		} );
	});

	const dispatch = jest.fn();

	const linkSiteFunc = actions.linkSite( "http://yoast.com" );

	expect( linkSiteFunc ).toBeInstanceOf( Function );

	let site = {
		"id": "7e54b616-59a7-4389-af3e-c2e0c093b955",
		"url": "5",
		"creationDate": "2017-03-21T15:24:34.606Z",
		"userId": 5
	};

	return linkSiteFunc( dispatch ).then( () => {
		 expect( dispatch ).toHaveBeenCalledWith( actions.linkSiteRequest( "http://yoast.com" ) );
		 expect( global.fetch ).toHaveBeenCalledWith( expectedRequest );
		 expect( dispatch ).toHaveBeenCalledWith( actions.linkSiteSuccess( site ) );
	} );
} );

test( 'link site action creator with failure', () => {
	global.fetch = jest.fn( () => {
		return Promise.resolve( {
			json: () => { return {
				"error": {
					"statusCode": 500,
					"name": "Error",
					"message": "Duplicate entry for Site.id",
					"stack": "Error: Duplicate entry for Site.id\n    at Memory._createSync (/Users/maarten/Yoast/my-yoast/node_modules/loopback-datasource-juggler/lib/connectors/memory.js:224:15)\n    at Memory.create (/Users/maarten/Yoast/my-yoast/node_modules/loopback-datasource-juggler/lib/connectors/memory.js:232:8)\n    at /Users/maarten/Yoast/my-yoast/node_modules/loopback-datasource-juggler/lib/dao.js:397:23\n    at doNotify (/Users/maarten/Yoast/my-yoast/node_modules/loopback-datasource-juggler/lib/observer.js:99:49)\n    at doNotify (/Users/maarten/Yoast/my-yoast/node_modules/loopback-datasource-juggler/lib/observer.js:99:49)\n    at doNotify (/Users/maarten/Yoast/my-yoast/node_modules/loopback-datasource-juggler/lib/observer.js:99:49)\n    at doNotify (/Users/maarten/Yoast/my-yoast/node_modules/loopback-datasource-juggler/lib/observer.js:99:49)\n    at Function.ObserverMixin._notifyBaseObservers (/Users/maarten/Yoast/my-yoast/node_modules/loopback-datasource-juggler/lib/observer.js:122:5)\n    at Function.ObserverMixin.notifyObserversOf (/Users/maarten/Yoast/my-yoast/node_modules/loopback-datasource-juggler/lib/observer.js:97:8)\n    at Function.ObserverMixin._notifyBaseObservers (/Users/maarten/Yoast/my-yoast/node_modules/loopback-datasource-juggler/lib/observer.js:120:15)\n    at Function.ObserverMixin.notifyObserversOf (/Users/maarten/Yoast/my-yoast/node_modules/loopback-datasource-juggler/lib/observer.js:97:8)\n    at Function.ObserverMixin._notifyBaseObservers (/Users/maarten/Yoast/my-yoast/node_modules/loopback-datasource-juggler/lib/observer.js:120:15)\n    at Function.ObserverMixin.notifyObserversOf (/Users/maarten/Yoast/my-yoast/node_modules/loopback-datasource-juggler/lib/observer.js:97:8)\n    at Function.ObserverMixin._notifyBaseObservers (/Users/maarten/Yoast/my-yoast/node_modules/loopback-datasource-juggler/lib/observer.js:120:15)\n    at Function.ObserverMixin.notifyObserversOf (/Users/maarten/Yoast/my-yoast/node_modules/loopback-datasource-juggler/lib/observer.js:97:8)\n    at ModelConstructor.<anonymous> (/Users/maarten/Yoast/my-yoast/node_modules/loopback-datasource-juggler/lib/dao.js:393:15)"
				}
			} },
		} );
	});

	const dispatch = jest.fn();

	const linkSiteFunc = actions.linkSite( "http://yoast.com" );

	expect( linkSiteFunc ).toBeInstanceOf( Function );

	return linkSiteFunc( dispatch ).then( () => {
		expect( dispatch ).toHaveBeenCalledWith( actions.linkSiteRequest( "http://yoast.com" ) );
		expect( global.fetch ).toHaveBeenCalledWith( expectedRequest );
		expect( dispatch ).toHaveBeenCalledWith( actions.linkSiteFailure( "Duplicate entry for Site.id" ) );
	} );
} );

test( 'retrieve sites request action creator', () => {
	const expected = {
		type: actions.RETRIEVE_SITES_REQUEST,
	};

	const actual = actions.retrieveSitesRequest();

	expect( actual ).toEqual( expected );
} );


test( 'retrieve sites success creator', () => {
	const expected = {
		type: actions.RETRIEVE_SITES_SUCCESS,
		sites: [ {
			"id": "497490e6-eb8d-4627-be9b-bfd33fc217f1",
			"url": "http://yoast.com",
			"creationDate": "2017-03-21T08:54:09.415Z",
			"userId": 1
		}, ]
	};
	const input = [ {
		"id": "497490e6-eb8d-4627-be9b-bfd33fc217f1",
		"url": "http://yoast.com",
		"creationDate": "2017-03-21T08:54:09.415Z",
		"userId": 1
	} ];

	const actual = actions.retrieveSitesSuccess( input );

	expect( actual ).toEqual( expected );
} );


test( 'retrieve sites failure creator', () => {
	const expected = {
		type: actions.RETRIEVE_SITES_FAILURE,
		retrieveSitesError: "Authorization Required",
	};
	const input = "Authorization Required";

	const actual = actions.retrieveSitesFailure( input );

	expect( actual ).toEqual( expected );
} );

let expectedRetrievingRequest = new Request( getApiUrl() + "/MyYoastUsers/10/sites/?access_token=access", {
	method: "GET",
	headers: {
		"Content-Type": "application/json",
	},
} );


test( 'retrieve sites action action creator with success', () => {
	global.fetch = jest.fn( () => {
		return Promise.resolve( {
			status: 200,
			json: () => { return [ {
				"id": "7e54b616-59a7-4389-af3e-c2e0c093b955",
				"url": "5",
				"creationDate": "2017-03-21T15:24:34.606Z",
				"userId": 5
			} ] },
		} );
	});

	const dispatch = jest.fn();

	const retrieveSiteFunc = actions.retrieveSites( );

	expect( retrieveSiteFunc ).toBeInstanceOf( Function );

	let sites = [ {
		"id": "7e54b616-59a7-4389-af3e-c2e0c093b955",
		"url": "5",
		"creationDate": "2017-03-21T15:24:34.606Z",
		"userId": 5
	} ];

	return retrieveSiteFunc( dispatch ).then( () => {
		expect( dispatch ).toHaveBeenCalledWith( actions.retrieveSitesRequest( ) );
		expect( global.fetch ).toHaveBeenCalledWith( expectedRetrievingRequest );
		expect( dispatch ).toHaveBeenCalledWith( actions.retrieveSitesSuccess( sites ) );
	} );
} );

test( 'retrieve sites action action creator with failure', () => {
	global.fetch = jest.fn( () => {
		return Promise.resolve( {
			json: () => { return {
				"error": {
					"statusCode": 404,
					"name": "Error",
					"message": "could not find a model with id 6",
					"code": "MODEL_NOT_FOUND",
					"stack": "Error: could not find a model with id 6"
				}
			} }
		} );
	});

	const dispatch = jest.fn();

	const retrieveSiteFunc = actions.retrieveSites( );

	expect( retrieveSiteFunc ).toBeInstanceOf( Function );

	return retrieveSiteFunc( dispatch ).then( () => {
		expect( dispatch ).toHaveBeenCalledWith( actions.retrieveSitesRequest( ) );
		expect( global.fetch ).toHaveBeenCalledWith( expectedRetrievingRequest );
		expect( dispatch ).toHaveBeenCalledWith( actions.retrieveSitesFailure( "could not find a model with id 6" ) );
	} );
} );
