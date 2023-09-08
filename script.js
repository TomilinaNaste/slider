
const carousel = document.querySelector('.carousel');
const arrowIcons = document.querySelectorAll('.wrapper i');
const firstImg = document.querySelectorAll('img')[0];


let isDragStart = false, prevPageX, prevScrollLeft;



const showHideIcons = () => {
    let scrollWidth = carousel.scrollWidth - carousel.clientWidth; // getting max scrollable width
    arrowIcons[0].style.display = carousel.scrollLeft == 0 ? "none" : "block";
    arrowIcons[1].style.display = carousel.scrollLeft == scrollWidth ? "none" : "block";

}

arrowIcons.forEach(icon => {
    icon.addEventListener("click", () => {
        let firstImgWidth = firstImg.clientWidth + 14;
        carousel.scrollLeft += icon.id == 'left' ? -firstImgWidth : firstImgWidth;
        setTimeout(() => showHideIcons(), 60);
    })
})

const dragStart = (e) => {
    //oбновление значения глобальных переменных при событии нажатия мыши
    isDragStart = true;
    prevPageX = e.pageX || e.touches[0].pageX ;
    prevScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
    //прокрутка изображения влево по указателю мыши
    if(!isDragStart) return;
    e.preventDefault();
    carousel.classList.add('dragging');
    let positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
    carousel.scrollLeft = prevScrollLeft - positionDiff;
    showHideIcons();
}


const dragStop = () => {
    isDragStart = false;
    carousel.classList.remove('dragging');
    autoSlide();
}

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("touchstart", dragStart);

document.addEventListener("mousemove", dragging);
carousel.addEventListener("touchmove", dragging);

document.addEventListener("mouseup", dragStop);
carousel.addEventListener("touchend", dragStop);
