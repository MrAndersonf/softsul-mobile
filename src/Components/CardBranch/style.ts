import styled from 'styled-components/native';
import { Texter } from 'Components/Texter';

export const MainArea = styled.View`
	display: flex;
	width: 96%;
	height: 390px;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;
	background-color: #dbdcdc;
	elevation: 6;
	margin: 20px 0 8px 0;
	align-self: center;
	border-radius: 8px;
`;

export const InfoArea = styled.View`
	display: flex;
	flex: 1;
	width: 100%;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;
	border-radius: 8px;
`;

export const Actions = styled.View`
	display: flex;
	width: 100%;

	padding: 5px 5px 8px 5px;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`;

export const Line = styled.View`
	display: flex;
	width: 100%;
	margin: 3px 0 3px 0;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
`;

export const Centered = styled.View`
	display: flex;
	width: 100%;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background-color: #dbdcdc;
	margin: 15px 0 10px 0;
`;

export const Section = styled.View`
	display: flex;
	width: 120px;
	margin: -12px 0 0 0;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	background-color: #dbdcdc;
`;

export const Name = styled(Texter)`
	font-size: 16px;
	color: #000;
`;
export const SectionText = styled(Texter)`
	font-size: 16px;
	color: #000;
	font-weight: 700;
`;

interface IStatus {
	active: boolean;
}

export const Status = styled(Texter)<IStatus>`
	font-size: 16px;
	color: ${props => (props.active ? '#006241' : '#f00')};
	font-weight: 700;
`;
