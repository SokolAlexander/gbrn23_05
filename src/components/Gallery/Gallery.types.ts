import {Asset} from 'react-native-image-picker';

export type GalleryProps = {
  imgs: Asset[];
  onPress: (uri?: string) => void;
};
