 const heatmap=document.getElementById("heatmap");
 const tooltip=document.createElement("div");
 tooltip.className="tooltip";
 document.body.appendChild(tooltip);

 //loop 365 times(1 year)
 for(let i=0;i<365;i++){
    const day=document.createElement("div");
    day.classList.add("day");

    //generate random activity count(0-8)
    const activity=Math.floor(Math.random()*9);

    //Assign color level
    if(activity>=1&&activity<=2){
        day.classList.add("level-1");
    }else if(activity>=3&&activity<=4){
        day.classList.add("level-2");
    }else if(activity>=5&&activity<=6){
        day.classList.add("level-3");
    }else if(activity>=7){
        day.classList.add("level-4");
    }

    //tooltip logic
    day.addEventListener("mouseenter",(e)=>{
        tooltip.style.display="block";
        tooltip.textContent=activity+ "activities";
    });

    day.addEventListener("mousemove",(e)=>{
        tooltip.style.left=e.pageX+10+"px";
        tooltip.style.top=e.pageY+10+"px";
    });

    day.addEventListener("mouseleave",()=>{
        tooltip.style.display="none";
    });

    heatmap.appendChild(day);
 }