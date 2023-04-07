import React from 'react';
import { Area } from './styles';
import axios from '../service/axios';
import { Text } from 'react-native-paper';
import { Container } from 'Components/Container';
import AnimatedLottieView from 'lottie-react-native';
import { Error, Success, Warning } from 'Components/Notify';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface IContext {
	name: string | null;
	email: string | null;
	signed: boolean;
	loading: boolean;

	signOut: () => Promise<void>;
	signIn: (email: string, password: string, keep: boolean) => Promise<boolean>;
}

interface IContextAPP {
	children: React.ReactNode;
}

const Context = React.createContext<IContext>({} as IContext);

export const ContextApp = ({ children }: IContextAPP) => {
	const [loading, setLoading] = React.useState<boolean>(true);
	const [email, setEmail] = React.useState<string | null>(null);
	const [name, setName] = React.useState<string | null>(null);
	const [signed, setSigned] = React.useState<boolean>(false);

	const signIn = async (email: string, password: string, keep: boolean) => {
		try {
			setLoading(true);
			const status = await axios.post('/api/auth', { email, password });
			console.log(status);
			if (status.status === 200) {
				setEmail(status?.data?.user?.email);
				setName(status?.data?.user?.name);
				setSigned(true);
				if (keep) {
					await AsyncStorage.setItem('email', status?.data?.user?.email);
					await AsyncStorage.setItem('name', status?.data?.user?.name);
				}

				setLoading(false);
				Success('Usuário autenticado com sucesso');
				Warning('Bem vindo ' + status?.data?.user?.name.split(' ')[0]);
				return true;
			}
			Error('Usuário ou senha inválidos');
			setLoading(false);
			return false;
		} catch (error: any) {
			Error('Erro ao logar ' + error.message);
			setLoading(false);
			return false;
		}
	};

	const signOut = async () => {
		try {
			setLoading(true);
			await AsyncStorage.removeItem('email');
			await AsyncStorage.removeItem('name');
			setSigned(false);
			setEmail(null);
			setName(null);
			setLoading(false);
			Success('Usuário deslogado com sucesso');
		} catch (error: any) {
			Error('Erro ao deslogar ' + error.message);
			setLoading(false);
		}
	};

	React.useEffect(() => {
		(async () => {
			setLoading(true);
			const userName = await AsyncStorage.getItem('name');
			const userEmail = await AsyncStorage.getItem('email');
			if (userName && userEmail) {
				setName(userName);
				setEmail(userEmail);
				setSigned(true);
			}
			setLoading(false);
		})();
	}, []);

	if (loading && !signed) {
		return (
			<Container>
				<Area>
					<AnimatedLottieView
						source={require('Assets/load.json')}
						autoPlay
						loop
						speed={1}
					/>
				</Area>
			</Container>
		);
	}

	return (
		<Context.Provider
			value={{
				email,
				name,
				signed,
				signOut,
				signIn,
				loading,
			}}
		>
			{children}
		</Context.Provider>
	);
};

export const useContextApp = () => {
	return React.useContext<IContext>(Context);
};
