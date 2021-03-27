import {useNavigation, useScrollToTop} from '@react-navigation/native';
import React, {useRef} from 'react';
import {SectionList, StyleSheet, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {SCText} from '../../components/SCText';
import {SVGIcon} from '../../components/SVGIcon';
import {SlackChannelListItem} from '../../components/SlackChannelListItem/SlackChannelListItem';
import {useSlackChannels} from '../../hooks/useSlackChannels';
import {ChatClientService, notImplemented} from '../../utils';
import {SectionHeader} from './SectionHeader';

export const SlackChannelList = () => {
  const client = ChatClientService.getClient();
  const navigation = useNavigation();
  const changeChannel = (channel) => {
    navigation.navigate('ChannelScreen', {
      channel,
    });
  };
  const {dmConversations, readChannels, unreadChannels} = useSlackChannels(
    client,
  );

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
    <SlackChannelListItem
      channel={channel}
      containerStyle={{
        marginVertical: 3,
      }}
      key={channel.id}
      onSelect={changeChannel}
      presenceIndicator
      showAvatar={false}
    />
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
            <SCText style={styles.channelTitle}>{item.title}</SCText>
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

const styles = StyleSheet.create({
  channelRow: {
    borderRadius: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingTop: 5,
  },
  channelTitle: {
    padding: 5,
    paddingLeft: 10,
  },
  channelTitleContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  channelTitlePrefix: {
    fontWeight: '300',
    padding: 1,
  },
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingLeft: 5,
    paddingRight: 5,
  },
  groupTitle: {
    fontSize: 14,
  },
  groupTitleContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 10,
    marginRight: 10,
    paddingTop: 14,
  },
  groupTitleRightButton: {
    textAlignVertical: 'center',
  },
  groupTitleRightButtonText: {
    fontSize: 25,
  },
  headerContainer: {
    borderColor: '#D3D3D3',
    borderWidth: 0.5,
    elevation: 2,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: {
      height: 1,
      width: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  inputSearchBox: {
    padding: 10,
  },
  sectionList: {
    flexGrow: 1,
    flexShrink: 1,
  },
});
