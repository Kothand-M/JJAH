import { Button } from './ui/button';
import { Plus, RefreshCw, Package, Settings, PackageOpen } from 'lucide-react';

interface ActionButtonsPanelProps {
  onBuildAddBox: () => void;
  onNewPallet: () => void;
  onRepackPallet: () => void;
  onAddUpdatePallet: () => void;
  onRefresh: () => void;
  onChange: () => void;
}

export function ActionButtonsPanel({
  onBuildAddBox,
  onNewPallet,
  onRepackPallet,
  onAddUpdatePallet,
  onRefresh,
  onChange,
}: ActionButtonsPanelProps) {
  return (
    <div className="flex gap-2">
      <Button
        onClick={onBuildAddBox}
        className="bg-[#0854A0] hover:bg-[#064173]"
      >
        <Package className="mr-2 h-4 w-4" />
        Build & Add Box
      </Button>

      <Button
        onClick={onNewPallet}
        className="bg-[#0854A0] hover:bg-[#064173]"
      >
        <Plus className="mr-2 h-4 w-4" />
        New Pallet
      </Button>

      <Button
        onClick={onAddUpdatePallet}
        className="bg-[#0854A0] hover:bg-[#064173]"
      >
        <Plus className="mr-2 h-4 w-4" />
        Add/Update Pallet
      </Button>

      <Button
        onClick={onRepackPallet}
        className="bg-[#0854A0] hover:bg-[#064173]"
      >
        <PackageOpen className="mr-2 h-4 w-4" />
        Repack Pallet
      </Button>

      <Button
        onClick={onRefresh}
        className="bg-[#0854A0] hover:bg-[#064173]"
      >
        <RefreshCw className="mr-2 h-4 w-4" />
        Refresh
      </Button>

      <Button
        onClick={onChange}
        variant="outline"
        className="border-[#0854A0] text-[#0854A0] hover:bg-[#0854A0] hover:text-white"
      >
        <Settings className="mr-2 h-4 w-4" />
        Change selection
      </Button>
    </div>
  );
}