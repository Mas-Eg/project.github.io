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
    
    // Обработка формы через FormCarry
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Получаем данные формы
        const formData = new FormData(contactForm);
        
        // Показываем сообщение об отправке
        formMessage.textContent = 'Отправка формы...';
        formMessage.className = 'form-message';
        formMessage.style.display = 'block';
        
        // Отправляем данные через FormCarry
        try {
            // ЗАМЕНИТЕ 'YOUR_FORM_KEY' на ваш ключ от FormCarry
            const formCarryKey = 'YOUR_FORM_KEY'; // Замените на ваш ключ!
            const response = await fetch(`https://formcarry.com/s/${formCarryKey}`, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            const result = await response.json();
            
            if (response.ok && result.code === 200) {
                // Успешная отправка
                formMessage.textContent = 'Спасибо! Ваша заявка отправлена. Мы свяжемся с вами в ближайшее время.';
                formMessage.className = 'form-message success';
                
                // Очищаем форму
                contactForm.reset();
                
                // Скрываем сообщение через 5 секунд
                setTimeout(() => {
                    formMessage.style.display = 'none';
                }, 5000);
            } else {
                // Ошибка от FormCarry
                let errorMessage = 'Произошла ошибка при отправке формы.';
                
                if (result.message) {
                    errorMessage = result.message;
                } else if (result.title) {
                    errorMessage = result.title;
                }
                
                formMessage.textContent = errorMessage;
                formMessage.className = 'form-message error';
                
                // Скрываем сообщение через 5 секунд
                setTimeout(() => {
                    formMessage.style.display = 'none';
                }, 5000);
                
                console.error('Ошибка FormCarry:', result);
            }
        } catch (error) {
            // Сетевая ошибка или ошибка при выполнении запроса
            formMessage.textContent = 'Произошла ошибка при отправке формы. Пожалуйста, попробуйте еще раз.';
            formMessage.className = 'form-message error';
            
            // Скрываем сообщение через 5 секунд
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
            
            console.error('Ошибка сети:', error);
        }
    });
    
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
