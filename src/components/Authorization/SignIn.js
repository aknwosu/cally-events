import React from 'react'

const SignIn = ({ handleAuthClick }) => {
	return (
		<>
		<button onClick={handleAuthClick}>Sign In</button>
		<div>Your events will show up after you've signed in</div>
		</>
	)
}

export default SignIn