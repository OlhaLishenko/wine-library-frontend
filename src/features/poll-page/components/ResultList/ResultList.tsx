import React from 'react';
import styles from './ResultList.module.scss';
import { ResultCard } from '../ResultCard';
import { useAppSelector } from '@/store/hooks';
import { ErrorBlock } from '@/shared/components/Alerts/ErrorBlock';
import { Loader } from '@/shared/components/Loader';
import { EmptyBlock } from '@/shared/components/Alerts/EmptyBlock';

type ResultListType = {
  restartPoll: () => void;
};

export const ResultList: React.FC<ResultListType> = ({ restartPoll }) => {
  const { wines, loading, error } = useAppSelector((s) => s.pollResultList);

  if (loading) return <Loader loading={loading} />;
  if (error) return <ErrorBlock message={error} />;
  if (wines.length === 0)
    return (
      <EmptyBlock
        text={'No matching wines found'}
        subText={'Try adjusting your search criteria'}
        btnTitle={'Reset Filters'}
        btnAction={restartPoll}
      />
    );

  return (
    <div className={styles.resultList}>
      {wines.map((wine) => (
        <ResultCard key={wine.id} wine={wine} />
      ))}
    </div>
  );
};
