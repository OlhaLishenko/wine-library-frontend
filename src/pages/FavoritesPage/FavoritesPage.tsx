import React, { useEffect } from 'react';
import styles from './FavoritesPage.module.scss';
import { TopNav } from '@/shared/components/TopNav';
import { FavoriteList } from '@/features/favorites/components/FavoriteList';
import { EmptyBlock } from '@/shared/components/Alerts/EmptyBlock';
import { TITLE } from '@/shared/constants/context';
import { ErrorBlock } from '@/shared/components/Alerts/ErrorBlock';
import { useFavorites } from '@/features/favorites/hooks/useFavorites';
import { TopBar } from '@/shared/components/TopBar';
import { useNavigate } from 'react-router';
import { useAppDispatch } from '@/store/hooks';
import { getFavoriteList } from '@/store/Favorites/getFavorites';
import { Loader } from '@/shared/components/Loader';

type FavoritesPageProps = {};

export const FavoritesPage: React.FC<FavoritesPageProps> = ({}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getFavoriteList());
  }, [dispatch]);

  const {
    localFavoriteList,
    loader,
    error,
    isRecentFirst,
    sortByAddedTime,
    removeAll,
  } = useFavorites();

  const sortBtnTitle = isRecentFirst ? 'From Recent' : 'From Old';

  const moveToLibrary = () => {
    navigate('/library');
  };

  return (
    <div className={styles.favorites}>
      <TopNav />

      <section className={styles.container}>
        <TopBar
          sortList={sortByAddedTime}
          list={localFavoriteList}
          sortBtnTitle={sortBtnTitle}
          removeAll={removeAll}
        />

        {loader ? (
          <Loader loading={loader} />
        ) : error ? (
          <ErrorBlock message={TITLE.favorites.errorMessage} />
        ) : localFavoriteList.length === 0 ? (
          <EmptyBlock
            text="No favorites yet"
            btnTitle="Browse Library"
            subText="Tap the heart on any wine in the catalog to save it here."
            btnAction={moveToLibrary}
          />
        ) : (
          <FavoriteList list={localFavoriteList} />
        )}
      </section>
    </div>
  );
};
