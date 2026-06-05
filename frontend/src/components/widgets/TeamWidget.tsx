import React from 'react';
import type { WidgetData, WidgetType } from '@store/editorStore';
import { useEditorStore } from '@store/editorStore';
import { TextEdit } from '@components/editor/TextEdit';
import { Plus, Trash2, Facebook, Instagram, Twitter, Linkedin, Mail } from 'lucide-react';

interface TeamWidgetProps {
  widget: WidgetData;
  isPreview?: boolean;
}

export const TeamWidget: React.FC<TeamWidgetProps> = ({ widget, isPreview = false }) => {
  const { content, style } = widget;
  const { updateWidget } = useEditorStore();
  const title = content.title || 'Наша команда';
  const subtitle = content.subtitle || 'Люди, которые создают магию';
  const members = content.members || [
    { name: 'Иван Петров', role: 'CEO & Founder', image: '', bio: '10 лет опыта в индустрии' },
    { name: 'Анна Смирнова', role: 'Арт-директор', image: '', bio: 'Создаёт красивые интерфейсы' },
    { name: 'Максим Козлов', role: 'Технический директор', image: '', bio: 'Разрабатывает архитектуру' },
    { name: 'Елена Новикова', role: 'Маркетолог', image: '', bio: 'Продвигает продукты' },
  ];
  const columns = content.columns || 4;
  const showSocial = content.showSocial !== false;

  const socialIcons: Record<string, React.ComponentType<{ className?: string }>> = {
    'facebook': Facebook,
    'instagram': Instagram,
    'twitter': Twitter,
    'linkedin': Linkedin,
    'mail': Mail,
  };

  const handleMemberChange = (index: number, field: string, value: string) => {
    const newMembers = [...members];
    newMembers[index] = { ...newMembers[index], [field]: value };
    updateWidget(widget.id, {
      content: { ...content, members: newMembers },
    });
  };

  const handleAddMember = () => {
    const newMember = {
      name: 'Новый участник',
      role: 'Должность',
      image: '',
      bio: 'Описание участника',
    };
    updateWidget(widget.id, {
      content: { ...content, members: [...members, newMember] },
    });
  };

  const handleRemoveMember = (index: number) => {
    if (members.length <= 1) return;
    const newMembers = members.filter((_: any, i: number) => i !== index);
    updateWidget(widget.id, {
      content: { ...content, members: newMembers },
    });
  };

  return (
    <div
      className="w-full py-16 px-4"
      style={style}
      data-widget-id={widget.id}
      data-widget-type={widget.type}
    >
      <div className="max-w-6xl mx-auto">
        {/* Заголовок */}
        {title && (
          <div className="text-center mb-12">
            <TextEdit
              value={title}
              onChange={(value) => updateWidget(widget.id, { content: { ...content, title: value } })}
              tagName="h2"
              placeholder="Заголовок"
              multiline={false}
              className="text-4xl font-bold text-gray-900 mb-4 block text-center"
            />
            {subtitle && (
              <TextEdit
                value={subtitle}
                onChange={(value) => updateWidget(widget.id, { content: { ...content, subtitle: value } })}
                tagName="p"
                placeholder="Подзаголовок"
                multiline={false}
                className="text-xl text-gray-600 max-w-2xl mx-auto block text-center"
              />
            )}
          </div>
        )}

        {/* Команда */}
        <div
          className="grid gap-8"
          style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
        >
          {members.map((member: any, index: number) => (
            <div
              key={index}
              className="group text-center relative"
            >
              {!isPreview && (
                <button
                  onClick={() => handleRemoveMember(index)}
                  className="absolute top-2 right-2 z-20 p-1.5 bg-red-100 text-red-600 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-red-200 transition-all"
                  title="Удалить участника"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
              
              {/* Фото */}
              <div className="relative mb-6 overflow-hidden rounded-xl aspect-square bg-gradient-to-br from-blue-100 to-purple-100">
                {member.image ? (
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-24 h-24 rounded-full bg-white/50 flex items-center justify-center">
                      <span className="text-4xl">👤</span>
                    </div>
                  </div>
                )}

                {/* Соцсети (появляются при наведении) */}
                {showSocial && member.socialLinks && (
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                    {member.socialLinks.map((link: any, linkIndex: number) => {
                      const IconComponent = socialIcons[link.platform] || Mail;
                      return (
                        <a
                          key={linkIndex}
                          href={link.url}
                          className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-blue-500 hover:text-white transition-colors"
                        >
                          <IconComponent className="w-5 h-5" />
                        </a>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Информация */}
              <TextEdit
                value={member.name}
                onChange={(value) => handleMemberChange(index, 'name', value)}
                tagName="h3"
                placeholder="Имя"
                multiline={false}
                className="text-xl font-semibold text-gray-900 mb-1 block text-center"
              />
              <TextEdit
                value={member.role}
                onChange={(value) => handleMemberChange(index, 'role', value)}
                tagName="p"
                placeholder="Должность"
                multiline={false}
                className="text-blue-600 font-medium mb-2 block text-center"
              />
              {member.bio && (
                <TextEdit
                  value={member.bio}
                  onChange={(value) => handleMemberChange(index, 'bio', value)}
                  tagName="p"
                  placeholder="Описание"
                  multiline
                  className="text-gray-600 text-sm block text-center"
                />
              )}
            </div>
          ))}
          
          {/* Кнопка добавления участника */}
          {!isPreview && (
            <button
              onClick={handleAddMember}
              className="flex flex-col items-center justify-center gap-4 p-8 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-all text-gray-400 hover:text-blue-500"
              title="Добавить участника"
            >
              <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center">
                <Plus className="w-10 h-10" />
              </div>
              <span className="text-sm font-medium">Добавить участника</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export const teamWidgetConfig = {
  type: 'team' as WidgetType,
  name: 'Команда',
  icon: 'Users',
  category: 'Базовые',
  defaultData: {
    id: '',
    type: 'team' as WidgetType,
    name: 'Команда',
    content: {
      title: 'Наша команда',
      subtitle: 'Люди, которые создают магию',
      members: [
        { name: 'Иван Петров', role: 'CEO & Founder', image: '', bio: '10 лет опыта в индустрии' },
        { name: 'Анна Смирнова', role: 'Арт-директор', image: '', bio: 'Создаёт красивые интерфейсы' },
        { name: 'Максим Козлов', role: 'Технический директор', image: '', bio: 'Разрабатывает архитектуру' },
        { name: 'Елена Новикова', role: 'Маркетолог', image: '', bio: 'Продвигает продукты' },
      ],
      columns: 4,
      showSocial: true,
    },
    style: {
      backgroundColor: '#ffffff',
      padding: '80px 20px',
    },
    isVisible: {
      desktop: true,
      tablet: true,
      mobile: true,
    },
    position: {
      x: 50,
      y: 50,
      width: 1000,
      height: 700,
      zIndex: 1,
    },
    layout: 'absolute',
  },
  settingsSchema: {
    content: {
      title: { type: 'text', label: 'Заголовок' },
      subtitle: { type: 'text', label: 'Подзаголовок' },
      members: { type: 'array', label: 'Участники команды' },
      columns: {
        type: 'select',
        label: 'Колонки',
        options: [
          { value: 2, label: '2' },
          { value: 3, label: '3' },
          { value: 4, label: '4' },
        ],
      },
      showSocial: { type: 'boolean', label: 'Показывать соцсети' },
    },
  },
};
