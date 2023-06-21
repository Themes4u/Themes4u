const sliderServices = document.querySelector('.services-container');

let isDownServices = false;
let startXServices;
let scrollLeftServices;

sliderServices.addEventListener('mousedown', (e) => {
  isDownServices = true;
  sliderServices.classList.add('active');
  startXServices = e.pageX - sliderServices.offsetLeft;
  scrollLeftServices = sliderServices.scrollLeft;
});

sliderServices.addEventListener('mouseleave', () => {
  isDownServices = false;
  sliderServices.classList.remove('active');
});

sliderServices.addEventListener('mouseup', () => {
  isDownServices = false;
  sliderServices.classList.remove('active');
});

sliderServices.addEventListener('mousemove', (e) => {
  if (!isDownServices) return;
  e.preventDefault();
  const xServices = e.pageX - sliderServices.offsetLeft;
  const walkServices = (xServices - startXServices) * 3;
  sliderServices.scrollLeft = scrollLeftServices - walkServices;
});

const sliderRecommended = document.querySelector('.recommended-container');

let isDownRecommended = false;
let startXRecommended;
let scrollLeftRecommended;

sliderRecommended.addEventListener('mousedown', (e) => {
  isDownRecommended = true;
  sliderRecommended.classList.add('active');
  startXRecommended = e.pageX - sliderRecommended.offsetLeft;
  scrollLeftRecommended = sliderRecommended.scrollLeft;
});

sliderRecommended.addEventListener('mouseleave', () => {
  isDownRecommended = false;
  sliderRecommended.classList.remove('active');
});

sliderRecommended.addEventListener('mouseup', () => {
  isDownRecommended = false;
  sliderRecommended.classList.remove('active');
});

sliderRecommended.addEventListener('mousemove', (e) => {
  if (!isDownRecommended) return;
  e.preventDefault();
  const xRecommended = e.pageX - sliderRecommended.offsetLeft;
  const walkRecommended = (xRecommended - startXRecommended) * 3;
  sliderRecommended.scrollLeft = scrollLeftRecommended - walkRecommended;
});

const sliderClients = document.querySelector('.clients-container');

let isDownClients = false;
let startXClients;
let scrollLeftClients;

sliderClients.addEventListener('mousedown', (e) => {
  isDownClients = true;
  sliderClients.classList.add('active');
  startXClients = e.pageX - sliderClients.offsetLeft;
  scrollLeftClients = sliderClients.scrollLeft;
});

sliderClients.addEventListener('mouseleave', () => {
  isDownClients = false;
  sliderClients.classList.remove('active');
});

sliderClients.addEventListener('mouseup', () => {
  isDownClients = false;
  sliderClients.classList.remove('active');
});

sliderClients.addEventListener('mousemove', (e) => {
  if (!isDownClients) return;
  e.preventDefault();
  const xClients = e.pageX - sliderClients.offsetLeft;
  const walkClients = (xClients - startXClients) * 3;
  sliderClients.scrollLeft = scrollLeftClients - walkClients;
});