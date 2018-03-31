window.addEventListener("load",init,false);

var displayGaleria, displayDetalhe;
var iframeInst, comentInst;
var zonaFotos;
var setaDireita, setaEsquerda;

var fotosGaleria = [];
var legendas = [];
var fotoAtual = 0;

function init(e){
	displayGaleria = document.getElementById("fotoDetalhe");
	displayDetalhe = document.getElementById("zonaMain");
	iframeInst = document.getElementById("img01");
	comentInst = document.getElementById("coment");

	setaDireita = document.getElementById("direita");
	setaEsquerda = document.getElementById("esquerda");

	zonaFotos = document.getElementById("ody");

	fotosNoArray();
}

//coloca o url da foto e o comentario da mesmo no respetivo array
function fotosNoArray(){
	var urlFotos = zonaFotos.children;
	for(var i = 0; i <= urlFotos.length; i++){
		fotosGaleria.push((urlFotos[i].childNodes[0].getAttribute("name")).split("*")[0]+"embed");
		legendas.push((urlFotos[i].childNodes[0].getAttribute("name")).split("*")[1])
	}
}

//element corresponde á foto que foi clicada
function clickDetalhe(element) {
    displayGaleria.style.display = "block";
    document.body.style.overflow = 'hidden';
	
	setaDireita.style.display = "block";
	setaEsquerda.style.display = "block";

	iframeInst.src = element.name.split("*")[0]+"embed";
	iframeInst.style.backgroundSize = element.style.backgroundSize;

	if (element.name.split("*")[1].trim() != "")
	    comentInst.style.display = "block";
	else
	    comentInst.style.display = "none";
	comentInst.innerHTML = element.name.split("*")[1];

	verFotoAtual(iframeInst.src);
}

//para ver se deve colocar as duas setas ou não
function verFotoAtual(url){
	for(var i = 0; i <= fotosGaleria.length; i++){
		if(fotosGaleria[i] == url)
			fotoAtual = i;
	}
	if(fotoAtual == 0){
		setaDireita.style.visibility="visible";
		setaEsquerda.style.visibility="hidden";
	} else if (fotoAtual == fotosGaleria.length-1){
		setaDireita.style.visibility="hidden";
		setaEsquerda.style.visibility="visible";
	} else {
		setaDireita.style.visibility="visible";
		setaEsquerda.style.visibility="visible";
	}
}

function clickFechar() {
    displayGaleria.style.display = "none";
    document.body.style.overflow = 'scroll';
    document.body.style.overflow = 'initial';
    iframeInst.src = "#";
    comentInst.innerHTML = "";
    fotoAtual = 0;
}

function clickMudar(onde){
	if(onde=="direita")
		fotoAtual += 1;
	else 
		fotoAtual -= 1;
	iframeInst.src = fotosGaleria[fotoAtual];
	if (legendas[fotoAtual].trim() != "")
	    comentInst.style.display = "block";
	else
	    comentInst.style.display = "none";
	comentInst.innerHTML = legendas[fotoAtual];
	verFotoAtual(fotosGaleria[fotoAtual]);
}