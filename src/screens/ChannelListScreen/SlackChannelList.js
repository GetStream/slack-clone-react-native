import {
  useNavigation,
  useScrollToTop,
  useTheme,
} from '@react-navigation/native';
import React, {useRef} from 'react';
import {SectionList, StyleSheet, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {SCText} from '../../components/SCText';
import {SVGIcon} from '../../components/SVGIcon';
import {SlackChannelListItem} from '../../components/SlackChannelListItem/SlackChannelListItem';
import {useSlackChannels} from '../../hooks/useSlackChannels';
import {notImplemented} from '../../utils';
import {SectionHeader} from './SectionHeader';

const styles = StyleSheet.create({
  channelRow: {
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  channelTitle: {
    fontSize: 17,
    padding: 5,
    paddingLeft: 10,
  },
  channelTitleContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingLeft: 5,
    paddingRight: 5,
  },
  sectionList: {
    flexGrow: 1,
    flexShrink: 1,
  },
});

export const SlackChannelList = () => {
  const {colors} = useTheme();

  const navigation = useNavigation();
  const changeChannel = (channel) => {
    navigation.navigate('ChannelScreen', {
      channelId: channel.id,
    });
  };
  const {dmConversations, readChannels, unreadChannels} = useSlackChannels();

  const ref = useRef(null);
  useScrollToTop(ref);
  const setRef = (r) => {
    ref.current = r;
  };

  const goToDraftScreen = () => {
    navigation.navigate('DraftsScreen');
  };

  const goToChannelSearchScreen = () => {
    navigation.navigate('Modals', {
      params: {
        channelsOnly: true,
      },
      screen: 'ChannelSearchScreen',
    });
  };

  const goToNewMessageScreen = () => {
    navigation.navigate('Modals', {
      screen: 'NewMessageScreen',
    });
  };

  const renderChannelRow = (channel) => (
    <View style={styles.channelRow}>
      <SlackChannelListItem
        channel={channel}
        containerStyle={{
          marginVertical: 0,
        }}
        key={channel.id}
        onSelect={changeChannel}
        presenceIndicator
        showAvatar={false}
      />
    </View>
  );

  const renderSectionHeader = ({section: {clickHandler, data, id, title}}) => {
    if (data.length === 0 || id === 'menu') {
      return null;
    }
    return <SectionHeader onPress={clickHandler} title={title} />;
  };

  const renderItem = ({item, section}) => {
    if (section.id === 'menu') {
      return (
        <TouchableOpacity
          onPress={() => {
            item.handler && item.handler();
          }}
          style={styles.channelRow}>
          <View style={styles.channelTitleContainer}>
            {item.icon}
            <SCText
              style={[
                styles.channelTitle,
                {
                  color: colors.textTitle,
                },
              ]}>
              {item.title}
            </SCText>
          </View>
        </TouchableOpacity>
      );
    }
    return renderChannelRow(item, section.id === 'unread');
  };

  return (
    <View style={styles.container}>
      <SectionList
        keyExtractor={(item, index) => item.id + index}
        ref={setRef}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        sections={[
          {
            data: [
              {
                handler: notImplemented,
                icon: <SVGIcon height='14' type='threads' width='14' />,
                id: 'threads',
                title: 'Threads',
              },
              {
                handler: goToDraftScreen,
                icon: <SVGIcon height='14' type='drafts' width='14' />,
                id: 'drafts',
                title: 'Drafts',
              },
            ],
            id: 'menu',
            title: '',
          },
          {
            data: unreadChannels || [],
            id: 'unread',
            title: 'Unread',
          },
          {
            clickHandler: goToChannelSearchScreen,
            data: readChannels || [],
            title: 'Channels',
          },
          {
            clickHandler: goToNewMessageScreen,
            data: dmConversations || [],
            title: 'Direct Messages',
          },
        ]}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        stickySectionHeadersEnabled={false}
        style={styles.sectionList}
      />
    </View>
  );
};
