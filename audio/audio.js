// code inspired by https://www.html5rocks.com/en/tutorials/webaudio/intro/


var context, buffer;
window.addEventListener('load', init, false);
var fn='./sample.mp3';
var playing=false;
var analyzeAudio=false;
var changeBackground=false;
var source=null;
var analyser, freqArray;
function init() {
  try {
    // Fix up for prefixing
    window.AudioContext = window.AudioContext||window.webkitAudioContext;
    context = new AudioContext();
  }
  catch(e) {
    alert('Web Audio API is not supported in this browser');
  }
  loadSound(fn,assignBuffer);

}

function loadSound(url, cfunc) {
  var request = new XMLHttpRequest();
  request.open('GET', url, true);
  request.responseType = 'arraybuffer';

  // Decode asynchronously
  request.onload = function() {
    context.decodeAudioData(request.response, cfunc);
  }
  request.send();
}

function assignBuffer(pBuffer) {
  buffer = pBuffer;  
}



function playSound(pBuffer=null) {
  if(source==null){
  	source = context.createBufferSource();
  	if(pBuffer==null){pBuffer=buffer;}
  	source.buffer = pBuffer; 
  	source.loop=true;                 
  	
  	if(analyzeAudio){
  		buildAnalysis();
  		source.connect(analyser);
  		analyser.connect(context.destination);
  		update();
  	}
  	else{source.connect(context.destination);}
  	source.start(0);              
  	document.getElementById("playButton").innerHTML="Stop";            
  	
  }
  else{
  	source.stop(); 
  	source=null;
  	document.getElementById("playButton").innerHTML="Play";
  }
}

var minDB, maxDB, rangeDB;
function buildAnalysis(){
	analyser= context.createAnalyser();
 	analyser.fftSize=1024;
 	freqArray=new Float32Array(analyser.fftSize/2);
	minDB=analyser.minDecibels;
	maxDB=analyser.maxDecibels;
	rangeDB=maxDB-minDB;
	
}

function update(){
	analyser.getFloatFrequencyData(freqArray);	
	var energy=0;
	for(var i=0; i<freqArray.length; i++){
		freqArray[i]=(freqArray[i]-minDB)/rangeDB;
		energy=energy+freqArray[i];
	}
	energy=Math.pow(energy/freqArray.length,1/2);
	if(changeBackground){
		document.body.style.background="rgb(0,"+energy*255 +","+energy*255 + ")";
	}
	if(source!=null){requestAnimationFrame(update);}

}