import styled from 'styled-components'

const SplitSection = styled.div`
	display: flex;
	
`
const AsideSection = styled.div`
	flex-basis: 20%;
	padding: 1rem;
	max-width: 16rem;
`
const Table = styled.table`
	border-collapse: collapse;
	display: block;
	background-color: white;
	width: 1200px;
  overflow: scroll;
`
const Tbody = styled.tbody`
	height: 70vh;
	overflow-y: scroll;
	overflow-x: scroll;
	display: block;
	width: 1200px;
`
const Thead = styled.thead`
	width: inherit;
  display: inline-table;
`
const StyledButton = styled.li`
	list-style-position: inside;
	width: 80%;
	background: ${({ deselected }) => (deselected ? 'none' : `white`)};;
	border-radius: 5px;
	padding: 8px;
	margin: 8px;
	box-shadow: ${props => (props.deselected ? `none` : `0 1px 12px rgba(32,33,36,.28)`)};
	border-color: ${props => (props.deselected ? `none` : `rgba(223,225,229,0);`)};
	cursor: pointer;
	&:before {
		content: ".";
		color: ${props => props.colorToSummary};
		display: inline-block;
		width: 1em;
		margin-right: 5px;
		background: ${props => props.colorToSummary};
		text-decoration-line: none;
		border-radius: 50%;
  }
`
const CircleData = styled.div`
	background: ${props => props.isToday && '#5440f9'};
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
	width: 100%;
`
const UL = styled.ul`
	list-style: none;
	padding: 0;
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

export {
    SplitSection, AsideSection, Table, Tbody, Thead, StyledButton,
    CircleData, Th, Container, UL, Tr, Heading, EventOverlay, DateCard
}