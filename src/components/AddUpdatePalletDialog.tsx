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
import { Plus, Minus, Check } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';
import { toast } from 'sonner@2.0.3';

interface AddUpdatePalletDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirmPack: (palletHU: string, hus: string[]) => void;
}

export function AddUpdatePalletDialog({ open, onOpenChange, onConfirmPack }: AddUpdatePalletDialogProps) {
  const [palletHU, setPalletHU] = useState('');
  const [palletHULoaded, setPalletHULoaded] = useState(false);
  const [shipperBoxHU, setShipperBoxHU] = useState('');
  const [huList, setHuList] = useState<{ id: string; selected: boolean }[]>([]);

  const handleLoadPalletHU = () => {
    if (!palletHU.trim()) {
      toast.error('Please enter a Pallet HU');
      return;
    }

    // Generate random list of HUs for the pallet
    const randomHUs = [
      `SB${Math.floor(Math.random() * 1000000)}`,
      `SB${Math.floor(Math.random() * 1000000)}`,
      `SB${Math.floor(Math.random() * 1000000)}`,
      `SB${Math.floor(Math.random() * 1000000)}`,
      `SB${Math.floor(Math.random() * 1000000)}`,
    ];

    setHuList(randomHUs.map(id => ({ id, selected: false })));
    setPalletHULoaded(true);
    toast.success('Pallet HU loaded successfully');
  };

  const handleAddHU = () => {
    if (!shipperBoxHU.trim()) {
      toast.error('Please enter a Shipper Box HU');
      return;
    }
    
    // Check if HU already exists
    if (huList.some(hu => hu.id === shipperBoxHU)) {
      toast.error('This HU is already in the list');
      return;
    }

    setHuList([...huList, { id: shipperBoxHU, selected: false }]);
    setShipperBoxHU('');
    toast.success('Shipper Box HU added');
  };

  const handleRemoveSelected = () => {
    const removedCount = huList.filter(hu => hu.selected).length;
    setHuList(huList.filter(hu => !hu.selected));
    toast.success(`${removedCount} HU(s) removed`);
  };

  const handleToggleSelect = (id: string) => {
    setHuList(huList.map(hu => 
      hu.id === id ? { ...hu, selected: !hu.selected } : hu
    ));
  };

  const handleConfirmPack = () => {
    if (!palletHU.trim()) {
      toast.error('Please enter Pallet HU');
      return;
    }
    if (huList.length === 0) {
      toast.error('Please add at least one Shipper Box HU');
      return;
    }

    onConfirmPack(palletHU, huList.map(hu => hu.id));
    
    // Reset form
    setPalletHU('');
    setPalletHULoaded(false);
    setShipperBoxHU('');
    setHuList([]);
  };

  const handleSave = () => {
    // Just close the dialog without updating the pallet
    onOpenChange(false);
  };

  const handleDialogOpenChange = (open: boolean) => {
    onOpenChange(open);
    if (!open) {
      // Reset form when dialog closes
      setPalletHU('');
      setPalletHULoaded(false);
      setShipperBoxHU('');
      setHuList([]);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleDialogOpenChange}>
      <DialogContent className="max-w-[95vw] max-h-[95vh] w-[95vw]">
        <DialogHeader>
          <DialogTitle className="text-sm">Add/Update Pallet</DialogTitle>
          <DialogDescription className="text-xs">
            Scan or enter pallet HU to load existing shipper boxes, then add or remove HUs.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-8 py-4">
          {/* Left Side - Input Section */}
          <div className="space-y-8">
            <div className="space-y-3">
              <Label className="text-xs">Pallet HU</Label>
              <div className="flex gap-3">
                <Input
                  placeholder="Scan/Enter Pallet HU"
                  value={palletHU}
                  onChange={(e) => setPalletHU(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !palletHULoaded) {
                      handleLoadPalletHU();
                    }
                  }}
                  className="h-8 text-xs"
                  disabled={palletHULoaded}
                />
                {!palletHULoaded && (
                  <Button
                    onClick={handleLoadPalletHU}
                    size="icon"
                    className="bg-green-600 hover:bg-green-700 flex-shrink-0 h-8 w-8 text-xs"
                  >
                    <Check className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>

            {palletHULoaded && (
              <>
                <div className="space-y-3">
                  <Label className="text-xs">Add Shipper HU(s) to the Pallet HU</Label>
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
              </>
            )}
          </div>

          {/* Right Side - List of HUs */}
          <div className="space-y-3">
            {palletHULoaded && (
              <>
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
                          No HUs in this pallet
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
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
