const hamburger = document.getElementById('navbar-hamb');
const navbar = document.getElementById('navbar');
const liElements = document.querySelectorAll('#navbar ul li');

hamburger.onclick = () => {
    hamburger.classList.toggle('active-ham');
    navbar.classList.toggle('nav-open');
};

liElements.forEach(li => {
    li.addEventListener('click', () => {
        hamburger.classList.remove('active-ham');
        navbar.classList.remove('nav-open');
    });
});