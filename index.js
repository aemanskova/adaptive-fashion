import { generateMultiolicationTable, showQuote, combineArrays } from './lab7.js'

let p = new Promise((resolve, reject) => {
    reject(Error('The Fails!'))
})

.catch (error => console.log(error))
.then(error => console.log(error))
// Задача 1

const countSandwiches = (parts) => {
    let { bread, cheese } = parts;
    let result = 0;
    if (cheese >= (bread - (bread % 2)) / 2) {
        result = (bread - (bread % 2)) / 2
    } else {
        result = cheese
    }

    return result;
}

console.log(countSandwiches({ bread: 10, cheese: 6 }));
console.log(countSandwiches({ bread: 5, cheese: 6 }));
console.log(countSandwiches({ bread: 6, cheese: 2 }));
console.log(countSandwiches({ bread: 3, cheese: 8 }));

// Задача 2

console.log(generateMultiolicationTable(6));

// Задача 3

console.log(showQuote(['Hellow', 'World', 'In', 'Js'], '^'))

// Задача 4

console.log(combineArrays([1, 2, 3], ['a', 'b', 'c', 'd']))
console.log(combineArrays([1, 2, 3, 4, 5, 6], ['a', 'b', 'c', 'd']))

// Задача 5

const countUniqueValues = (arr) => {
    const obj = arr.reduce((prev, curr) => {
        if (prev[curr]) {
            prev[curr] = prev[curr] + 1;
        } else {
            prev[curr] = 1;
        }

        return prev;
    }, {});

    return obj;
};

console.table(countUniqueValues([1, 2, 1, 2, 3, 4, 2, 5]));

// Задача 6

let burger = document.querySelector('.header__burger');
let menu = document.querySelector('.burger__menu');
let cross = document.querySelector('.header__burger_cross');

burger.onclick = function () {
    menu.style.visibility = 'visible';
    menu.style.transform = 'translateX(0)';
}

cross.onclick = function () {
    menu.style.transform = 'translateX(100%)';
    setTimeout(() => {
        menu.style.visibility = 'hidden';
    }, 2000);

}

// let burger = document.querySelector('.header__burger');
// let menu = document.querySelector('.header__menu');
// let icon = document.getElementsByTagName('use')[0];
// console.log(burger)


// burger.addEventListener('click', (event) => {

//     if (menu.classList.contains('header__menu_active')) {
//         menu.style.display = 'none';
//         menu.classList.remove('header__menu_active');
//         icon.setAttribute('href', '#burger_menu')
//     } else {
//         menu.style.display = 'flex'
//         menu.classList.add('header__menu_active')
//         icon.setAttribute('href', '#cross')
//     }
// }
// )


// Задача 7

let settings = {
    name: "Test toast",
    message: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas ea aliquid quia, voluptates temporibus, placeat fugit incidunt, error recusandae vitae voluptatum eveniet doloremque dolorum impedit architecto ab sapiente illo modi."
}

function createToast(settings) {
    const toast = document.createElement('div');
    const toastHeader = document.createElement('div');
    const toastName = document.createElement('p');
    const toastBtn = document.createElement('button');
    const toastMessage = document.createElement('p');

    toast.classList.add('toast');
    toastHeader.classList.add('toast__header')
    toastName.classList.add('toast__name')
    toastBtn.classList.add('toast__close-btn');
    toastMessage.classList.add('toast__message');

    toastBtn.setAttribute('aria-label', 'Close toast')

    toastBtn.innerHTML = '&times;';
    toastName.innerHTML = settings.name;
    toastMessage.innerHTML = settings.message;

    toastBtn.onclick = function (event) {
        event.target.parentNode.parentNode.classList.add('toast__hidden');
        // setTimeout(() => {
        //     event.target.parentNode.parentNode.remove();
        // }, 2000);
    }

    toast.appendChild(toastHeader);

    toastHeader.appendChild(toastName);
    toastHeader.appendChild(toastBtn);
    toast.appendChild(toastMessage);

    document.body.appendChild(toast);
}

setTimeout(() => {
    createToast(settings);
}, 2000);
















































const countSlides = 4;

const slider = document.getElementById('slider');

let slides = slider.querySelectorAll('.slider__card');

let arrowForward = document.getElementsByClassName('arrow-forward')[0];
let arrowBack = document.getElementsByClassName('arrow-back')[0];

let navCircles = [];
const nav = document.getElementsByClassName('img-nav')[0];

let idxCurrentSlide = 0;

let eventChangeSlide = new Event('eventChangeSlide');

for (let i = 0; i < slides.length / countSlides; i++) {
    const navItem = document.createElement("div");

    navItem.classList.add('img-nav__circle');

    nav.appendChild(navItem);

    navCircles.push(navItem);

    navCircles[i].id = i;
    navCircles[i].onclick = clickCircle;
}

document.addEventListener('eventChangeSlide', (event) => {
    let idxCurrentCircle = Math.floor(idxCurrentSlide / countSlides);

    slider.scrollTo({
        left: slides[idxCurrentSlide].offsetLeft,
        behavior: "smooth",
    });

    if (idxCurrentSlide > 0) {
        arrowBack.classList.remove('arrow-disabled');
    } else {
        arrowBack.classList.add('arrow-disabled');
    }

    if (idxCurrentSlide < slides.length - countSlides) {
        arrowForward.classList.remove('arrow-disabled');
    } else {
        arrowForward.classList.add('arrow-disabled');
    }

    for (let i = 0; i < slides.length; i++) {
        if (i == idxCurrentCircle) {
            navCircles[i].classList.add('img-nav__circle--active');
        } else {
            navCircles[i].classList.remove('img-nav__circle--active');
        }

    }
});

function clickCircle(event) {
    idxCurrentSlide = event.target.id * countSlides;

    document.dispatchEvent(eventChangeSlide);
}

function forward() {
    if (idxCurrentSlide < slides.length - countSlides) {
        idxCurrentSlide++;
        console.log(idxCurrentSlide);
    }

    document.dispatchEvent(eventChangeSlide);
}

function back() {
    if (idxCurrentSlide > 0) {
        idxCurrentSlide--;
    }

    document.dispatchEvent(eventChangeSlide);
}

arrowForward.onclick = forward;
arrowBack.onclick = back;




