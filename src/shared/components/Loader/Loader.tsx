import React from 'react';
import { MoonLoader } from 'react-spinners';

type LoaderProps = {
  loading: boolean;
};

export const Loader: React.FC<LoaderProps> = ({ loading }) => {
  return (
    <MoonLoader
      color="#f6f3e9"
      cssOverride={{}}
      loading={loading}
      // margin={10}
      size={30}
      speedMultiplier={0.6}
    />
  );
};
