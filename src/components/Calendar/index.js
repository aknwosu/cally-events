import React, { useState } from 'react'
import EventCard from './Event'
import Dayjs from 'dayjs';
import styled from 'styled-components'

import updateLocale from 'dayjs/plugin/updateLocale';
Dayjs.extend(updateLocale)

const SplitSection = styled.div`
	display: flex;
`
const AsideSection = styled.div`
	flex-basis: 20%;
	padding-top: 3rem;
`
const Table = styled.table`
	border-collapse: collapse;
	display: block;
`
const Tbody = styled.tbody`
	height: 70vh;
    overflow-y: auto;
    overflow-x: hidden;
    display: block;
    width: 100%;
`

const Calendar = ({ calendars, colorToSummary }) => {
	const [hiddenCalendars, setHiddenCalendars] = useState({})

	const weekDays = Dayjs.updateLocale('en').weekdays
	
	const setHiddenCalendarsHandler = (summary) => {
		setHiddenCalendars({...hiddenCalendars, [summary]: !hiddenCalendars[summary]})
	}
	const renderGrid = React.useCallback(() => {
		const startOfWeek = Dayjs().startOf('week');
		const grid = [];
		for (let hdx = 0; hdx < 24; hdx++) {
			grid.push([]);
			for (let ddx = 0; ddx < 7; ddx++) {
				const hour = startOfWeek.add(ddx, 'day').startOf('day').add(hdx, 'hour')
				grid[hdx].push(hour.format('YYYY-MM-DD[T]HH'))
			}
		}
		return grid
	}, []);
	if (!calendars) return <div>Loading...</div>
	return (
		<SplitSection>
			<AsideSection>
				{Object.keys(colorToSummary).map(summaryItem => (
					<div key={summaryItem} onClick={() => setHiddenCalendarsHandler(summaryItem)}>
						{summaryItem}
					</div>
				))}
			</AsideSection>
			<div>
				<Table>
					<thead>
						<tr>
							<th></th>
							{weekDays.map(weekDay => <th key={weekDay}>{weekDay}</th>)}
						</tr>
					</thead>
					<Tbody>
						{
							renderGrid().map((row, i) => {
								return (
									<tr key={`${row}${i}`}>
										{row.map(hour => {
										return <EventCard
											key={hour}
											gridEvent={calendars[hour]}
											colorToSummary={colorToSummary}
											hiddenCalendars={hiddenCalendars}
										/>}
										)}
									</tr>
								)
							})
						}
					</Tbody>
				</Table>
			</div>
		</SplitSection>
	)
}

export default Calendar