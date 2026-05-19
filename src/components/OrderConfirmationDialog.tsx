import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from './ui/dialog';
import { Button } from './ui/button';
import { CheckCircle2 } from 'lucide-react';

interface OrderConfirmationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  orderNumber: string;
  deliveryNumber: string;
  palletCount: number;
  processType: 'push' | 'pull' | 'departure' | 'sterilization' | '';
}

export function OrderConfirmationDialog({
  open,
  onOpenChange,
  orderNumber,
  deliveryNumber,
  palletCount,
  processType,
}: OrderConfirmationDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex justify-center mb-4">
            <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle2 className="h-10 w-10 text-green-600" />
            </div>
          </div>
          <DialogTitle className="text-center">
            {processType === 'pull' ? 'Staging Confirmed' : 'Order Created Successfully'}
          </DialogTitle>
          <DialogDescription className="text-center space-y-3 pt-4">
            {processType === 'pull' ? (
              <>
                <div>
                  <span className="text-foreground">
                    {palletCount} Pallet{palletCount > 1 ? 's' : ''}
                  </span>{' '}
                  staged to staging area
                </div>
                <div className="text-muted-foreground">
                  Staging completed successfully
                </div>
              </>
            ) : (
              <>
                <div>
                  <span className="text-foreground">
                    {palletCount} Pallet{palletCount > 1 ? 's' : ''}
                  </span>{' '}
                  selected for order creation
                </div>
                <div className="text-lg">
                  Order Number:{' '}
                  <span className="text-[#0854A0]">{orderNumber}</span>
                </div>
                <div className="text-lg">
                  Delivery Number:{' '}
                  <span className="text-[#0854A0]">{deliveryNumber}</span>
                </div>
              </>
            )}
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-center pt-4">
          <Button
            onClick={() => onOpenChange(false)}
            className="bg-[#0854A0] hover:bg-[#064173] px-8"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}