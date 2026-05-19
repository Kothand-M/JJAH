import { Button } from './ui/button';

export function BottomActionPanel() {
  return (
    <div className="bg-white border-t border-border p-3 flex items-center justify-between">
      <div className="flex items-center">
        <span className="text-sm text-muted-foreground">Draft saved</span>
      </div>
      
      <div className="flex items-center gap-2">
        <Button 
          size="sm" 
          className="h-8 text-sm bg-blue-600 hover:bg-blue-700 text-white"
        >
          Save
        </Button>
        <Button 
          size="sm" 
          variant="outline" 
          className="h-8 text-sm border-blue-600 text-blue-600 hover:bg-blue-50"
        >
          Simulate
        </Button>
        <Button 
          size="sm" 
          className="h-8 text-sm bg-orange-600 hover:bg-orange-700 text-white"
        >
          Confirm Pack
        </Button>
      </div>
    </div>
  );
}