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
import { Search } from 'lucide-react';
import { useState } from 'react';

export interface GuidedPackingCriteria {
  from: string;
  workCenter: string;
  storageBin: string;
  to: string;
}

interface GuidedPackingPanelProps {
  onSearchHU: (criteria: GuidedPackingCriteria) => void;
  onSearchOrderDelivery: (order: string, delivery: string) => void;
}

export function GuidedPackingPanel({ onSearchHU, onSearchOrderDelivery }: GuidedPackingPanelProps) {
  const [from, setFrom] = useState('DePuy - Costa Rica');
  const [workCenter, setWorkCenter] = useState('');
  const [storageBin, setStorageBin] = useState('');
  const [to, setTo] = useState('');
  const [order, setOrder] = useState('');
  const [delivery, setDelivery] = useState('');

  const handleSearchHU = () => {
    if (!from || !workCenter || !to) {
      alert('Please fill in all mandatory fields (From, Work Center, and To)');
      return;
    }
    onSearchHU({ from, workCenter, storageBin, to });
  };

  const handleSearchOrderDelivery = () => {
    if (!order && !delivery) {
      alert('Please enter either Order or Delivery');
      return;
    }
    onSearchOrderDelivery(order, delivery);
  };

  return (
    <div className="bg-white border rounded-lg p-6">
      <h2 className="mb-6">JJAH Guided Packing</h2>
      
      <div className="flex gap-8">
        {/* Group 1 - Search Handling Units */}
        <div className="flex-1">
          <div className="grid grid-cols-4 gap-3 mb-4">
            <div>
              <Label>
                From <span className="text-red-500">*</span>
              </Label>
              <Select value={from} onValueChange={setFrom}>
                <SelectTrigger className="w-full max-w-[200px]">
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
                <SelectTrigger className="w-full max-w-[200px]">
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
              <Select value={storageBin} onValueChange={setStorageBin}>
                <SelectTrigger className="w-full max-w-[200px]">
                  <SelectValue placeholder="Select Storage Bin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Repack Bin 1">Repack Bin 1</SelectItem>
                  <SelectItem value="Pack Bin 2">Pack Bin 2</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>
                To <span className="text-red-500">*</span>
              </Label>
              <Select value={to} onValueChange={setTo}>
                <SelectTrigger className="w-full max-w-[200px]">
                  <SelectValue placeholder="Select To" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Memphis">Memphis</SelectItem>
                  <SelectItem value="Japan">Japan</SelectItem>
                  <SelectItem value="China">China</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button 
            onClick={handleSearchHU}
            className="bg-[#0854A0] hover:bg-[#064173]"
          >
            <Search className="mr-2 h-4 w-4" />
            Search HU(s)
          </Button>
        </div>

        {/* Group 2 - Search Order/Delivery */}
        <div className="flex-shrink-0 border-l pl-8">
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div>
              <Label>Order</Label>
              <Input
                placeholder="Enter Order"
                value={order}
                onChange={(e) => setOrder(e.target.value)}
                className="w-[200px]"
              />
            </div>

            <div>
              <Label>Delivery</Label>
              <Input
                placeholder="Enter Delivery"
                value={delivery}
                onChange={(e) => setDelivery(e.target.value)}
                className="w-[200px]"
              />
            </div>
          </div>

          <Button 
            onClick={handleSearchOrderDelivery}
            className="bg-[#0854A0] hover:bg-[#064173]"
          >
            <Search className="mr-2 h-4 w-4" />
            Search
          </Button>
        </div>
      </div>
    </div>
  );
}