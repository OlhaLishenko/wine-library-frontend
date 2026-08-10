import React, { useEffect } from 'react';
import styles from './FavoritesPage.module.scss';
import { AppLayout } from '@/layouts/AppLayout';
import { TopNav } from '@/shared/components/TopNav';
import { DotLoader } from 'react-spinners';
import { FavoriteList } from '@/features/favorites/components/FavoriteList';
import { EmptyBlock } from '@/shared/components/Alerts/EmptyBlock';
import { Line } from '@/shared/components/Line';
import { TITLE } from '@/shared/constants/context';
import { ErrorBlock } from '@/shared/components/Alerts/ErrorBlock';
import { useFavorites } from '@/features/favorites/hooks/useFavorites';
import { TopBar } from '@/shared/components/TopBar';
import { useNavigate } from 'react-router';
import { useAppDispatch } from '@/store/hooks';
import { getFavoriteList } from '@/store/Favorites/getFavorites';
import { SommelierPage } from '../SommelierPage';

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
    removeFavItem,
    removeAll,
  } = useFavorites();

  const sortBtnTitle = isRecentFirst ? 'From Recent' : 'From Old';

  const moveToLibrary = () => {
    navigate('/library');
  };

  return (
    <AppLayout>
      <div className={styles.favorites}>
        <TopNav />
        <Line />

        <section className={styles.container}>
          <TopBar
            sortList={sortByAddedTime}
            list={localFavoriteList}
            sortBtnTitle={sortBtnTitle}
            removeAll={removeAll}
          />

          {loader ? (
            <DotLoader />
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
            <FavoriteList
              list={localFavoriteList}
              deleteFavItem={removeFavItem}
            />
          )}
        </section>
      </div>
    </AppLayout>
  );
};
