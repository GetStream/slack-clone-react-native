import React from 'react';
import { TouchableOpacity} from 'react-native';

import { SVGIcon } from './SVGIcon';

export const CloseModalButton = ({goBack}) => (
  <TouchableOpacity
    onPress={() => {
      goBack && goBack();
    }}
    style={{
      flex: 1,
      height: '100%'
    }}>
    <SVGIcon height={15} type={'close-button'} width={15} />
  </TouchableOpacity>
);
