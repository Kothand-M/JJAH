import { AlertTriangle, X } from 'lucide-react';
import { Button } from './ui/button';
import { Alert, AlertDescription } from './ui/alert';

export function StatusBar() {
  return (
    <div className="bg-gray-50 border-t p-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center text-xs">
              2
            </div>
            <AlertTriangle className="w-4 h-4 text-orange-500" />
            <span className="text-xs">This is a warning message. Please "Simulate" before confirming.</span>
            <Button variant="link" className="h-auto p-0 text-xs text-blue-600">
              Learn More.
            </Button>
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
              <X className="w-3 h-3" />
            </Button>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-600">Draft saved</span>
          <Button size="sm" className="h-8 text-xs bg-blue-600 hover:bg-blue-700">
            Save
          </Button>
          <Button size="sm" variant="outline" className="h-8 text-xs">
            Simulate
          </Button>
          <Button size="sm" className="h-8 text-xs bg-green-600 hover:bg-green-700">
            Confirm Pack
          </Button>
        </div>
      </div>
    </div>
  );
}