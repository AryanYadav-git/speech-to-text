const copyMsg = document.querySelector("[data-Msg]");
const inputBox = document.getElementById("input");
function startVoiceRecognition(){
    copyMsg.innerText="Listening";
    copyMsg.classList.add("active");
    if('webkitSpeechRecognition' in window){
        var recognition = new webkitSpeechRecognition();
        recognition.lang = 'en-in';
        recognition.continuous = true;
        // recognition.interimResults = true;
        recognition.start();
        recognition.onresult = function(event){
            
            var transcript = event.results[0][0].transcript;
            console.log(event);
            inputBox.value = "";
            var i = 0;
            var interval = setInterval(function(){
                if(i<transcript.length){
                    inputBox.value += transcript[i];
                    i++;
                } else {
                    clearInterval(interval);
                }
            }, 50);
            recognition.stop();
            copyMsg.classList.remove("active");
        }

        recognition.onerror = function(event){
            console.log('Error: ' + event.error);
            copyMsg.classList.remove("active");
        }

        // alert("Mic is on");

    } else {
        alert("Doesn't support");
    }
}

async function copyContent(){
    try{
       await navigator.clipboard.writeText(inputBox.value);
       copyMsg.innerText="copied";
    }
    catch(e){
        copyMsg.innerText="Failed";
        console.log(e);
    }
    copyMsg.classList.add("active");
    setTimeout( () => {
        copyMsg.classList.remove("active");
    },1000);
}

function clearBox(){
    inputBox.value = "";
}

function stopRecording(){

}