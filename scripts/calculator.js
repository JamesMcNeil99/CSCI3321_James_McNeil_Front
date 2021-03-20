var receiveOp = false;
var err = false;
function addToDisplay(d){
    var operatorsPattern = new RegExp('[\\+\\-\\*\\/]');
    var digitsPattern = new RegExp('[0-9]');
    var acPattern = new RegExp('AC');
    var equalsPattern = new RegExp('=');
    if(err){
        var display = document.getElementById("output");
        display.innerHTML = '';
        err = false;
    }
    if(operatorsPattern.test(d) && receiveOp){
        var display = document.getElementById("output");
        display.innerHTML+= d;
        receiveOp = false;
    }
    else if(digitsPattern.test(d)){
        var display = document.getElementById("output");
        display.innerHTML+= d;
        receiveOp = true;
    }
    else if(acPattern.test(d)){
        receiveOp = false;
        var display = document.getElementById("output");
        display.innerHTML = '';
    }
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
function evalExpression(){
    var expression = document.getElementById("output").innerHTML;
    expression = convertToPostFix(expression);
    var operatorsPattern = new RegExp('[\\+\\-\\*\\/]');
    var digitsPattern = new RegExp('[0-9]');
    var solution;
    var evalStack = [];
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
                evalStack.push(op1 / op2);
            }
        }
        else{
            evalStack.push(currentTerm);
            console.log('added ' + currentTerm + ' to eval stack');
        }
    }
    solution = evalStack.pop().toString();
    document.getElementById("output").innerHTML = solution;
    receiveOp = true;
}
function convertToPostFix(expression){
    var digitsPattern = new RegExp('[0-9]');

    var postfix = [];
    var opstack = [];
    var i = 0;
    var currentTerm = '';
    while(expression.length > i){
        if(postfix.length == 0 && expression.charAt(0) ==='-'){
            currentTerm += '-'
            i++;
        }
        if(digitsPattern.test(expression.charAt(i))){
            while(digitsPattern.test(expression.charAt(i))){
                currentTerm += expression.charAt(i);
                i++;
            }
            currentTerm = parseInt(currentTerm,10);
            postfix.push(currentTerm);
            currentTerm = '';
        }
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