export interface Material {
  id: string;
  description: string;
  batch: string;
  baseQuantity: { value: number; unit: string };
  altQuantity: { value: number; unit: string };
  sourceHU?: string; // Optional field to track which HU this material comes from
  tareWeight: number; // in kg
  loadingWeight: number; // in kg
  tareVolume: number; // in m³
  loadingVolume: number; // in m³
  huType: string; // e.g., 'Box', 'Pallet', 'Container'
}

// Materials database - maps HU IDs to their materials
export const materialsDatabase: Record<string, Material[]> = {
  // Parent pallet 1231451251 - contains all materials from its children
  '1231451251': [
    // Materials from child HU 1241525141
    {
      id: '1022382001820',
      description: 'Hip Replacement',
      batch: 'ABC123',
      baseQuantity: { value: 25, unit: 'EA' },
      altQuantity: { value: 5, unit: 'Box' },
      sourceHU: '1241525141',
      tareWeight: 2.5,
      loadingWeight: 8.3,
      tareVolume: 0.015,
      loadingVolume: 0.042,
      huType: 'Box'
    },
    {
      id: '1022382002198',
      description: 'Instrument',
      batch: '32145',
      baseQuantity: { value: 4, unit: 'EA' },
      altQuantity: { value: 1, unit: 'Case' },
      sourceHU: '1241525141',
      tareWeight: 1.2,
      loadingWeight: 3.6,
      tareVolume: 0.008,
      loadingVolume: 0.025,
      huType: 'Case'
    },
    // Materials from child HU 1241521114
    {
      id: '2171812837193',
      description: 'Screw',
      batch: '756321',
      baseQuantity: { value: 50, unit: 'EA' },
      altQuantity: { value: 10, unit: 'Pack' },
      sourceHU: '1241521114',
      tareWeight: 0.5,
      loadingWeight: 2.1,
      tareVolume: 0.003,
      loadingVolume: 0.012,
      huType: 'Box'
    },
    {
      id: '3081912947284',
      description: 'Surgical Drill',
      batch: '987654',
      baseQuantity: { value: 2, unit: 'EA' },
      altQuantity: { value: 1, unit: 'Set' },
      sourceHU: '1241521114',
      tareWeight: 1.8,
      loadingWeight: 5.4,
      tareVolume: 0.012,
      loadingVolume: 0.035,
      huType: 'Box'
    },
    // Materials from child HU 1212141324
    {
      id: '4192023058395',
      description: 'Bone Cement',
      batch: '147258',
      baseQuantity: { value: 12, unit: 'EA' },
      altQuantity: { value: 2, unit: 'Case' },
      sourceHU: '1212141324',
      tareWeight: 1.0,
      loadingWeight: 4.2,
      tareVolume: 0.006,
      loadingVolume: 0.018,
      huType: 'Case'
    }
  ],
  
  // Child HU 1241525141
  '1241525141': [
    {
      id: '1022382001820',
      description: 'Hip Replacement',
      batch: 'ABC123',
      baseQuantity: { value: 25, unit: 'EA' },
      altQuantity: { value: 5, unit: 'Box' },
      tareWeight: 2.5,
      loadingWeight: 8.3,
      tareVolume: 0.015,
      loadingVolume: 0.042,
      huType: 'Box'
    },
    {
      id: '1022382002198',
      description: 'Instrument',
      batch: '32145',
      baseQuantity: { value: 4, unit: 'EA' },
      altQuantity: { value: 1, unit: 'Case' },
      tareWeight: 1.2,
      loadingWeight: 3.6,
      tareVolume: 0.008,
      loadingVolume: 0.025,
      huType: 'Case'
    }
  ],
  
  // Child HU 1241521114
  '1241521114': [
    {
      id: '2171812837193',
      description: 'Screw',
      batch: '756321',
      baseQuantity: { value: 50, unit: 'EA' },
      altQuantity: { value: 10, unit: 'Pack' },
      tareWeight: 0.5,
      loadingWeight: 2.1,
      tareVolume: 0.003,
      loadingVolume: 0.012,
      huType: 'Box'
    },
    {
      id: '3081912947284',
      description: 'Surgical Drill',
      batch: '987654',
      baseQuantity: { value: 2, unit: 'EA' },
      altQuantity: { value: 1, unit: 'Set' },
      tareWeight: 1.8,
      loadingWeight: 5.4,
      tareVolume: 0.012,
      loadingVolume: 0.035,
      huType: 'Box'
    }
  ],
  
  // Child HU 1212141324
  '1212141324': [
    {
      id: '4192023058395',
      description: 'Bone Cement',
      batch: '147258',
      baseQuantity: { value: 12, unit: 'EA' },
      altQuantity: { value: 2, unit: 'Case' },
      tareWeight: 1.0,
      loadingWeight: 4.2,
      tareVolume: 0.006,
      loadingVolume: 0.018,
      huType: 'Case'
    }
  ],
  
  // Parent pallet 1531451291
  '1531451291': [
    // Materials from child HU 1541525181
    {
      id: '5203134169406',
      description: 'Surgical Suture',
      batch: 'SUT001',
      baseQuantity: { value: 100, unit: 'EA' },
      altQuantity: { value: 20, unit: 'Pack' },
      sourceHU: '1541525181',
      tareWeight: 0.8,
      loadingWeight: 3.2,
      tareVolume: 0.005,
      loadingVolume: 0.015,
      huType: 'Box'
    },
    {
      id: '6314245270517',
      description: 'Bandage',
      batch: 'BND002',
      baseQuantity: { value: 200, unit: 'EA' },
      altQuantity: { value: 40, unit: 'Roll' },
      sourceHU: '1541525181',
      tareWeight: 1.5,
      loadingWeight: 6.8,
      tareVolume: 0.010,
      loadingVolume: 0.038,
      huType: 'Box'
    },
    // Materials from child HU 1541521194
    {
      id: '7425356381628',
      description: 'Antiseptic',
      batch: 'ANT003',
      baseQuantity: { value: 24, unit: 'EA' },
      altQuantity: { value: 4, unit: 'Case' },
      sourceHU: '1541521194',
      tareWeight: 1.1,
      loadingWeight: 4.5,
      tareVolume: 0.007,
      loadingVolume: 0.022,
      huType: 'Case'
    }
  ],
  
  // Child HU 1541525181
  '1541525181': [
    {
      id: '5203134169406',
      description: 'Surgical Suture',
      batch: 'SUT001',
      baseQuantity: { value: 100, unit: 'EA' },
      altQuantity: { value: 20, unit: 'Pack' },
      tareWeight: 0.8,
      loadingWeight: 3.2,
      tareVolume: 0.005,
      loadingVolume: 0.015,
      huType: 'Box'
    },
    {
      id: '6314245270517',
      description: 'Bandage',
      batch: 'BND002',
      baseQuantity: { value: 200, unit: 'EA' },
      altQuantity: { value: 40, unit: 'Roll' },
      tareWeight: 1.5,
      loadingWeight: 6.8,
      tareVolume: 0.010,
      loadingVolume: 0.038,
      huType: 'Box'
    }
  ],
  
  // Child HU 1541521194
  '1541521194': [
    {
      id: '7425356381628',
      description: 'Antiseptic',
      batch: 'ANT003',
      baseQuantity: { value: 24, unit: 'EA' },
      altQuantity: { value: 4, unit: 'Case' },
      tareWeight: 1.1,
      loadingWeight: 4.5,
      tareVolume: 0.007,
      loadingVolume: 0.022,
      huType: 'Case'
    }
  ],
  
  // Parent pallet 1631451231
  '1631451231': [
    // Materials from child HU 1641525121
    {
      id: '8536467492739',
      description: 'X-Ray Film',
      batch: 'XRY004',
      baseQuantity: { value: 50, unit: 'EA' },
      altQuantity: { value: 5, unit: 'Box' },
      sourceHU: '1641525121',
      tareWeight: 2.0,
      loadingWeight: 7.5,
      tareVolume: 0.012,
      loadingVolume: 0.045,
      huType: 'Box'
    },
    {
      id: '9647578603840',
      description: 'MRI Contrast',
      batch: 'MRI005',
      baseQuantity: { value: 10, unit: 'EA' },
      altQuantity: { value: 2, unit: 'Vial' },
      sourceHU: '1641525121',
      tareWeight: 0.6,
      loadingWeight: 2.8,
      tareVolume: 0.004,
      loadingVolume: 0.014,
      huType: 'Case'
    }
  ],
  
  // Child HU 1641525121
  '1641525121': [
    {
      id: '8536467492739',
      description: 'X-Ray Film',
      batch: 'XRY004',
      baseQuantity: { value: 50, unit: 'EA' },
      altQuantity: { value: 5, unit: 'Box' },
      tareWeight: 2.0,
      loadingWeight: 7.5,
      tareVolume: 0.012,
      loadingVolume: 0.045,
      huType: 'Box'
    },
    {
      id: '9647578603840',
      description: 'MRI Contrast',
      batch: 'MRI005',
      baseQuantity: { value: 10, unit: 'EA' },
      altQuantity: { value: 2, unit: 'Vial' },
      tareWeight: 0.6,
      loadingWeight: 2.8,
      tareVolume: 0.004,
      loadingVolume: 0.014,
      huType: 'Case'
    }
  ]
};

