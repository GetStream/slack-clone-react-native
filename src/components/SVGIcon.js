// src/components/SVGIcon.js
import {useTheme} from '@react-navigation/native';
import React from 'react';

import DraftsIconDark from '../images/svgs/channel-list/drafts-dark.svg';
import DraftsIcon from '../images/svgs/channel-list/drafts.svg';
import NewMessageBubbleIconDark from '../images/svgs/channel-list/new-message-dark.svg';
import NewMessageBubbleIcon from '../images/svgs/channel-list/new-message.svg';
import ThreadsIconDark from '../images/svgs/channel-list/threads-dark.svg';
import ThreadsIcon from '../images/svgs/channel-list/threads.svg';
import FileAttachmentIconDark from '../images/svgs/channel/attachment-dark.svg';
import FileAttachmentIcon from '../images/svgs/channel/attachment.svg';
import SendButton from '../images/svgs/channel/send-button.svg';
import SendButtonDark from '../images/svgs/channel/send-button-dark.svg';
import BackButtonIconDark from '../images/svgs/channel/back-button-dark.svg';
import BackButtonIcon from '../images/svgs/channel/back-button.svg';
import EmojiIconDark from '../images/svgs/channel/emoji-dark.svg';
import EmojiIcon from '../images/svgs/channel/emoji.svg';
import FormattingIconDark from '../images/svgs/channel/formating-dark.svg';
import FormattingIcon from '../images/svgs/channel/formating.svg';
import InfoIconDark from '../images/svgs/channel/info-dark.svg';
import InfoIcon from '../images/svgs/channel/info.svg';
import ImageAttachmentIconDark from '../images/svgs/channel/picture-dark.svg';
import ImageAttachmentIcon from '../images/svgs/channel/picture.svg';
import SearchIconDark from '../images/svgs/channel/search-dark.svg';
import SearchIcon from '../images/svgs/channel/search.svg';
import ShortcutsIconDark from '../images/svgs/channel/shortcuts-dark.svg';
import ShortcutsIcon from '../images/svgs/channel/shortcuts.svg';
import CopyTextIconDark from '../images/svgs/message/copy-text-dark.svg';
import CopyTextIcon from '../images/svgs/message/copy-text.svg';
import DeleteTextIconDark from '../images/svgs/message/delete-dark.svg';
import DeleteTextIcon from '../images/svgs/message/delete.svg';
import EditTextIconDark from '../images/svgs/message/edit-dark.svg';
import EditTextIcon from '../images/svgs/message/edit.svg';
import AwayIconDark from '../images/svgs/profile/away-dark.svg';
import AwayIcon from '../images/svgs/profile/away.svg';
import DNDIconDark from '../images/svgs/profile/dnd-dark.svg';
import DNDIcon from '../images/svgs/profile/dnd.svg';
import NotificationsIconDark from '../images/svgs/profile/notifications-dark.svg';
import NotificationsIcon from '../images/svgs/profile/notifications.svg';
import PreferencesIconDark from '../images/svgs/profile/preferences-dark.svg';
import PreferencesIcon from '../images/svgs/profile/preferences.svg';
import SavedItemsIconDark from '../images/svgs/profile/saved-items-dark.svg';
import SavedItemsIcon from '../images/svgs/profile/saved-items.svg';
import ViewProfileIconDark from '../images/svgs/profile/view-profile-dark.svg';
import ViewProfileIcon from '../images/svgs/profile/view-profile.svg';
import DMTabIconDark from '../images/svgs/tab-bar/dm-dark.svg';
import DMTabIconActiveDark from '../images/svgs/tab-bar/dm-selected-dark.svg';
import DMTabIconActive from '../images/svgs/tab-bar/dm-selected.svg';
import DMTabIcon from '../images/svgs/tab-bar/dm.svg';
import HomeTabIconDark from '../images/svgs/tab-bar/home-dark.svg';
import HomeTabIconActiveDark from '../images/svgs/tab-bar/home-selected-dark.svg';
import HomeTabIconActive from '../images/svgs/tab-bar/home-selected.svg';
import HomeTabIcon from '../images/svgs/tab-bar/home.svg';
import MentionsTabIconDark from '../images/svgs/tab-bar/mentions-dark.svg';
import MentionsTabIconActiveDark from '../images/svgs/tab-bar/mentions-selected-dark.svg';
import MentionsTabIconActive from '../images/svgs/tab-bar/mentions-selected.svg';
import MentionsTabIcon from '../images/svgs/tab-bar/mentions.svg';
import GlobalSearchIconDark from '../images/svgs/tab-bar/search-dark.svg';
import GlobalSearchSelectedIcon from '../images/svgs/tab-bar/search-selected.svg';
import GlobalSearchIcon from '../images/svgs/tab-bar/search.svg';
import YouTabIconDark from '../images/svgs/tab-bar/you-dark.svg';
import YouTabIconActiveDark from '../images/svgs/tab-bar/you-selected-dark.svg';
import YouTabIconActive from '../images/svgs/tab-bar/you-selected.svg';
import YouTabIcon from '../images/svgs/tab-bar/you.svg';

export const SVGIcon = ({fill, height, type, width}) => {
  const {dark} = useTheme();
  let Component;
  // eslint-disable-next-line default-case
  switch (type) {
    case 'back-button':
      Component = dark ? BackButtonIconDark : BackButtonIcon;
      break;
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
    case 'global-search-selected':
      Component = dark ? GlobalSearchIconDark : GlobalSearchSelectedIcon;
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
    case 'input-buttons-mentions':
      Component = dark ? MentionsTabIconDark : MentionsTabIcon;
      break;
    case 'input-buttons-formatting':
      Component = dark ? FormattingIconDark : FormattingIcon;
      break;
    case 'input-buttons-shortcuts':
      Component = dark ? ShortcutsIconDark : ShortcutsIcon;
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
    case 'send-button':
      Component = dark ? SendButtonDark : SendButton;
      break;
    }
  return <Component height={height} width={width} fill={fill} />;
};
