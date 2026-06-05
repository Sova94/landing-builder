import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Globe, Trash2, Edit, Search, Grid, List, Rocket, Folder, Clock, Star, Share2 } from 'lucide-react';
import { useEditorStore } from '@store/editorStore';
import toast from 'react-hot-toast';
import type { Project } from '@store/editorStore';

export const HubPage: React.FC = () => {
  const navigate = useNavigate();
  const { projects, createProject, deleteProject, getProject, setProject } = useEditorStore();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');

  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateProject = () => {
    if (!newProjectName.trim()) return;
    
    const project = createProject(newProjectName);
    setIsCreating(false);
    setNewProjectName('');
    navigate(`/editor/${project.id}`);
  };

  const handleOpenEditor = (projectId: string) => {
    const project = getProject(projectId);
    if (project) {
      setProject(project);
      navigate(`/editor/${projectId}`);
    }
  };

  const handleShareProject = (projectId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const previewUrl = `${window.location.origin}/preview/${projectId}`;
    navigator.clipboard.writeText(previewUrl);
    toast.success('Ссылка скопирована!', {
      description: previewUrl,
      duration: 8000,
    });
  };

  const handleDeleteProject = (projectId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Вы уверены что хотите удалить этот сайт? Это действие нельзя отменить.')) {
      deleteProject(projectId);
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(date);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Rocket className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                LandingBuilder
              </span>
            </Link>
            
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  U
                </div>
                <span className="text-sm font-medium text-gray-700">user@example.com</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Мои сайты</h1>
              <p className="text-gray-600">
                Управляйте всеми вашими проектами в одном месте
              </p>
            </div>
            
            <button
              onClick={() => setIsCreating(true)}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
            >
              <Plus className="w-5 h-5" />
              Создать сайт
            </button>
          </div>
        </div>

        {/* Search and View Toggle */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Поиск сайтов..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'grid'
                  ? 'bg-blue-100 text-blue-600'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'list'
                  ? 'bg-blue-100 text-blue-600'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Create Modal */}
        {isCreating && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 w-full max-w-md">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Новый сайт</h2>
              <p className="text-gray-600 mb-6">
                Придумайте название для вашего сайта. Вы сможете изменить его позже.
              </p>
              
              <input
                type="text"
                placeholder="Например: Лендинг для кофейни"
                value={newProjectName}
                onChange={(e) => setNewProjectName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleCreateProject()}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-6"
                autoFocus
              />
              
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setIsCreating(false);
                    setNewProjectName('');
                  }}
                  className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Отмена
                </button>
                <button
                  onClick={handleCreateProject}
                  disabled={!newProjectName.trim()}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  Создать
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Projects Grid/List */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Folder className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {searchQuery ? 'Ничего не найдено' : 'У вас пока нет сайтов'}
            </h3>
            <p className="text-gray-600 mb-6">
              {searchQuery
                ? 'Попробуйте изменить поисковый запрос'
                : 'Создайте свой первый сайт прямо сейчас'}
            </p>
            {!searchQuery && (
              <button
                onClick={() => setIsCreating(true)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
              >
                <Plus className="w-5 h-5" />
                Создать сайт
              </button>
            )}
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => handleOpenEditor(project.id)}
                className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl hover:border-blue-300 transition-all duration-300 cursor-pointer"
              >
                {/* Preview */}
                <div className="h-40 bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center relative overflow-hidden">
                  <Globe className="w-16 h-16 text-blue-200" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4">
                    <span className="text-white font-medium">Открыть редактор</span>
                  </div>
                </div>
                
                {/* Info */}
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 mb-2 truncate">{project.name}</h3>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{formatDate(project.updatedAt)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4" />
                      <span>{project.sections?.flatMap(s => s.widgets).length || 0} виджетов</span>
                    </div>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenEditor(project.id);
                      }}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
                    >
                      <Edit className="w-4 h-4" />
                      Редактировать
                    </button>
                    <button
                      onClick={(e) => handleShareProject(project.id, e)}
                      className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                      title="Поделиться"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => handleDeleteProject(project.id, e)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      title="Удалить"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Название
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Обновлено
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Виджеты
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Действия
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredProjects.map((project) => (
                  <tr
                    key={project.id}
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => handleOpenEditor(project.id)}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg flex items-center justify-center">
                          <Globe className="w-5 h-5 text-blue-400" />
                        </div>
                        <span className="font-medium text-gray-900">{project.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {formatDate(project.updatedAt)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {project.sections?.flatMap(s => s.widgets).length || 0}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenEditor(project.id);
                          }}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Редактировать"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => handleShareProject(project.id, e)}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title="Поделиться"
                        >
                          <Share2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => handleDeleteProject(project.id, e)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          title="Удалить"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
};
