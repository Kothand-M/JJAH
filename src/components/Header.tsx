import { Search, Settings, Bell, User, Home, ShoppingCart, Truck, X } from 'lucide-react';
import { Button } from './ui/button';

export function Header() {
  return (
    <header className="bg-[#354a5f] text-white px-4 py-2 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="bg-[#0073e6] px-2 py-1 rounded text-sm font-medium">SAP</div>
          <span className="text-sm">JJ Affiliate Hub - Guided Packing</span>
        </div>
        
        <div className="flex items-center gap-2 ml-8">
          <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
            <Home className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
            <ShoppingCart className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
            <Truck className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="bg-purple-600 px-3 py-1 rounded text-sm">
          1440 x 44 Hug
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
            <Search className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
            <Settings className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
            <Bell className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
            <User className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}