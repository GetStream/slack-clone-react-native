import {useEffect, useState} from 'react';

import AsyncStore, {getRecentSearchesKey} from '../../../utils/AsyncStore';

export const useRecentSearched = () => {
  const [recentSearches, setRecentSearches] = useState([]);

  const addToRecentSearches = async (q) => {
    const updatedRecentSearches = [...recentSearches];
    updatedRecentSearches.unshift(q);

    // Store only max 10 searches
    const slicesRecentSearches = updatedRecentSearches.slice(0, 7);
    setRecentSearches(slicesRecentSearches);

    await AsyncStore.setItem(getRecentSearchesKey(), slicesRecentSearches);
  };

  const removeFromRecentSearches = async (index) => {
    const updatedRecentSearch = [...recentSearches];
    updatedRecentSearch.splice(index, 1);

    setRecentSearches(updatedRecentSearch);

    await AsyncStore.setItem(getRecentSearchesKey(), updatedRecentSearch);
  };

  useEffect(() => {
    const loadRecentSearches = async () => {
      const recentSearches = await AsyncStore.getItem(
        getRecentSearchesKey(),
        [],
      );
      setRecentSearches(recentSearches);
    };

    loadRecentSearches();
  }, []);

  return {
    addToRecentSearches,
    recentSearches,
    removeFromRecentSearches,
  };
};
