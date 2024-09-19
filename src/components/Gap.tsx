import {DimensionValue, View} from 'react-native';

type GapTypes = {
  width?: DimensionValue | undefined;
  height?: DimensionValue | undefined;
  flex?: number | undefined;
};

export default function Gap({height = 0, width = 0, flex}: GapTypes) {
  return <View style={{width, height, flex}} />;
}
