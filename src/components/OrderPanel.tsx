import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Checkbox } from './ui/checkbox';
import { Input } from './ui/input';
import { Label } from './ui/label';

export function OrderPanel() {
  return (
    <Card className="h-fit">
      <CardContent className="pt-6 space-y-4">
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox id="create-order" />
            <Label htmlFor="create-order" className="text-xs">
              Create Order w/ Completion
            </Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox id="pre-book" />
            <Label htmlFor="pre-book" className="text-xs">
              Pre-book in Gateway
            </Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox id="create-add-tu" />
            <Label htmlFor="create-add-tu" className="text-xs">
              Create & Add to TU
            </Label>
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <Label htmlFor="reference-doc" className="text-xs">Reference Document:</Label>
            <Input
              id="reference-doc"
              placeholder="Enter reference document"
              className="h-8 text-xs mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="customs-doc" className="text-xs">Customs Document:</Label>
            <Input
              id="customs-doc"
              placeholder="Enter customs document"
              className="h-8 text-xs mt-1"
            />
          </div>
        </div>

        <div className="text-xs text-orange-600 bg-orange-50 p-2 rounded">
          DUA Required for this "From" Plant
        </div>
      </CardContent>
    </Card>
  );
}