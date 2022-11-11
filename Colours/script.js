const cols = document.querySelectorAll('.col');

document.addEventListener('keydown', event => {
    event.preventDefault(); //отменяем дефолтное поведение, то есть после обновления страницы заданная установка остаётся прежней
    if (event.code.toLowerCase() === 'space') {
        setRandomColours();
    }
})
function generateColours() {

    const hexCodes = '0123456789ABCDEF';
    let color = '';
    for (let i = 0; i < 6; i++) {
        color += hexCodes[Math.floor(Math.random() * hexCodes.length)]
    }
    return '#' + color;
}



document.addEventListener('click', event => {
    const type = event.target.dataset.type; //в dataset хранится объект всех атрибутов

    if (type === 'lock') {
        const node = event.target.tagName.toLowerCase() === 'i'
            ? event.target
            : event.target.children[0]

        node.classList.toggle('fa-lock-open'); // classList позволяющий работать с классами, toggle - метод отображающий изначально скрытые элементы и скрывает отображённые 
        node.classList.toggle('fa-lock')
    } else if (type === 'copy') {
        copyToClickboard(event.target.textContent)
    }

})
 
function copyToClickboard(text) { //копирует название цвета
    return navigator.clipboard.writeText(text)
}

function setRandomColours(isInitial) {
    const colors = isInitial ? getColorsFromHash() : [];
    cols.forEach((col, index) => {
        const isLocked = col.querySelector('i').classList.contains('fa-lock')
        const text = col.querySelector('h2');
        const button = col.querySelector('button');
        


        if (isLocked) {
            colors.push(text.textContent);
            return
        }
        const color = isInitial ? colors[index] ? colors[index] : chroma.random() : chroma.random(); // библиотека chroma с методом random заменила функцию generateColours ()
        
        if (!isInitial) {
        colors.push(color);
    }
        text.textContent = color;
        col.style.background = color;

        setTextColour(text, color);
        setTextColour(button, color);

    })
    updateColorsHash(colors);
}

function setTextColour(text, color) {
    const luminance = chroma(color).luminance(); // метод luminance меняет цвет текста в зависимости от яркости фона
    text.style.color = luminance > 0.5 ? 'black' : 'white' // если luminance больше чем 0ю5, то текст получает чёртный цвет, иначе - белый.
}


function updateColorsHash(colors = []) {
    document.location.hash = colors
    .map((col) => {
        return col.toString().substring(1)
    })
    .join('-')
}

function getColorsFromHash(){
    if (document.location.hash.length > 1) {
        return document.location.hash
        .substring(1)
        .split('-')
        .map((color) => '#' + color) //возвращает в массиве список всех цветов, но без решётки (substring(1))

    }
    return []
}
setRandomColours(true) 