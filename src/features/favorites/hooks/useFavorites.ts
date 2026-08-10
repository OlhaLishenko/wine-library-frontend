import { favoritesService } from '@/services/favorites.service';
import {
  getFavoriteList,
  setLocalFavoriteList,
  removeLocalFavoriteItem,
} from '@/store/Favorites/getFavorites';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useMemo, useState } from 'react';

export const useFavorites = () => {
  const dispatch = useAppDispatch();
  const { localFavoriteList, loader, error } = useAppSelector(
    (state) => state.favoriteList
  );
  const [isRecentFirst, setIsRecentFirst] = useState(true);

  const favoriteIds = useMemo(
    () => new Set(localFavoriteList.map((item) => item.wine.id)),
    [localFavoriteList]
  );

  const sortByAddedTime = () => {
    setIsRecentFirst((prev) => !prev);
    const reversedList = [...localFavoriteList].reverse();
    dispatch(setLocalFavoriteList(reversedList));
  };

  const removeFavItem = async (id: number) => {
    dispatch(removeLocalFavoriteItem(id));
    try {
      await favoritesService.deleteItem(id);
    } catch (err) {
      dispatch(getFavoriteList());
    }
  };

  const removeAll = async () => {
    const itemsToDelete = [...localFavoriteList];

    dispatch(setLocalFavoriteList([]));

    const result = await Promise.allSettled(
      itemsToDelete.map((item) => favoritesService.deleteItem(item.wine.id))
    );

    const hasFailures = result.some(
      (itemResult) => itemResult.status === 'rejected'
    );

    if (hasFailures) {
      dispatch(getFavoriteList());
    }
  };

  return {
    localFavoriteList,
    loader,
    error,
    isRecentFirst,
    sortByAddedTime,
    removeFavItem,
    removeAll,
    favoriteIds,
  };
};
