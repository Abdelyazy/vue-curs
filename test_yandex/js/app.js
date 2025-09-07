AOS.init();

document.addEventListener('DOMContentLoaded', function() {
    // Получаем все контейнеры intro__stroke-container
    const strokeContainers = document.querySelectorAll('.intro__stroke-container');

    strokeContainers.forEach((container, index) => {
        // Находим элементы внутри данного родителя
        const items = document.querySelectorAll('.intro__stroke-item');
        // Клонируем все элементы и добавляем их в конец
        items.forEach(item => {
            const clone = item.cloneNode(true);
            container.appendChild(clone);
        });

        // Рассчитываем общую ширину всех элементов
        let totalWidth = 0;
        items.forEach(item => {
            totalWidth += item.offsetWidth + 50;
        });

        // Анимация для каждого контейнера
        let position = 0;
        const speed = 1; // пикселей за кадр

        function animate() {
            position -= speed;

            if (position <= -totalWidth) {
                position = 0;
            }

            container.style.transform = `translateX(${position}px)`;
            requestAnimationFrame(animate);
        }

        // Запускаем анимацию для данного контейнера
        animate();
    });

    // Инициализация Swiper для peaple__slider
    const peapleSwiper = new Swiper('.peaple__slider', {
        slidesPerView: 3,
        spaceBetween: 20,
        loop: true,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },

        navigation: {
            nextEl: '.peaple__slider-btn .swiper-button-next',
            prevEl: '.peaple__slider-btn .swiper-button-prev',
        },

        pagination: {
            el: '.peaple__slider-btn .swiper-pagination',
            type: 'fraction',
        },
        

        breakpoints: {
            900: {
                slidesPerView: 3,
            },
            450: {
                slidesPerView: 2,
            },
            320: {
                slidesPerView: 1,
            }
        }
    });

    // Убедимся, что pagination видно
    const paginationElement = document.querySelector('.swiper-pagination');
    if (paginationElement) {
        paginationElement.style.display = 'block';
    }

    const stepSwiper = new Swiper('.step__slider-box', {
        spaceBetween: 20,
        loop: false,
        autoplay: false,

        navigation: {
            nextEl: '.step__slider-btn .swiper-button-next',
            prevEl: '.step__slider-btn .swiper-button-prev',
        },

        pagination: {
            el: '.step__slider-btn .swiper-pagination',
        }
    });
});