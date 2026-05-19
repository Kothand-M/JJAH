import { useState } from 'react';
import { GuidedPackingPage } from './components/GuidedPackingPage';
import { DeliveryDetailsPage } from './components/DeliveryDetailsPage';
import { Toaster } from './components/ui/sonner';

type PageType = 'guided-packing' | 'delivery-details';

interface NavigationState {
  page: PageType;
  order?: string;
  delivery?: string;
  from?: string;
  onlyOpenDeliveries?: boolean;
}

export default function App() {
  const [navigation, setNavigation] = useState<NavigationState>({
    page: 'guided-packing'
  });
  const [shouldOpenProcessDialog, setShouldOpenProcessDialog] = useState(false);

  const handleNavigateToDelivery = (order: string, delivery: string, from?: string, onlyOpenDeliveries?: boolean) => {
    setNavigation({
      page: 'delivery-details',
      order,
      delivery,
      from,
      onlyOpenDeliveries
    });
  };

  const handleNavigateToGuidedPacking = () => {
    setNavigation({
      page: 'guided-packing'
    });
  };

  const handleChangeSelection = () => {
    // First, go back to guided packing page
    setNavigation({
      page: 'guided-packing'
    });
    // Then signal to open the process dialog
    setShouldOpenProcessDialog(true);
  };

  const handleProcessDialogOpened = () => {
    // Reset the flag once the dialog is opened
    setShouldOpenProcessDialog(false);
  };

  return (
    <>
      {navigation.page === 'guided-packing' && (
        <GuidedPackingPage
          onNavigateToDelivery={handleNavigateToDelivery}
          shouldOpenProcessDialog={shouldOpenProcessDialog}
          onProcessDialogOpened={handleProcessDialogOpened}
        />
      )}
      
      {navigation.page === 'delivery-details' && (
        <DeliveryDetailsPage
          order={navigation.order || ''}
          delivery={navigation.delivery || ''}
          from={navigation.from}
          onCancel={handleNavigateToGuidedPacking}
          onChangeSelection={handleChangeSelection}
          onlyOpenDeliveries={navigation.onlyOpenDeliveries}
        />
      )}

      <Toaster position="bottom-left" />
    </>
  );
}