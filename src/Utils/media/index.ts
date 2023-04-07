import auth from '@react-native-firebase/auth';
import {
  Asset,
  ImageLibraryOptions,
  launchImageLibrary,
} from 'react-native-image-picker';

export const selectImage = async (selection: (file: Asset) => void) => {
  auth.EmailAuthProvider;
  const options = {
    mediaType: 'mixed',
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
    selection(assets[0]);
  }
};
