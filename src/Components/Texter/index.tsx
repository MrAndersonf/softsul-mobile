import { Text } from 'react-native';
import styled from 'styled-components/native';

export const Texter = styled(Text).attrs(Props => ({
	allowFontScaling: false,
	...Props,
}))`
	color: #000;
	font-family: 'Marvel-Regular';
`;
