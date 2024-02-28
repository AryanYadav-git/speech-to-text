function startVoiceRecognition(){
    var loading = document.getElementById("loading");
    loading.style.display = "block";
    if('webkitSpeechRecognition' in window){
        var recognition = new webkitSpeechRecognition();
        recognition.lang = 'en-IN';
        recognition.continuous = true;
        // recognition.interimResults = true;
        recognition.start();

        recognition.onresult = function(event){
            var inputBox = document.getElementById("input");
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
            loading.style.display = "none";
        }

        recognition.onerror = function(event){
            console.log('Error: ' + event.error);
            loading.style.display = "none";
        }

        alert("Mic is on");

    } else {
        alert("Doesn't support");
    }
}