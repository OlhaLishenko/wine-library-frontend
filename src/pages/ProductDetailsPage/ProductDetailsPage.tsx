import { AppLayout } from '@/layouts/AppLayout';
import styles from './ProductDetailsPage.module.scss';
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { getWineDetailsService } from '@/services/getWineDetails.service';
import { WineType } from '@/shared/types/WineType';
import { MoonLoader } from 'react-spinners';
import { ProductDetails } from '@/features/product-details/components/ProductDetails';
import { getWinesService } from '@/services/getWines.service';
import { SliderProvider } from '@/shared/hooks/SliderContext';
import { ErrorBlock } from '@/shared/components/Alerts/ErrorBlock';

export const ProductDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const wineId = id ? +id : 0;

  const [loader, setLoader] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [wineDetails, setWineDetails] = useState<WineType | null>(null);
  const [sliderWineList, setSliderWineList] = useState<WineType[]>([]);

  useEffect(() => {
    const fetchWineDetails = async () => {
      setLoader(true);
      try {
        const wine = await getWineDetailsService(wineId.toString());
        setWineDetails(wine);

        const sliderWineList = await getWinesService({
          wineTypes: [`${wine.wineType}`],
        });
        setSliderWineList(sliderWineList.content.slice(0, 5));
      } catch (err) {
        setError(err as string);
      } finally {
        setLoader(false);
      }
    };

    fetchWineDetails();
  }, [id]);

  return (
    <AppLayout>
      <div className={styles.nav}></div>
      {loader ? (
        <MoonLoader />
      ) : error ? (
        <ErrorBlock message={error} />
      ) : (
        <SliderProvider>
          <ProductDetails
            wineDetails={wineDetails}
            sliderWineList={sliderWineList}
          />
        </SliderProvider>
      )}
    </AppLayout>
  );
};
