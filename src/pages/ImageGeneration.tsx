import React from 'react';
import { CategoryLayout } from '../components/CategoryLayout';

const imageTools = [
  {
    name: 'DALL-E 3',
    description: 'Create stunning, photorealistic images from text descriptions.',
    image: 'https://images.unsplash.com/photo-1686191128892-3c8f0bd35922',
    rating: 4.9,
    users: '2M+'
  },
  {
    name: 'Midjourney V6',
    description: 'Generate beautiful artistic images with advanced AI technology.',
    image: 'https://images.unsplash.com/photo-1684163761883-6019891f7332',
    rating: 4.8,
    users: '1.5M+'
  },
  {
    name: 'Stable Diffusion XL',
    description: 'Open-source image generation model with exceptional quality.',
    image: 'https://images.unsplash.com/photo-1655635643532-fa9ba2648cbe',
    rating: 4.7,
    users: '1M+'
  }
];

export function ImageGeneration() {
  return (
    <CategoryLayout
      title="Image Generation Tools"
      description="Explore cutting-edge AI tools for creating and editing images."
      tools={imageTools}
    />
  );
}