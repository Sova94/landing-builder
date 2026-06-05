import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@utils/cn';

interface TextEditProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  tagName?: 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'button';
  placeholder?: string;
  multiline?: boolean;
  style?: React.CSSProperties;
}

export const TextEdit: React.FC<TextEditProps> = ({
  value,
  onChange,
  className = '',
  tagName = 'span',
  placeholder = 'Введите текст...',
  multiline = false,
  style,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      // Устанавливаем курсор в конец
      const length = inputRef.current.value.length;
      inputRef.current.setSelectionRange(length, length);
    }
  }, [isEditing]);

  useEffect(() => {
    if (!isEditing) {
      setEditValue(value);
    }
  }, [value, isEditing]);

  const handleBlur = () => {
    setIsEditing(false);
    onChange(editValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !multiline) {
      e.preventDefault();
      handleBlur();
    }
    if (e.key === 'Escape') {
      e.preventDefault();
      setEditValue(value);
      setIsEditing(false);
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isEditing) {
      setIsEditing(true);
    }
  };

  const Tag = tagName;

  if (isEditing) {
    const InputComponent = multiline ? 'textarea' : 'input';
    
    return React.createElement(InputComponent, {
      ref: inputRef,
      value: editValue,
      onChange: (e: any) => setEditValue(e.target.value),
      onBlur: handleBlur,
      onKeyDown: handleKeyDown,
      placeholder,
      className: cn(
        'inline-block bg-white border border-blue-400 rounded px-1 outline-none',
        'focus:ring-2 focus:ring-blue-200',
        className
      ),
      style: {
        ...style,
        minWidth: '100px',
      },
      autoFocus: true,
    });
  }

  return (
    <Tag
      onClick={handleClick}
      className={cn(
        'cursor-text hover:bg-blue-50 rounded px-1 -mx-1 inline-block',
        !value && 'text-gray-400',
        className
      )}
      style={style}
      title="Кликните для редактирования"
    >
      {value || placeholder}
    </Tag>
  );
};
