import React, { useState } from 'react';
import type { WidgetData, WidgetType } from '@store/editorStore';
import { Play, X } from 'lucide-react';

interface VideoWidgetProps {
  widget: WidgetData;
}

export const VideoWidget: React.FC<VideoWidgetProps> = ({ widget }) => {
  const { content, style } = widget;
  const videoUrl = content.videoUrl || '';
  const thumbnail = content.thumbnail || '';
  const autoplay = content.autoplay || false;
  const muted = content.muted !== false;
  const showControls = content.showControls !== false;
  const aspectRatio = content.aspectRatio || '16/9';
  const borderRadius = content.borderRadius || 0;

  const [isPlaying, setIsPlaying] = useState(false);

  const aspectRatioStyles: Record<string, string> = {
    '16/9': 'aspect-video',
    '4/3': 'aspect-[4/3]',
    '21/9': 'aspect-[21/9]',
    '1/1': 'aspect-square',
    '9/16': 'aspect-[9/16]',
  };

  const getYoutubeId = (url: string) => {
    const match = url.match(/(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/);
    return match ? match[1] : null;
  };

  const youtubeId = getYoutubeId(videoUrl);
  const isYoutube = !!youtubeId;

  return (
    <div
      className="w-full"
      style={style}
      data-widget-id={widget.id}
      data-widget-type={widget.type}
    >
      <div
        className={`relative ${aspectRatioStyles[aspectRatio] || 'aspect-video'} bg-black rounded-lg overflow-hidden`}
        style={{ borderRadius: `${borderRadius}px` }}
      >
        {isPlaying && isYoutube ? (
          <iframe
            src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        ) : isPlaying ? (
          <video
            src={videoUrl}
            autoPlay={autoplay}
            muted={muted}
            controls={showControls}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <>
            {/* Превью */}
            {thumbnail ? (
              <img
                src={thumbnail}
                alt="Video thumbnail"
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : isYoutube ? (
              <img
                src={`https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`}
                alt="Video thumbnail"
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                <Play className="w-20 h-20 text-white/50" />
              </div>
            )}

            {/* Затемнение */}
            <div className="absolute inset-0 bg-black/30" />

            {/* Кнопка Play */}
            <button
              className="absolute inset-0 flex items-center justify-center group"
              onClick={() => setIsPlaying(true)}
            >
              <div className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform shadow-xl">
                <Play className="w-8 h-8 text-gray-900 ml-1" />
              </div>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export const videoWidgetConfig = {
  type: 'video' as WidgetType,
  name: 'Видео',
  icon: 'Video',
  category: 'Медиа',
  defaultData: {
    id: '',
    type: 'video' as WidgetType,
    name: 'Видео',
    content: {
      videoUrl: '',
      thumbnail: '',
      autoplay: false,
      muted: true,
      showControls: true,
      aspectRatio: '16/9',
      borderRadius: 8,
    },
    style: {},
    isVisible: {
      desktop: true,
      tablet: true,
      mobile: true,
    },
    position: {
      x: 50,
      y: 50,
      width: 800,
      height: 450,
      zIndex: 1,
    },
    layout: 'absolute',
  },
  settingsSchema: {
    content: {
      videoUrl: { type: 'url', label: 'URL видео (YouTube или файл)' },
      thumbnail: { type: 'image', label: 'Превью' },
      autoplay: { type: 'boolean', label: 'Автовоспроизведение' },
      muted: { type: 'boolean', label: 'Без звука' },
      showControls: { type: 'boolean', label: 'Показывать контролы' },
      aspectRatio: {
        type: 'select',
        label: 'Пропорции',
        options: [
          { value: '16/9', label: '16:9 (Стандарт)' },
          { value: '4/3', label: '4:3' },
          { value: '21/9', label: '21:9 (Широкий)' },
          { value: '1/1', label: '1:1 (Квадрат)' },
          { value: '9/16', label: '9:16 (Stories)' },
        ],
      },
      borderRadius: { type: 'number', label: 'Скругление (px)' },
    },
  },
};
