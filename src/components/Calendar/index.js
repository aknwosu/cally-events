import React, { useState } from 'react'
import EventCard from './Event'
import Dayjs from 'dayjs';
import styled from 'styled-components'
import updateLocale from 'dayjs/plugin/updateLocale';
let isToday = require('dayjs/plugin/isToday')
Dayjs.extend(isToday)

Dayjs.extend(updateLocale)

const SplitSection = styled.div`
	display: flex;
	
`
const AsideSection = styled.div`
	flex-basis: 20%;
	padding-top: 1rem;
`
const Table = styled.table`
	border-collapse: collapse;
	display: block;
	background-color: white;
`
const Tbody = styled.tbody`
	height: 70vh;
	overflow-y: scroll;
	overflow-x: scroll;
	display: block;
	width: 100%;
`
const Thead = styled.thead`
	width: 100%;
  display: inline-table;
`
const StyledButton = styled.li`
	list-style-position: inside;
	width: 80%;
	background: ${({deselected}) => (deselected ? 'none' : `white`)};;
	border-radius: 5px;
	padding: 8px;
	margin: 8px;
	box-shadow: ${props => (props.deselected ? `none` : `0 1px 12px rgba(32,33,36,.28)`)};
	border-color: ${props => (props.deselected ? `none` : `rgba(223,225,229,0);`)};
	cursor: pointer;
	&:before {
		content: ".";
		color: ${props => props.colorToSummary };
		display: inline-block;
		width: 1em;
		margin-right: 5px;
		background: ${props => props.colorToSummary };
		text-decoration-line: none;
		border-radius: 50%;
  }
`
const CircleData = styled.div`
	background: ${props => props.isToday && '#5440f9' };
	padding: 7px;
	border-radius: 50%;
	margin-right: 10px;
`
const Th = styled.th`
	display: flex;
	align-items: center;
	flex: 1 0 auto;
`
const Container = styled.div`
	background: #e3e3e3;
  height: 100vh;
`
const UL = styled.ul`
	list-style: none;
`
const Tr = styled.tr`
	display: flex;
	justify-content: space-between;
	padding: 10px 0;
`
const Heading = styled.h2`
	border-bottom: 1px solid;
	padding: 20px;
	border-color: #b3b3b3;
`
const Calendar = ({ calendars, colorToSummary }) => {
	const [hiddenCalendars, setHiddenCalendars] = useState({})

	const weekDays = Dayjs.updateLocale('en').weekdays
	
	const setHiddenCalendarsHandler = (summary) => {
		setHiddenCalendars({...hiddenCalendars, [summary]: !hiddenCalendars[summary]})
	}
	const startOfWeek = Dayjs().startOf('week');

	const renderGrid = React.useCallback(() => {
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