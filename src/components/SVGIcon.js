// src/components/SVGIcon.js

import React from 'react';
import {useTheme} from '@react-navigation/native';

import FileAttachmentIcon from '../images/svgs/channel/attachment.svg';
import ImageAttachmentIcon from '../images/svgs/channel/picture.svg';
import FileAttachmentIconDark from '../images/svgs/channel/attachment-dark.svg';
import ImageAttachmentIconDark from '../images/svgs/channel/picture-dark.svg';

import NewMessageBubbleIcon from '../images/svgs/channel-list/new-message.svg';
import NewMessageBubbleIconDark from '../images/svgs/channel-list/new-message-dark.svg';

import SearchIcon from '../images/svgs/channel/search.svg';
import SearchIconDark from '../images/svgs/channel/search-dark.svg';
import InfoIcon from '../images/svgs/channel/info.svg';
import InfoIconDark from '../images/svgs/channel/info-dark.svg';
import EmojiIcon from '../images/svgs/channel/emoji.svg';
import EmojiIconDark from '../images/svgs/channel/emoji-dark.svg';
import ThreadsIcon from '../images/svgs/channel-list/threads.svg';
import ThreadsIconDark from '../images/svgs/channel-list/threads-dark.svg';
import DraftsIcon from '../images/svgs/channel-list/drafts.svg';
import DraftsIconDark from '../images/svgs/channel-list/drafts-dark.svg';
import GlobalSearchIconDark from '../images/svgs/channel-list/search-dark.svg';
import GlobalSearchIcon from '../images/svgs/channel-list/search.svg';

import DMTabIcon from '../images/svgs/tab-bar/dm.svg';
import DMTabIconActive from '../images/svgs/tab-bar/dm-selected.svg';
import HomeTabIcon from '../images/svgs/tab-bar/home.svg';
import HomeTabIconActive from '../images/svgs/tab-bar/home-selected.svg';
import MentionsTabIcon from '../images/svgs/tab-bar/mentions.svg';
import MentionsTabIconActive from '../images/svgs/tab-bar/mentions-selected.svg';
import YouTabIcon from '../images/svgs/tab-bar/you.svg';
import YouTabIconActive from '../images/svgs/tab-bar/you-selected.svg';

import DMTabIconDark from '../images/svgs/tab-bar/dm-dark.svg';
import DMTabIconActiveDark from '../images/svgs/tab-bar/dm-selected-dark.svg';
import HomeTabIconDark from '../images/svgs/tab-bar/home-dark.svg';
import HomeTabIconActiveDark from '../images/svgs/tab-bar/home-selected-dark.svg';
import MentionsTabIconDark from '../images/svgs/tab-bar/mentions-dark.svg';
import MentionsTabIconActiveDark from '../images/svgs/tab-bar/mentions-selected-dark.svg';
import YouTabIconDark from '../images/svgs/tab-bar/you-dark.svg';
import YouTabIconActiveDark from '../images/svgs/tab-bar/you-selected-dark.svg';

import AwayIcon from '../images/svgs/profile/away.svg';
import DNDIcon from '../images/svgs/profile/dnd.svg';
import NotificationsIcon from '../images/svgs/profile/notifications.svg';
import PreferencesIcon from '../images/svgs/profile/preferences.svg';
import SavedItemsIcon from '../images/svgs/profile/saved-items.svg';
import ViewProfileIcon from '../images/svgs/profile/view-profile.svg';
import AwayIconDark from '../images/svgs/profile/away-dark.svg';
import DNDIconDark from '../images/svgs/profile/dnd-dark.svg';
import NotificationsIconDark from '../images/svgs/profile/notifications-dark.svg';
import PreferencesIconDark from '../images/svgs/profile/preferences-dark.svg';
import SavedItemsIconDark from '../images/svgs/profile/saved-items-dark.svg';
import ViewProfileIconDark from '../images/svgs/profile/view-profile-dark.svg';

import CopyTextIcon from '../images/svgs/message/copy-text.svg';
import DeleteTextIcon from '../images/svgs/message/delete.svg';
import EditTextIcon from '../images/svgs/message/edit.svg';
import CopyTextIconDark from '../images/svgs/message/copy-text-dark.svg';
import DeleteTextIconDark from '../images/svgs/message/delete-dark.svg';
import EditTextIconDark from '../images/svgs/message/edit-dark.svg';

export const SVGIcon = ({type, height, width}) => {
  const {dark} = useTheme();
  let Component;
  switch (type) {
    case 'new-message':
      Component = dark ? NewMessageBubbleIconDark : NewMessageBubbleIcon;
      break;
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
    case 'copy-text':
      Component = dark ? CopyTextIconDark : CopyTextIcon;
      break;
    case 'delete-text':
      Component = dark ? DeleteTextIconDark : DeleteTextIcon;
      break;
    case 'edit-text':
      Component = dark ? EditTextIconDark : EditTextIcon;
      break;
  }
  return <Component height={height} width={width} />;
};
