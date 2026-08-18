import React, { useContext } from 'react';
import './SliderButtons.scss';
import { SliderContext } from '@/shared/hooks/SliderContext';
import { ScreenContext } from '@/shared/hooks/ScreenContext';
import { Icons } from '@/assets/icons';

type SliderButtonProps = {
  itemAmount: number;
};

export const SliderButtons: React.FC<SliderButtonProps> = ({ itemAmount }) => {
  const { setButton, setCurrentSlideIndex, currentSlideIndex, slideWidth } =
    useContext(SliderContext);
  const { screenWidth } = useContext(ScreenContext);
  const slidesPerView = Math.floor(screenWidth / slideWidth);

  const handlePrevSlide = () => {
    setButton('prev');

    if (currentSlideIndex + slidesPerView >= itemAmount) {
      setCurrentSlideIndex(0);
    } else {
      setCurrentSlideIndex(currentSlideIndex - 1);
    }
  };

  const handleNextSlide = () => {
    // debugger;
    setButton('next');

    if (currentSlideIndex + slidesPerView >= itemAmount) {
      setCurrentSlideIndex(0);
    } else {
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  return (
    <section className="btns-slider">
      <button
        className="btns-slider__btn btns-slider__btn--left"
        onClick={handlePrevSlide}
      >
        <Icons.ArrowLeft className="btns-slider__btn__image" />
      </button>
      <button
        className="btns-slider__btn btns-slider__btn--right"
        onClick={handleNextSlide}
      >
        <Icons.ArrowRight className="btns-slider__btn__image" />
      </button>
    </section>
  );
};
