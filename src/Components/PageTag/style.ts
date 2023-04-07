import { Texter } from 'Components/Texter';
import styled from 'styled-components/native';

export const Area = styled.View`
	display: flex;
	width: 100%;
	height: 40px;
	justify-content: flex-start;
	align-items: center;
	background-color: #1565c0;
	padding: 0 0 0 15px;
`;

export const Title = styled(Texter)`
	margin: 0;
	padding: 0;
	font-size: 18px;
	color: #fff;
`;
