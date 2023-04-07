import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import { Texter } from 'Components/Texter';

export const { width, height } = Dimensions.get('window');

export const ModalArea = styled.View`
	flex: 1;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	background-color: #fff;
`;

export const Text = styled(Texter)`
	color: #0d2b51;
	font-size: 12px;
	font-weight: 700;
`;

export const TextFarm = styled(Texter)`
	font-family: 'Marvel-Regular';
	font-size: 20px;
	color: #fff;
`;

export const Button = styled.TouchableOpacity.attrs(Props => ({
	activeOpacity: 0.75,
	...Props,
}))`
	width: 90px;
	height: 90px;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

export const Container = styled.TouchableOpacity.attrs(Props => ({
	activeOpacity: 0.75,
	...Props,
}))`
	width: 98%;
	background-color: #fff;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin: 15px 0 0 0;
	border-radius: 8px;
	align-self: flex-start;
`;

export const Info = styled.View.attrs(Props => ({
	activeOpacity: 0.75,
	...Props,
}))`
	width: 98%;
	background-color: #fff;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	margin: 5px 0 4px 0;
`;

export const Header = styled.View.attrs(Props => ({
	activeOpacity: 0.75,
	...Props,
}))`
	width: 98%;
	background-color: #0d2b51;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	border: 1px solid #0d2b51;
	margin: 5px 0 0 0;
	border-radius: 5px;
`;

export const Amount = styled.View`
	width: 98%;
	background-color: #fff;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
`;

export const Title = styled(Texter)`
	font-family: 'Marvel-Regular';
	font-size: 16px;
	color: #fff;
`;

export const Controls = styled.View`
	width: 98%;
	margin: 10px 0 0 0;
	padding: 0 0 50px 0;
	background-color: #fff;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	border: 1px solid #0d2b51;
`;

export const Values = styled.View`
	width: 100%;
	height: ${Math.round(height - 250)}px;
	margin: 10px 0 0 0;
	padding: 0 0 100px 0;
	background-color: #fff;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
`;

export const ControlsTitle = styled.View`
	width: 100%;
	height: 35px;
	margin: 0 0 0 0;
	background-color: #0d2b51;
	flex-direction: row;
	justify-content: center;
	align-items: center;
`;

export const ControlHeaders = styled.View`
	width: 100%;
	height: 35px;
	padding: 0 5px 0 5px;
	background-color: red;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`;

interface IPriceArea {
	index: number;
}

export const PriceArea = styled.View<IPriceArea>`
	width: 100%;
	height: 35px;
	padding: 0 5px 0 5px;
	background-color: ${Props => (Props.index % 2 === 0 ? '#fff' : '#EEEEEE')};
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`;

export const Item = styled.View`
	width: 98%;
	margin: 6px 0 0 0;
	padding: 0 20px 0 15px;
	background-color: #fff;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`;

export const Ptax = styled.View`
	width: 100%;
	padding: 0 20px 0 20px;
	background-color: #fff;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`;

export const Buttons = styled.View`
	flex: 1;
	width: 100%;
	flex-direction: row;
	justify-content: space-between;
	align-items: flex-end;
	padding: 1%;
`;

export const TextHeader = styled(Texter)`
	font-family: 'Marvel-Regular';
	font-size: 20px;
	color: #fff;
`;

export const TextPrice = styled(Texter)`
	font-family: 'Marvel-Regular';
	font-size: 18px;
	color: #000;
`;

export const DatePrice = styled.View`
	width: 25%;
	flex-direction: row;
	justify-content: flex-start;
	align-items: flex-end;
`;

export const BuyPrice = styled.View`
	width: 25%;
	flex-direction: row;
	justify-content: space-between;
	align-items: flex-end;
`;

export const SellPrice = styled.View`
	width: 25%;
	flex-direction: row;
	justify-content: space-between;
	align-items: flex-end;
`;

export const Average = styled.View`
	width: 25%;
	flex-direction: row;
	justify-content: space-between;
	align-items: flex-end;
`;
