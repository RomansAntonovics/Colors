const cols = document.querySelectorAll('.col');

function generateColours() {

    const hexCodes = '0123456789ABCDEF';
    let color = '';
    for (let i = 0; i < 6; i++) {
        color += hexCodes[Math.floor(Math.random() * hexCodes.length)]
    }
    return '#' + color;
}

//29.25
document.addEventListener('click', event => {
    const type = event.target.dataset.type;

    if (type === 'lock') {
        const node = event.target.tagName.toLowerCase() === 'i' 
        ? event.target 
        : event.target.children[0]
        
        node.classList.toggle('fa-lock-open');
        node.classList.toggle('fa-lock')
    } else if (type === 'copy') {
        copyToClickboard(event.target.textContent)
    }

})

function copyToClickboard(text){
return navigator.clipboard.writeText(text)
}

function setRandomColours() {
    cols.forEach((col) => {
        const isLocked = col.querySelector('i').classList.contains('fa-lock')
        const text = col.querySelector('h2');
        const color = chroma.random();
        

        if (isLocked) {
        return
    }
        
        text.textContent = color;
        col.style.background = color;
        
        setTextColour(text, color);
        //setTextColour(button, color);

    })
}

function setTextColour(text, color){
const luminance = chroma(color).luminance();
text.style.color = luminance > 0.5 ? 'black' : 'white'
}

setRandomColours() 