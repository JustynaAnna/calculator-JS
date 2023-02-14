
//This is a project I made following a tutorial on youtube (https://www.youtube.com/watch?v=U5uKj7KpKV8&t=151s&ab_channel=MikuCode). 
//I followed the code in JavaScript step by step after the youtuber. 
//In CSS, based on the original code, I allowed myself to make my own changes.


// the comments below in the code -is my process of learning and explaining to me what was done.

let numbers = document.querySelectorAll('.number');
let operators = document.querySelectorAll('.operator');
let clearAc = document.querySelector('.clear');
let del = document.querySelector('.delete');
let equals = document.querySelector('.equal');
let resultPrevious = document.querySelector('.previous-action');
let resultCurrent = document.querySelector('.current-operation');


let currentOperation = '';
let previousActions = '';
let operation = undefined; // Jest to zmienna niezadeklarowana. Jest to aktualnie wybrana operacja. Czyli jeżeli ktoś wybierze + to zmienna zmieni sie na +;//


const calculate = () => {
    let action;
    if (!previousActions || !currentOperation) {
        return;
    }
    const previous = parseFloat(previousActions); // Zamiana na l.
    const current = parseFloat(currentOperation);

    if (isNaN(previous) || isNaN(current)) {
        return;
    }

    switch (operation) {
        case '+':
            action = previous + current;
            break;
        case '-':
            action = previous - current;
            break;
        case '×':
            action = previous * current;
            break;
        case '÷':
            if(current === 0 ){
                clearResult();
                return;
            }
            action = previous / current;
            break;
        case '√':
            action = Math.pow(previous, 1/current);
            
            break;
        case '%':
            action = previous / 100 * current;
            break;
        case '^':
            action = Math.pow(previous, current);
            break;
        case 'log':
            action = Math.log(previous) / Math.log(current); // Metoda Math.log zwraca logarytm naturalny z liczby, która podamy. My chcemy, aby użytkownik nie tylko podał liczbe logarytmowaną, ale podał nam podstawę. Nie zwracamy log. naturalnego o podstawie e, ale o podstawie, ktorą podał użytkownik. Zastosowaliśmy wzór na zmianę podstawy logarytmu
            break;
        default:
            return;
    }

    currentOperation = action;
    operation = undefined;
    previousActions = '';
}

const selectOperation = (operator) => {
    if (currentOperation === '') {
        return; // JEŻELI NASZ KALKULATOR JEST PUSTY wyjdz z tego dziłania, na pustym nie zrobimy operacji
    }
    if (previousActions !== '') {
        const previous = resultPrevious.innerText;
        if(currentOperation.toString()=== '0' && previous[previous.length-1]==='÷'){ 
            clearResult();
            return;
        } 
       
        calculate();
    }
    operation = operator;
    previousActions = currentOperation;
    currentOperation = '';
}


const updateResult = () => {
    resultCurrent.innerText = currentOperation;
    if (operation != null) {
        resultPrevious.innerText = previousActions + operation;
    } else {
        resultPrevious.innerText = '';
    }

}

const addNumber = (number) => {
    if (number === '•') {
        if (currentOperation.includes('.')) {
            return; //Jeśli zadanie zawiera kropkę to -wyjdz z funkcji. Nic nie rób. nie dodawaj kolejnej kropki
        }
        number = '.'
    }
    currentOperation = currentOperation.toString() + number.toString();
}

const deleteNumber = () => {
    currentOperation = currentOperation.toString().slice(0, -1);
}

const clearResult = () => {
     currentOperation = '';
     previousActions = '';
     operation = undefined;
}


numbers.forEach((number) => {
    number.addEventListener('click', () => {
        addNumber(number.innerText);
        updateResult();
    })

})

del.addEventListener('click', () => {
    deleteNumber();
    updateResult();
})

operators.forEach((operator) => {
    operator.addEventListener('click', () => {
        selectOperation(operator.innerText);
        updateResult();
    })
})

equals.addEventListener('click', () => {
    calculate();
    updateResult();
})

clearAc.addEventListener('click', () =>{
    clearResult();
    updateResult();
})