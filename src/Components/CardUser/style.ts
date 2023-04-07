import styled from 'styled-components/native';
import { Texter } from 'Components/Texter';

export const MainArea = styled.View`
	display: flex;
	width: 97%;
	flex-direction: row;
	justify-content: space-between;
	background-color: #dbdcdc;
	elevation: 2;
	padding: 3px;
	margin: 2px 0 8px 0;
	align-self: center;
	border-radius: 5px;
`;

export const InfoArea = styled.View`
	display: flex;
	width: 69%;
	height: 90px;
	margin: 2px;
	padding: 0 0 0 5px;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;
`;
export const Actions = styled.View`
	display: flex;
	width: 30%;
	height: 90px;
	padding: 1px
	flex-direction: column;
	justify-content: space-around;
	align-items: center;
	
`;

export const Line = styled.View`
	display: flex;
	width: 100%;
	flex-direction: row;
	justify-content: flex-start;
	align-items: flex-start;
`;

export const Name = styled(Texter)`
	font-size: 16px;
	color: #000;
`;
interface IStatus {
	active: boolean;
}

export const Status = styled(Texter)<IStatus>`
	font-size: 16px;
	color: ${props => (props.active ? '#006241' : '#f00')};
	font-weight: 700;
`;
