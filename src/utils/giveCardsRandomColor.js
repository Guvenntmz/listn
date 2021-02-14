import { shuffleArray } from './shuffleArray.js';

export const giveCardsRandomColor = () => {
    const colors = shuffleArray(['#CBC4FC','#FCFAC4','#C4FCE9','#FCC4C4' ]);
    const divs = document.querySelectorAll('.card-bg');
    let i = 0;
    divs.forEach(div => {
        (i == colors.length-1) && (i = 0); 
        div.style.backgroundColor = colors[i];
        i++;
    })
}

