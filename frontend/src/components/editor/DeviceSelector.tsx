import React from 'react';
import { useEditorStore } from '@store/editorStore';
import { cn } from '@utils/cn';
import { Monitor, Tablet, Smartphone } from 'lucide-react';
import { Button } from '@components/common/Button';
import type { DeviceType } from '@types/index';

const devices: Array<{ type: DeviceType; icon: React.ComponentType<{ className?: string }>; label: string }> = [
  { type: 'desktop', icon: Monitor, label: 'Desktop' },
  { type: 'tablet', icon: Tablet, label: 'Tablet' },
  { type: 'mobile', icon: Smartphone, label: 'Mobile' },
];

export const DeviceSelector: React.FC = () => {
  const { currentDevice, setDevice } = useEditorStore();

  return (
    <div className="device-selector flex items-center gap-2">
      {devices.map(({ type, icon: Icon, label }) => (
        <Button
          key={type}
          variant={currentDevice === type ? 'secondary' : 'ghost'}
          size="icon"
          onClick={() => setDevice(type)}
          title={label}
        >
          <Icon className={cn(
            'w-4 h-4',
            currentDevice === type && 'text-blue-600'
          )} />
        </Button>
      ))}
    </div>
  );
};
