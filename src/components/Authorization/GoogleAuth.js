import React, { useState, useEffect } from 'react';
import { DISCOVERY_DOCS, SCOPES, startOfWeek, endOfWeek } from '../../constants'
import SignIn from './SignIn'
import SignOut from './SignOut'
import Dayjs from 'dayjs'
import {gapi} from './gapi'
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const API_KEY = process.env.REACT_APP_API_KEY;

window.calendars = {}

function handleClientLoad({ setCalendars, setIsSignedIn, setColorToSummary }) {
	gapi.load('client:auth2', initClient.bind({ setCalendars, setIsSignedIn, setColorToSummary }));
}

// Initialize gapi
function initClient() {
	const setCalendars = this.setCalendars;
	const setIsSignedIn = this.setIsSignedIn;
	const setColorToSummary = this.setColorToSummary;

	gapi.client.init({
		apiKey: API_KEY,
		clientId: CLIENT_ID,
		discoveryDocs: DISCOVERY_DOCS,
		scope: SCOPES
	}).then(() => {
		// Listen for sign-in state changes.
		gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus.bind({ setCalendars, setIsSignedIn, setColorToSummary }));

		// Handle the initial sign-in state.
		updateSigninStatus.bind({ setCalendars, setIsSignedIn, setColorToSummary })(gapi.auth2.getAuthInstance().isSignedIn.get());
	}, function (error) {
		console.error(error)
	});
}

/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */
function updateSigninStatus(isSignedIn) {
	this.setIsSignedIn(isSignedIn)
	if (isSignedIn) {

		getUsersCalendarList(this.setCalendars, this.setColorToSummary)
	}
}

function listUpcomingEvents(calendarId = 'Primary', summary, setCalendars) {
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
		const transformed = events.reduce((result, event) => {
			const when = Dayjs(event.start.dateTime || event.start.date)
			const endTime = Dayjs(event.end.dateTime || event.end.date)

			const whenFormatted = when.format('YYYY-MM-DD[T]HH');
			const duration = endTime.diff(when, 'minutes')
			const offset = when.get('minute')
			if (!result.hasOwnProperty(whenFormatted)) {
				result[whenFormatted] = []
			}
			result[whenFormatted].push({
				...event,
				calendarSummary: summary,
				duration,
				offset
			})
			return result;
		}, {})
		setCalendars((prevState) => ({ ...prevState, ...transformed }));


	});
}

const getUsersCalendarList = async (setCalendars, setColorToSummary) => {
	gapi.client.calendar.calendarList.list({
		'showDeleted': false,
		'singleEvents': true,
		'orderBy': 'startTime',
	}).then(async (response) => {
		var calendarList = response.result.items;
		for (let i = 0; i < calendarList.length; ++i) {
			const summary = calendarList[i].primary ? 'Primary' : calendarList[i].summary
			setColorToSummary(prevState => ({
				...prevState,
				[summary]: calendarList[i].backgroundColor,
			}))
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

const GoogleAuth = ({ setCalendars, setColorToSummary }) => {
	const [isSignedIn, setIsSignedIn] = useState(false)

	useEffect(() => {
		handleClientLoad({ setCalendars, setIsSignedIn, setColorToSummary });
	}, [setCalendars, setColorToSummary])


	return (
		<div>
			{
				isSignedIn ?
					<SignOut handleSignOut={handleSignOut} setCalendars={setCalendars} setColorToSummary={setColorToSummary} /> :
					<SignIn handleAuthClick={handleAuthClick} />
			}
		</div>
	)
}

export default GoogleAuth