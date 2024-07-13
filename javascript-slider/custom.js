// JAVASCRIPT SLIDER

const slider = document.querySelectorAll('.item');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const paginations = document.querySelector('.paginations');

let sliderIncreament = 0;

function updateSlider() {
    slider[0].classList.add('active')

    if(sliderIncreament <= slider) {
        sliderIncreament = slider.length
    } else if (sliderIncreament >= slider.length) {
        sliderIncreament = 0
    }

    for(let i = 0; i < slider.length; i++) {
        slider[i].classList.remove('active');
    }
    slider[sliderIncreament].classList.add('active');

    const listPagination = document.querySelectorAll('.list')
    listPagination.forEach(items => {
        items.classList.remove('active')
    })
    listPagination[sliderIncreament].classList.add('active')
}

function generatePagination() {
    let paginate = ''
    for(let i = 0; i < slider.length; i++) {
        i === 0 ? activeClass = 'active' : activeClass = '';
        paginate +=  `<li class='list ${activeClass}'></li>`;
    }

    paginations.innerHTML = paginate
} 

prevBtn.addEventListener('click', function() { 
    sliderIncreament--;
    console.log(sliderIncreament);
    updateSlider()
})
nextBtn.addEventListener('click', function() { 
    sliderIncreament++;
    console.log(sliderIncreament);
    updateSlider()
})
generatePagination() 
updateSlider()
