'use strict';
// ==================== on button menu click ====================
const menuLinks = document.querySelectorAll('.menu-header__link');

function addClassOnClick() {
	menuLinks.forEach(link => {
		link.addEventListener('mousedown', function (event) {
			event.preventDefault();
			this.classList.add('active');
		});
	});
}

addClassOnClick();

// ==================== on quantity click ====================

const quantityElement = document.getElementById('quantity'); // input з кількістю
const bottlePriceElement = document.getElementById('bottle-price'); // span з ціною за 19л
const newBottleCheckbox = document.getElementById('newBottle'); // checkbox з новою тарою
const totalPriceElement = document.getElementById('total-price'); // загальна вартість

let basePrice = 23.75; // Базова ціна за одиницю (19л)
let quantity = parseInt(quantityElement.value); // кількість (шт)
let deliveryPrice = 150;
let newBottlePrice = this.checked ? 350 : 0; //  ціна нового бутля
let additionalOptionsPrice = 0;

// =================    Функція оновлення кількості та ціни   =================
function updateData() {
	quantityElement.value = quantity;
	bottlePriceElement.innerText = quantity * basePrice;
	totalPriceElement.innerText = quantity * basePrice + deliveryPrice + newBottlePrice * quantity;
}

// =================    Обробник для кнопки збільшення   =================
document.getElementById('increaseBtn').addEventListener('click', function (event) {
	event.preventDefault();
	quantity++;
	updateData();
});

// =================    Обробник для кнопки зменшення   =================
document.getElementById('decreaseBtn').addEventListener('click', function (event) {
	if (quantity > 1) {
		event.preventDefault();
		quantity--;
		updateData();
	}
});
// =================   Обробник для checkbox з новою тарою  =============
newBottleCheckbox.addEventListener('change', function (event) {
	event.preventDefault();
	newBottlePrice = this.checked ? 350 : 0;
	updateData();
});

// ================   активація кнопки форми   ===============

const formButton = document.getElementById('form-button');

function setDisabledAttribute() {
	const userName = document.getElementById('username').value;
	const userPhone = document.getElementById('user-phone').value;
	const userAddress = document.getElementById('user-address').value;

	if (userName && userPhone && userAddress) {
		formButton.removeAttribute('disabled');
	} else {
		formButton.setAttribute('disabled', 'disabled');
	}
}

document.getElementById('username').addEventListener('input', setDisabledAttribute);
document.getElementById('user-phone').addEventListener('input', setDisabledAttribute);
document.getElementById('user-address').addEventListener('input', setDisabledAttribute);

setDisabledAttribute();

// ===========   плавний виліт при скрролі   ==============

const elements = document.querySelectorAll('[data-aos]');
const options = {
	threshold: 0.2,
};

let lastDirection = 'right';

const observer = new IntersectionObserver((entries, observer) => {
	entries.forEach(entry => {
		if (entry.isIntersecting) {
			if (lastDirection === 'right') {
				entry.target.classList.add('fade-left');
				lastDirection = 'left';
			} else {
				entry.target.classList.add('fade-right');
				lastDirection = 'right';
			}
			observer.unobserve(entry.target);
		}
	});
}, options);

const sections = document.querySelectorAll('[data-aos]');
sections.forEach(section => {
	observer.observe(section);
});

// ===========   Меню бургер   ===========
const iconMenu = document.querySelector('.menu-header__icon');
const menuBody = document.querySelector('.menu-header__body');
if (iconMenu) {
	iconMenu.addEventListener('click', function (e) {
		document.body.classList.toggle('_lock');
		iconMenu.classList.toggle('_active');
		menuBody.classList.toggle('_active');
	});
}

// ===========   плавний скролл до якоря   ==============

const links = document.querySelectorAll('.link-menu');

if (links.length > 0) {
	links.forEach(link => {
		link.addEventListener('click', clickHandler);
	});

	function clickHandler(e) {
		e.preventDefault();

		const href = this.getAttribute('href');
		const offsetTop = document.querySelector(href).offsetTop;
		const header = document.querySelector('header');
		const headerHeight = header.offsetHeight;

		if (iconMenu.classList.contains('_active')) {
			document.body.classList.remove('_lock');
			iconMenu.classList.remove('_active');
			menuBody.classList.remove('_active');
		}

		scroll({
			top: offsetTop - headerHeight,
			behavior: 'smooth',
		});
	}
}

// ===========   Ініціалізація каруселі   ===========
new Swiper('.more-goods-section__wrap', {
	// стрілки
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
	// булети, точки пагінації
	// pagination: {
	// 	el: '.swiper-pagination',
	// 	clickable: true,
	// 	dynamicBullets: true,
	// },
	// scrollbar: {
	// 	el: '.swiper-scrollbar',
	// 	draggable: true,
	// },
	grabCursor: true,
	// slideToClickedSlide: true,
	keyboard: {
		enabled: true,
		onlyInViewport: true,
		pageUpDown: true,
	},
	// mousewheel: {
	// 	sensitivity: 1,
	// eventsTarget:
	// },
	slidesPerView: 3,
	watchOverflow: true,
	// centeredSlides: true,
	loop: true,
	loopedSlides: 3,
	autoplay: {
		delay: 2000,
		stopOnLastSlide: true,
		disadleOnInteraction: false,
	},
	speed: 800,
	breakpoints: {
		320: {
			slidesPerView: 1,
		},
		480: {
			slidesPerView: 2,
		},
		992: {
			slidesPerView: 3,
		},
	},
	spaceBetween: 20,
});
