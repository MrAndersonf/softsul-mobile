import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

export const Area = styled.View`
	flex: 1;
	height: ${Math.round(height)}px;
	padding: 38px 0 0 0;
	background-color: '#fff';
`;
