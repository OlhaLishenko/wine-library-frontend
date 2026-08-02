import { useMediaQuery } from 'react-responsive';
import { onDesktop, onMobile, onTablet } from '../constants/breackpoints';

export function useScreenWidth() {
  const isMobile = useMediaQuery({
    query: `(min-width: ${onMobile}px) and (max-width: ${onTablet - 1}px)`,
  });

  const isTablet = useMediaQuery({
    query: `(min-width: ${onTablet}px) and (max-width: ${onDesktop - 1}px)`,
  });

  const isDesktop = useMediaQuery({
    query: `(min-width: ${onDesktop}px)`,
  });

  return { isDesktop, isTablet, isMobile };
}
