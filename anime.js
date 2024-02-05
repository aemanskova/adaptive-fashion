import anime from '../node_modules/animejs/lib/anime.es.js';

let bee = document.getElementsByClassName('anime__bee')[0];
let beeAnimated = new AnimationTarget(bee, 500);
beeAnimated.animate();

function randomInteger(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

function AnimationTarget(el, delay) {
    this.el = el;
    this.delay = delay;

    this.animate = function () {
        anime({
            targets: this.el,
            translateX: [randomInteger(0, 100), randomInteger(100, 500)],
            delay: this.delay,
            direction: 'alternate',

            loop: true,
        });

        console.log(el);

    }
}

let wrap = document.getElementsByClassName('anime')[0];

let button = document.getElementById('animeButton');
button.addEventListener('click', () => {
    let newElement = document.createElement('div');
    newElement.classList.add('anime__bee');

    wrap.appendChild(newElement);
    let newAnimatedObject = new AnimationTarget(newElement, 500);
    newAnimatedObject.animate();
})
