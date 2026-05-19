import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Search, Settings, Printer, RotateCcw, Split, FileText } from 'lucide-react';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';
import { useState } from 'react';
import { getMaterialsForHU, Material } from '../data/materialsData';
import { isParentHU, getChildHUIds } from '../utils/huUtils';

interface HUContentsProps {
  selectedHU?: string;
  palletChildrenMap?: Record<string, string[]>;
  orderNumber?: string;
  deliveryNumber?: string;
  processType?: string;
}

export function HUContents({ selectedHU = '1241525141', palletChildrenMap = {}, orderNumber = '', deliveryNumber = '', processType = '' }: HUContentsProps) {
  const [isBaseUOM, setIsBaseUOM] = useState(true);

  // Check if it's a parent HU (either predefined or dynamically created)
  const isParent = isParentHU(selectedHU) || !!palletChildrenMap[selectedHU];
  
  // Get child HU IDs
  let childHUs: string[] = [];
  if (isParent) {
    childHUs = palletChildrenMap[selectedHU] || getChildHUIds(selectedHU);
  }
  
  // Get materials for the selected HU
  const materials: Material[] = getMaterialsForHU(selectedHU, childHUs);

  return (
    <Card className="flex-1 h-full flex flex-col">
      <CardHeader className="pb-3 flex-shrink-0">
        {processType === 'pull' && (orderNumber || deliveryNumber) && (
          <div className="flex items-center gap-4 mb-2 text-xs">
            {orderNumber && (
              <div>
                <span className="text-gray-600">Order number: </span>
                <span className="text-blue-600">{orderNumber}</span>
              </div>
            )}
            {deliveryNumber && (
              <div>
                <span className="text-gray-600">Delivery number: </span>
                <span className="text-blue-600">{deliveryNumber}</span>
              </div>
            )}
          </div>
        )}
        <CardTitle className="text-sm mb-3">HU Contents</CardTitle>
        <div className="flex items-center gap-2">
          <span className={`text-xs ${isBaseUOM ? 'text-blue-600' : 'text-gray-500'}`}>
            Base UOM
          </span>
          <Switch
            checked={!isBaseUOM}
            onCheckedChange={(checked) => setIsBaseUOM(!checked)}
            className="h-4 w-8"
          />
          <span className={`text-xs ${!isBaseUOM ? 'text-blue-600' : 'text-gray-500'}`}>
            Warehouse UOM
          </span>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col overflow-hidden">
        <div className="space-y-4 flex-shrink-0">
          <div className="bg-blue-50 p-3 rounded">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-blue-600 text-white rounded flex items-center justify-center text-xs">
                HU
              </div>
              <span className="text-sm">Container - {selectedHU}</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-400" />
                <Input
                  placeholder="Search Type/Scan"
                  className="h-8 text-xs pl-8 w-48"
                />
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Settings className="w-3 h-3" />
              </Button>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Printer className="w-3 h-3" />
              </Button>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <RotateCcw className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-auto border rounded mt-4">
          <Table>
            <TableHeader className="sticky top-0 bg-white z-10">
              <TableRow className="h-8">
                <TableHead className="text-xs p-2">Material</TableHead>
                <TableHead className="text-xs p-2">Description</TableHead>
                <TableHead className="text-xs p-2">Batch</TableHead>
                <TableHead className="text-xs p-2">Quantity</TableHead>
                {isParent && <TableHead className="text-xs p-2">Source HU</TableHead>}
                <TableHead className="text-xs p-2">Tare Weight</TableHead>
                <TableHead className="text-xs p-2">Loading Weight</TableHead>
                <TableHead className="text-xs p-2">Tare Volume</TableHead>
                <TableHead className="text-xs p-2">Loading Volume</TableHead>
                <TableHead className="text-xs p-2">HU Type</TableHead>
                <TableHead className="w-8 p-2"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {materials.map((material, index) => (
                <TableRow key={material.id} className="h-8">
                  <TableCell className="text-xs p-2 text-blue-600">
                    {material.id}
                  </TableCell>
                  <TableCell className="text-xs p-2">{material.description}</TableCell>
                  <TableCell className="text-xs p-2">{material.batch}</TableCell>
                  <TableCell className="text-xs p-2">
                    {isBaseUOM 
                      ? `${material.baseQuantity.value} ${material.baseQuantity.unit}`
                      : `${material.altQuantity.value} ${material.altQuantity.unit}`
                    }
                  </TableCell>
                  {isParent && (
                    <TableCell className="text-xs p-2">
                      <Badge variant="outline" className="text-xs">
                        {material.sourceHU}
                      </Badge>
                    </TableCell>
                  )}
                  <TableCell className="text-xs p-2">{material.tareWeight.toFixed(2)} kg</TableCell>
                  <TableCell className="text-xs p-2">{material.loadingWeight.toFixed(2)} kg</TableCell>
                  <TableCell className="text-xs p-2">{material.tareVolume.toFixed(3)} m³</TableCell>
                  <TableCell className="text-xs p-2">{material.loadingVolume.toFixed(3)} m³</TableCell>
                  <TableCell className="text-xs p-2">{material.huType}</TableCell>
                  <TableCell className="p-2">
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                      <RotateCcw className="w-3 h-3" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex gap-2 mt-4 flex-shrink-0">
        </div>
      </CardContent>
    </Card>
  );
}