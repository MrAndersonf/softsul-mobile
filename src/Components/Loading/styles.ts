import styled from 'styled-components/native';
import {Dimensions} from 'react-native';

const {height} = Dimensions.get('screen');

export const Area = styled.View`
  width: 100%;
  height: ${Math.round(height * 0.8)}px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-self: center;
`;

export const Message = styled.Text`
  font-family: 'Marvel-Regular';
  font-size: 20px;
  color: #fff;
`;
