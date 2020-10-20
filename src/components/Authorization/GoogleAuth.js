import React, { useState, useEffect } from 'react';
import { DISCOVERY_DOCS, SCOPES, startOfWeek, endOfWeek } from '../../constants'
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const API_KEY = process.env.REACT_APP_API_KEY;
const gapi = window.gapi;
window.calendars = {}


function handleClientLoad({ setCalendars, setIsSignedIn }) {
	gapi.load('client:auth2', initClient.bind({ setCalendars, setIsSignedIn }));
}

function initClient() {
	const setCalendars = this.setCalendars;
	const setIsSignedIn = this.setIsSignedIn;

	gapi.client.init({
		apiKey: API_KEY,
		clientId: CLIENT_ID,
		discoveryDocs: DISCOVERY_DOCS,
		scope: SCOPES
	}).then(() => {
		// console.log(gapi.auth2.getAuthInstance())
		// Listen for sign-in state changes.
		gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus.bind({ setCalendars, setIsSignedIn }));

		// Handle the initial sign-in state.
		updateSigninStatus.bind({ setCalendars, setIsSignedIn })(gapi.auth2.getAuthInstance().isSignedIn.get());
	}, function (error) {
		console.log(error)
	});
}

/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */
function updateSigninStatus(isSignedIn) {
	this.setIsSignedIn(isSignedIn)
	if (isSignedIn) {

		getUsersCalendarList(this.setCalendars)
	}
}

function listUpcomingEvents(calendarId = 'primary', summary, setCalendars) {
	gapi.client.calendar.events.list({
		'calendarId': calendarId,
		'showDeleted': false,
		'singleEvents': true,
		'timeMin': (new Date(startOfWeek)).toISOString(),
		'timeMax': (new Date(endOfWeek)).toISOString(),
		'orderBy': 'startTime'
	}).then(async function (response) {
		const events = response.result.items;
		window.calendarEvents = response.result.items

		window.calendars[summary] = events
		setCalendars((prevState) => ({ ...prevState }));


	});
}

const getUsersCalendarList = async (setCalendars) => {
	gapi.client.calendar.calendarList.list({
		// 'timeMin': (new Date()).toISOString(),
		'showDeleted': false,
		'singleEvents': true,
		'orderBy': 'startTime',
	}).then(async (response) => {
		var calendarList = response.result.items;

		for (let i = 0; i < calendarList.length; ++i) { // don't use a forEach
			const summary = calendarList[i].primary ? 'primary' : calendarList[i].summary
			await listUpcomingEvents(calendarList[i].id, summary, setCalendars)
		}
	});
}



/**
 *  Sign in the user upon button click.
 */
const handleAuthClick = (event) => {
	gapi.auth2.getAuthInstance().signIn();
}

/**
 *  Sign out the user upon button click.
 */

const handleSignOut = () => {
	gapi.auth2.getAuthInstance().signOut();
}

const GoogleAuth = ({ setCalendars }) => {
	const [isSignedIn, setIsSignedIn] = useState(false)

	useEffect(() => {
		handleClientLoad({ setCalendars, setIsSignedIn });
	}, [setCalendars])
	

	return (
		<div>
			{
				isSignedIn ?
				<button onClick={handleSignOut}>SignOut</button> :
				<button onClick={handleAuthClick}>Authorize</button>
			}
		
		</div>
	)
}

export default GoogleAuth