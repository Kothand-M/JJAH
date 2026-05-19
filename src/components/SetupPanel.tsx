import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Plus, Package, CheckCircle, Search } from 'lucide-react';
import { useState } from 'react';

interface SetupPanelProps {
  onSearch?: (criteria: SearchCriteria) => void;
}

export interface SearchCriteria {
  fromWarehouse: string;
  toWarehouse: string;
}

export function SetupPanel({ onSearch }: SetupPanelProps) {
  const [fromWarehouse, setFromWarehouse] = useState<string>('');
  const [toWarehouse, setToWarehouse] = useState<string>('');

  const handleSearch = () => {
    if (onSearch) {
      onSearch({
        fromWarehouse,
        toWarehouse
      });
    }
  };
  return (
    <Card className="h-fit">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm">Setup Pallet</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs mb-1">From</label>
            <Select onValueChange={setFromWarehouse} value={fromWarehouse}>
              <SelectTrigger className="h-8 text-xs">
                <SelectValue placeholder="Select warehouse" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="wh001">Warehouse 001</SelectItem>
                <SelectItem value="wh002">Warehouse 002</SelectItem>
                <SelectItem value="wh003">Warehouse 003</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-xs mb-1">To</label>
            <Select onValueChange={setToWarehouse} value={toWarehouse}>
              <SelectTrigger className="h-8 text-xs">
                <SelectValue placeholder="Select warehouse" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="wh004">Warehouse 004</SelectItem>
                <SelectItem value="wh005">Warehouse 005</SelectItem>
                <SelectItem value="wh006">Warehouse 006</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Button size="sm" className="h-8 text-xs bg-[#0073e6] hover:bg-[#005bb5]">
            <Plus className="w-3 h-3 mr-1" />
            New Pallet
          </Button>
          <Button size="sm" variant="outline" className="h-8 text-xs">
            Add to Pallet
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Button size="sm" className="h-8 text-xs bg-[#0073e6] hover:bg-[#005bb5]">
            <Package className="w-3 h-3 mr-1" />
            Build & Add Box
          </Button>
          <Button size="sm" className="h-8 text-xs bg-green-600 hover:bg-green-700">
            <CheckCircle className="w-3 h-3 mr-1" />
            Verify
          </Button>
        </div>

        <div className="border-t pt-4">
          <Button 
            size="sm" 
            className="w-full h-8 text-xs bg-[#0073e6] hover:bg-[#005bb5]"
            onClick={handleSearch}
            disabled={!fromWarehouse || !toWarehouse}
          >
            <Search className="w-3 h-3 mr-1" />
            Search Handling Units
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}