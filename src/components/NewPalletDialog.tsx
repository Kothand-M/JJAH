import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { Plus, Minus } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';

interface NewPalletDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirmPack: (packagingMaterial: string, hus: string[]) => void;
}

export function NewPalletDialog({ open, onOpenChange, onConfirmPack }: NewPalletDialogProps) {
  const [packagingMaterial, setPackagingMaterial] = useState('');
  const [shipperBoxHU, setShipperBoxHU] = useState('');
  const [huList, setHuList] = useState<{ id: string; selected: boolean }[]>([]);

  const handleAddHU = () => {
    if (!shipperBoxHU.trim()) {
      alert('Please enter a Shipper Box HU');
      return;
    }
    
    // Check if HU already exists
    if (huList.some(hu => hu.id === shipperBoxHU)) {
      alert('This HU is already in the list');
      return;
    }

    setHuList([...huList, { id: shipperBoxHU, selected: false }]);
    setShipperBoxHU('');
  };

  const handleRemoveSelected = () => {
    setHuList(huList.filter(hu => !hu.selected));
  };

  const handleToggleSelect = (id: string) => {
    setHuList(huList.map(hu => 
      hu.id === id ? { ...hu, selected: !hu.selected } : hu
    ));
  };

  const handleConfirmPack = () => {
    if (!packagingMaterial.trim()) {
      alert('Please enter packaging material');
      return;
    }
    if (huList.length === 0) {
      alert('Please add at least one Shipper Box HU');
      return;
    }

    onConfirmPack(packagingMaterial, huList.map(hu => hu.id));
    
    // Reset form
    setPackagingMaterial('');
    setShipperBoxHU('');
    setHuList([]);
  };

  const handleSave = () => {
    // Just close the dialog without creating the pallet
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[95vw] max-h-[95vh] w-[95vw]">
        <DialogHeader>
          <DialogTitle className="text-sm">New Pallet</DialogTitle>
          <DialogDescription className="text-xs">
            Add packaging material and shipper box HUs to create a new pallet.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-8 py-4">
          {/* Left Side - Input Section */}
          <div className="space-y-8">
            <div className="space-y-3">
              <Label className="text-xs">Packaging material</Label>
              <Input
                placeholder="Scan / Type packaging material"
                value={packagingMaterial}
                onChange={(e) => setPackagingMaterial(e.target.value)}
                className="h-8 text-xs"
              />
            </div>

            <div className="space-y-3">
              <Label className="text-xs">Add Shipper HU(s) to the New Pallet HU</Label>
              <div className="flex gap-3 mt-2">
                <Input
                  placeholder="Scan/Type Shipper Box HUs"
                  value={shipperBoxHU}
                  onChange={(e) => setShipperBoxHU(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleAddHU();
                    }
                  }}
                  className="h-8 text-xs"
                />
                <Button
                  onClick={handleAddHU}
                  size="icon"
                  className="bg-[#0854A0] hover:bg-[#064173] flex-shrink-0 h-8 w-8 text-xs"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex gap-3 pt-6">
              <Button 
                onClick={handleSave}
                className="bg-blue-600 hover:bg-blue-700 h-8 px-4 text-xs"
              >
                Save
              </Button>
              <Button 
                onClick={handleConfirmPack}
                className="bg-orange-600 hover:bg-orange-700 h-8 px-4 text-xs"
              >
                Confirm Pack
              </Button>
            </div>
          </div>

          {/* Right Side - List of HUs */}
          <div className="space-y-3">
            <Button
              onClick={handleRemoveSelected}
              variant="outline"
              size="sm"
              disabled={!huList.some(hu => hu.selected)}
              className="bg-[#0854A0] text-white hover:bg-[#064173] hover:text-white h-8 text-xs"
            >
              <Minus className="mr-2 h-3 w-3" />
              Remove selected HU(s)
            </Button>

            <div className="border rounded-lg p-6">
              <div className="flex items-center justify-center mb-6">
                <h3 className="text-sm">List of HU(s)</h3>
              </div>

              <ScrollArea className="h-[600px]">
                <div className="space-y-3">
                  {huList.length === 0 ? (
                    <p className="text-muted-foreground text-center py-12 text-xs">
                      No HUs added yet
                    </p>
                  ) : (
                    huList.map((hu) => (
                      <div
                        key={hu.id}
                        className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded border"
                      >
                        <Checkbox
                          checked={hu.selected}
                          onCheckedChange={() => handleToggleSelect(hu.id)}
                          className="h-4 w-4"
                        />
                        <span className="text-gray-700 text-xs">{hu.id}</span>
                      </div>
                    ))
                  )}
                </div>
              </ScrollArea>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}