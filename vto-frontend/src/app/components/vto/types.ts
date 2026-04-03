export type VTOType = 'makeup' | 'shoes' | 'earbuds' | 'glasses' | 'hat' | 'tshirt';
export type TrackingState = 'searching' | 'move-closer' | 'detected' | 'poor-lighting';
export type CameraState = 'loading' | 'permission' | 'active' | 'denied' | 'simulated';

export interface VTOVariant {
  id: string;
  label: string;
  color: string;
  secondaryColor?: string;
}

export interface VTOProductData {
  vtoType: VTOType;
  variants: VTOVariant[];
}

export const VTO_VARIANTS: Record<VTOType, VTOVariant[]> = {
  makeup: [
    { id: 'nude', label: 'Nude Beige', color: '#C68642' },
    { id: 'coral', label: 'Coral Kiss', color: '#FF6B5B' },
    { id: 'red', label: 'Ruby Red', color: '#C41E3A' },
    { id: 'pink', label: 'Rose Pink', color: '#E75480' },
    { id: 'berry', label: 'Berry Bliss', color: '#7B2D42' },
    { id: 'mauve', label: 'Mauve', color: '#9C6B7F' },
  ],
  shoes: [
    { id: 'white', label: 'White', color: '#F5F5F5', secondaryColor: '#E0E0E0' },
    { id: 'black', label: 'Black', color: '#1A1A1A', secondaryColor: '#333333' },
    { id: 'navy', label: 'Navy Blue', color: '#003087', secondaryColor: '#0044B3' },
    { id: 'red', label: 'Red', color: '#CC0000', secondaryColor: '#FF3333' },
    { id: 'grey', label: 'Cool Grey', color: '#6B7280', secondaryColor: '#9CA3AF' },
    { id: 'green', label: 'Forest', color: '#2D5016', secondaryColor: '#4A7C20' },
  ],
  earbuds: [
    { id: 'black', label: 'Black', color: '#1A1A1A' },
    { id: 'white', label: 'Pearl White', color: '#E8E8E8' },
    { id: 'blue', label: 'Navy Blue', color: '#0066CC' },
    { id: 'red', label: 'Crimson', color: '#CC0000' },
    { id: 'green', label: 'Teal', color: '#008080' },
    { id: 'gold', label: 'Champagne', color: '#C5A028' },
  ],
  glasses: [
    { id: 'black', label: 'Matte Black', color: '#1A1A1A' },
    { id: 'gold', label: 'Gold', color: '#CFB53B' },
    { id: 'silver', label: 'Silver', color: '#9EA3A8' },
    { id: 'tortoise', label: 'Tortoise', color: '#8B5E3C' },
    { id: 'rosegold', label: 'Rose Gold', color: '#B76E79' },
    { id: 'blue', label: 'Cobalt', color: '#1F4E8C' },
  ],
  hat: [
    { id: 'black', label: 'Black', color: '#1A1A1A' },
    { id: 'beige', label: 'Beige', color: '#C5B8A0' },
    { id: 'navy', label: 'Navy', color: '#003087' },
    { id: 'red', label: 'Red', color: '#CC0000' },
    { id: 'olive', label: 'Olive', color: '#6B7C3C' },
    { id: 'grey', label: 'Heather Grey', color: '#8A8A8A' },
  ],
  tshirt: [
    { id: 'white', label: 'White', color: '#FFFFFF', secondaryColor: '#F3F4F6' },
    { id: 'black', label: 'Black', color: '#111827', secondaryColor: '#374151' },
    { id: 'navy', label: 'Navy', color: '#0B3D91', secondaryColor: '#164A8A' },
    { id: 'red', label: 'Red', color: '#C62828', secondaryColor: '#E53935' },
    { id: 'green', label: 'Forest', color: '#2E7D32', secondaryColor: '#4CAF50' },
    { id: 'grey', label: 'Heather Grey', color: '#9CA3AF', secondaryColor: '#D1D5DB' },
  ],
};
