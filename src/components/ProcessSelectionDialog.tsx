import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { useState, useEffect } from 'react';
import { toast } from 'sonner@2.0.3';

export interface GuidedPackingCriteria {
  from: string;
  workCenter: string;
  storageBin: string;
  to: string;
}

export type ProcessType = 'push' | 'pull' | 'departure' | 'sterilization' | '';

export interface SterilizationCriteria extends GuidedPackingCriteria {
  stoNumber: string;
}

interface ProcessSelectionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onProceedPush: (criteria: GuidedPackingCriteria) => void;
  onProceedPull: (handlingUnit: string, order: string, delivery: string) => void;
  onProceedDeparture: (order: string, delivery: string, from: string, onlyOpenDeliveries: boolean) => void;
  onProceedSterilization: (criteria: SterilizationCriteria) => void;
}

export function ProcessSelectionDialog({
  open,
  onOpenChange,
  onProceedPush,
  onProceedPull,
  onProceedDeparture,
  onProceedSterilization
}: ProcessSelectionDialogProps) {
  const [processType, setProcessType] = useState<ProcessType>('');

  // Push process fields
  const [from, setFrom] = useState('DePuy - Costa Rica');
  const [workCenter, setWorkCenter] = useState('');
  const [storageBin, setStorageBin] = useState('');
  const [to, setTo] = useState('');

  // Pull - Pack from Pick fields
  const [handlingUnit, setHandlingUnit] = useState('');
  const [pullOrder, setPullOrder] = useState('');
  const [pullDelivery, setPullDelivery] = useState('');

  // Departure fields
  const [departureOrder, setDepartureOrder] = useState('');
  const [departureDelivery, setDepartureDelivery] = useState('');
  const [departureFrom, setDepartureFrom] = useState('');
  const [onlyOpenDeliveries, setOnlyOpenDeliveries] = useState(true);

  // Sterilization additional field
  const [stoNumber, setStoNumber] = useState('');

  // Get "To" options based on "From" selection
  const getToOptions = () => {
    switch (from) {
      case 'DePuy - Costa Rica':
        return ['3PL DePuy Segex', 'Courcelles', 'Mooresville'];
      case '3PL Segex DPS':
        return ['DePuy - Costa Rica', 'Courcelles', 'Mooresville'];
      case 'EP - Costa Rica':
        return ['3PL Segex EP', 'Courcelles', 'Japan', 'China', 'Memphis'];
      case '3PL Segex EP':
        return ['EP-Costa Rica', 'Courcelles', 'Japan', 'China', 'Memphis'];
      default:
        return [];
    }
  };

  // Reset "To" field when "From" changes
  useEffect(() => {
    setTo('');
  }, [from]);

  const handleProceed = () => {
    if (!processType) {
      toast.error('Please select a process type');
      return;
    }

    if (processType === 'push') {
      if (!from || !workCenter || !to) {
        toast.error('Please fill in all mandatory fields (From, Work Center, and To)');
        return;
      }
      onProceedPush({ from, workCenter, storageBin, to });
      onOpenChange(false);
    } else if (processType === 'pull') {
      if (!handlingUnit && !pullOrder && !pullDelivery) {
        toast.error('Please enter at least one field');
        return;
      }
      onProceedPull(handlingUnit, pullOrder, pullDelivery);
      onOpenChange(false);
    } else if (processType === 'departure') {
      if (!departureFrom) {
        toast.error('Please select From location');
        return;
      }
      onProceedDeparture(departureOrder, departureDelivery, departureFrom, onlyOpenDeliveries);
      onOpenChange(false);
    } else if (processType === 'sterilization') {
      if (!from || !workCenter || !to) {
        toast.error('Please fill in all mandatory fields (From, Work Center, and To)');
        return;
      }
      if (!stoNumber) {
        toast.error('Please enter the STO Number');
        return;
      }
      onProceedSterilization({ from, workCenter, storageBin, to, stoNumber });
      onOpenChange(false);
    }
  };

  const resetFields = () => {
    setProcessType('');
    setFrom('DePuy - Costa Rica');
    setWorkCenter('');
    setStorageBin('');
    setTo('');
    setHandlingUnit('');
    setPullOrder('');
    setPullDelivery('');
    setDepartureOrder('');
    setDepartureDelivery('');
    setDepartureFrom('');
    setOnlyOpenDeliveries(true);
    setStoNumber('');
  };

  return (
    <Dialog open={open} onOpenChange={(open) => {
      onOpenChange(open);
      if (!open) {
        resetFields();
      }
    }}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>JJAH Guided Packing</DialogTitle>
          <DialogDescription>
            Select a process type and enter the required information
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Process Type Selection */}
          <div>
            <Label>
              Process Type <span className="text-red-500">*</span>
            </Label>
            <Select value={processType} onValueChange={(value) => setProcessType(value as ProcessType)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Process Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="push">Push process</SelectItem>
                <SelectItem value="pull">Pull - Pack from Pick</SelectItem>
                <SelectItem value="departure">Departure</SelectItem>
                <SelectItem value="sterilization">Sterilization</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Push Process Fields */}
          {processType === 'push' && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>
                  From <span className="text-red-500">*</span>
                </Label>
                <Select value={from} onValueChange={setFrom}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select From" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="DePuy - Costa Rica">DePuy – Costa Rica</SelectItem>
                    <SelectItem value="3PL Segex DPS">3PL Segex DPS</SelectItem>
                    <SelectItem value="EP - Costa Rica">EP – Costa Rica</SelectItem>
                    <SelectItem value="3PL Segex EP">3PL Segex EP</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>
                  Work center <span className="text-red-500">*</span>
                </Label>
                <Select value={workCenter} onValueChange={setWorkCenter}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Work Center" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pack 1">Pack 1</SelectItem>
                    <SelectItem value="Pack 2">Pack 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Storage Bin</Label>
                <Input
                  placeholder="Enter Storage Bin"
                  value={storageBin}
                  onChange={(e) => setStorageBin(e.target.value)}
                />
              </div>

              <div>
                <Label>
                  To <span className="text-red-500">*</span>
                </Label>
                <Select value={to} onValueChange={setTo}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select To" />
                  </SelectTrigger>
                  <SelectContent>
                    {getToOptions().map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* Pull - Pack from Pick Fields */}
          {processType === 'pull' && (
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label>Delivery</Label>
                <Input
                  placeholder="Enter Delivery"
                  value={pullDelivery}
                  onChange={(e) => setPullDelivery(e.target.value)}
                  maxLength={12}
                />
              </div>

              <div>
                <Label>Order</Label>
                <Input
                  placeholder="Enter Order"
                  value={pullOrder}
                  onChange={(e) => setPullOrder(e.target.value)}
                  maxLength={12}
                />
              </div>

              <div>
                <Label>Handling Unit</Label>
                <Input
                  placeholder="Scan/Enter Handling unit"
                  value={handlingUnit}
                  onChange={(e) => setHandlingUnit(e.target.value)}
                  maxLength={20}
                />
              </div>
            </div>
          )}

          {/* Sterilization Fields - same as Push + STO Number */}
          {processType === 'sterilization' && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>
                  From <span className="text-red-500">*</span>
                </Label>
                <Select value={from} onValueChange={setFrom}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select From" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="DePuy - Costa Rica">DePuy – Costa Rica</SelectItem>
                    <SelectItem value="3PL Segex DPS">3PL Segex DPS</SelectItem>
                    <SelectItem value="EP - Costa Rica">EP – Costa Rica</SelectItem>
                    <SelectItem value="3PL Segex EP">3PL Segex EP</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>
                  Work center <span className="text-red-500">*</span>
                </Label>
                <Select value={workCenter} onValueChange={setWorkCenter}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Work Center" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pack 1">Pack 1</SelectItem>
                    <SelectItem value="Pack 2">Pack 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Storage Bin</Label>
                <Input
                  placeholder="Enter Storage Bin"
                  value={storageBin}
                  onChange={(e) => setStorageBin(e.target.value)}
                />
              </div>

              <div>
                <Label>
                  To <span className="text-red-500">*</span>
                </Label>
                <Select value={to} onValueChange={setTo}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select To" />
                  </SelectTrigger>
                  <SelectContent>
                    {getToOptions().map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="col-span-2">
                <Label>
                  STO Number <span className="text-red-500">*</span>
                </Label>
                <Input
                  placeholder="Enter STO Number"
                  value={stoNumber}
                  onChange={(e) => setStoNumber(e.target.value)}
                  maxLength={20}
                />
              </div>
            </div>
          )}

          {/* Departure Fields */}
          {processType === 'departure' && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>
                  From <span className="text-red-500">*</span>
                </Label>
                <Select value={departureFrom} onValueChange={setDepartureFrom}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select From" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="DPS - Costa Rica">DPS - Costa Rica</SelectItem>
                    <SelectItem value="EP - Costa Rica">EP - Costa Rica</SelectItem>
                    <SelectItem value="DPS - Segex 3PL">DPS - Segex 3PL</SelectItem>
                    <SelectItem value="EP - Segex 3PL">EP - Segex 3PL</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div></div>

              <div>
                <Label>Delivery (Optional)</Label>
                <Input
                  placeholder="Enter Delivery (Optional)"
                  value={departureDelivery}
                  onChange={(e) => setDepartureDelivery(e.target.value)}
                  maxLength={12}
                />
              </div>

              <div>
                <Label>Order (Optional)</Label>
                <Input
                  placeholder="Enter Order (Optional)"
                  value={departureOrder}
                  onChange={(e) => setDepartureOrder(e.target.value)}
                  maxLength={12}
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="onlyOpenDeliveries"
                  className="h-4 w-4 rounded border-gray-300 cursor-not-allowed opacity-60"
                  checked={onlyOpenDeliveries}
                  disabled
                />
                <Label htmlFor="onlyOpenDeliveries" className="cursor-default">
                  Only open deliveries if delivery / order is not given
                </Label>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end">
          <Button
            onClick={handleProceed}
            className="bg-[#0854A0] hover:bg-[#064173]"
          >
            Proceed
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}