export interface Pollution {
  titre: string;
  type: string;
  description: string;
  dateObservation: string;
  lieu: string;
  latitude: number;
  longitude: number;
  photoUrl?: string;
}

export const TYPES_POLLUTION = [
  'Plastique',
  'Chimique',
  'Dépôt sauvage',
  'Eau',
  'Air',
  'Autre'
];