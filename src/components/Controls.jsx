function Controls({

text,
setText,
language

}){


function speak(){


let speech =
new SpeechSynthesisUtterance(text);


speech.lang =
language;


speech.rate=.9;


speechSynthesis.speak(
speech
);


}



function copy(){


navigator.clipboard.writeText(text);

alert("Copied!");

}



function download(){


const file =
new Blob(
[text],
{
type:"text/plain"
}
);


const link =
document.createElement("a");


link.href =
URL.createObjectURL(file);


link.download =
"speech.txt";


link.click();


}



return(

<div className="controls">


<button onClick={speak}>
🔊 Read
</button>


<button onClick={copy}>
📋 Copy
</button>


<button onClick={download}>
💾 Download
</button>


<button onClick={()=>setText("")}>
🗑 Clear
</button>


</div>

);


}


export default Controls;