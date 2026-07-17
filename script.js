// ===============================
// Character Counter
// ===============================

let input = document.getElementById("inputText");


input.addEventListener("input",()=>{

    document.getElementById("charCount").innerHTML =
    input.value.length;

});




// ===============================
// Translation Function
// ===============================

async function translateText(){


    let text =
    document.getElementById("inputText").value;


    let source =
    document.getElementById("sourceLang").value;


    let target =
    document.getElementById("targetLang").value;



    if(text.trim()==""){

        alert("Enter some text");

        return;

    }



    document.getElementById("outputText").innerHTML =
    "⏳ Translating...";



    try{


        let response = await fetch(

        "https://api.mymemory.translated.net/get?q="
        +encodeURIComponent(text)
        +"&langpair="
        +source
        +"|"
        +target

        );



        let data = await response.json();



        let result =
        data.responseData.translatedText;



        document.getElementById("outputText").innerHTML =
        result;



        // Save History

        saveHistory(text,result);



    }



    catch(error){


        console.log(error);


        document.getElementById("outputText").innerHTML =
        "❌ Translation failed";


    }



}





// ===============================
// Copy Button
// ===============================

function copyText(){


    let text =
    document.getElementById("outputText").innerText;


    navigator.clipboard.writeText(text);


    alert("Copied!");

}





// ===============================
// Clear Button
// ===============================

function clearText(){


    document.getElementById("inputText").value="";


    document.getElementById("outputText").innerHTML =
    "Your translation will appear here...";


    document.getElementById("charCount").innerHTML=0;


}





// ===============================
// Text To Speech
// ===============================

function speakText(){


    let text =
    document.getElementById("outputText").innerText;



    if(text.trim()==""){

        alert("No text to speak");

        return;

    }



    let speech =
    new SpeechSynthesisUtterance(text);



    speech.lang="ta-IN";

    speech.rate=0.8;

    speech.volume=1;

    speech.pitch=1;



    window.speechSynthesis.cancel();


    window.speechSynthesis.speak(speech);


}





// ===============================
// Dark Mode
// ===============================

function toggleDarkMode(){


    document.body.classList.toggle("dark");



    let button =
    document.getElementById("darkBtn");



    if(document.body.classList.contains("dark")){


        button.innerHTML="☀ Light Mode";


    }

    else{


        button.innerHTML="🌙 Dark Mode";


    }


}





// ===============================
// Translation History
// ===============================


function saveHistory(input,output){


    let history =
    JSON.parse(localStorage.getItem("history")) || [];



    history.unshift({

        input:input,

        output:output

    });



    if(history.length > 5){

        history.pop();

    }



    localStorage.setItem(

        "history",

        JSON.stringify(history)

    );



    showHistory();


}





function showHistory(){


    let history =
    JSON.parse(localStorage.getItem("history")) || [];



    let box =
    document.getElementById("historyList");



    if(!box){

        return;

    }



    if(history.length==0){


        box.innerHTML="No history yet...";


        return;

    }



    box.innerHTML="";



    history.forEach(item=>{


        box.innerHTML += `

        <div class="history-item">

        <b>${item.input}</b>

        <br>

        ⬇️

        <br>

        ${item.output}

        </div>

        `;


    });


}





function clearHistory(){


    localStorage.removeItem("history");


    showHistory();


}





// Load Previous History

showHistory();