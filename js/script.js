// Smooth Section Scrolling JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Select all links with hashes (like <a href="#section1">)
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    
    // Add click event listeners to each link
    scrollLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        // Prevent the default link behavior
        e.preventDefault();
        
        // Get the target section from the href attribute
        const targetId = this.getAttribute('href');
        
        // Return early if the href is just "#" (often used for buttons)
        if (targetId === '#') return;
        
        // Find the target element
        const targetSection = document.querySelector(targetId);
        
        // If target section exists, scroll to it
        if (targetSection) {
          // Get any offset from a data attribute or use 0
          const offset = parseInt(this.dataset.offset || 0);
          
          // Calculate the final scroll position
          const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - offset;
          
          // Perform the smooth scroll
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
          
          // Update URL (optional, comment out if not needed)
          history.pushState(null, null, targetId);
        }
      });
    });
    
    // Optional: Add active class to the current section in navigation
    window.addEventListener('scroll', function() {
      const scrollPosition = window.scrollY;
      
      // Find all sections
      const sections = document.querySelectorAll('section');
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 100; // Offset for better UX
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          // Remove active class from all navigation links
          document.querySelectorAll('nav a').forEach(link => {
            link.classList.remove('active');
          });
          
          // Add active class to the current section's navigation link
          const activeLink = document.querySelector(`nav a[href="#${sectionId}"]`);
          if (activeLink) {
            activeLink.classList.add('active');
          }
        }
      });
    });
  });