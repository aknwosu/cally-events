import Dayjs from 'dayjs'
import React from 'react'
import styled from 'styled-components'

const EventOverlay = styled.div`
    height: ${props => `${props.duration * (100 / 60)}%` || '200px'};
    background-color: ${props => `${props.colorToSummary[props.summary]}`};
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
const EventCard = ({ gridEvent = [], colorToSummary = {}, hiddenCalendars }) => {
	return (
		<DateCard>
			{
				gridEvent.map(ev => {
					return (
						<EventOverlay
							key={ev.id}
							duration={ev.duration}
							offset={ev.offset}
							colorToSummary={colorToSummary}
							summary={ev.calendarSummary}
							hidden={hiddenCalendars[ev.calendarSummary]}
						>
							<div>
								{ev.summary}
								<div>{Dayjs(ev.start.dateTime || ev.start.date).format('h')}{ev.end.dateTime && `- ${Dayjs(ev.end.dateTime).format('ha')}`} </div>

							</div>
						</EventOverlay>
					)
				}
			)}

		</DateCard>
	)
}
export default EventCard