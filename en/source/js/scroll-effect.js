window.addEventListener('scroll', function() {
    var element = document.querySelector('.about');
    var positionFromTop = element.getBoundingClientRect().top;
  
    var windowHeight = window.innerHeight;
  
    if (positionFromTop - windowHeight <= 0) {
      element.style.opacity = 1;
    }
  });

window.addEventListener('scroll', function() {
    var element = document.querySelector('.services');
    var positionFromTop = element.getBoundingClientRect().top;
  
    var windowHeight = window.innerHeight;
  
    if (positionFromTop - windowHeight <= 0) {
      element.style.opacity = 1;
    }
  });

window.addEventListener('scroll', function() {
    var element = document.querySelector('.recommended-packages');
    var positionFromTop = element.getBoundingClientRect().top;
  
    var windowHeight = window.innerHeight;
  
    if (positionFromTop - windowHeight <= 0) {
      element.style.opacity = 1;
    }
  });

window.addEventListener('scroll', function() {
    var element = document.querySelector('.portfolio-section');
    var positionFromTop = element.getBoundingClientRect().top;
  
    var windowHeight = window.innerHeight;
  
    if (positionFromTop - windowHeight <= 0) {
        element.style.opacity = 1;
    }
  });

window.addEventListener('scroll', function() {
    var element = document.querySelector('.clients');
    var positionFromTop = element.getBoundingClientRect().top;
  
    var windowHeight = window.innerHeight;
  
    if (positionFromTop - windowHeight <= 0) {
      element.style.opacity = 1;
    }
  });

window.addEventListener('scroll', function() {
    var element = document.querySelector('.contact');
    var positionFromTop = element.getBoundingClientRect().top;
  
    var windowHeight = window.innerHeight;
  
    if (positionFromTop - windowHeight <= 0) {
      element.style.opacity = 1;
    }
  });