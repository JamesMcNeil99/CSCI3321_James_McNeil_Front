var receiveOp = false;
var err = false;
//main function called when any button is clicked
function addToDisplay(d){
    //regex patterns to check for when function is called
    var operatorsPattern = new RegExp('[\\+\\-\\*\\/]');
    var digitsPattern = new RegExp('[0-9]');
    var acPattern = new RegExp('AC');
    var equalsPattern = new RegExp('=');
    //clears the "Err" message off the screen if it is encountered
    if(err){
        var display = document.getElementById("output");
        display.innerHTML = '';
        err = false;
    }
    //Checks for an operator and checks if an operator is valid
    if(operatorsPattern.test(d) && receiveOp){
        var display = document.getElementById("output");
        display.innerHTML+= d;
        receiveOp = false;
    }
    //Checks for a digit entry, enables operators to be added if they were disabled
    else if(digitsPattern.test(d)){
        var display = document.getElementById("output");
        display.innerHTML+= d;
        receiveOp = true;
    }
    //Clears the display and ensure operators cannot be typed before an operand
    else if(acPattern.test(d)){
        receiveOp = false;
        var display = document.getElementById("output");
        display.innerHTML = '';
    }
    //Checks for equals, does nothing if display is empty, otherwise calls evalExpression() to solve
    else if(equalsPattern.test(d)){
        receiveOp = false;
        var display = document.getElementById("output");
        var currentExpression = display.innerHTML;
        if(!operatorsPattern.test(currentExpression.charAt(currentExpression.length-1))){
            evalExpression();
        }
        else{
            display.innerHTML="Err";
            err = true;
        }
    }
}
//Evaluates display box by converting to postfix and then solving, updates display with solution
function evalExpression(){
    var expression = document.getElementById("output").innerHTML;
    //converts string display value to postfix array
    expression = convertToPostFix(expression);
    var operatorsPattern = new RegExp('[\\+\\-\\*\\/]');
    var digitsPattern = new RegExp('[0-9]');
    
    var solution;
    var evalStack = [];
    //loops until postfix array is empty, evalStack will have 1 element which is the evaluated expression
    while(expression.length > 0){
        currentTerm = expression[0];
        expression.splice(0,1);
        if(operatorsPattern.test(currentTerm.toString()) && !digitsPattern.test(currentTerm.toString())){
            var op2 = evalStack.pop();
            var op1 = evalStack.pop();
            if(currentTerm === '+'){
                evalStack.push(op1 + op2);
            }
            else if(currentTerm === '-'){
                evalStack.push(op1 - op2);
            }
            else if(currentTerm === '*'){
                evalStack.push(op1 * op2);
            }
            else{
                if(op2 === 0){
                    document.getElementById("output").innerHTML="Err";
                    err = true;
                    return;
                } 
                evalStack.push(op1 / op2);
            }
        }
        else{
            evalStack.push(currentTerm);
        }
    }
    //updates display with solution and re-enables operators to be added
    solution = evalStack.pop().toString();
    document.getElementById("output").innerHTML = solution;
    receiveOp = true;
}
//takes string expression and converts to postfix array
function convertToPostFix(expression){
    var digitsPattern = new RegExp('[0-9]');
    var postfix = [];
    var opstack = [];
    var i = 0;
    var currentTerm = '';
    //loops until index i equals the length of the string expression
    while(expression.length > i){
        //handles the event in which a leading negative sign is present from a previous calculation
        if(postfix.length == 0 && expression.charAt(0) ==='-'){
            currentTerm += '-'
            i++;
        }
        //Tests for a digit, then reads in digits until an operator is encountered
        if(digitsPattern.test(expression.charAt(i))){
            while(digitsPattern.test(expression.charAt(i))){
                currentTerm += expression.charAt(i);
                i++;
            }
            currentTerm = parseInt(currentTerm,10);
            postfix.push(currentTerm);
            currentTerm = '';
        }
        //Handles operator, uses stack to check precedence and convert to postfix
        else if(opstack.length == 0){
            opstack.push(expression.charAt(i));
            i++;
        }
        else{
            if((new RegExp('[\\+\\-]')).test(expression.charAt(i))){
                for(var j = 0;j <= opstack.length;j++ ){
                    postfix.push(opstack.pop());
                }
                opstack.push(expression.charAt(i));
                i++;
            }
            else{
                if(new RegExp('[\\*\\/]').test(opstack[opstack.length-1])){
                    while((new RegExp('[\\*\\/]').test(opstack[opstack.length-1]))){
                        postfix.push(opstack.pop());
                    }
                    opstack.push(expression.charAt(i));
                    i++;
                }
                else{
                    opstack.push(expression.charAt(i));
                    i++;
                }
            }
        }
    }
    for(var i = 0;i <= opstack.length;i++ ){
        postfix.push(opstack.pop());
    }
    return postfix;
}