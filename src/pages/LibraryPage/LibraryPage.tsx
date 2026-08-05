import { ModalScreenContextProvider } from '@/features/auth/hooks/modalScreen.context';
import { Library } from '@/features/wine-library/components/Library';
import { SelectedFilterProvider } from '@/features/wine-library/hooks/useSelectedFilterContext';

export const LibraryPage = () => {
  return (
    <ModalScreenContextProvider>
      <SelectedFilterProvider>
        <Library />
      </SelectedFilterProvider>
    </ModalScreenContextProvider>
  );
};
