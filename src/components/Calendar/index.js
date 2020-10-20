import React from 'react'
import EventCard from './Event'
import Dayjs from 'dayjs';
import updateLocale from 'dayjs/plugin/updateLocale';
Dayjs.extend(updateLocale)

const Calendar = ({ calendars, colorToSummary }) => {
	console.log(calendars, colorToSummary)
	const weekDays = Dayjs.updateLocale('en').weekdays

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

	return (
		<div>
			<aside>
				{Object.keys(colorToSummary).map(summaryItem => (
					<div key={summaryItem}>
						{summaryItem}
					</div>
				))}
			</aside>
			<div>
				<table>
					<thead>
						<tr>
							<th></th>
							{weekDays.map(weekDay => <th key={weekDay}>{weekDay}</th>)}
						</tr>
					</thead>
					<tbody>
						{
							renderGrid().map((row, i) => {
								return (
									<tr key={`${row}${i}`}>
										{row.map(hour => <EventCard
											key={hour}
											gridEvent={calendars[hour]}
											colorToSummary={colorToSummary}
										/>
										)}
									</tr>
								)
							})
						}
					</tbody>
				</table>
			</div>
			Calendar table
		</div>
	)
}

export default Calendar