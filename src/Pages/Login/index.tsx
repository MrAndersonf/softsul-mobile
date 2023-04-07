import React, { useEffect, useState } from 'react';
import { Container } from 'Components/Container';
import { Switch, TextInput } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
	Area,
	Button,
	Controls,
	Forgot,
	ForgotText,
	KeepArea,
	KeepText,
	Text,
} from './styles';
import { useContextApp } from 'Context';
import { Error, Success } from 'Components/Notify';
import { RoutesRootParams } from 'Interfaces';

import { Image } from 'react-native';
const Soft = require('../../Assets/soft.jpeg');

type LoginProps = NativeStackScreenProps<RoutesRootParams, 'Login'>;

export const Login = ({ navigation, route }: LoginProps) => {
	const { signIn, signed } = useContextApp();
	const [loading, setLoading] = useState(true);
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [keep, setKeep] = useState(false);
	const [showPass, setShowPass] = useState(false);

	const onKeepConnected = () => setKeep(!keep);
	const onShowPass = () => setShowPass(!showPass);

	const onSignIn = async () => {
		await signIn(email, password, keep);
	};

	const onResetPass = async () => {
		try {
			Success('E-mail enviado com sucesso.');
		} catch (error) {
			Error('Error ao recuperar senha.');
		}
	};

	useEffect(() => {
		if (signed && !loading) {
			navigation.navigate('Branch');
		}
	}, []);

	return (
		<Container>
			<Area>
				<Image
					source={Soft}
					style={{ width: 220, height: 160, resizeMode: 'contain' }}
				/>

				<TextInput
					theme={{
						roundness: 8,
						colors: {
							text: '#49514E',
							primary: '#49514E',
							placeholder: '#49514E',
						},

						mode: 'exact',
					}}
					underlineColor="#000"
					label="Usuário"
					mode="outlined"
					allowFontScaling={false}
					dense
					value={email}
					onChangeText={text => setEmail(text)}
					style={{
						backgroundColor: '#fff',
						width: '98%',
						borderRadius: 18,
						marginBottom: 10,
					}}
				/>
				<TextInput
					theme={{
						roundness: 8,
						colors: {
							text: '#49514E',
							primary: '#49514E',
							placeholder: '#49514E',
						},
					}}
					dense
					mode="outlined"
					label="Senha"
					value={password}
					secureTextEntry={!showPass}
					onChangeText={text => setPassword(text)}
					right={
						<TextInput.Icon
							name={showPass ? 'eye' : 'eye-off'}
							color="red"
							onPress={onShowPass}
						/>
					}
					style={{
						backgroundColor: '#fff',
						width: '98%',
						borderRadius: 8,
						marginBottom: 10,
					}}
				/>
				<Controls>
					<KeepArea>
						<Switch value={keep} onValueChange={onKeepConnected} />
						<KeepText>Manter conectado</KeepText>
					</KeepArea>
					<Forgot onPress={onResetPass}>
						<ForgotText>Esqueci minha senha</ForgotText>
					</Forgot>
				</Controls>
				<Button onPress={onSignIn}>
					<Text>Entrar</Text>
				</Button>
			</Area>
		</Container>
	);
};
