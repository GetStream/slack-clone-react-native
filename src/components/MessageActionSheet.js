import React from 'react';
import {ActionSheetCustom as ActionSheet} from 'react-native-actionsheet';

import {View, Text, StyleSheet} from 'react-native';

import {SCText} from './SCText';
import {ChatClientService} from '../utils';
import {useTheme} from '@react-navigation/native';
import {SVGIcon} from './SVGIcon';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Clipboard from '@react-native-community/clipboard';
import ReactNativeHaptic from 'react-native-haptic';
import {getFrequentlyUsedReactions} from '../utils/supportedReactions';

export const MessageActionSheet = React.forwardRef((props, actionSheetRef) => {
  const chatClient = ChatClientService.getClient();
  const {colors} = useTheme();

  const options = [];

  if (props.message.user.id === chatClient.user.id) {
    options.push({
      id: 'edit',
      title: 'Edit Message',
      icon: 'edit-text',
      handler: props.handleEdit,
    });
    options.push({
      id: 'delete',
      title: 'Delete message',
      icon: 'delete-text',
      handler: props.handleDelete,
    });
  }

  options.push({
    id: 'copy',
    title: 'Copy Text',
    icon: 'copy-text',
    handler: () => {
      Clipboard.setString(props.message.text);
    },
  });
  options.push({
    id: 'reply',
    title: 'Reply in Thread',
    icon: 'threads',
    handler: props.openThread,
  });

  const onActionPress = actionId => {
    const action = options.find(o => o.id === actionId);
    action.handler && action.handler();
    props.setActionSheetVisible(false);
  };

  const openReactionPicker = () => {
    props.setActionSheetVisible(false);
    setTimeout(() => {
      props.openReactionPicker();
    }, 100);
  };
  return (
    <ActionSheet
      title={renderReactions(type => {
        ReactNativeHaptic && ReactNativeHaptic.generate('impact');
        props.handleReaction(type);
        props.setActionSheetVisible(false);
      }, openReactionPicker)}
      cancelButtonIndex={-1}
      destructiveButtonIndex={0}
      onPress={index => {
        if (index > -1 && index < options.length) {
          onActionPress(options[index].id)
        } else {
          props.setActionSheetVisible(false);
        }
      }}
      styles={{
        body: {
          backgroundColor: colors.background,
          borderRadius: 20,
        },
        buttonBox: {
          alignItems: 'flex-start',
          height: 50,
          marginTop: 1,
          justifyContent: 'center',
          backgroundColor: colors.background,
        },
        cancelButtonBox: {
          height: 50,
          marginTop: 6,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: colors.background,
          display: 'none',
        },
        titleBox: {
          height: 80,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: colors.background,
          borderBottomColor: colors.border,
          borderBottomWidth: 1,
          padding: 15,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        },
      }}
      options={options.map((option, i) => {
        return (
          <View
            key={option.title}
            testID={`action-sheet-item-${option.title}`}
            style={{
              flexDirection: 'row',
              paddingLeft: 20,
            }}>
            <SVGIcon height="20" width="20" type={option.icon} />
            <SCText
              style={{
                marginLeft: 20,
                color: option.id === 'delete' ? '#E01E5A' : colors.text,
              }}>
              {option.title}
            </SCText>
          </View>
        );
      })}
      ref={actionSheetRef}
    />
  );
});

export const renderReactions = (handleReaction, openReactionPicker) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const {dark} = useTheme();
  const reactions = getFrequentlyUsedReactions().slice(0, 6);

  return (
    <View style={styles.reactionListContainer}>
      {reactions.map((r, index) => (
        <ReactionItem
          key={index}
          type={r.id}
          icon={r.icon}
          handleReaction={handleReaction}
        />
      ))}
      <TouchableOpacity
        onPress={() => {
          openReactionPicker();
        }}
        style={[
          styles.reactionPickerContainer,
          {
            backgroundColor: dark ? '#313538' : '#F0F0F0',
          },
        ]}>
        <SVGIcon height="25" width="25" type="emoji" />
      </TouchableOpacity>
    </View>
  );
};

const ReactionItem = ({type, handleReaction, icon}) => {
  const {dark} = useTheme();
  return (
    <View
      key={type}
      style={[
        styles.reactionItemContainer,
        {
          borderColor: dark ? '#1E1D21' : 'transparent',
          backgroundColor: dark ? '#313538' : '#F8F8F8',
        },
      ]}>
      <Text
        onPress={() => {
          handleReaction(type);
        }}
        style={[
          styles.reactionItem,
          {
            color: dark ? '#CFD4D2' : '#0064c2',
          },
        ]}>
        {icon}
      </Text>
    </View>
  );
};

MessageActionSheet.displayName = 'messageActionSheet';

const styles = StyleSheet.create({
  reactionListContainer: {
    flexDirection: 'row',
    width: '100%',
    height: 30,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  reactionItemContainer: {
    borderWidth: 1,
    padding: 3,
    paddingLeft: 3,
    paddingRight: 3,
    borderRadius: 40,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  reactionItem: {
    fontSize: 28,
  },
  reactionPickerContainer: {
    padding: 4,
    paddingLeft: 8,
    paddingRight: 6,
    borderRadius: 10,
  },
});
