var scene,t0;
var N=1;
var colors=["#343838", "#005F6B", "#008C9E", "#00B4CC"];
var minDist=1.1; var maxDist=2;
var minRadius=0.05; var maxRadius=0.2;
var moveBalls=false;
var minFreq=1./20; var maxFreq=1./10;
var minDistOsc=0.2; var maxDistOsc=0.4;


function buildSpheres(N){
	for (var i=0; i<N; i++){
		
		var color=colors[Math.floor(i/(N/colors.length))];
		var posX=Math.random()-0.5;
		var posY=Math.random()-0.5;
		var posZ=Math.random()-0.5;
		var sumPos=Math.sqrt(Math.pow(posX,2)+Math.pow(posY,2)+Math.pow(posZ,2));		
		var dist=Math.random()*(maxDist-minDist)+minDist;
		var radius=Math.random()*(maxRadius-minRadius)+minRadius;
		posX=posX/sumPos*dist;
		posY=1.6+posY/sumPos*dist;
		posZ=posZ/sumPos*dist;
		var sphere=document.createElement('a-sphere');
		sphere.setAttribute("position",posX+" "+posY+" "+posZ);
		sphere.setAttribute("radius",radius);
		sphere.setAttribute("color",color);
		scene.appendChild(sphere);
	}
	

}


spheres=[];
function buildMovingSpheres(N){
	for (var i=0; i<N; i++){
		
		var color=colors[Math.floor(i/(N/colors.length))];
		var posX=Math.random()-0.5;
		var posY=Math.random()-0.5;
		var posZ=Math.random()-0.5;
		var sumPos=Math.sqrt(Math.pow(posX,2)+Math.pow(posY,2)+Math.pow(posZ,2));		
		var dist=Math.random()*(maxDist-minDist)+minDist;
		var radius=Math.random()*(maxRadius-minRadius)+minRadius;
		posX=posX/sumPos*dist;
		posY=1.6+posY/sumPos*dist;
		posZ=posZ/sumPos*dist;
		var ent=document.createElement('a-entity');
		ent.setAttribute("position",posX+" "+posY+" "+posZ);
		

		var distOsc=Math.random()*(maxDistOsc-minDistOsc)+minDistOsc;
		var freqOscX=Math.random()*(maxFreq-minFreq)+minFreq;
		var freqOscY=Math.random()*(maxFreq-minFreq)+minFreq;
		var freqOscZ=Math.random()*(maxFreq-minFreq)+minFreq;
		
		var sphere=document.createElement('a-sphere');
		sphere.freqOsc=[freqOscX,freqOscY, freqOscZ];
		sphere.distOsc=distOsc		
		/*YES we can add new attributes to elements*/
		sphere.setAttribute("radius",radius);
		sphere.setAttribute("color",color);

		ent.appendChild(sphere);
		scene.appendChild(ent);
		spheres.push(sphere);
	}
	

}

function moveSpheres(){
	var t=(new Date().getTime()-t0)/1000.;

	for(var i=0; i<spheres.length;i++){
		var sphere=spheres[i];
		var pos="";
		for (p=0; p<3; p++){
			pos=pos+" "+sphere.distOsc*Math.cos(2*Math.PI*sphere.freqOsc[p]*t);
		}
		sphere.setAttribute("position",pos);
	}

	requestAnimationFrame(moveSpheres)
}

function setupScene(){
	buildSpheres(N);

}

function init(){
	t0=new Date().getTime()
	scene=document.getElementsByTagName('a-scene')[0];
	if(scene.renderStarted){setupScene();}
	else{scene.addEventListener("renderstart", setupScene);}
}

window.addEventListener('load', init, false);