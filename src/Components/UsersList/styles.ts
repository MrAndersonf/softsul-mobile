import styled from 'styled-components/native';
import { Texter } from 'Components/Texter';

interface IMainArea {
	height?: number;
}

export const MainArea = styled.View<IMainArea>`
	display: flex;
	flex: 1;
	background-color: red;
`;
