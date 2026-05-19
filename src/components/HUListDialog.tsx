import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { ChevronDown, ChevronRight, Package, Box } from 'lucide-react';
import { Button } from './ui/button';
import { useState } from 'react';
import { ScrollArea } from './ui/scroll-area';

interface HandlingUnit {
  id: string;
  type: 'pallet' | 'box';
  children?: HandlingUnit[];
}

interface HUListDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  delivery: string;
}

export function HUListDialog({ open, onOpenChange, delivery }: HUListDialogProps) {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set(['1231451251']));

  // Mock data structure for handling units
  const handlingUnitsData: HandlingUnit[] = [
    {
      id: '1231451251',
      type: 'pallet',
      children: [
        { id: '1241525141', type: 'box' },
        { id: '1241521114', type: 'box' },
        { id: '1212141324', type: 'box' }
      ]
    },
    {
      id: '1531451291',
      type: 'pallet',
      children: [
        { id: '1541525181', type: 'box' },
        { id: '1541521194', type: 'box' }
      ]
    },
    {
      id: '1631451231',
      type: 'pallet',
      children: [
        { id: '1641525121', type: 'box' }
      ]
    }
  ];

  const toggleExpand = (id: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  const renderHU = (hu: HandlingUnit, level: number = 0) => {
    const isExpanded = expandedItems.has(hu.id);
    const hasChildren = hu.children && hu.children.length > 0;

    return (
      <div key={hu.id}>
        <div 
          className="flex items-center py-2 px-2 hover:bg-gray-50"
          style={{ paddingLeft: `${8 + level * 24}px` }}
        >
          {hasChildren ? (
            <Button
              variant="ghost"
              size="sm"
              className="w-5 h-5 p-0 mr-2"
              onClick={() => toggleExpand(hu.id)}
            >
              {isExpanded ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </Button>
          ) : (
            <div className="w-5 mr-2" />
          )}
          
          <div className="flex items-center flex-1">
            <div className="w-5 h-5 mr-2 flex items-center justify-center">
              {hu.type === 'pallet' ? (
                <Package className="w-4 h-4 text-blue-600" />
              ) : (
                <Box className="w-4 h-4 text-gray-600" />
              )}
            </div>
            
            <span>{hu.id}</span>
            <span className="text-muted-foreground ml-2">
              ({hu.type === 'pallet' ? 'Pallet' : 'Box'})
            </span>
          </div>
        </div>
        
        {hasChildren && isExpanded && (
          <div>
            {hu.children!.map(child => renderHU(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>HU List - Delivery #{delivery}</DialogTitle>
          <DialogDescription>
            Hierarchical view of handling units including pallets and their child boxes
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="h-[500px] pr-4">
          <div className="border rounded-lg">
            {handlingUnitsData.map(hu => renderHU(hu))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
