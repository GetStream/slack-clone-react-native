/* eslint-disable sort-keys-fix/sort-keys-fix */
// src/components/SVGIcon.js
import {useTheme} from '@react-navigation/native';
import React from 'react';

import DraftsIcon from '../images/svgs/channel-list/drafts.svg';
import NewMessageBubbleIcon from '../images/svgs/channel-list/new-message.svg';
import ThreadsIcon from '../images/svgs/channel-list/threads.svg';
import FileAttachmentIcon from '../images/svgs/channel/attachment.svg';
import BackButtonIcon from '../images/svgs/channel/back-button.svg';
import EmojiIcon from '../images/svgs/channel/emoji.svg';
import FormattingIcon from '../images/svgs/channel/formating.svg';
import InfoIcon from '../images/svgs/channel/info.svg';
import ImageAttachmentIcon from '../images/svgs/channel/picture.svg';
import SearchIcon from '../images/svgs/channel/search.svg';
import SendButton from '../images/svgs/channel/send-button.svg';
import ShortcutsIcon from '../images/svgs/channel/shortcuts.svg';
import CopyTextIcon from '../images/svgs/message/copy-text.svg';
import DeleteTextIcon from '../images/svgs/message/delete.svg';
import EditTextIcon from '../images/svgs/message/edit.svg';
import AwayIcon from '../images/svgs/profile/away.svg';
import DNDIcon from '../images/svgs/profile/dnd.svg';
import NotificationsIcon from '../images/svgs/profile/notifications.svg';
import PreferencesIcon from '../images/svgs/profile/preferences.svg';
import SavedItemsIcon from '../images/svgs/profile/saved-items.svg';
import ViewProfileIcon from '../images/svgs/profile/view-profile.svg';
import DMTabIconActive from '../images/svgs/tab-bar/dm-selected.svg';
import DMTabIcon from '../images/svgs/tab-bar/dm.svg';
import HomeTabIconActive from '../images/svgs/tab-bar/home-selected.svg';
import HomeTabIcon from '../images/svgs/tab-bar/home.svg';
import MentionsTabIconActive from '../images/svgs/tab-bar/mentions-selected.svg';
import MentionsTabIcon from '../images/svgs/tab-bar/mentions.svg';
import GlobalSearchSelectedIcon from '../images/svgs/tab-bar/search-selected.svg';
import GlobalSearchIcon from '../images/svgs/tab-bar/search.svg';
import YouTabIconActive from '../images/svgs/tab-bar/you-selected.svg';
import YouTabIcon from '../images/svgs/tab-bar/you.svg';

const iconMap = {
  // Tab related icons
  'home-tab': HomeTabIcon,
  'home-tab-active': HomeTabIconActive,
  'dm-tab': DMTabIcon,
  'dm-tab-active': DMTabIconActive,
  'mentions-tab': MentionsTabIcon,
  'mentions-tab-active': MentionsTabIconActive,
  'search-tab': GlobalSearchIcon,
  'search-tab-active': GlobalSearchSelectedIcon,
  'you-tab': YouTabIcon,
  'you-tab-active': YouTabIconActive,

  // Profile page icons
  away: AwayIcon,
  dnd: DNDIcon,
  notifications: NotificationsIcon,
  preferences: PreferencesIcon,
  'saved-items': SavedItemsIcon,
  'view-profile': ViewProfileIcon,

  // Icons on input box
  'input-buttons-formatting': FormattingIcon,
  'input-buttons-mentions': MentionsTabIcon,
  'input-buttons-send': SendButton,
  'input-buttons-shortcuts': ShortcutsIcon,
  'file-attachment': FileAttachmentIcon,
  'image-attachment': ImageAttachmentIcon,

  // actionsheet icons
  'copy-text': CopyTextIcon,
  'delete-text': DeleteTextIcon,
  emoji: EmojiIcon,

  // Channel list icons
  drafts: DraftsIcon,
  threads: ThreadsIcon,
  'new-message': NewMessageBubbleIcon,

  // Channel header
  'back-button': BackButtonIcon,
  info: InfoIcon,
  'edit-text': EditTextIcon,
  search: SearchIcon,
};

export const SVGIcon = ({fill, height, type, width}) => {
  const {colors} = useTheme();
  const Component = iconMap[type];

  return <Component fill={fill || colors.icon} height={height} width={width} />;
};
