# Сниппеты кода

Библиотека готовых сниппетов для использования в редакторе кода.

## HTML сниппеты

### Hero блок
```html
<!-- Введите: hero -->
<section class="hero bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
  <div class="container mx-auto px-4 text-center">
    <h1 class="text-5xl font-bold mb-6">${1:Заголовок}</h1>
    <p class="text-xl mb-8">${2:Подзаголовок}</p>
    <button class="bg-white text-blue-600 px-8 py-3 rounded-lg font-medium">${3:Действие}</button>
  </div>
</section>
```

### FAQ секция
```html
<!-- Введите: faq -->
<div class="faq space-y-4 max-w-3xl mx-auto">
  <details class="group bg-white rounded-lg shadow-sm">
    <summary class="cursor-pointer p-4 font-medium flex justify-between items-center">
      ${1:Вопрос}
      <span class="transition-transform group-open:rotate-180">▼</span>
    </summary>
    <p class="mt-2 px-4 pb-4 text-gray-600">${2:Ответ}</p>
  </details>
</div>
```

### Слайдер
```html
<!-- Введите: slider -->
<div class="slider relative overflow-hidden rounded-lg">
  <div class="slides flex transition-transform duration-300">
    <div class="slide min-w-full h-96 bg-gray-200">${1:Слайд 1}</div>
    <div class="slide min-w-full h-96 bg-gray-300">${2:Слайд 2}</div>
    <div class="slide min-w-full h-96 bg-gray-400">${3:Слайд 3}</div>
  </div>
  <button class="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full" onclick="prevSlide()">
    ←
  </button>
  <button class="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full" onclick="nextSlide()">
    →
  </button>
</div>
```

### Форма
```html
<!-- Введите: form -->
<form class="space-y-4 max-w-md mx-auto">
  <div>
    <label class="block text-sm font-medium mb-1">Имя</label>
    <input 
      type="text" 
      name="name" 
      required
      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      placeholder="Ваше имя"
    />
  </div>
  <div>
    <label class="block text-sm font-medium mb-1">Email</label>
    <input 
      type="email" 
      name="email" 
      required
      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      placeholder="your@email.com"
    />
  </div>
  <div>
    <label class="block text-sm font-medium mb-1">Сообщение</label>
    <textarea 
      name="message" 
      rows="4"
      required
      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      placeholder="Ваше сообщение"
    ></textarea>
  </div>
  <button 
    type="submit"
    class="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
  >
    ${1:Отправить}
  </button>
</form>
```

### Тарифы
```html
<!-- Введите: pricing -->
<div class="pricing grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
  <div class="plan p-6 bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow">
    <h3 class="text-xl font-bold mb-2">${1:Базовый}</h3>
    <p class="text-4xl font-bold my-4">${2:990}<span class="text-lg font-normal">/мес</span></p>
    <ul class="space-y-2 mb-6">
      <li class="flex items-center gap-2">✓ ${3:Feature 1}</li>
      <li class="flex items-center gap-2">✓ Feature 2</li>
      <li class="flex items-center gap-2">✓ Feature 3</li>
    </ul>
    <button class="w-full py-2 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50">
      Выбрать
    </button>
  </div>
</div>
```

### Аккордеон
```html
<!-- Введите: accordion -->
<div class="accordion space-y-2">
  <details class="group bg-white rounded-lg shadow-sm">
    <summary class="cursor-pointer p-4 font-medium flex justify-between items-center">
      ${1:Вопрос 1}
      <span class="transition-transform group-open:rotate-180">▼</span>
    </summary>
    <div class="px-4 pb-4 text-gray-600">${2:Ответ 1}</div>
  </details>
</div>
```

### Табы
```html
<!-- Введите: tabs -->
<div class="tabs">
  <div class="flex border-b mb-4">
    <button class="tab px-4 py-2 border-b-2 border-blue-600 text-blue-600">${1:Вкладка 1}</button>
    <button class="tab px-4 py-2 text-gray-600">${2:Вкладка 2}</button>
    <button class="tab px-4 py-2 text-gray-600">${3:Вкладка 3}</button>
  </div>
  <div class="tab-content">
    ${4:Контент вкладки 1}
  </div>
</div>
```

## CSS сниппеты

### Центрирование
```css
/* Введите: center */
.center {
  display: flex;
  align-items: center;
  justify-content: center;
}
```

### Grid сетка
```css
/* Введите: grid */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}
```

### Адаптивный контейнер
```css
/* Введите: container */
.container {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1rem;
}
```

### Градиентный фон
```css
/* Введите: gradient */
.gradient-bg {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

### Тень при наведении
```css
/* Введите: hover-shadow */
.hover-shadow {
  transition: box-shadow 0.3s ease;
}

.hover-shadow:hover {
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
}
```

## JavaScript сниппеты

### Обработка формы
```javascript
// Введите: form-submit
document.querySelector('form').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData);
  
  try {
    const response = await fetch('/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    
    if (response.ok) {
      alert('Успешно отправлено!');
      e.target.reset();
    }
  } catch (error) {
    console.error('Ошибка:', error);
    alert('Произошла ошибка');
  }
});
```

### Слайдер
```javascript
// Введите: slider-js
class Slider {
  constructor(element) {
    this.slider = element;
    this.slides = element.querySelectorAll('.slide');
    this.currentIndex = 0;
    
    this.showSlide(this.currentIndex);
  }
  
  showSlide(index) {
    this.slides.forEach((slide, i) => {
      slide.style.display = i === index ? 'block' : 'none';
    });
  }
  
  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.slides.length;
    this.showSlide(this.currentIndex);
  }
  
  prevSlide() {
    this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
    this.showSlide(this.currentIndex);
  }
}

// Инициализация
const slider = new Slider(document.querySelector('.slider'));
```

### Аккордеон
```javascript
// Введите: accordion-js
document.querySelectorAll('details').forEach(details => {
  details.addEventListener('toggle', () => {
    if (details.open) {
      document.querySelectorAll('details').forEach(other => {
        if (other !== details) other.open = false;
      });
    }
  });
});
```

## Виджет-подсказки

При вводе `@` в редакторе кода доступны следующие подсказки:

- `@form` - Форма обратной связи
- `@button` - Кнопка
- `@section` - Секция
- `@hero` - Hero блок
- `@container` - Контейнер
- `@image` - Изображение
- `@gallery` - Галерея
- `@video` - Видео
- `@text` - Текст
- `@heading` - Заголовок
