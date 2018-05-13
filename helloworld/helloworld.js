var div; var p=document.createElement('p');
function setTime(){
	var now=new Date();
	p.innerHTML="It's "+String(now);
}
function setup(){
	div=document.getElementById('myOnlyDiv');
	div.appendChild(p);
	setInterval(setTime,1);
}
window.addEventListener('load',setup);