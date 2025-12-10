// Мобильное меню
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenuClose = document.getElementById('mobileMenuClose');
const mobileMenu = document.getElementById('mobileMenu');
const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.add('active');
    mobileMenuOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
});

mobileMenuClose.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
    mobileMenuOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
});

mobileMenuOverlay.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
    mobileMenuOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
});

// Закрытие меню при клике на ссылку
const mobileMenuLinks = document.querySelectorAll('.mobile-menu-links a');
mobileMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        mobileMenuOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

// Плавная прокрутка для якорных ссылок
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Слайдер на jQuery
$(document).ready(function() {
    // Инициализация слайдера
    const slider = $('#jquery-slider');
    const slides = $('.slide');
    const totalSlides = slides.length;
    let currentSlide = 0;
    let slideInterval;
    
    // Создаем точки навигации
    function createDots() {
        const dotsContainer = $('#sliderDots');
        dotsContainer.empty();
        
        for (let i = 0; i < totalSlides; i++) {
            const dot = $('<span class="dot"></span>');
            dot.data('slide', i);
            dotsContainer.append(dot);
        }
        
        // Активируем первую точку
        $('.dot').eq(0).addClass('active');
    }
    
    // Обновление позиции слайдера
    function updateSlider() {
        const slideWidth = 100; // процент
        const translateX = -(currentSlide * slideWidth);
        slider.css('transform', `translateX(${translateX}%)`);
        
        // Обновляем активную точку
        $('.dot').removeClass('active');
        $('.dot').eq(currentSlide).addClass('active');
    }
    
    // Переключение на следующий слайд
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlider();
    }
    
    // Переключение на предыдущий слайд
    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateSlider();
    }
    
    // Переключение на конкретный слайд
    function goToSlide(slideIndex) {
        currentSlide = slideIndex;
        updateSlider();
    }
    
    // Инициализация
    createDots();
    
    // Обработчики событий для кнопок навигации
    $('#nextBtn').click(function() {
        nextSlide();
        resetInterval();
    });
    
    $('#prevBtn').click(function() {
        prevSlide();
        resetInterval();
    });
    
    // Обработчик для точек
    $(document).on('click', '.dot', function() {
        const slideIndex = $(this).data('slide');
        goToSlide(slideIndex);
        resetInterval();
    });
    
    // Автоматическое переключение слайдов
    function startInterval() {
        slideInterval = setInterval(nextSlide, 12000);
    }
    
    function resetInterval() {
        clearInterval(slideInterval);
        startInterval();
    }
    
    // Запускаем автоматическое переключение
    startInterval();
    
    // Останавливаем автоматическое переключение при наведении на слайдер
    $('.slider-container').hover(
        function() {
            clearInterval(slideInterval);
        },
        function() {
            startInterval();
        }
    );
    
    // Анимация карточек компетенций при скролле с использованием jQuery
    function checkCompetenciesAnimation() {
        const windowBottom = $(window).scrollTop() + $(window).height();
        const competencyCards = $('.competency-card');
        
        competencyCards.each(function() {
            const cardTop = $(this).offset().top;
            
            if (cardTop < windowBottom - 50) {
                $(this).css({
                    'opacity': '1',
                    'transform': 'translateY(0)'
                });
            }
        });
    }
    
    // Инициализация анимации карточек
    $('.competency-card').css({
        'opacity': '0',
        'transform': 'translateY(20px)',
        'transition': 'opacity 0.5s ease, transform 0.5s ease'
    });
    
    $(window).on('scroll', checkCompetenciesAnimation);
    $(window).on('load', checkCompetenciesAnimation);
    
    // Инициализация при загрузке
    checkCompetenciesAnimation();
});

// Отправка формы через FormCarry
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Показываем сообщение об отправке
            formMessage.textContent = 'Отправка формы...';
            formMessage.className = 'form-message';
            formMessage.style.display = 'block';
            formMessage.style.backgroundColor = '#fff3cd';
            formMessage.style.color = '#856404';
            
            // Получаем значения полей формы
            const name = document.getElementById('name').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Простая валидация
            if (!name || !phone || !email) {
                formMessage.textContent = 'Пожалуйста, заполните все обязательные поля (имя, телефон, email).';
                formMessage.className = 'form-message error';
                return;
            }
            
            // Проверка email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                formMessage.textContent = 'Пожалуйста, введите корректный email адрес.';
                formMessage.className = 'form-message error';
                return;
            }
            
            // Создаем объект с данными формы
            const formData = {
                name: name,
                phone: phone,
                email: email,
                message: message || 'Нет сообщения',
                source: 'СТРОЙМАРКЕТЫ сайт',
                timestamp: new Date().toLocaleString('ru-RU')
            };
            
            try {
                // Отправляем данные на FormCarry
                const formCarryKey = 'ymceMyHFi61';
                
                // Отправляем как JSON
                const response = await fetch(`https://formcarry.com/s/${formCarryKey}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });
                
                const result = await response.json();
                
                if (response.ok && (result.code === 200 || result.status === 'success')) {
                    // Успешная отправка
                    formMessage.textContent = '✅ Спасибо! Ваша заявка отправлена. Мы свяжемся с вами в ближайшее время.';
                    formMessage.className = 'form-message success';
                    
                    // Очищаем форму
                    contactForm.reset();
                    
                    // Скрываем сообщение через 7 секунд
                    setTimeout(() => {
                        formMessage.style.display = 'none';
                    }, 7000);
                } else {
                    // Ошибка от FormCarry
                    let errorMessage = 'Произошла ошибка при отправке формы. Пожалуйста, попробуйте еще раз.';
                    
                    if (result.message) {
                        errorMessage = result.message;
                    }
                    
                    formMessage.textContent = '❌ ' + errorMessage;
                    formMessage.className = 'form-message error';
                    
                    // Скрываем сообщение через 7 секунд
                    setTimeout(() => {
                        formMessage.style.display = 'none';
                    }, 7000);
                    
                    console.error('Ошибка FormCarry:', result);
                }
            } catch (error) {
                // Сетевая ошибка
                formMessage.textContent = '❌ Ошибка сети. Пожалуйста, проверьте подключение к интернету и попробуйте еще раз.';
                formMessage.className = 'form-message error';
                
                // Скрываем сообщение через 7 секунд
                setTimeout(() => {
                    formMessage.style.display = 'none';
                }, 7000);
                
                console.error('Ошибка сети:', error);
            }
        });
    }
});
