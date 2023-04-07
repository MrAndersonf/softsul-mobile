import React from 'react';
import {useContextApp} from 'Context';
import Modal from 'react-native-modal';
import {AppBar} from 'Components/AppBar';
import * as Progress from 'react-native-progress';
import Icon from 'react-native-vector-icons/Ionicons';
import storage from '@react-native-firebase/storage';
import {Alert, Image, Platform, StyleSheet, Dimensions} from 'react-native';
import {
  Asset,
  ImageLibraryOptions,
  launchImageLibrary,
} from 'react-native-image-picker';

import {
  Area,
  ButtonsArea,
  ChangeButtom,
  ProgressArea,
  SearchButtom,
  TransferedText,
} from './styles';

const {height, width} = Dimensions.get('screen');

interface IProfile {
  title: string;
}

export interface IProfileHandle {
  open: () => void;
  close: () => void;
}

const Profile: React.ForwardRefRenderFunction<IProfileHandle, IProfile> = (
  {title}: IProfile,
  ref,
) => {
  const {email, picture, changePicture} = useContextApp();
  const [image, setImage] = React.useState<Asset>({});
  const [uploading, setUploading] = React.useState(false);
  const [transferred, setTransferred] = React.useState(0);
  const [open, setOpen] = React.useState<boolean>(false);

  React.useImperativeHandle(ref, () => ({
    open: () => {
      setOpen(true);
    },
    close: () => {
      setOpen(false);
    },
  }));

  const selectImage = async () => {
    const options = {
      mediaType: 'photo',
      maxWidth: 2000,
      maxHeight: 2000,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    } as ImageLibraryOptions;
    const upload = await launchImageLibrary(options);
    const {assets} = upload;
    if (assets !== undefined) {
      setImage(assets[0]);
    }
  };

  const uploadImage = async () => {
    const {uri} = image;
    if (uri !== undefined) {
      const filename = email;
      const uploadUri =
        Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
      setUploading(true);
      setTransferred(0);
      const task = storage().ref(filename).putFile(uploadUri);
      task.on('state_changed', snapshot => {
        setTransferred(snapshot.bytesTransferred / snapshot.totalBytes);
      });
      try {
        await task;
      } catch (e) {
        console.error(e);
      }
      let url = await storage().ref(email).getDownloadURL();
      changePicture(url);
      setUploading(false);
      Alert.alert(
        'Foto Enviada!',
        'A nova foto já está atualizada no seu perfil!',
      );
    }
  };

  React.useEffect(() => {
    setImage({uri: picture});
  }, []);

  return (
    <Modal
      isVisible={open}
      animationIn="slideInLeft"
      animationInTiming={400}
      animationOutTiming={400}
      animationOut={'slideOutRight'}
      style={{
        width: '100%',
        height: height,
        margin: 0,
        justifyContent: 'flex-start',
        backgroundColor: '#fff',
      }}>
      <Area>
        <AppBar title="Imagem do Perfil" backHandle={() => setOpen(false)} />
        <Image source={{uri: image.uri}} style={styles.imageBox} />
        <ButtonsArea>
          <SearchButtom onPress={selectImage}>
            <Icon name="search" size={22} color="#000" />
          </SearchButtom>
          <ChangeButtom onPress={uploadImage}>
            <Icon name="save" size={22} color="#000" />
          </ChangeButtom>
        </ButtonsArea>

        {uploading && (
          <ProgressArea>
            <Progress.Bar
              progress={transferred}
              animated
              width={Dimensions.get('screen').width * 0.9}
              height={20}
            />
            <TransferedText>
              {(transferred * 100).toFixed(2)}%
              {transferred <= 0 ? ' transferido' : ' transferidos'}
            </TransferedText>
          </ProgressArea>
        )}
      </Area>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  selectButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: -80,
    left: width * 0.89,
  },
  uploadButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: -40,
    left: width * 0.89,
  },
  nameButtom: {
    width: 40,
    height: 40,
    backgroundColor: '#fff',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  imageContainer: {
    flex: 1,
    marginTop: 30,
    marginBottom: 50,
    alignItems: 'center',
    backgroundColor: '#6F1C88',
  },
  progressBarContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 20,
    width: '100%',
  },
  imageBox: {
    width: '100%',
    height: 300,
    alignSelf: 'center',
    resizeMode: 'contain',
    marginTop: 0,
    backgroundColor: '#000',
  },
  bottom: {
    width: '100%',
    backgroundColor: '#000',
  },
  buttons: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly',
  },
});

export default React.forwardRef(Profile);
