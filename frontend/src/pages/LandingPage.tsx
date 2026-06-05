import React from 'react';
import { Link } from 'react-router-dom';
import { Rocket, Layers, Palette, Code, Zap, Globe, ChevronRight, Star, Users, TrendingUp } from 'lucide-react';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Rocket className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                LandingBuilder
              </span>
            </div>
            
            <nav className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">Возможности</a>
              <a href="#templates" className="text-gray-600 hover:text-gray-900 transition-colors">Шаблоны</a>
              <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors">Цены</a>
              <a href="#reviews" className="text-gray-600 hover:text-gray-900 transition-colors">Отзывы</a>
            </nav>
            
            <div className="flex items-center gap-4">
              <Link to="/hub" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                Войти
              </Link>
              <Link
                to="/hub"
                className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
              >
                Начать бесплатно
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md mb-6">
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              <span className="text-sm font-medium text-gray-700">Выбор №1 для создания лендингов в 2025</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Создайте потрясающий{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                лендинг
              </span>{' '}
              за считанные минуты
            </h1>
            
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              Профессиональный конструктор сайтов с визуальным редактором, 
              готовыми виджетами и мгновенной публикацией. Без кода. Без сложностей.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/hub"
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300 flex items-center justify-center gap-2"
              >
                Создать сайт бесплатно
                <ChevronRight className="w-5 h-5" />
              </Link>
              <a
                href="#features"
                className="w-full sm:w-auto px-8 py-4 bg-white text-gray-700 font-semibold rounded-xl border-2 border-gray-200 hover:border-blue-500 hover:text-blue-600 transition-all duration-300"
              >
                Узнать больше
              </a>
            </div>
            
            <div className="mt-12 flex items-center justify-center gap-8 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-600" />
                <span>10,000+ пользователей</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-purple-600" />
                <span>50,000+ сайтов</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                <span>4.9/5 рейтинг</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Всё что нужно для{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                идеального сайта
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Мощные инструменты в простом интерфейсе. Создавайте как профессионалы.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Palette,
                title: 'Визуальный редактор',
                description: 'Перетаскивайте элементы, редактируйте текст кликом, меняйте стили в реальном времени. Tilda-уровень удобства.',
                color: 'from-pink-500 to-rose-500',
              },
              {
                icon: Layers,
                title: '20+ готовых виджетов',
                description: 'Обложки, формы, галереи, магазины, команды и многое другое. Всё настраивается под ваш бренд.',
                color: 'from-blue-500 to-cyan-500',
              },
              {
                icon: Code,
                title: 'Свой код',
                description: 'Добавляйте HTML, CSS и JavaScript. Интегрируйте любые сервисы и скрипты аналитики.',
                color: 'from-purple-500 to-indigo-500',
              },
              {
                icon: Zap,
                title: 'Мгновенная публикация',
                description: 'Один клик — и ваш сайт доступен всему миру. Быстрый хостинг включён.',
                color: 'from-yellow-500 to-orange-500',
              },
              {
                icon: Globe,
                title: 'Адаптивность',
                description: 'Сайты автоматически подстраиваются под любые устройства. Desktop, планшет, мобильный.',
                color: 'from-green-500 to-emerald-500',
              },
              {
                icon: TrendingUp,
                title: 'SEO оптимизация',
                description: 'Встроенные инструменты SEO помогут вашему сайту занять топ в поиске.',
                color: 'from-blue-600 to-purple-600',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="group p-8 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-purple-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Как это работает?
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Три простых шага от идеи до готового сайта
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Создайте проект',
                description: 'Зарегистрируйтесь и нажмите "Создать сайт". Выберите шаблон или начните с чистого листа.',
              },
              {
                step: '02',
                title: 'Настройте дизайн',
                description: 'Добавляйте виджеты, редактируйте текст, меняйте цвета и шрифты. Всё визуально и просто.',
              },
              {
                step: '03',
                title: 'Опубликуйте',
                description: 'Нажмите "Опубликовать" и получите готовую ссылку на ваш сайт. Делитесь с миром!',
              },
            ].map((item, index) => (
              <div key={index} className="relative">
                <div className="text-8xl font-bold text-white/5 absolute -top-4 -left-4">
                  {item.step}
                </div>
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Готовы создать свой первый сайт?
          </h2>
          <p className="text-xl text-gray-600 mb-10">
            Присоединяйтесь к тысячам довольных пользователей. Начните бесплатно прямо сейчас.
          </p>
          <Link
            to="/hub"
            className="inline-flex items-center gap-2 px-10 py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300 text-lg"
          >
            Начать бесплатно
            <ChevronRight className="w-6 h-6" />
          </Link>
          <p className="mt-6 text-gray-500">
            Кредитная карта не требуется • 14 дней бесплатного пробного периода
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Rocket className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold">LandingBuilder</span>
            </div>
            
            <div className="flex gap-8 text-gray-400">
              <a href="#" className="hover:text-white transition-colors">О нас</a>
              <a href="#" className="hover:text-white transition-colors">Политика конфиденциальности</a>
              <a href="#" className="hover:text-white transition-colors">Условия использования</a>
              <a href="#" className="hover:text-white transition-colors">Поддержка</a>
            </div>
            
            <p className="text-gray-500 text-sm">
              © 2025 LandingBuilder. Все права защищены.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
