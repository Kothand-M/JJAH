import { useState, useEffect } from 'react';
import { Header } from './Header';
import { ProcessSelectionDialog, GuidedPackingCriteria, SterilizationCriteria, ProcessType } from './ProcessSelectionDialog';
import { HandlingUnitsTree } from './HandlingUnitsTree';
import { HUContents } from './HUContents';
import { ActionButtonsPanel } from './ActionButtonsPanel';
import { NewPalletDialog } from './NewPalletDialog';
import { AddUpdatePalletDialog } from './AddUpdatePalletDialog';
import { RepackPalletDialog } from './RepackPalletDialog';
import { SpecialInstructionsDialog } from './SpecialInstructionsDialog';
import { OrderConfirmationDialog } from './OrderConfirmationDialog';
import { MessageRibbon, Message } from './MessageRibbon';
import { Button } from './ui/button';
import { toast } from 'sonner@2.0.3';

interface GuidedPackingPageProps {
  onNavigateToDelivery: (order: string, delivery: string, from?: string, onlyOpenDeliveries?: boolean) => void;
  onChangeSelection?: () => void;
  shouldOpenProcessDialog?: boolean;
  onProcessDialogOpened?: () => void;
}

export function GuidedPackingPage({ 
  onNavigateToDelivery,
  onChangeSelection,
  shouldOpenProcessDialog = false,
  onProcessDialogOpened
}: GuidedPackingPageProps) {
  const [processDialogOpen, setProcessDialogOpen] = useState(shouldOpenProcessDialog);
  const [showHUPanels, setShowHUPanels] = useState(false);
  const [selectedHU, setSelectedHU] = useState<string>('1231451251');
  const [newPalletDialogOpen, setNewPalletDialogOpen] = useState(false);
  const [addUpdatePalletDialogOpen, setAddUpdatePalletDialogOpen] = useState(false);
  const [repackPalletDialogOpen, setRepackPalletDialogOpen] = useState(false);
  const [specialInstructionsDialogOpen, setSpecialInstructionsDialogOpen] = useState(false);
  const [pallets, setPallets] = useState<string[]>(['1231451251', '1531451291', '1631451231']);
  const [selectedPallets, setSelectedPallets] = useState<string[]>([]);
  const [palletChildrenMap, setPalletChildrenMap] = useState<Record<string, string[]>>({
    '1231451251': ['SB100001', 'SB100002', 'SB100003'],
    '1531451291': ['SB200001', 'SB200002', 'SB200003', 'SB200004'],
    '1631451231': ['SB300001', 'SB300002'],
  });
  const [currentProcessType, setCurrentProcessType] = useState<ProcessType>('');
  const [acknowledgedPallets, setAcknowledgedPallets] = useState<Set<string>>(new Set());
  const [pendingInstructionsPallets, setPendingInstructionsPallets] = useState<string[]>([]);
  const [simulatePressed, setSimulatePressed] = useState(false);
  const [looseBoxes, setLooseBoxes] = useState<string[]>([
    '1441525151',
    '1551521134',
    '1661525161',
    '1771521174',
  ]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [orderConfirmationOpen, setOrderConfirmationOpen] = useState(false);
  const [createdOrderNumber, setCreatedOrderNumber] = useState('');
  const [createdDeliveryNumber, setCreatedDeliveryNumber] = useState('');
  const [confirmedPalletCount, setConfirmedPalletCount] = useState(0);
  const [currentOrder, setCurrentOrder] = useState('');
  const [currentDelivery, setCurrentDelivery] = useState('');
  const [currentHandlingUnit, setCurrentHandlingUnit] = useState('');

  // Watch for shouldOpenProcessDialog changes from parent
  useEffect(() => {
    if (shouldOpenProcessDialog) {
      setProcessDialogOpen(true);
      onProcessDialogOpened?.();
    }
  }, [shouldOpenProcessDialog, onProcessDialogOpened]);

  const handleProceedPush = (criteria: GuidedPackingCriteria) => {
    console.log('Push process with criteria:', criteria);
    setCurrentProcessType('push');
    setShowHUPanels(true);
    toast.success('Handling units loaded successfully');
  };

  const handleProceedPull = (handlingUnit: string, order: string, delivery: string) => {
    console.log('Pull - Pack from Pick:', handlingUnit, order, delivery);
    setCurrentProcessType('pull');
    
    // Store the entered values
    setCurrentHandlingUnit(handlingUnit);
    
    // If handlingUnit is provided, look up order/delivery from mock data
    if (handlingUnit) {
      // Mock lookup: in real app, this would be an API call
      const mockOrder = '4500123456';
      const mockDelivery = '114215321';
      setCurrentOrder(mockOrder);
      setCurrentDelivery(mockDelivery);
    } else {
      // Use the provided order/delivery
      setCurrentOrder(order);
      setCurrentDelivery(delivery);
    }
    
    setShowHUPanels(true);
    toast.success('Handling units loaded successfully');
  };

  const handleProceedDeparture = (order: string, delivery: string, from: string, onlyOpenDeliveries: boolean) => {
    console.log('Departure - Order/Delivery/From:', order, delivery, from, 'Only Open Deliveries:', onlyOpenDeliveries);
    // Navigate to Page 2 for Departure
    onNavigateToDelivery(order, delivery, from, onlyOpenDeliveries);
  };

  const handleProceedSterilization = (criteria: SterilizationCriteria) => {
    console.log('Sterilization process with criteria:', criteria);
    setCurrentProcessType('sterilization');
    setShowHUPanels(true);
    toast.success('Handling units loaded successfully');
  };

  const handleHUSelect = (huId: string, selected: boolean) => {
    setSelectedHU(huId);
    if (selected) {
      setSelectedPallets([...selectedPallets, huId]);
    } else {
      setSelectedPallets(selectedPallets.filter(id => id !== huId));
    }
    // Reset simulate flag when selection changes
    setSimulatePressed(false);
  };

  const handleNewPallet = () => {
    setNewPalletDialogOpen(true);
  };

  const handleConfirmPack = (packagingMaterial: string, hus: string[]) => {
    console.log('Creating new pallet with material:', packagingMaterial);
    console.log('Shipper Box HUs:', hus);
    
    // Generate a new pallet ID
    const newPalletId = `1${Math.floor(Math.random() * 900000000 + 100000000)}`;
    setPallets([...pallets, newPalletId]);
    
    // Store the pallet-to-children relationship
    setPalletChildrenMap({
      ...palletChildrenMap,
      [newPalletId]: hus
    });
    
    // Remove scanned HUs from loose boxes if they exist
    setLooseBoxes(prevLooseBoxes => 
      prevLooseBoxes.filter(boxId => !hus.includes(boxId))
    );
    
    setNewPalletDialogOpen(false);
    toast.success(`New pallet ${newPalletId} created with ${hus.length} shipper box(es)`);
    
    // Show special instructions dialog for the new pallet
    setPendingInstructionsPallets([newPalletId]);
    setSpecialInstructionsDialogOpen(true);
  };

  const handleConfirmUpdatePallet = (palletHU: string, hus: string[]) => {
    console.log('Updating pallet:', palletHU);
    console.log('Shipper Box HUs:', hus);
    
    // Update the pallet-to-children relationship
    setPalletChildrenMap({
      ...palletChildrenMap,
      [palletHU]: hus
    });
    
    // Add pallet to list if it doesn't exist
    if (!pallets.includes(palletHU)) {
      setPallets([...pallets, palletHU]);
    }
    
    // Remove scanned HUs from loose boxes if they exist
    setLooseBoxes(prevLooseBoxes => 
      prevLooseBoxes.filter(boxId => !hus.includes(boxId))
    );
    
    setAddUpdatePalletDialogOpen(false);
    toast.success(`Pallet ${palletHU} updated with ${hus.length} shipper box(es)`);
    
    // Show special instructions dialog for the updated pallet
    setPendingInstructionsPallets([palletHU]);
    setSpecialInstructionsDialogOpen(true);
  };

  const handleConfirmRepack = (originalPalletHU: string, packagingMaterial: string, hus: string[]) => {
    console.log('Repacking pallet:', originalPalletHU);
    console.log('Packaging material:', packagingMaterial);
    console.log('Shipper Box HUs:', hus);
    
    // Generate a new pallet ID
    const newPalletId = `1${Math.floor(Math.random() * 900000000 + 100000000)}`;
    
    // Remove the original pallet from the list
    setPallets(prevPallets => {
      const filtered = prevPallets.filter(id => id !== originalPalletHU);
      return [...filtered, newPalletId];
    });
    
    // Remove the original pallet from palletChildrenMap and add the new one
    setPalletChildrenMap(prev => {
      const newMap = { ...prev };
      delete newMap[originalPalletHU];
      newMap[newPalletId] = hus;
      return newMap;
    });
    
    // Remove from selected pallets if it was selected
    setSelectedPallets(prev => prev.filter(id => id !== originalPalletHU));
    
    // Remove from acknowledged pallets if it was acknowledged
    setAcknowledgedPallets(prev => {
      const newSet = new Set(prev);
      newSet.delete(originalPalletHU);
      return newSet;
    });
    
    setRepackPalletDialogOpen(false);
    toast.success(`Pallet ${originalPalletHU} repacked into new pallet ${newPalletId} with ${hus.length} shipper box(es)`);
    
    // Show special instructions dialog for the new pallet
    setPendingInstructionsPallets([newPalletId]);
    setSpecialInstructionsDialogOpen(true);
  };

  const handleSimulateOrder = () => {
    if (selectedPallets.length === 0) {
      const errorId = `error-${Date.now()}`;
      setMessages([{
        id: errorId,
        type: 'error',
        text: 'Please select at least one pallet',
      }]);
      return;
    }
    
    // Clear previous messages
    setMessages([]);
    setSimulatePressed(true);
    
    if (currentProcessType === 'pull') {
      // For Pull process - show staging check message
      toast.success('Pallet staging check successful for Destination OUT-ZONE');
    } else {
      // For other processes - show order creation simulation
      toast.info(`Simulating order creation for ${selectedPallets.length} pallet(s)...`);
      // Simulate some validation messages - add to persistent ribbon
      setTimeout(() => {
        const warningId = `warning-${Date.now()}`;
        setMessages([{
          id: warningId,
          type: 'warning',
          text: 'Warning: Pallet weight exceeds recommended limit',
        }]);
      }, 1000);
    }
  };

  const handleShowSpecialInstructions = () => {
    if (selectedPallets.length === 0) {
      toast.error('Please select at least one pallet');
      return;
    }
    
    setPendingInstructionsPallets(selectedPallets);
    setSpecialInstructionsDialogOpen(true);
  };

  const handleAcknowledgeInstructions = (palletIds: string[]) => {
    setAcknowledgedPallets(prev => {
      const newSet = new Set(prev);
      palletIds.forEach(id => newSet.add(id));
      return newSet;
    });
    toast.success(`Special instructions acknowledged for ${palletIds.length} pallet(s)`);
  };

  const handleCreateOrder = () => {
    if (selectedPallets.length === 0) {
      const errorId = `error-${Date.now()}`;
      setMessages([{
        id: errorId,
        type: 'error',
        text: 'Please select at least one pallet',
      }]);
      return;
    }
    
    // Check if all selected pallets have been acknowledged
    const unacknowledgedPallets = selectedPallets.filter(
      palletId => !acknowledgedPallets.has(palletId)
    );
    
    if (unacknowledgedPallets.length > 0) {
      const errorId = `error-${Date.now()}`;
      setMessages([{
        id: errorId,
        type: 'error',
        text: `Please acknowledge Special Instruction Framework for pallet(s): ${unacknowledgedPallets.join(', ')}`,
      }]);
      return;
    }
    
    // Check if simulate was pressed
    if (!simulatePressed) {
      const errorId = `error-${Date.now()}`;
      setMessages([{
        id: errorId,
        type: 'error',
        text: 'Please press Simulate before confirming',
      }]);
      return;
    }
    
    // Clear messages on successful creation
    setMessages([]);
    
    // Store pallet count before clearing
    setConfirmedPalletCount(selectedPallets.length);
    
    // Store the pallets to remove
    const palletsToRemove = [...selectedPallets];
    
    if (currentProcessType === 'pull') {
      // For Pull process - show staging confirmation dialog
      setCreatedOrderNumber('');
      setCreatedDeliveryNumber('');
      setOrderConfirmationOpen(true);
    } else {
      // For other processes - show order creation dialog
      const orderNumber = `${Math.floor(Math.random() * 900000 + 100000)}`;
      const deliveryNumber = `${Math.floor(Math.random() * 900000000 + 100000000)}`;
      setCreatedOrderNumber(orderNumber);
      setCreatedDeliveryNumber(deliveryNumber);
      setOrderConfirmationOpen(true);
    }
    
    // Remove the selected pallets from the handling units
    setPallets(prevPallets => prevPallets.filter(id => !palletsToRemove.includes(id)));
    
    // Remove the pallets from palletChildrenMap
    setPalletChildrenMap(prev => {
      const newMap = { ...prev };
      palletsToRemove.forEach(palletId => {
        delete newMap[palletId];
      });
      return newMap;
    });
    
    // Remove from acknowledged pallets
    setAcknowledgedPallets(prev => {
      const newSet = new Set(prev);
      palletsToRemove.forEach(palletId => {
        newSet.delete(palletId);
      });
      return newSet;
    });
    
    // Clear selected pallets after removing them
    setSelectedPallets([]);
    
    // Reset simulate flag
    setSimulatePressed(false);
  };
  
  const handleDismissMessage = (id: string) => {
    setMessages(messages.filter(msg => msg.id !== id));
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <Header />
      
      {/* Main scrollable content area */}
      <div className="flex-1 flex flex-col p-4 gap-4 overflow-auto pb-20">
        {/* Start Process Button */}
        {!showHUPanels && (
          <div className="flex justify-center items-center py-12">
            <Button
              onClick={() => setProcessDialogOpen(true)}
              className="bg-[#0854A0] hover:bg-[#064173] px-8 py-6"
              size="lg"
            >
              Start Guided Packing Process
            </Button>
          </div>
        )}

        {/* Handling Units and HU Contents - Shown after Process Selection */}
        {showHUPanels && (
          <div className="flex gap-4 min-h-[500px]">
            {/* Handling Units Panel */}
            <div className="w-64 bg-white border rounded-lg flex flex-col flex-shrink-0">
              <HandlingUnitsTree
                onHUSelect={handleHUSelect}
                selectedHU={selectedHU}
                pallets={pallets}
                selectedPallets={selectedPallets}
                palletChildrenMap={palletChildrenMap}
                processType={currentProcessType}
                looseBoxes={looseBoxes}
              />
            </div>

            {/* Right Side: Action Buttons + HU Contents */}
            <div className="flex-1 flex flex-col gap-4 min-w-0">
              {/* Action Buttons */}
              <div>
                <ActionButtonsPanel
                  onBuildAddBox={() => toast.info('Build & Add Box')}
                  onNewPallet={handleNewPallet}
                  onRepackPallet={() => setRepackPalletDialogOpen(true)}
                  onAddUpdatePallet={() => setAddUpdatePalletDialogOpen(true)}
                  onRefresh={() => {
                    toast.success('Refreshed');
                    setShowHUPanels(false);
                    setTimeout(() => setShowHUPanels(true), 100);
                  }}
                  onChange={() => {
                    setShowHUPanels(false);
                    setProcessDialogOpen(true);
                  }}
                />
              </div>

              {/* HU Contents Panel */}
              <div className="flex-1 flex flex-col min-h-0">
                <HUContents 
                  selectedHU={selectedHU} 
                  palletChildrenMap={palletChildrenMap}
                  orderNumber={currentOrder}
                  deliveryNumber={currentDelivery}
                  processType={currentProcessType}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Fixed Bottom Ribbon */}
      {showHUPanels && (currentProcessType === 'push' || currentProcessType === 'pull' || currentProcessType === 'sterilization') && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border shadow-lg z-10">
          <div className="px-4 py-3">
            {/* Message Ribbon */}
            {messages.length > 0 && (
              <div className="mb-3">
                <MessageRibbon messages={messages} onDismiss={handleDismissMessage} />
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-end gap-4">
              <Button
                onClick={handleShowSpecialInstructions}
                className="bg-[#0854A0] hover:bg-[#064173]"
              >
                Spl Instr Frm
              </Button>
              {currentProcessType === 'sterilization' && (
                <Button
                  onClick={() => toast.info('Sterilization check initiated')}
                  className="bg-[#0854A0] hover:bg-[#064173]"
                >
                  Sterilization Check
                </Button>
              )}
              <Button
                onClick={handleSimulateOrder}
                className="bg-[#0854A0] hover:bg-[#064173]"
              >
                Simulate
              </Button>
              <Button
                onClick={handleCreateOrder}
                disabled={!simulatePressed}
                className="bg-[#0854A0] hover:bg-[#064173] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {currentProcessType === 'pull' ? 'Staging Confirm' : 'Create Order'}
              </Button>
            </div>
          </div>
        </div>
      )}

      <ProcessSelectionDialog
        open={processDialogOpen}
        onOpenChange={setProcessDialogOpen}
        onProceedPush={handleProceedPush}
        onProceedPull={handleProceedPull}
        onProceedDeparture={handleProceedDeparture}
        onProceedSterilization={handleProceedSterilization}
      />

      <NewPalletDialog
        open={newPalletDialogOpen}
        onOpenChange={setNewPalletDialogOpen}
        onConfirmPack={handleConfirmPack}
      />

      <AddUpdatePalletDialog
        open={addUpdatePalletDialogOpen}
        onOpenChange={setAddUpdatePalletDialogOpen}
        onConfirmPack={handleConfirmUpdatePallet}
      />

      <RepackPalletDialog
        open={repackPalletDialogOpen}
        onOpenChange={setRepackPalletDialogOpen}
        onConfirmRepack={handleConfirmRepack}
        palletChildrenMap={palletChildrenMap}
      />

      <SpecialInstructionsDialog
        open={specialInstructionsDialogOpen}
        onOpenChange={setSpecialInstructionsDialogOpen}
        palletIds={pendingInstructionsPallets}
        onAcknowledge={handleAcknowledgeInstructions}
      />

      <OrderConfirmationDialog
        open={orderConfirmationOpen}
        onOpenChange={setOrderConfirmationOpen}
        orderNumber={createdOrderNumber}
        deliveryNumber={createdDeliveryNumber}
        palletCount={confirmedPalletCount}
        processType={currentProcessType}
      />
    </div>
  );
}