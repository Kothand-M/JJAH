import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from './ui/dialog';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { AlertCircle } from 'lucide-react';

interface SpecialInstructionsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  palletIds: string[];
  onAcknowledge: (palletIds: string[]) => void;
}

// Mock special instructions data per pallet
const getSpecialInstructions = (palletId: string): string[] => {
  const instructionSets: Record<string, string[]> = {
    '1231451251': [
      'Do not stack pallet',
      'Fragile items - handle with caution',
      'Keep in temperature controlled environment (15-25°C)',
    ],
    '1531451291': [
      'Provide 2 copies of packing list in English and Spanish',
      'Maximum stack height: 2 pallets',
      'Requires inspection before shipping',
    ],
    '1631451231': [
      'Fragile items - caution',
      'This side up - do not tilt',
      'Keep away from moisture',
    ],
  };
  
  return instructionSets[palletId] || [
    'Handle with care',
    'Follow standard shipping procedures',
  ];
};

export function SpecialInstructionsDialog({
  open,
  onOpenChange,
  palletIds,
  onAcknowledge,
}: SpecialInstructionsDialogProps) {
  const handleAcknowledge = () => {
    onAcknowledge(palletIds);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Special Instructions Framework</DialogTitle>
          <DialogDescription>
            Please review and acknowledge the special instructions for the selected pallet(s) before proceeding.
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="max-h-[60vh]">
          <div className="space-y-6 pr-4">
            {palletIds.map((palletId) => (
              <div key={palletId} className="border rounded-lg p-4 bg-amber-50">
                <div className="flex items-start gap-2 mb-3">
                  <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-amber-900">Pallet: {palletId}</h4>
                  </div>
                </div>
                
                <ul className="space-y-2 ml-7">
                  {getSpecialInstructions(palletId).map((instruction, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-amber-700 mt-1">•</span>
                      <span className="text-amber-900">{instruction}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="flex justify-center pt-4">
          <Button
            onClick={handleAcknowledge}
            className="bg-[#0854A0] hover:bg-[#064173] px-8"
          >
            Acknowledge
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
