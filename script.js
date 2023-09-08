
const carousel = document.querySelector('.carousel');
const arrowIcons = document.querySelectorAll('.wrapper i');
const firstImg = document.querySelectorAll('img')[0];


let isDragStart = false, prevPageX, prevScrollLeft;
let firstImgWidth = firstImg.clientWidth + 14;



arrowIcons.forEach(icon => {
    icon.addEventListener("click", () => {
        carousel.scrollLeft += icon.id == 'left' ? -firstImgWidth : firstImgWidth;
        
    })
})

const dragStart = (e) => {
    //oбновление значения глобальных переменных при событии нажатия мыши
    isDragStart = true;
    prevPageX = e.pageX;
    prevScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
    //прокрутка изображения влево по указателю мыши
    if(!isDragStart) return;
    e.preventDefault();
    let positionDiff = e.pageX - prevPageX;
    carousel.scrollLeft = prevScrollLeft - positionDiff;
}


const dragStop = () => {
    isDragStart = false;
}

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
carousel.addEventListener("mouseup", dragStop);
