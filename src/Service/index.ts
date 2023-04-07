import firestore from '@react-native-firebase/firestore';

export const rename = async (id: string, name: string) => {
  try {
    firestore().collection('Farmer').doc(id).update({
      name: name,
    });
  } catch (error) {
    Error(`Erro - ${error}`);
  }
};
