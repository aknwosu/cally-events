import Dayjs from 'dayjs'
import React from 'react'

import { EventOverlay, DateCard } from './styles'

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
							<div style={{ padding: '8px', fontSize: '13px' }}>
								{ev.summary || 'Untitled'}
								<div>{ev.start.dateTime && `${Dayjs(ev.start.dateTime).format('h:m')} - ${Dayjs(ev.end.dateTime).format('h:mma')}`} </div>
							</div>
						</EventOverlay>
					)
				}
				)}

		</DateCard>
	)
}
export default EventCard