import React, {useEffect, useState} from 'react';
import {Text, Appearance} from 'react-native';
import {useTheme} from '@react-navigation/native';

import AsyncStorage from '@react-native-community/async-storage';

import FileAttachmentIcon from '../images/channel/attachment.svg';
import ImageAttachmentIcon from '../images/channel/picture.svg';
import FileAttachmentIconDark from '../images/channel/attachment-copy.svg';
import ImageAttachmentIconDark from '../images/channel/picture-copy.svg';

import SearchIcon from '../images/channel/search.svg';
import SearchIconDark from '../images/channel/search-copy.svg';
import InfoIcon from '../images/channel/info.svg';
import InfoIconDark from '../images/channel/info-copy.svg';
import EmojiIcon from '../images/channel/emoji.svg';
import EmojiIconDark from '../images/channel/emoji-copy.svg';
import ThreadsIcon from '../images/channel-list/threads.svg';
import ThreadsIconDark from '../images/channel-list/threads-copy.svg';
import DraftsIcon from '../images/channel-list/drafts.svg';
import DraftsIconDark from '../images/channel-list/drafts-copy.svg';
import GlobalSearchIconDark from '../images/channel-list/search-copy.svg';
import GlobalSearchIcon from '../images/channel-list/search.svg';

import DMTabIcon from '../images/tab-bar/dm.svg';
import DMTabIconActive from '../images/tab-bar/dm-selected.svg';
import HomeTabIcon from '../images/tab-bar/home.svg';
import HomeTabIconActive from '../images/tab-bar/home-selected.svg';
import MentionsTabIcon from '../images/tab-bar/mentions.svg';
import MentionsTabIconActive from '../images/tab-bar/mentions-selected.svg';
import YouTabIcon from '../images/tab-bar/you.svg';
import YouTabIconActive from '../images/tab-bar/you-selected.svg';

import DMTabIconDark from '../images/tab-bar/dm-copy.svg';
import DMTabIconActiveDark from '../images/tab-bar/dm-selected-copy.svg';
import HomeTabIconDark from '../images/tab-bar/home-copy.svg';
import HomeTabIconActiveDark from '../images/tab-bar/home-selected-copy.svg';
import MentionsTabIconDark from '../images/tab-bar/mentions-copy.svg';
import MentionsTabIconActiveDark from '../images/tab-bar/mentions-selected-copy.svg';
import YouTabIconDark from '../images/tab-bar/you-copy.svg';
import YouTabIconActiveDark from '../images/tab-bar/you-selected-copy.svg';

import AwayIcon from '../images/profile/away.svg';
import DNDIcon from '../images/profile/dnd.svg';
import NotificationsIcon from '../images/profile/notifications.svg';
import PreferencesIcon from '../images/profile/preferences.svg';
import SavedItemsIcon from '../images/profile/saved-items.svg';
import ViewProfileIcon from '../images/profile/view-profile.svg';
import AwayIconDark from '../images/profile/away-copy.svg';
import DNDIconDark from '../images/profile/dnd-copy.svg';
import NotificationsIconDark from '../images/profile/notifications-copy.svg';
import PreferencesIconDark from '../images/profile/preferences-copy.svg';
import SavedItemsIconDark from '../images/profile/saved-items-copy.svg';
import ViewProfileIconDark from '../images/profile/view-profile-copy.svg';

export const SVGIcon = ({type, height, width}) => {
  const {dark} = useTheme();
  let Component;
  switch (type) {
    case 'file-attachment':
      Component = dark ? FileAttachmentIconDark : FileAttachmentIcon;
      break;
    case 'image-attachment':
      Component = dark ? ImageAttachmentIconDark : ImageAttachmentIcon;
      break;
    case 'search':
      Component = dark ? SearchIconDark : SearchIcon;
      break;
    case 'info':
      Component = dark ? InfoIconDark : InfoIcon;
      break;
    case 'emoji':
      Component = dark ? EmojiIconDark : EmojiIcon;
      break;
    case 'threads':
      Component = dark ? ThreadsIconDark : ThreadsIcon;
      break;
    case 'drafts':
      Component = dark ? DraftsIconDark : DraftsIcon;
      break;
    case 'global-search':
      Component = dark ? GlobalSearchIconDark : GlobalSearchIcon;
      break;
    case 'dm-tab':
      Component = dark ? DMTabIconDark : DMTabIcon;
      break;
    case 'home-tab':
      Component = dark ? HomeTabIconDark : HomeTabIcon;
      break;
    case 'mentions-tab':
      Component = dark ? MentionsTabIconDark : MentionsTabIcon;
      break;
    case 'you-tab':
      Component = dark ? YouTabIconDark : YouTabIcon;
      break;
    case 'dm-tab-active':
      Component = dark ? DMTabIconActiveDark : DMTabIconActive;
      break;
    case 'home-tab-active':
      Component = dark ? HomeTabIconActiveDark : HomeTabIconActive;
      break;
    case 'mentions-tab-active':
      Component = dark ? MentionsTabIconActiveDark : MentionsTabIconActive;
      break;
    case 'you-tab-active':
      Component = dark ? YouTabIconActiveDark : YouTabIconActive;
      break;
    case 'away':
      Component = dark ? AwayIconDark : AwayIcon;
      break;
    case 'dnd':
      Component = dark ? DNDIconDark : DNDIcon;
      break;
    case 'notifications':
      Component = dark ? NotificationsIconDark : NotificationsIcon;
      break;
    case 'preferences':
      Component = dark ? PreferencesIconDark : PreferencesIcon;
      break;
    case 'saved-items':
      Component = dark ? SavedItemsIconDark : SavedItemsIcon;
      break;
    case 'view-profile':
      Component = dark ? ViewProfileIconDark : ViewProfileIcon;
      break;
  }
  return <Component height={height} width={width} />;
};
