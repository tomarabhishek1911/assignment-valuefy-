if (!('webkitSpeechRecognition' in window)) {
    alert("Your browser doesn't support the Web Speech API. Please use Chrome or Edge.");
}
else  {
    const recognition = new webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';
    document.getElementById('start-btn').onclick = () => {
        recognition.start();
    };
    
    recognition.onresult = (event) => {
        const transcript = event.results[event.results.length-1][0].transcript;
        document.getElementById('result').innerText = `You said: ${transcript}`;
        if(transcript.includes("add task")){
            const str = transcript.substring(8,transcript.length);
            addTask(str);
        }
        if(transcript.includes("remove task")){
            const str = transcript.substring(12,transcript.length);
            removeTask(str,"task");
        }
        if(transcript.includes("change background to")){
            const str = transcript.substring(21,transcript.length);
            changecolour(str);
        }
        if(transcript.includes("change colour to")){
            const str = transcript.substring(17,transcript.length);
            changecolour(str);
        }

    };

    recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
    };
    recognition.onstart = () => {
        console.log('Speech recognition started');
    };
    recognition.onend = () => {
        console.log('Speech recognition ended');
    };
}

function addTask(str) {
    let list = document.getElementById("task");
    let newItem = document.createElement("li");
    newItem.textContent = str;
    list.appendChild(newItem);
}

function removeTask(str, listId) {
    const list = document.getElementById(listId);
    if (!list) {
        console.error("List with ID '" + listId + "' not found.");
        return;
    }

    const items = list.getElementsByTagName("li");

    const lowerCaseTextToMatch = str.toLowerCase();
    for (let i = items.length - 1; i >= 0; i--) {
        const itemText = items[i].textContent.trim().toLowerCase();

        if (itemText.includes(lowerCaseTextToMatch)) {
            list.removeChild(items[i]);
            return;
        }
    }

    console.log("No list item found matching '" + str + "'.");
}

function changecolour(str){
    let col = ""
    console.log(str);
    let allElements = document.querySelectorAll('*');
    let bu = document.getElementById("start-btn");
    if(str==="black"|| str=="Black"){
        col = "#000000";
        allElements.forEach(element => {element.style.color = 'white'});
        bu.style.color = "black";
    }
    // else if(str=="White"|| str=="white"){
    //     col = "#111111";
    //     allElements.forEach(element => {
    //       element.style.color = 'black';
    //     });
    // }
    else if(str=="blue"|| str=="Blue"){
        col = "#0000FF";
        allElements.forEach(element => {element.style.color = 'white';});
        bu.style.color = "black";
    }
    else if(str=="red"){
        col = "#FF0000";
        allElements.forEach(element => {element.style.color = 'white';});
        bu.style.color = "black";
    }
    else{
        console.log("nothing matched");
        allElements.forEach(element => {element.style.color = 'black';});
    }
    document.body.style.backgroundColor = col;
}