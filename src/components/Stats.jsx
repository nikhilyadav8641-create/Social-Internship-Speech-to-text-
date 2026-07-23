function Stats({words,characters,time}){


return(

<div className="stats">


<div>
<h2>{words}</h2>
<p>Words</p>
</div>


<div>
<h2>{characters}</h2>
<p>Characters</p>
</div>


<div>
<h2>
{
Math.floor(time/60)
}:
{
String(time%60).padStart(2,"0")
}

</h2>

<p>
Recording
</p>

</div>


</div>

);


}


export default Stats;