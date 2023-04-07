import {Dimensions} from 'react-native';
import styled from 'styled-components/native';
import {TextInput} from 'react-native-paper';

const {width} = Dimensions.get('screen');

export const Area = styled.View`
  flex: 1;
  background-color: '#fff';
`;

export const ProgressArea = styled.View`
  flex-direction: column;
  align-items: center;
  margin: 20px 0 0 0;
  width: 100%;
`;
export const TransferedText = styled.Text`
  font-family: 'Marvel-Regular';
  font-size: 23px;
  color: #000;
`;

export const ButtonsArea = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: space-evenly;
`;

export const SearchButtom = styled.TouchableOpacity.attrs(Props => ({
  ...Props,
}))`
  width: 30px;
  height: 30px;
  border-radius: 15px;
  background-color: #fff;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: -80px;
  left: ${Math.round(width * 0.89)}px;
`;

export const ChangeButtom = styled.TouchableOpacity.attrs(Props => ({
  ...Props,
}))`
  width: 30px;
  height: 30px;
  border-radius: 15px;
  background-color: #fff;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: -40px;
  left: ${Math.round(width * 0.89)}px;
`;

export const InputsArea = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Input = styled(TextInput).attrs(() => ({
  theme: {
    roundness: 15,
    colors: {text: '#fff', primary: '#fff', placeholder: '#fff'},
  },
  mode: 'flat',
  label: 'Nome',
  underlineColor: '#fff',
}))`
  background-color: #000;
  width: 85%;
  border-radius: 15px;
  margin: 10px 0 10px 10px;
  height: 55px;
  align-self: center;
`;
