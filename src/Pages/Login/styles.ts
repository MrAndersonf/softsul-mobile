import { Texter } from 'Components/Texter';
import styled from 'styled-components/native';

export const Area = styled.View`
	flex: 1;
	background-color: #fff;
	justify-content: center;
	align-items: center;
`;

export const Text = styled(Texter)`
	color: #fff;
	font-size: 18px;
	font-weight: 400;
`;

export const KeepArea = styled.View`
	width: 50%;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
`;

export const KeepText = styled(Texter)`
	color: #000;
	font-size: 16px;
	font-weight: 400;
	margin-left: 3px;
`;

export const Controls = styled.View`
	display: flex;
	width: 98%;
	height: 60px;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`;

export const ForgotText = styled(Texter)`
	color: #0000ee;
	font-size: 16px;
	font-weight: 400;
`;

export const Button = styled.TouchableOpacity.attrs(() => ({
	activeOpacity: 0.9,
}))`
	width: 98%;
	height: 35px;
	background-color: #5467ff;
	border-radius: 8px;
	align-items: center;
	justify-content: center;
`;

export const Forgot = styled.TouchableOpacity.attrs(() => ({
	activeOpacity: 0.7,
}))`
	display: flex;
	width: 50%;
	flex-direction: row;
	justify-content: flex-end;
	align-items: center;
`;
