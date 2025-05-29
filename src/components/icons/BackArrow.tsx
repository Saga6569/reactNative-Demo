import * as React from 'react';
import {View} from 'react-native';
import Svg, {Path} from 'react-native-svg';

const BackArrow = () => (
  <View className="ml-4">
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path
        d="M19 12H5M5 12L12 19M5 12L12 5"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  </View>
);

export default BackArrow;