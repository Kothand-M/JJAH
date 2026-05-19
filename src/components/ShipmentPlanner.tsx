import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Input } from './ui/input';
import { Calendar } from 'lucide-react';
import { useState } from 'react';

export interface ShipmentCriteria {
  shipCondition: string;
  departureDate: string;
  arrivalDate: string;
}

interface ShipmentPlannerProps {
  onCriteriaChange?: (criteria: ShipmentCriteria) => void;
}

export function ShipmentPlanner({ onCriteriaChange }: ShipmentPlannerProps) {
  const [shipCondition, setShipCondition] = useState<string>('');
  const [departureDate, setDepartureDate] = useState<string>('2026-12-22');
  const [arrivalDate, setArrivalDate] = useState<string>('2026-12-30');

  const handleCriteriaChange = () => {
    if (onCriteriaChange) {
      onCriteriaChange({
        shipCondition,
        departureDate,
        arrivalDate
      });
    }
  };
  return (
    <Card className="h-fit">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm">Shipment Planner</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="block text-xs mb-1">Ship Condition</label>
          <Select onValueChange={(value) => { setShipCondition(value); handleCriteriaChange(); }} value={shipCondition}>
            <SelectTrigger className="h-8 text-xs">
              <SelectValue placeholder="Select condition" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="standard">Standard</SelectItem>
              <SelectItem value="express">Express</SelectItem>
              <SelectItem value="overnight">Overnight</SelectItem>
              <SelectItem value="fragile">Fragile</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-xs mb-1">Departure Date:</label>
          <div className="relative">
            <Input
              type="date"
              value={departureDate}
              onChange={(e) => { setDepartureDate(e.target.value); handleCriteriaChange(); }}
              className="h-8 text-xs pr-8"
            />
            <Calendar className="absolute right-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-400" />
          </div>
        </div>

        <div>
          <label className="block text-xs mb-1">Expected Arrival Date:</label>
          <div className="relative">
            <Input
              type="date"
              value={arrivalDate}
              onChange={(e) => { setArrivalDate(e.target.value); handleCriteriaChange(); }}
              className="h-8 text-xs pr-8"
            />
            <Calendar className="absolute right-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-400" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}