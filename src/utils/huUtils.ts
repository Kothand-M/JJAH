// Utility functions for Handling Units

// Define parent HUs that contain child HUs
export const parentHUs = ['1231451251', '1531451291', '1631451231'];

// Check if an HU is a parent HU (contains child HUs)
export function isParentHU(huId: string): boolean {
  return parentHUs.includes(huId);
}

// Get child HU IDs for a parent HU
export function getChildHUIds(parentHuId: string): string[] {
  const childMapping: Record<string, string[]> = {
    '1231451251': ['1241525141', '1241521114', '1212141324'],
    '1531451291': ['1541525181', '1541521194'],
    '1631451231': ['1641525121']
  };
  
  return childMapping[parentHuId] || [];
}

// Get the HU type based on whether it's a parent or child
export function getHUType(huId: string): 'parent' | 'child' {
  return isParentHU(huId) ? 'parent' : 'child';
}