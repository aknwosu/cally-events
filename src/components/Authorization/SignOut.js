import React from 'react'

const SignOut = ({ handleSignOut, setCalendars, setColorToSummary }) => {
	const onSignOutClick = React.useCallback((event) => {
		event.preventDefault();
		handleSignOut();
		setCalendars({});
		setColorToSummary({});
	}, [handleSignOut, setCalendars, setColorToSummary])
	return (
		<button onClick={onSignOutClick}>Sign Out</button>
	)
}
export default SignOut