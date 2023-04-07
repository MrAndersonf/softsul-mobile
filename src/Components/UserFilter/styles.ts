import styled from 'styled-components/native';

export const Container = styled.View`
	display: flex;
	flex: 1;
	width: 100%;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	background-color: #fff;
`;

export const Inputs = styled.View`
	display: flex;
	flex: 1;
	width: 98%;
	padding: 2px;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;
`;

export const Controls = styled.View`
	display: flex;
	width: 100%;
	height: 80px;
	padding: 10px;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`;
