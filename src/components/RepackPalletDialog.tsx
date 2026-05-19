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
import { Check } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';
import { toast } from 'sonner@2.0.3';

interface RepackPalletDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirmRepack: (originalPalletHU: string, packagingMaterial: string, hus: string[]) => void;
  palletChildrenMap: Record<string, string[]>;
}

export function RepackPalletDialog({ 
  open, 
  onOpenChange, 
  onConfirmRepack,
  palletChildrenMap 
}: RepackPalletDialogProps) {
  const [palletHU, setPalletHU] = useState('');
  const [palletHULoaded, setPalletHULoaded] = useState(false);
  const [packagingMaterial, setPackagingMaterial] = useState('');
  const [huList, setHuList] = useState<string[]>([]);

  const handleLoadPalletHU = () => {
    if (!palletHU.trim()) {
      toast.error('Please enter a Pallet HU');
      return;
    }

    // Check if the pallet exists in the map
    const childHUs = palletChildrenMap[palletHU];
    
    if (!childHUs || childHUs.length === 0) {
      toast.error('Pallet HU not found or has no shipper boxes');
      return;
    }

    setHuList(childHUs);
    setPalletHULoaded(true);
    toast.success(`Pallet HU loaded with ${childHUs.length} shipper box(es)`);
  };

  const handleConfirmRepack = () => {
    if (!palletHU.trim()) {
      toast.error('Please enter Pallet HU');
      return;
    }
    if (!packagingMaterial.trim()) {
      toast.error('Please enter Packaging Material');
      return;
    }
    if (huList.length === 0) {
      toast.error('No shipper boxes found in the pallet');
      return;
    }

    onConfirmRepack(palletHU, packagingMaterial, huList);
    
    // Reset form
    setPalletHU('');
    setPalletHULoaded(false);
    setPackagingMaterial('');
    setHuList([]);
  };

  const handleDialogOpenChange = (open: boolean) => {
    onOpenChange(open);
    if (!open) {
      // Reset form when dialog closes
      setPalletHU('');
      setPalletHULoaded(false);
      setPackagingMaterial('');
      setHuList([]);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleDialogOpenChange}>
      <DialogContent className="max-w-[95vw] max-h-[95vh] w-[95vw]">
        <DialogHeader>
          <DialogTitle className="text-sm">Repack Pallet</DialogTitle>
          <DialogDescription className="text-xs">
            Scan or enter pallet HU to repack all shipper boxes into a new pallet.
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
                  <Label className="text-xs">Packaging Material</Label>
                  <Input
                    placeholder="Scan/Enter Packaging Material"
                    value={packagingMaterial}
                    onChange={(e) => setPackagingMaterial(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleConfirmRepack();
                      }
                    }}
                    className="h-8 text-xs"
                  />
                </div>

                <div className="flex gap-3 pt-6">
                  <Button 
                    onClick={handleConfirmRepack}
                    className="bg-orange-600 hover:bg-orange-700 h-8 px-4 text-xs"
                  >
                    Confirm Repack
                  </Button>
                </div>
              </>
            )}
          </div>

          {/* Right Side - List of HUs (Read-only) */}
          <div className="space-y-3">
            {palletHULoaded && (
              <div className="border rounded-lg p-6">
                <div className="flex items-center justify-center mb-6">
                  <h3 className="text-sm">List of HU(s) to be repacked</h3>
                </div>

                <ScrollArea className="h-[600px]">
                  <div className="space-y-3">
                    {huList.length === 0 ? (
                      <p className="text-muted-foreground text-center py-12 text-xs">
                        No HUs in this pallet
                      </p>
                    ) : (
                      huList.map((huId) => (
                        <div
                          key={huId}
                          className="flex items-center gap-4 p-3 bg-gray-50 rounded border"
                        >
                          <span className="text-gray-700 text-xs">{huId}</span>
                        </div>
                      ))
                    )}
                  </div>
                </ScrollArea>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
