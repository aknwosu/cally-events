import React from 'react'
import styled from 'styled-components'

const EventOverlay = styled.div`
    height: ${props => `${props.duration * (100 / 60)}%` || '200px'};
    background-color: ${props => `${props.colourToSummary[props.summary]}`};
    position: absolute;
    z-index: 4;
    top: ${props => `${props.offset * (100 / 60)}%` || '200px'};
    width: 100%;
    border-radius: 7px;
`
const DateCard = styled.td`
    height: 95px;
    width: 190px;
	color: white;
	border: 1px solid #dad5d5;
    position: relative;
`
const EventCard = ({ gridEvent = [], colorToSummary = {} }) => {
	return (
		<DateCard>
			{
				gridEvent.map(ev => (
					<EventOverlay
						key={ev.id}
						duration={ev.duration}
						offset={ev.offset}
						colorToSummary={colorToSummary}
						summary={ev.calendarSummary}
					>
						{ev.summary}{ev.duration}
					</EventOverlay>
				)
			)}

		</DateCard>
	)
}
export default EventCard