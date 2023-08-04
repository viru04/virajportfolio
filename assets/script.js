let mybutton = document.getElementById("myBtn");
const aboutMe=document.querySelector(".about-span1");



// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

function showAboutMe() {
    const aboutMePage = document.getElementById('AboutMe-page');
    const fullContent = document.getElementById('full-content');
  
    const isAboutMeVisible = aboutMePage.style.display === 'block';
  
    if (isAboutMeVisible) {
      aboutMePage.style.display = 'none';
      fullContent.style.display = 'block';
    } else {
      aboutMePage.style.display = 'block';
      fullContent.style.display = 'none';
  
      // Push the state to the browser history when showing the AboutMe-page
      history.pushState({ page: 'AboutMe' }, null, '#AboutMe');
    }
  }
  
  function hideAboutMe() {
    const aboutMePage = document.getElementById('AboutMe-page');
    const fullContent = document.getElementById('full-content');
  
    const isAboutMeVisible = aboutMePage.style.display === 'block';
  
    if (isAboutMeVisible) {
      aboutMePage.style.display = 'none';
      fullContent.style.display = 'block';
    } else {
      aboutMePage.style.display = 'block';
      fullContent.style.display = 'none';
  
      // Push the state to the browser history when showing the AboutMe-page
      history.pushState({ page: 'AboutMe' }, null, '#AboutMe');
    }
  }
  // Listen for the onpopstate event when the browser back button is clicked
  window.onpopstate = function(event) {
    const aboutMePage = document.getElementById('AboutMe-page');
    const fullContent = document.getElementById('full-content');
  
    if (event.state && event.state.page === 'AboutMe') {
      // If the state indicates the AboutMe-page was shown, show it and hide the full content
      aboutMePage.style.display = 'block';
      fullContent.style.display = 'none';
    } else {
      // Otherwise, show the full content and hide the AboutMe-page
      aboutMePage.style.display = 'none';
      fullContent.style.display = 'block';
    }
  };

  

  let isScrolling;

function hideScrollbar() {
  document.body.style.scrollbarWidth = 'none';
}

function showScrollbar() {
  document.body.style.scrollbarWidth = 'thin';
  clearTimeout(isScrolling);
  isScrolling = setTimeout(hideScrollbar, 500);
}

window.addEventListener('scroll', function () {
  // Show the scrollbar when scrolling
  showScrollbar();
});








  
