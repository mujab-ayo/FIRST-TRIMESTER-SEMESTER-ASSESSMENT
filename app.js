const expression = document.getElementById('expression');
const result = document.getElementById('result');
const numBtns = document.querySelectorAll('.btn-number');
const opBtns = document.querySelectorAll('.btn-operator');
const clearBtn = document.querySelector('.btn-clear');
const equalsBtn = document.querySelector('.btn-equals');
const delBtn = document.querySelector('.btn-back');


let firstOperand = '';
let secondOperand = '';
let operator = '';
let res = 0;
let isSecondOperand = false;

const operandVerifier = (value) => {
  if (!isSecondOperand) {
    firstOperand += value;
  } else {
    secondOperand += value;
  }
  displayExpression();
};


numBtns.forEach(btn => {
    btn.addEventListener('click', () => {
       operandVerifier(btn.textContent)

        displayExpression();
    })
});

opBtns.forEach(btn => {
    
    btn.addEventListener('click', () => {
        if (!firstOperand) return; // this prevent operator selection before first operand
        if(firstOperand) {
            operator = btn.dataset.op;
            isSecondOperand = true;
        }

        displayExpression();
    });
});

document.addEventListener("keydown", (e) => {
  const key = e.key;

  if (!isNaN(key) || key === ".") {
    operandVerifier(key);
  }

  if (["+", "-", "*", "/"].includes(key)) {
    if (firstOperand) {
      operator = key === "*" ? "×" : key === "/" ? "÷" : key;
      isSecondOperand = true;
      displayExpression();
    }
  }

  if (key === "Enter") {
    if (firstOperand && secondOperand && operator) {
      calculateResult();
      result.textContent = res;
    }
  }

  if (key === "Backspace") {
    handleBackspace();
  }
});

const handleBackspace = () => {
  if (secondOperand) {
    secondOperand = secondOperand.slice(0, -1);
  } else if (operator) {
    operator = '';
    isSecondOperand = false;
  } else if (firstOperand) {
    firstOperand = firstOperand.slice(0, -1);
  }
  displayExpression();
};






const displayExpression = () => {
    expression.textContent = `${firstOperand} ${operator} ${secondOperand}`;
};      

const calculateResult = () => {
    
    const num1 = parseFloat(firstOperand);
    const num2 = parseFloat(secondOperand);

    switch(operator) {
        case '+':
            res = num1 + num2;
            break;
        case '-':
            res = num1 - num2;
            break;
        case '×':
            res = num1 * num2;
            break;
        case '÷':
            res = num1 / num2;
            break;
        case '^':
            res = Math.pow(num1, num2);
            break;
        default:
            res = 'Invalid';
    }

};

const displayResult = () => {
    equalsBtn.addEventListener('click', () => {
        if(firstOperand && secondOperand && operator) {
            calculateResult();
            result.textContent = res;
        }
})
}


clearBtn.addEventListener('click', () => {
    firstOperand = '';
    secondOperand = '';
    operator = '';
    res = 0;
    isSecondOperand = false;
    expression.textContent = '';
    result.textContent = '0';
})

delBtn.addEventListener('click', () => {
    if (secondOperand) {
        secondOperand = secondOperand.slice(0, -1); 
    } else if (operator) {
        operator = ''; 
        isSecondOperand = false;
    } else if (firstOperand) {
        firstOperand = firstOperand.slice(0, -1); 
    }
    displayExpression();
});

displayResult()