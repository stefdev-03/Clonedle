let messageTimeout;

export function showMessage(msg){
    let el = document.getElementById("answer");
    el.innerText = msg;

    clearTimeout(messageTimeout);
    messageTimeout = setTimeout(() => {
        el.innerText = "";
    }, 2000);
}

export function showAnswer(msg){
    clearTimeout(messageTimeout);
    document.getElementById("answer").innerText = msg;
}

export function clearMessage(){
    showAnswer("");
}