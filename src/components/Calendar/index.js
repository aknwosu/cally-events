import React, { useState } from 'react'
import EventCard from './Event'
import Dayjs from 'dayjs';
import updateLocale from 'dayjs/plugin/updateLocale';
import { SplitSection, AsideSection, Table, Tbody, Thead, StyledButton,
	CircleData, Th, Container, UL, Tr, Heading
} from './styles'
let isToday = require('dayjs/plugin/isToday')
Dayjs.extend(isToday)

Dayjs.extend(updateLocale)

const Calendar = ({ calendars = {}, colorToSummary }) => {
	const [hiddenCalendars, setHiddenCalendars] = useState({})

	const weekDays = Dayjs.updateLocale('en').weekdays
	
	const setHiddenCalendarsHandler = (summary) => {
		setHiddenCalendars({...hiddenCalendars, [summary]: !hiddenCalendars[summary]})
	}
	const startOfWeek = Dayjs().startOf('week');

	const renderGrid = () => {
		const grid = [];
		for (let hdx = 0; hdx < 24; hdx++) {
			grid.push([]);
			for (let ddx = 0; ddx < 7; ddx++) {
				const hour = startOfWeek.add(ddx, 'day').startOf('day').add(hdx, 'hour')
				grid[hdx].push(hour.format('YYYY-MM-DD[T]HH'))
			}
		}
		return grid
	};
	return (
		<Container>
			<Heading>{Dayjs(startOfWeek).format('MMMM, YYYY')}</Heading>
		<SplitSection>
			<AsideSection>
				<b>CALENDARS</b>
				<UL>
				{Object.keys(colorToSummary).map(summaryItem => (
					<StyledButton
						key={summaryItem}
						onClick={() => setHiddenCalendarsHandler(summaryItem)}
						deselected={hiddenCalendars[summaryItem]}
						colorToSummary={colorToSummary[summaryItem]}
					>
						{summaryItem}
					</StyledButton>
				))}
				</UL>
			</AsideSection>
				<Table>
					<Thead>
						<Tr>
							<th style={{width: '80px', marginRight: '10px'}}></th>
							{weekDays.map((weekDay, i) => (
								<Th key={weekDay}>
									<CircleData isToday={Dayjs(startOfWeek).add(i, 'days').isToday()}>
										{Dayjs(startOfWeek).add(i, 'day').format('D')}
									</CircleData>
									{weekDay}
								</Th>)
							)}
						</Tr>
					</Thead>
					<Tbody>
						{
							renderGrid().map((row, i) => {
								return (
									<tr key={`${row}${i}`}>
										<td style={{width: '90px', textAlign:'right', verticalAlign: 'top'}}>{`${Dayjs().hour(i).format('hA')}`}</td>
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
		</SplitSection>
		</Container>
	)
}

export default Calendar