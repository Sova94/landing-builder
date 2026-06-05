import React, { useCallback, useRef, useEffect, useState } from 'react';
import { cn } from '@utils/cn';

interface InlineEditorProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  tagName?: keyof JSX.IntrinsicElements;
  placeholder?: string;
  multiline?: boolean;
  onSave?: () => void;
  style?: React.CSSProperties;
}

export const InlineEditor: React.FC<InlineEditorProps> = ({
  value,
  onChange,
  className = '',
  tagName = 'div',
  placeholder = 'Введите текст...',
  multiline = false,
  onSave,
  style,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const editorRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!isFocused && editorRef.current) {
      editorRef.current.textContent = value;
    }
  }, [value, isFocused]);

  const handleInput = useCallback(() => {
    if (editorRef.current) {
      const newValue = editorRef.current.textContent || '';
      onChange(newValue);
    }
  }, [onChange]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape' && editorRef.current) {
      e.preventDefault();
      editorRef.current.blur();
    }
    
    if (e.key === 'Enter' && !multiline) {
      e.preventDefault();
      editorRef.current?.blur();
      onSave?.();
    }
  }, [multiline, onSave]);

  const handleBlur = useCallback(() => {
    setIsFocused(false);
    onSave?.();
  }, [onSave]);

  const handleFocus = useCallback(() => {
    setIsFocused(true);
    // Сохраняем позицию курсора
    if (editorRef.current) {
      const sel = window.getSelection();
      const range = document.createRange();
      
      // Пытаемся восстановить позицию курсора
      const textContent = editorRef.current.textContent || '';
      if (textContent.length > 0) {
        // Курсор в конце по умолчанию
        range.setStart(editorRef.current.firstChild || editorRef.current, textContent.length);
        range.setEnd(editorRef.current.firstChild || editorRef.current, textContent.length);
        sel?.removeAllRanges();
        sel?.addRange(range);
      }
    }
  }, []);

  const handleClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
  }, []);

  const Tag = tagName as any;

  return (
    <Tag
      ref={editorRef}
      className={cn(
        'inline-editor outline-none cursor-text hover:bg-white/10 rounded px-1 -mx-1',
        'focus:bg-white/10 focus:ring-2 focus:ring-blue-400 focus:ring-offset-1 focus:ring-offset-transparent',
        !value && 'opacity-60',
        className
      )}
      contentEditable={isFocused}
      suppressContentEditableWarning={true}
      onInput={handleInput}
      onKeyDown={handleKeyDown}
      onBlur={handleBlur}
      onFocus={handleFocus}
      onClick={handleClick}
      data-placeholder={placeholder}
      style={{
        ...style,
        pointerEvents: 'auto',
        whiteSpace: multiline ? 'normal' : 'nowrap',
        display: 'inline-block',
        minWidth: '1em',
      }}
    >
      {value}
    </Tag>
  );
};
