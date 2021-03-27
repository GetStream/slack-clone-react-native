import {useEffect, useState} from 'react';

import {supportedReactionTypes} from '../utils/supportedReactions';

export const useMessageReactions = (channel, message) => {
  const [ownReactionTypes, setOwnReactionTypes] = useState([]);
  const [reactionsByType, setReactionsByType] = useState({});

  const latestReactionsStr = JSON.stringify(message?.latest_reactions);
  const reactionCounts = message?.reaction_counts;

  const toggleReaction = async (reactionType) => {
    if (ownReactionTypes.indexOf(reactionType) > -1) {
      await channel.deleteReaction(message.id, reactionType);
    } else {
      await channel.sendReaction(message.id, {
        type: reactionType,
      });
    }
  };

  useEffect(() => {
    const updateReactions = () => {
      if (!message) {
        return;
      }
      const latestReactions = message.latest_reactions;
      const ownReactions = message.own_reactions;

      const reactionsByType = {};
      const ownReactionTypes = ownReactions?.map((or) => or.type);

      if (!latestReactions || Object.keys(latestReactions).length === 0) {
        return null;
      }

      latestReactions.forEach((item) => {
        if (supportedReactionTypes.indexOf(item.type) === -1) {
          return;
        }

        if (latestReactions[item.type] === undefined) {
          return (reactionsByType[item.type] = [item]);
        }

        return (reactionsByType[item.type] = [
          ...(reactionsByType[item.type] || []),
          item,
        ]);
      });

      setOwnReactionTypes(ownReactionTypes);
      setReactionsByType(reactionsByType);
    };

    updateReactions();
  }, [message, latestReactionsStr]);

  return {
    ownReactionTypes,
    reactionCounts,
    reactionsByType,
    toggleReaction,
  };
};
