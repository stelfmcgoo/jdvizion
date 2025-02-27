document.addEventListener('DOMContentLoaded', function() {
  // Carousel Images - Add your image paths and metadata here
  const carouselImages = [
      {
          src: '../images/carousel/crsl-1.jpg',
          alt: 'n/a',
          caption: 'n/a',
          orientation: 'landscape'
      },
      {
          src: '../images/carousel/crsl-2.jpg',
          alt: 'n/a',
          caption: 'n/a',
          orientation: 'landscape'
      },
      {
          src: '../images/carousel/crsl-3.jpg',
          alt: 'n/a',
          caption: 'n/a',
          orientation: 'portrait'
      },
      {
          src: '../images/carousel/crsl-4.jpg',
          alt: 'n/a',
          caption: 'n/a',
          orientation: 'landscape'
      },
      {
          src: '../images/carousel/crsl-5.jpg',
          alt: 'n/a',
          caption: 'n/a',
          orientation: 'landscape'
      }
  ];

  // Carousel Elements
  const carouselTrack = document.querySelector('.carousel-track');
  const indicators = document.querySelector('.carousel-indicators');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  
  let currentIndex = 0;
  let autoplayInterval;
  
  // Build Carousel Slides
  function buildCarousel() {
      // Clear existing content
      carouselTrack.innerHTML = '';
      indicators.innerHTML = '';
      
      // Create slides
      carouselImages.forEach((image, index) => {
          // Create slide
          const slide = document.createElement('div');
          slide.className = 'carousel-slide';
          
          // Create image
          const img = document.createElement('img');
          img.src = image.src;
          img.alt = image.alt;
          img.className = `carousel-image ${image.orientation}`;
          
          // Create caption
          const caption = document.createElement('div');
          caption.className = 'carousel-caption';
          caption.textContent = image.caption;
          
          // Append elements
          slide.appendChild(img);
          slide.appendChild(caption);
          carouselTrack.appendChild(slide);
          
          // Create indicator
          const indicator = document.createElement('div');
          indicator.className = `indicator ${index === 0 ? 'active' : ''}`;
          indicator.dataset.index = index;
          indicators.appendChild(indicator);
          
          // Add click event to indicator
          indicator.addEventListener('click', () => {
              goToSlide(index);
          });
      });
  }
  
  // Go to specific slide
  function goToSlide(index) {
      // Update current index
      currentIndex = index;
      
      // Update transform
      carouselTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
      
      // Update indicators
      document.querySelectorAll('.indicator').forEach((indicator, idx) => {
          indicator.classList.toggle('active', idx === currentIndex);
      });
      
      // Reset autoplay
      resetAutoplay();
  }
  
  // Navigate to next slide
  function nextSlide() {
      currentIndex = (currentIndex + 1) % carouselImages.length;
      goToSlide(currentIndex);
  }
  
  // Navigate to previous slide
  function prevSlide() {
      currentIndex = (currentIndex - 1 + carouselImages.length) % carouselImages.length;
      goToSlide(currentIndex);
  }
  
  // Start autoplay
  function startAutoplay() {
      autoplayInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
  }
  
  // Reset autoplay
  function resetAutoplay() {
      clearInterval(autoplayInterval);
      startAutoplay();
  }
  
  // Event Listeners
  nextBtn.addEventListener('click', () => {
      nextSlide();
  });
  
  prevBtn.addEventListener('click', () => {
      prevSlide();
  });
  
  // Touch support for mobile
  let touchStartX = 0;
  let touchEndX = 0;
  
  carouselTrack.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
  });
  
  carouselTrack.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
  });
  
  function handleSwipe() {
      const swipeThreshold = 50; // Minimum distance to register as swipe
      
      if (touchEndX < touchStartX - swipeThreshold) {
          // Swiped left, go to next slide
          nextSlide();
      } else if (touchEndX > touchStartX + swipeThreshold) {
          // Swiped right, go to previous slide
          prevSlide();
      }
  }
  
  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
          prevSlide();
      } else if (e.key === 'ArrowRight') {
          nextSlide();
      }
  });
  
  // Pause autoplay when user hovers over carousel
  carouselTrack.addEventListener('mouseenter', () => {
      clearInterval(autoplayInterval);
  });
  
  carouselTrack.addEventListener('mouseleave', () => {
      startAutoplay();
  });
  
  // Initialize carousel
  buildCarousel();
  startAutoplay();

  // For demonstration purposes, you might want to use placeholder images
  // if your actual images aren't available yet
  document.querySelectorAll('.carousel-image').forEach(img => {
      if (!img.complete || img.naturalHeight === 0) {
          
      }
  });
});