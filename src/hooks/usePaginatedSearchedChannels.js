import {useEffect, useRef, useState} from 'react';

import {ChatClientStore} from '../utils';

export const CHANNEL_SEARCH_LIMIT = 30;

export const usePaginatedSearchedChannels = (queryFilters) => {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [channels, setChannels] = useState();
  const offset = useRef(0);
  const hasMoreResults = useRef(true);
  const queryInProgress = useRef(false);
  const chatClient = ChatClientStore.client;

  const done = () => {
    queryInProgress.current = false;
    setLoading(false);
    setRefreshing(false);
  };

  const reset = () => {
    setChannels(undefined);
    offset.current = 0;
    hasMoreResults.current = true;
  };

  const fetchChannels = async () => {
    if (queryInProgress.current) {
      done();
      return;
    }

    setLoading(true);

    try {
      queryInProgress.current = true;

      if (!hasMoreResults.current) {
        queryInProgress.current = false;
        done();
        return;
      }

      const res = await chatClient?.queryChannels(
        queryFilters,
        {},
        {
          limit: CHANNEL_SEARCH_LIMIT,
          offset: offset.current,
        },
      );

      if (!res) {
        queryInProgress.current = false;
        done();
        return;
      }

      let channelsLength = 0;
      if (offset.current === 0) {
        channelsLength = res.length;
        setChannels(res);
      } else {
        setChannels((existingChannels) => {
          if (!existingChannels) {
            channelsLength = res.length;
            return res;
          }

          const returnChannels = existingChannels.concat(res);
          channelsLength = returnChannels.length;
          return returnChannels;
        });
      }

      if (res.length < CHANNEL_SEARCH_LIMIT) {
        hasMoreResults.current = false;
      }

      offset.current = offset.current + channelsLength;
    } catch (e) {
      // do nothing;
    }

    done();
  };

  const loadMore = () => {
    fetchChannels();
  };

  useEffect(() => {
    reloadList();
  }, [queryFilters]);

  const refreshList = () => {
    if (!chatClient?.user?.id) return;

    offset.current = 0;
    hasMoreResults.current = true;

    setRefreshing(true);
    fetchChannels();
  };

  const reloadList = () => {
    reset();

    setChannels([]);
    fetchChannels();
  };

  return {
    channels,
    loadMore,
    loading,
    refreshList,
    refreshing,
    reloadList,
    reset,
  };
};
