(function () {
    const track = document.getElementById('track');
    const cards = [...track.children];
    const prev = document.querySelector('.prev');
    const next = document.querySelector('.next');
    const dotsWrap = document.getElementById('dots');

    let idx = 0;
    let isDragging = false, startX = 0, prevTranslate = 0;

    function layout() { goTo(idx); highlight(); updateDots(); }

    function createDots() {
        dotsWrap.innerHTML = '';
        cards.forEach((_, i) => {
            const d = document.createElement('button');
            d.className = 'dot';
            d.onclick = () => goTo(i);
            dotsWrap.appendChild(d);
        });
    }

    function updateDots() {
        [...dotsWrap.children].forEach((d, i) => d.classList.toggle('active', i === idx));
    }

    function goTo(i) {
        idx = Math.max(0, Math.min(i, cards.length - 1));
        const card = cards[idx];
        const vp = track.parentElement.getBoundingClientRect();
        const offset = (vp.width - card.offsetWidth) / 2;
        const tx = -(card.offsetLeft) + offset;
        track.style.transform = `translateX(${tx}px)`;
        highlight();
        updateDots();
    }

    function nextSlide() { goTo(idx + 1); }
    function prevSlide() { goTo(idx - 1); }

    next.onclick = nextSlide;
    prev.onclick = prevSlide;

    window.addEventListener('keydown', e => {
        if (e.key === 'ArrowRight') nextSlide();
        if (e.key === 'ArrowLeft') prevSlide();
    });

    // drag + swipe
    track.addEventListener('pointerdown', e => {
        isDragging = true; startX = e.clientX;
        prevTranslate = getTranslate();
        track.style.transition = 'none';
        track.setPointerCapture(e.pointerId);
    });

    window.addEventListener('pointermove', e => {
        if (!isDragging) return;
        const dx = e.clientX - startX;
        track.style.transform = `translateX(${prevTranslate + dx}px)`;
    });

    window.addEventListener('pointerup', e => {
        if (!isDragging) return;
        isDragging = false;
        const dx = e.clientX - startX;
        if (Math.abs(dx) > 50) { if (dx < 0) nextSlide(); else prevSlide(); }
        track.style.transition = '';
        layout();
    });

    function getTranslate() {
        const m = new WebKitCSSMatrix(getComputedStyle(track).transform);
        return m.m41;
    }

    function highlight() {
        const vp = track.parentElement.getBoundingClientRect();
        const center = vp.left + vp.width / 2;
        cards.forEach(c => {
            const r = c.getBoundingClientRect();
            const d = Math.abs(r.left + r.width / 2 - center);
            const s = Math.max(.92, 1 - d / (vp.width * 1.2));
            c.style.transform = `scale(${s})`;
            c.style.opacity = s < .95 ? .9 : 1;
        });
    }

    createDots();
    setTimeout(layout, 20);
})();

const words = ['Web Developer', 'Creative Designer', 'Digital Creator'];
const TYPING_SPEED = 80;
const DELETING_SPEED = 40;
const PAUSE_AFTER_TYPING = 1400;
const PAUSE_AFTER_DELETING = 250;
const el = document.getElementById('typed');
let wordIndex = 0, charIndex = 0, typing = true;

function tick() {
    const current = words[wordIndex];
    if (typing) {
        charIndex++;
        el.textContent = current.slice(0, charIndex);
        if (charIndex >= current.length) {
            typing = false;
            setTimeout(tick, PAUSE_AFTER_TYPING);
            return;
        }
        setTimeout(tick, TYPING_SPEED);
    } else {
        charIndex--;
        el.textContent = current.slice(0, charIndex);
        if (charIndex <= 0) {
            typing = true;
            wordIndex = (wordIndex + 1) % words.length;
            setTimeout(tick, PAUSE_AFTER_DELETING);
            return;
        }
        setTimeout(tick, DELETING_SPEED);
    }
}
setTimeout(tick, 400);


document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();
    alert('Thank you for your message! I will get back to you soon.');
    this.reset();
});