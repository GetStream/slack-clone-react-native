import React from 'react';
import {StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {ListItemSeparator} from '../ListItemSeparator';
import {SCText} from '../SCText';

const styles = StyleSheet.create({
  actionItem: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginLeft: 10,
    padding: 15,
  },
});

export const ActionItem = React.memo(({addSeparator, handler, Icon, title}) => (
  <>
    {addSeparator && <ListItemSeparator />}
    <TouchableOpacity key={title} onPress={handler} style={styles.actionItem}>
      <Icon />
      <SCText
        style={{
          // color: action.id === 'delete' ? '#E01E5A' : colors.text,
          marginLeft: 20,
        }}>
        {title}
      </SCText>
    </TouchableOpacity>
  </>
));