// Sample materials for dynamically created shipper boxes
function generateMaterialsForShipperBox(shipperBoxId: string): Material[] {
  // Generate random materials for each shipper box
  const materialTypes = [
    { name: 'Medical Device', batch: 'MDV' },
    { name: 'Surgical Tool', batch: 'SRT' },
    { name: 'Implant Component', batch: 'IMP' },
    { name: 'Diagnostic Equipment', batch: 'DGE' },
    { name: 'Sterilization Pack', batch: 'STP' }
  ];
  
  const numMaterials = Math.floor(Math.random() * 3) + 1; // 1-3 materials per box
  const materials: Material[] = [];
  
  for (let i = 0; i < numMaterials; i++) {
    const type = materialTypes[Math.floor(Math.random() * materialTypes.length)];
    const randomId = Math.floor(Math.random() * 900000000 + 100000000);
    const randomBatch = `${type.batch}${Math.floor(Math.random() * 9000 + 1000)}`;
    const baseQty = Math.floor(Math.random() * 50) + 10;
    const altQty = Math.floor(baseQty / 5) + 1;
    
    materials.push({
      id: randomId.toString(),
      description: type.name,
      batch: randomBatch,
      baseQuantity: { value: baseQty, unit: 'EA' },
      altQuantity: { value: altQty, unit: 'Box' },
      tareWeight: Math.random() * 2 + 0.5, // Random weight between 0.5 and 2.5 kg
      loadingWeight: Math.random() * 5 + 2, // Random weight between 2 and 7 kg
      tareVolume: Math.random() * 0.01 + 0.003, // Random volume between 0.003 and 0.013 m³
      loadingVolume: Math.random() * 0.03 + 0.01, // Random volume between 0.01 and 0.04 m³
      huType: 'Box'
    });
  }
  
  return materials;
}

