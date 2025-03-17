import React from 'react';
import { CategoryLayout } from '../components/CategoryLayout';

const codeTools = [
  {
    name: 'GitHub Copilot',
    description: 'AI-powered code completion tool that helps developers write better code faster.',
    image: 'https://images.unsplash.com/photo-1687186735445-df877226fae9',
    rating: 4.8,
    users: '1M+'
  },
  {
    name: 'Amazon CodeWhisperer',
    description: 'ML-powered service that helps improve developer productivity.',
    image: 'https://images.unsplash.com/photo-1686591994509-51d16087bf05',
    rating: 4.6,
    users: '500K+'
  },
  {
    name: 'Tabnine',
    description: 'AI code completion assistant that helps developers write code faster.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995',
    rating: 4.7,
    users: '750K+'
  }
];

export function CodeGeneration() {
  return (
    <CategoryLayout
      title="Code Generation Tools"
      description="Discover the best AI-powered code generation tools to boost your development productivity."
      tools={codeTools}
    />
  );
}