import { useEffect, useRef, useState } from 'react';
import { useChatContext } from 'stream-chat-react-native';

export const usePaginatedSearchedUsers = () => {
  const { chatClient } = useChatContext;

  const [initialResults, setInitialResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const hasMoreResults = useRef(true);
  const offset = useRef(0);
  const queryInProgress = useRef(false);

  const reset = () => {
    setSearchText('');
    fetchUsers('');
    setSelectedUserIds([]);
    setSelectedUsers([]);
  };

  const addUser = (user) => {
    setSelectedUsers([...selectedUsers, user]);
    setSelectedUserIds((prevSelectedUserIds) => {
      prevSelectedUserIds.push(user.id);
      return prevSelectedUserIds;
    });
    setSearchText('');
    setResults(initialResults || []);
  };

  const removeUser = (index) => {
    if (index < 0) {
      return;
    }

    setSelectedUserIds((prevSelectedUserIds) => {
      const newSelectedUserIds = prevSelectedUserIds.slice();
      newSelectedUserIds.splice(index, 1);
      return newSelectedUserIds;
    });

    setSelectedUsers((prevSelectedUsers) => {
      const newSelectedUsers = prevSelectedUsers.slice();
      newSelectedUsers.splice(index, 1);
      return newSelectedUsers;
    });
  };

  const toggleUser = (user) => {
    if (!user.id) {
      return;
    }

    const existingIndex = selectedUserIds.indexOf(user.id);

    if (existingIndex > -1) {
      removeUser(existingIndex);
    } else {
      addUser(user);
    }
  };

  const onFocusInput = () => {
    if (!searchText) {
      setResults(initialResults || []);
      setLoading(false);
    } else {
      fetchUsers(searchText);
    }
  };

  const onChangeSearchText = (newText) => {
    setSearchText(newText);
    if (!newText) {
      setResults(initialResults || []);
      setLoading(false);
    } else {
      fetchUsers(newText);
    }
  };

  const fetchUsers = async (query = '') => {
    if (queryInProgress.current) return;
    setLoading(true);

    try {
      queryInProgress.current = true;
      const filter = {
        role: 'user',
      };

      if (query) {
        filter.name = { $autocomplete: query };
      }

      if (query !== searchText) {
        offset.current = 0;
        hasMoreResults.current = true;
      } else {
        offset.current = offset.current + results.length;
      }

      if (!hasMoreResults.current) {
        queryInProgress.current = false;
        return;
      }

      const res = await chatClient?.queryUsers(
        filter,
        { name: 1 },
        {
          limit: 10,
          offset: offset.current,
          presence: true,
        },
      );

      if (!res?.users) {
        queryInProgress.current = false;
        return;
      }

      // Dumb check to avoid duplicates
      if (
        query === searchText &&
        results.findIndex((r) => res?.users[0].id === r.id) > -1
      ) {
        queryInProgress.current = false;
        return;
      }

      setResults((r) => {
        if (query !== searchText) {
          return res?.users;
        }
        return r.concat(res?.users || []);
      });

      if (
        res?.users.length < 10 &&
        (offset.current === 0 || query === searchText)
      ) {
        hasMoreResults.current = false;
      }

      if (!query && offset.current === 0) {
        setInitialResults(res?.users || []);
      }
    } catch (e) {
      // do nothing;
    }
    queryInProgress.current = false;
    setLoading(false);
  };

  const loadMore = () => {
    fetchUsers(searchText);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return {
    clearText: () => {
      setSearchText('');
      fetchUsers('');
    },
    initialResults,
    loading,
    loadMore,
    onChangeSearchText,
    onFocusInput,
    removeUser,
    reset,
    results,
    searchText,
    selectedUserIds,
    selectedUsers,
    setInitialResults,
    setResults,
    setSearchText,
    setSelectedUsers,
    toggleUser,
  };
};
