import { ModalScreenContextProvider } from '@/features/auth/hooks/modalScreen.context';
import { Library } from '@/features/wine-library/components/Library';
import { PageProvider } from '@/features/wine-library/hooks/pageContext';
import { SelectedFilterProvider } from '@/features/wine-library/hooks/useSelectedFilterContext';
import { UIModalProvider } from '@/features/wine-library/hooks/useUIModalContext';

export const LibraryPage = () => {
  return (
    <ModalScreenContextProvider>
      <UIModalProvider>
        <SelectedFilterProvider>
          <PageProvider>
            <Library />
          </PageProvider>
        </SelectedFilterProvider>
      </UIModalProvider>
    </ModalScreenContextProvider>
  );
};
