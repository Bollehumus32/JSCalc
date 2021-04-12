class Calculator {
    constructor(prevOperandTextElement, currentOperandTextElement, keyPressedNumbersAllowed, keyPressedOperatorsAllowed) {
        this.prevOperandTextElement = prevOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.keyPressedNumbersAllowed = keyPressedNumbersAllowed;
        this.keyPressedOperatorsAllowed = keyPressedOperatorsAllowed;
        this.clear()
    }

    // on key up
    onKeyUp(event) {
        let keyName = event.key;
        if(textArea === document.activeElement) {

        }

        else {

            // Numbers 0-9
            if(keyPressedNumbersAllowed.includes(keyName)) {
                this.appendNumber (keyName);
                this.updateDisplay();
            }
       
            // Operators /, *, -, +, =
            if(keyPressedOperatorsAllowed.includes(keyName)) {
                this.chooseOperation(keyName);
                this.updateDisplay();
            }
        
            // Backspace to reset value and display value
            if(keyName == 'Backspace') {
                this.clear();
                this.updateDisplay();
            }
        
            // Dot 
            if(keyName == ',' || keyName == '.') {
                this.appendNumber(keyName);
                this.updateDisplay();
            }

            if(keyName == 'Enter' || keyName =='=') {
                this.compute();
                this.updateDisplay();
            }
        }

    };
// ------------------------------------------------------------------------ //

clear() {
this.currentOperand = '';
this.previousOperand = '';
this.operation = undefined;
}

// ------------------------------------------------------------------------ //

delete () {
this.currentOperand = this.currentOperand.toString().slice(0,-1);
if(this.currentOperand.length === 0) this.currentOperand = 0;
}

// ------------------------------------------------------------------------ //

//appendNumber is basically just the appearence of numbers when you click a number button
appendNumber(number)  {
    if(number === '.' && this.currentOperand.includes('.')) return;
this.currentOperand = this.currentOperand.toString() + number.toString();

}

// ------------------------------------------------------------------------ //

chooseOperation(operation) {
    if(this.currentOperand !== '') {
        this.compute();
    }
    if(this.currentOperand === '') return;
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
}

// ------------------------------------------------------------------------ //

compute() {
let computation
const prev = parseFloat(this.previousOperand)
const current = parseFloat(this.currentOperand)

if(isNaN(prev) || isNaN(current)) return;

switch(this.operation) {
    case '+': 
    computation = prev + current
    break

    case '-': 
    computation = prev - current
    break

    case '÷': 
    computation = prev / current
    break

    case '×': 
    computation = prev * current
    break
    
    default: return;
}

this.currentOperand = computation
this.operation = undefined;
this.previousOperand = '';


}

// ------------------------------------------------------------------------ //

getDisplayNumber(number) {
const stringNumber = number.toString();
const intDig = parseFloat(stringNumber.split('.')[0])
const decimalDig = stringNumber.split('.')[1]
let integerDisplay
if (isNaN(intDig)) {
    integerDisplay = '';
}
else {
    integerDisplay = intDig.toLocaleString('en', {maximumFractionDigits: 0})
}

if(decimalDig != null) {
    return `${integerDisplay}.${decimalDig}`
}
else{
    return integerDisplay;
}

}

// ------------------------------------------------------------------------ //

updateDisplay() {
this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);
if(this.operation != null) {
this.prevOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
} else {
    this.prevOperandTextElement.innerText = '';
}
    }

// ------------------------------------------------------------------------ //

copyText() {

navigator.clipboard.writeText(this.currentOperand);
      
}

// ------------------------------------------------------------------------ //

pasteText() {
        this.currentOperand.focus();
        document.execCommand("paste");
        this.appendNumber(this.currentOperand.textContent);
        this.updateDisplay();
}

// ------------------------------------------------------------------------ //

} // end of calculator bracket

// ------------------------------------------------------------------------ //

const numButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const delButton = document.querySelector('[data-del]');
const AllClearButton = document.querySelector('[data-all-clear]');
const prevOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');
const copy = document.querySelector('[data-copy]');
const keyPressedNumbersAllowed = ['0','1','2','3','4','5','6','7','8','9'];
const keyPressedOperatorsAllowed = ['/', '*', '-', '+'];
const paste = document.querySelector('[data-paste]');
const textArea = document.querySelector('[data-textArea]');

const calculator = new Calculator(prevOperandTextElement, currentOperandTextElement)

numButtons.forEach(button => {
   button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText) // button.innertext just means whatever the value of the button clicked is, it will append
    calculator.updateDisplay();
   })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
     calculator.chooseOperation(button.innerText) // button.innertext just means whatever the value of the button clicked is, it will append
     calculator.updateDisplay();
     
    })
 })

AllClearButton.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
})

equalsButton.addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
})

delButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
})

copy.addEventListener('click', () => {
    calculator.copyText();
    calculator.updateDisplay();
})

document.addEventListener('keyup', (event) => {
    calculator.onKeyUp(event);
    });

    // W.I.P ----------------------------------------------------------
    /*paste.addEventListener('click', () => { 
        let pastenum = navigator.clipboard.readText().toString();
       calculator.appendNumber(pastenum);
       calculator.updateDisplay();
    });*/




