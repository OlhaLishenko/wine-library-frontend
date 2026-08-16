import React, { useContext, useEffect, useRef } from 'react';
import './ProductCarousel.scss';
import { ProductCard } from '@/shared/components/ProductCard';
import { SliderContext } from '@/shared/hooks/SliderContext';
import { WineType } from '@/shared/types/WineType';

type ProductCarouselProps = {
  wineList: WineType[];
};

export const ProductCarousel: React.FC<ProductCarouselProps> = ({
  wineList,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { currentSlideIndex } = useContext(SliderContext);

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    const card = containerRef.current.children[currentSlideIndex] as
      HTMLElement | undefined;

    if (!card) {
      return;
    }

    containerRef.current.scrollTo({
      left: card.offsetLeft - 16,
      behavior: 'smooth',
    });
  }, [currentSlideIndex]);

  return (
    <div className="slider-product-list" ref={containerRef}>
      {wineList.map((wine) => (
        <ProductCard isSliderPage={true} wineItem={wine} key={wine.id} />
      ))}
    </div>
  );
};
