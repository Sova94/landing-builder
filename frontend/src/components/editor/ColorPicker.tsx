import React, { useState } from 'react';
import { cn } from '@utils/cn';
import { Input } from '@components/common/Input';

interface ColorPickerProps {
  label: string;
  value: string;
  onChange: (color: string) => void;
  className?: string;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({
  label,
  value,
  onChange,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const presetColors = [
    '#000000', '#FFFFFF', '#F5F5F5', '#E5E5E5',
    '#DC2626', '#EA580C', '#D97706', '#65A30D',
    '#16A34A', '#059669', '#0891B2', '#2563EB',
    '#4F46E5', '#7C3AED', '#DB2777', '#9D174D',
  ];

  return (
    <div className={cn('color-picker space-y-2', className)}>
      <label className="text-sm font-medium text-gray-700 capitalize">
        {label}
      </label>
      
      <div className="flex items-center gap-2">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-10 h-10 rounded-lg border border-gray-200 overflow-hidden"
          style={{ backgroundColor: value }}
        />
        
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1"
          placeholder="#000000"
        />
      </div>

      {/* Пресеты цветов */}
      {isOpen && (
        <div className="grid grid-cols-8 gap-1 p-2 bg-white border border-gray-200 rounded-lg shadow-lg">
          {presetColors.map((color) => (
            <button
              key={color}
              onClick={() => {
                onChange(color);
                setIsOpen(false);
              }}
              className="w-6 h-6 rounded border border-gray-200 hover:scale-110 transition-transform"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      )}
    </div>
  );
};