// Cache for dynamically generated materials
const dynamicMaterialsCache: Record<string, Material[]> = {};

// Function to get materials for a specific HU
export function getMaterialsForHU(huId: string, childHUs?: string[]): Material[] {
  // If it's in the database, return it
  if (materialsDatabase[huId]) {
    return materialsDatabase[huId];
  }
  
  // If childHUs are provided, this is a dynamically created parent pallet
  if (childHUs && childHUs.length > 0) {
    const allMaterials: Material[] = [];
    
    for (const childHU of childHUs) {
      // Get or generate materials for each child HU
      let childMaterials: Material[] = [];
      
      if (materialsDatabase[childHU]) {
        childMaterials = materialsDatabase[childHU];
      } else {
        // Generate and cache materials for this child HU
        if (!dynamicMaterialsCache[childHU]) {
          dynamicMaterialsCache[childHU] = generateMaterialsForShipperBox(childHU);
        }
        childMaterials = dynamicMaterialsCache[childHU];
      }
      
      // Add source HU to each material
      const materialsWithSource = childMaterials.map(m => ({
        ...m,
        sourceHU: childHU
      }));
      
      allMaterials.push(...materialsWithSource);
    }
    
    return allMaterials;
  }
  
  // For standalone shipper boxes, generate or use cached materials
  if (!dynamicMaterialsCache[huId]) {
    dynamicMaterialsCache[huId] = generateMaterialsForShipperBox(huId);
  }
  
  return dynamicMaterialsCache[huId];
}