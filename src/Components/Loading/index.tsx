import React from 'react';
import {ActivityIndicator} from 'react-native';
import {Area, Message} from './styles';

export const Loading = () => {
  const [loading, setLoading] = React.useState<boolean>(true);

  return (
    <Area>
      <ActivityIndicator color="blue" size={50} />
      <Message>Carregando dados</Message>
    </Area>
  );
};
