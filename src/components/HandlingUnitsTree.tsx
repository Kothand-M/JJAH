import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { ChevronDown, ChevronRight, Package, Box } from 'lucide-react';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { useState } from 'react';
import { ProcessType } from './ProcessSelectionDialog';

interface HandlingUnit {
  id: string;
  type: 'pallet' | 'box';
  children?: HandlingUnit[];
}

interface HandlingUnitsTreeProps {
  onHUSelect: (huId: string, selected: boolean) => void;
  selectedHU: string;
  pallets: string[];
  selectedPallets: string[];
  palletChildrenMap?: Record<string, string[]>;
  processType?: ProcessType;
  looseBoxes?: string[];
}

export function HandlingUnitsTree({ onHUSelect, selectedHU, pallets, selectedPallets, palletChildrenMap = {}, processType = '', looseBoxes = [] }: HandlingUnitsTreeProps) {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set(['1231451251']));

  // Mock data structure for handling units
  const handlingUnitsData: Record<string, HandlingUnit> = {
    '1231451251': {
      id: '1231451251',
      type: 'pallet',
      children: [
        { id: '1241525141', type: 'box' },
        { id: '1241521114', type: 'box' },
        { id: '1212141324', type: 'box' }
      ]
    },
    '1531451291': {
      id: '1531451291',
      type: 'pallet',
      children: [
        { id: '1541525181', type: 'box' },
        { id: '1541521194', type: 'box' }
      ]
    },
    '1631451231': {
      id: '1631451231',
      type: 'pallet',
      children: [
        { id: '1641525121', type: 'box' }
      ]
    }
  };

  const handlingUnits: HandlingUnit[] = pallets.map(palletId => {
    // Check if it's a predefined HU or a dynamically created one
    if (handlingUnitsData[palletId]) {
      return handlingUnitsData[palletId];
    }
    
    // For dynamically created pallets, get children from palletChildrenMap
    const children = palletChildrenMap[palletId] || [];
    return {
      id: palletId,
      type: 'pallet',
      children: children.map(childId => ({ id: childId, type: 'box' as const }))
    };
  });

  // For Pull process, separate pallets with children and loose boxes
  const palletsWithChildren = handlingUnits.filter(hu => hu.children && hu.children.length > 0);
  const looseBoxHUs: HandlingUnit[] = processType === 'pull' 
    ? looseBoxes.map(id => ({ id, type: 'box' as const }))
    : [];

  const toggleExpand = (id: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  const handleCheckboxChange = (huId: string, checked: boolean) => {
    onHUSelect(huId, checked);
  };

  const renderHU = (hu: HandlingUnit, level: number = 0) => {
    const isExpanded = expandedItems.has(hu.id);
    const isSelected = selectedHU === hu.id;
    const hasChildren = hu.children && hu.children.length > 0;
    const isPallet = hu.type === 'pallet';
    const isChecked = selectedPallets.includes(hu.id);

    return (
      <div key={hu.id}>
        <div 
          className={`flex items-center py-1 px-2 cursor-pointer hover:bg-gray-50 ${
            isSelected ? 'bg-blue-50 border-l-2 border-blue-500' : ''
          }`}
          style={{ paddingLeft: `${8 + level * 16}px` }}
        >
          {isPallet && (
            <Checkbox
              checked={isChecked}
              onCheckedChange={(checked) => handleCheckboxChange(hu.id, checked === true)}
              className="mr-2"
              onClick={(e) => e.stopPropagation()}
            />
          )}
          
          {hasChildren ? (
            <Button
              variant="ghost"
              size="sm"
              className="w-4 h-4 p-0 mr-1"
              onClick={(e) => {
                e.stopPropagation();
                toggleExpand(hu.id);
              }}
            >
              {isExpanded ? (
                <ChevronDown className="w-3 h-3" />
              ) : (
                <ChevronRight className="w-3 h-3" />
              )}
            </Button>
          ) : (
            <div className="w-5" />
          )}
          
          <div 
            className="flex items-center flex-1"
            onClick={() => onHUSelect(hu.id, isChecked)}
          >
            <div className="w-4 h-4 mr-2 flex items-center justify-center">
              {hu.type === 'pallet' ? (
                <Package className="w-3 h-3 text-blue-600" />
              ) : (
                <Box className="w-3 h-3 text-gray-600" />
              )}
            </div>
            
            <span className="text-xs">{hu.id}</span>
            <span className="text-xs text-gray-500 ml-1">
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

  if (processType === 'pull') {
    return (
      <Card className="h-full flex flex-col">
        <CardHeader className="pb-3 flex-shrink-0">
          <CardTitle className="text-sm">Handling Units</CardTitle>
        </CardHeader>
        <CardContent className="p-0 flex-1 overflow-auto">
          {/* Pallets Section */}
          <div className="border-t">
            <div className="bg-gray-100 px-3 py-2 border-b">
              <h4 className="text-xs uppercase text-gray-600">Pallets</h4>
            </div>
            <div>
              {palletsWithChildren.map(hu => renderHU(hu))}
            </div>
          </div>

          {/* Loose Boxes Section */}
          <div className="border-t mt-2">
            <div className="bg-gray-100 px-3 py-2 border-b">
              <h4 className="text-xs uppercase text-gray-600">Loose Boxes</h4>
            </div>
            <div>
              {looseBoxHUs.map(hu => renderHU(hu))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3 flex-shrink-0">
        <CardTitle className="text-sm">Handling Units</CardTitle>
      </CardHeader>
      <CardContent className="p-0 flex-1 overflow-auto">
        <div className="border-t">
          {handlingUnits.map(hu => renderHU(hu))}
        </div>
      </CardContent>
    </Card>
  );
}