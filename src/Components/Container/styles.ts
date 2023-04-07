import styled from 'styled-components/native';
import { Platform, StatusBar, SafeAreaView } from 'react-native';

export const SafeArea = styled(SafeAreaView)`
	padding-top: ${Platform.OS === 'ios' ? 40 : StatusBar.currentHeight}px;
	flex: 1;
	width: 100%;
	background-color: #ffffff;
`;
