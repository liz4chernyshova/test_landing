const stagesTrack = document.getElementById('stages-carousel-track');
const dotsContainer = document.getElementById('dots');
const prevBtn = document.querySelector('.stages-carousel-prev');
const nextBtn = document.querySelector('.stages-carousel-next');
const stagesCards = stagesTrack.children;
const stagesTotal = stagesCards.length;
const cardWidth = stagesCards[0].offsetWidth + 20;

let stagesIndex = 0;

for (let i = 0; i < stagesTotal; i++) {
  const dot = document.createElement('span');
  if (i === 0) dot.classList.add('active');
  dotsContainer.appendChild(dot);
}

const dots = dotsContainer.querySelectorAll('span');

function updateStagesCarousel() {
  stagesTrack.style.transform = `translateX(-${stagesIndex * cardWidth}px)`;

  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === stagesIndex);
  });

  prevBtn.disabled = stagesIndex === 0;
  nextBtn.disabled = stagesIndex === stagesTotal - 1;
}

nextBtn.addEventListener('click', () => {
  if (stagesIndex < stagesTotal - 1) {
    stagesIndex++;
    updateStagesCarousel();
  }
});

prevBtn.addEventListener('click', () => {
  if (stagesIndex > 0) {
    stagesIndex--;
    updateStagesCarousel();
  }
});

dots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    stagesIndex = i;
    updateStagesCarousel();
  });
});

updateStagesCarousel();


const track = document.getElementById('carousel-track');
const prevButtons = document.querySelectorAll('.prev');
const nextButtons = document.querySelectorAll('.next');
const indicators = document.querySelectorAll('.indicator');

let index = 0;
let autoSlide;
const GAP = 20;
const totalCards = track.children.length;

function getCardsToShow() {
  return window.innerWidth <= 768 ? 1 : 3;
}

function getCardWidth() {
  return window.innerWidth <= 768 ? 335 : 394;
}

function getCardOffset() {
  return getCardWidth() + GAP;
}

function updateCarousel() {
  const offset = getCardOffset();
  track.style.transform = `translateX(-${index * offset}px)`;

  const visible = getCardsToShow();
  const shown = Math.min(totalCards, index + visible);
  const text = `${shown} / ${totalCards}`;
  indicators.forEach(ind => ind.textContent = text);
}

function nextSlide() {
  if (index < totalCards - getCardsToShow()) {
    index++;
  } else {
    index = 0;
  }
  updateCarousel();
}

function prevSlide() {
  if (index > 0) {
    index--;
  } else {
    index = totalCards - getCardsToShow();
  }
  updateCarousel();
}

nextButtons.forEach(btn =>
  btn.addEventListener('click', () => {
    nextSlide();
    resetAutoSlide();
  })
);

prevButtons.forEach(btn =>
  btn.addEventListener('click', () => {
    prevSlide();
    resetAutoSlide();
  })
);

window.addEventListener('resize', () => {
  index = 0;
  updateCarousel();
});

function startAutoSlide() {
  autoSlide = setInterval(nextSlide, 4000);
}

function resetAutoSlide() {
  clearInterval(autoSlide);
  startAutoSlide();
}

updateCarousel();
startAutoSlide();


document.addEventListener('DOMContentLoaded', () => {
  const block = document.querySelector('.stages');

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.5 }
  );

  observer.observe(block);
});
