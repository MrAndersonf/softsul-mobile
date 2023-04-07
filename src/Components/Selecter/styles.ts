import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('screen');

export const MainArea = styled.View`
	display: flex;
	width: ${Math.round(width) * 0.97}px;
	background: #fff;
`;
