import { useEffect } from "react";


function Accessibility({

    settings,
    setSettings

}){


useEffect(()=>{


const saved =
localStorage.getItem(
"accessibilitySettings"
);



if(saved){

setSettings(
JSON.parse(saved)
);

}


},[]);





function updateSetting(
key
){


const updated = {

...settings,

[key]:
!settings[key]

};



setSettings(updated);



localStorage.setItem(

"accessibilitySettings",

JSON.stringify(updated)

);


}





return(

<section className="accessibility-page">


<div className="accessibility-card">


<h1>

♿ Accessibility Settings

</h1>


<p>

Make SpeakEasy Kids easier and more comfortable to use.

</p>




<div className="setting-item">


<div>

<h3>
🔠 Large Text
</h3>

<p>
Increase text size
</p>

</div>



<button

className={
settings.largeText
?
"enabled"
:
""
}


onClick={()=>updateSetting(
"largeText"
)}

>

{

settings.largeText
?
"ON"
:
"OFF"

}


</button>


</div>






<div className="setting-item">


<div>

<h3>
🌗 High Contrast
</h3>

<p>
Improve visibility
</p>

</div>



<button

className={
settings.highContrast
?
"enabled"
:
""
}


onClick={()=>updateSetting(
"highContrast"
)}

>

{

settings.highContrast
?
"ON"
:
"OFF"

}


</button>


</div>








<div className="setting-item">


<div>

<h3>
📖 Dyslexia Font
</h3>

<p>
Use easier reading font
</p>

</div>



<button

className={
settings.dyslexiaFont
?
"enabled"
:
""
}


onClick={()=>updateSetting(
"dyslexiaFont"
)}

>

{

settings.dyslexiaFont
?
"ON"
:
"OFF"

}


</button>


</div>








<div className="setting-item">


<div>

<h3>
🎞 Reduce Animation
</h3>

<p>
Remove moving effects
</p>

</div>



<button

className={
settings.reduceAnimation
?
"enabled"
:
""
}


onClick={()=>updateSetting(
"reduceAnimation"
)}

>

{

settings.reduceAnimation
?
"ON"
:
"OFF"

}


</button>


</div>






<div className="accessibility-preview">


<h2>
Preview
</h2>


<p>

😊 Hello! Your voice matters.

</p>


</div>





</div>


</section>

);


}


export default Accessibility;