import { useState } from 'react';
import { Header } from './Header';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { CheckCircle2, ArrowUp, Printer, RefreshCw, FileText } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { HUListDialog } from './HUListDialog';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from './ui/dialog';
import { ScrollArea } from './ui/scroll-area';
import { AlertCircle } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

interface DeliveryDetailsPageProps {
  order: string;
  delivery: string;
  from?: string;
  onlyOpenDeliveries?: boolean;
  onCancel: () => void;
  onChangeSelection?: () => void;
}

export function DeliveryDetailsPage({ order, delivery, from, onlyOpenDeliveries = true, onCancel, onChangeSelection }: DeliveryDetailsPageProps) {
  const [specialInstructionsOpen, setSpecialInstructionsOpen] = useState(false);
  const [huListDialogOpen, setHuListDialogOpen] = useState(false);
  const [selectedPrintForm, setSelectedPrintForm] = useState<string>('');
  const [stagingDialogOpen, setStagingDialogOpen] = useState(false);
  const [selectedDelivery, setSelectedDelivery] = useState(delivery);
  const [selectedOrder, setSelectedOrder] = useState(order);

  // Mock delivery list data with state management
  const [deliveryList, setDeliveryList] = useState([
    { delivery: '114215321', order: '4500123456', date: '2024-12-11', status: 'Packing completed' },
    { delivery: '114215322', order: '4500123457', date: '2024-12-11', status: 'Staging completed' },
    { delivery: '114215323', order: '4500123458', date: '2024-12-10', status: 'Loading completed' },
    { delivery: '114215324', order: '4500123459', date: '2024-12-10', status: 'PGI Completed' },
    { delivery: '114215325', order: '4500123460', date: '2024-12-09', status: 'Packing completed' },
  ]);

  const handleDeliverySelect = (deliveryItem: typeof deliveryList[0]) => {
    setSelectedDelivery(deliveryItem.delivery);
    setSelectedOrder(deliveryItem.order);
  };

  const updateDeliveryStatus = (deliveryNumber: string, newStatus: string) => {
    setDeliveryList(prevList =>
      prevList.map(item =>
        item.delivery === deliveryNumber
          ? { ...item, status: newStatus }
          : item
      )
    );
  };

  const handlePerformLoad = () => {
    const currentDelivery = selectedDelivery || delivery;
    const deliveryItem = deliveryList.find(d => d.delivery === currentDelivery);
    
    if (deliveryItem?.status !== 'Staging completed') {
      toast.error('Loading can only be performed after staging is completed');
      return;
    }
    
    updateDeliveryStatus(currentDelivery, 'Loading completed');
    toast.success('Load performed successfully');
  };

  const handleCheckAndPGI = () => {
    const currentDelivery = selectedDelivery || delivery;
    const deliveryItem = deliveryList.find(d => d.delivery === currentDelivery);
    
    if (deliveryItem?.status !== 'Loading completed') {
      toast.error('PGI can only be performed after loading is completed');
      return;
    }
    
    updateDeliveryStatus(currentDelivery, 'PGI Completed');
    toast.success('Check and PGI completed');
  };

  const handlePerformStaging = () => {
    const currentDelivery = selectedDelivery || delivery;
    const deliveryItem = deliveryList.find(d => d.delivery === currentDelivery);
    
    if (deliveryItem?.status !== 'Packing completed') {
      toast.error('Staging can only be performed on deliveries with Packing completed status');
      return;
    }
    
    setStagingDialogOpen(true);
  };

  const handleStagingConfirm = () => {
    const currentDelivery = selectedDelivery || delivery;
    updateDeliveryStatus(currentDelivery, 'Staging completed');
    setStagingDialogOpen(false);
    toast.success('Staging completed successfully');
  };

  const handlePrint = () => {
    if (!selectedPrintForm) {
      toast.error('Please select a print form');
      return;
    }
    toast.success(`Printing ${selectedPrintForm}`);
  };

  const handleRefresh = () => {
    toast.success('Page refreshed');
  };

  const handleSpecialInstructions = () => {
    setSpecialInstructionsOpen(true);
  };

  const handleAcknowledgeInstructions = () => {
    toast.success('Special instructions acknowledged');
    setSpecialInstructionsOpen(false);
  };

  // Get current delivery status
  const getCurrentDeliveryStatus = () => {
    const currentDelivery = selectedDelivery || delivery;
    const deliveryItem = deliveryList.find(d => d.delivery === currentDelivery);
    return deliveryItem?.status || 'Packing completed';
  };

  const currentStatus = getCurrentDeliveryStatus();

  // Determine button states based on current status
  const isStagingDisabled = currentStatus !== 'Packing completed';
  const isLoadingDisabled = currentStatus !== 'Staging completed';
  const isPGIDisabled = currentStatus !== 'Loading completed';

  // Filter delivery list based on onlyOpenDeliveries flag
  const filteredDeliveryList = onlyOpenDeliveries 
    ? deliveryList.filter(item => item.status !== 'PGI Completed')
    : deliveryList;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <div className="flex-1 p-6 overflow-auto">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-6">
            {/* Show delivery list when only 'from' is provided */}
            {from && !delivery && !order && (
              <div className="w-56 flex-shrink-0">
                <Card className="border">
                  <div className="p-2">
                    <h3 className="mb-2 text-sm">Deliveries from {from}</h3>
                    <ScrollArea className="h-[600px]">
                      <div>
                        {filteredDeliveryList.map((item) => (
                          <div
                            key={item.delivery}
                            onClick={() => handleDeliverySelect(item)}
                            className={`grid grid-cols-2 gap-1 p-1.5 border-b cursor-pointer hover:bg-blue-50 transition-colors ${
                              selectedDelivery === item.delivery ? 'bg-blue-100 font-semibold' : ''
                            }`}
                          >
                            <span className="text-xs">{item.delivery}</span>
                            <span className={`text-[10px] leading-tight ${
                              item.status === 'PGI Completed' ? 'text-green-700' : 
                              item.status === 'Loading completed' ? 'text-blue-700' : 
                              item.status === 'Staging completed' ? 'text-amber-700' :
                              'text-gray-700'
                            }`}>{item.status}</span>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>
                </Card>
              </div>
            )}

            {/* Main content area */}
            <div className="flex-1">
          {/* Top Section - Delivery Info and Status */}
          <div className="grid grid-cols-3 gap-6 mb-6">
            {/* Left Column - Delivery Info and Additional Information */}
            <div className="col-span-2 space-y-4">
              {/* Delivery and Order Info */}
              <div className="bg-white p-4 rounded-lg border">
                <div className="grid grid-cols-2 gap-4">
                  <p className="text-muted-foreground">
                    <span className="underline">Delivery #:</span> {selectedDelivery || delivery || '114215321'}
                  </p>
                  <p className="text-muted-foreground">
                    <span className="underline">Order #:</span> {selectedOrder || order || '4500123456'}
                  </p>
                </div>
                <div className="mt-3">
                  <p className="text-muted-foreground">
                    <span className="underline">Transportation Unit / Truck:</span> 12141541
                  </p>
                </div>
              </div>

              {/* Additional Information Panel */}
              <Card className="border">
                <div className="p-4">
                  <h3 className="mb-4">Additional Information</h3>
                  <div className="space-y-3">
                    <div>
                      <span className="text-muted-foreground">Seal #:</span> SL-2024-001234
                    </div>
                    <div className="pt-3 border-t">
                      <div className="text-sm mb-1">Truck Load Details</div>
                      <div className="text-sm text-muted-foreground">85 Kg | 3 Pallets</div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Right Column - Status */}
            <div className="bg-white p-6 rounded-lg border relative">
              <div className="absolute top-2 right-2">
                <ArrowUp className="h-6 w-6" />
              </div>
              <h3 className="mb-6 text-center underline">STATUS</h3>
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-8 w-8 text-green-600 flex-shrink-0" />
                  <span>Gateway</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-8 w-8 text-green-600 flex-shrink-0" />
                  <span>Broker</span>
                </div>
              </div>
            </div>
          </div>

          {/* Middle Section - Action Buttons */}
          <div className="grid grid-cols-5 gap-4 mb-6">
            <Button
              onClick={handleSpecialInstructions}
              className="bg-[#0854A0] hover:bg-[#064173] text-xs"
            >
              <FileText className="mr-1 h-3 w-3" />
              Special Instructions
            </Button>
            <Button
              onClick={() => setHuListDialogOpen(true)}
              className="bg-[#0854A0] hover:bg-[#064173] text-xs"
            >
              Show HU list
            </Button>
            <Button
              onClick={() => toast.info('Opening value chain monitor')}
              className="bg-[#0854A0] hover:bg-[#064173] text-xs"
            >
              Monitor Value Chain
            </Button>
            <Select value={selectedPrintForm} onValueChange={setSelectedPrintForm}>
              <SelectTrigger className="bg-white text-xs">
                <SelectValue placeholder="Select Print Form" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Packing list">Packing list</SelectItem>
                <SelectItem value="Delivery note">Delivery note</SelectItem>
                <SelectItem value="Invoice">Invoice</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex gap-2">
              <Button
                onClick={handlePrint}
                className="bg-[#0854A0] hover:bg-[#064173] flex-1 text-xs"
                disabled={currentStatus === 'Packing completed'}
              >
                <Printer className="mr-1 h-3 w-3" />
                Print
              </Button>
              <Button
                onClick={handleRefresh}
                className="bg-[#0854A0] hover:bg-[#064173] flex-1 text-xs"
              >
                <RefreshCw className="mr-1 h-3 w-3" />
                Refresh
              </Button>
            </div>
          </div>

          {/* Bottom Action Buttons */}
          <div className="bg-[#5A9FD4] p-4 rounded-lg flex justify-between items-center">
            <Button
              onClick={onChangeSelection || onCancel}
              className="bg-[#0854A0] hover:bg-[#064173] text-xs"
            >
              Change Selection
            </Button>
            <div className="flex gap-4">
              <Button
                onClick={handlePerformStaging}
                className="bg-[#FFD700] hover:bg-[#FFA500] text-black text-xs"
                disabled={isStagingDisabled}
              >
                Perform Staging
              </Button>
              <Button
                onClick={handlePerformLoad}
                className="bg-[#6B8E23] hover:bg-[#556B1F] text-xs"
                disabled={isLoadingDisabled}
              >
                Perform Load
              </Button>
              <Button
                onClick={handleCheckAndPGI}
                className="bg-[#556B1F] hover:bg-[#3D4E16] text-xs"
                disabled={isPGIDisabled}
              >
                Check and PGI
              </Button>
            </div>
          </div>
            </div>
          </div>
        </div>
      </div>

      <HUListDialog
        open={huListDialogOpen}
        onOpenChange={setHuListDialogOpen}
        delivery={selectedDelivery || delivery || '114215321'}
      />

      {/* Special Instructions Dialog */}
      <Dialog open={specialInstructionsOpen} onOpenChange={setSpecialInstructionsOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Special Instructions Framework</DialogTitle>
            <DialogDescription>
              Please review the special instructions for this delivery.
            </DialogDescription>
          </DialogHeader>
          
          <ScrollArea className="max-h-[60vh]">
            <div className="space-y-6 pr-4">
              <div className="border rounded-lg p-4 bg-amber-50">
                <div className="flex items-start gap-2 mb-3">
                  <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-amber-900">Delivery: {selectedDelivery || delivery || '114215321'}</h4>
                  </div>
                </div>
                
                <ul className="space-y-2 ml-7">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-700 mt-1">•</span>
                    <span className="text-amber-900">Do Not Stack Pallets</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-700 mt-1">•</span>
                    <span className="text-amber-900">Ensure Form 1234 Is signed by driver</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-700 mt-1">•</span>
                    <span className="text-amber-900">Handle with care - fragile contents</span>
                  </li>
                </ul>
              </div>
            </div>
          </ScrollArea>

          <div className="flex justify-center pt-4">
            <Button
              onClick={handleAcknowledgeInstructions}
              className="bg-[#0854A0] hover:bg-[#064173] px-8"
            >
              Acknowledge
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Staging Confirmation Dialog */}
      <Dialog open={stagingDialogOpen} onOpenChange={setStagingDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Staging Confirmation</DialogTitle>
            <DialogDescription>
              Confirm that the delivery has been staged to the goods issue zone.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-center">
              The delivery <span className="font-semibold">{selectedDelivery || delivery || '114215321'}</span> is staged to Goods issue zone
            </p>
          </div>
          <div className="flex justify-center">
            <Button
              onClick={handleStagingConfirm}
              className="bg-[#0854A0] hover:bg-[#064173] px-8"
            >
              OK
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}