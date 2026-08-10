import './ProductSliderSection.scss';
import { useRef } from 'react';
import { WineType } from '@/shared/types/WineType';
import { SliderButtons } from '../SliderButtons';
import { ProductCarousel } from '../ProductCarousel';

const SectionTitle = ({ text }: { text: string }) => {
  return <h1 className="section-title">{text}</h1>;
};

type ProductSliderSectionProps = {
  content: {
    title: string;
    list: WineType[];
  };
};

export const ProductSliderSection: React.FC<ProductSliderSectionProps> = ({
  content,
}) => {
  const sliderRef = useRef<HTMLElement>(null);

  return (
    <section className="product-slider" ref={sliderRef}>
      <div className="product-slider__top">
        <div className="product-slider__top__wrapper">
          <SectionTitle text={content.title} />
          <SliderButtons itemAmount={content.list.length} />
        </div>
      </div>
      <ProductCarousel wineList={content.list} />
    </section>
  );
};
