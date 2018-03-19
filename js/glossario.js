/**
 * Created by joão Madeira on 02/01/2018.
 */
window.addEventListener("load",montarDefinicoes,false);

var aLetra;
var oConteudo;

var letraAtual;
var conteudoAtual;

var idLetra;
var idAbecedario;

var ativo = "ativo";

var paginaAtual = 0;
var nPaginas;

var setaDireita, setaEsquerda;

function montarDefinicoes() {
    var tema = document.body.className.split(" ")[1];
    setaDireita = document.querySelector("#direita");
    setaEsquerda = document.querySelector("#esquerda");
    var tipoTema;

    if (tema == "alimentacao"){
        tipoTema = "A";
    }
    else if (tema == "consumos"){
        tipoTema = "C";
    }
    else if (tema == "sexualidade"){
        tipoTema = "S";
    }

    setaDireita.style.backgroundImage = 'url("./imagens/temas/setaDireita' + tipoTema + '.png")';
    setaEsquerda.style.backgroundImage = 'url("./imagens/temas/setaEsquerda' + tipoTema + '.png")';

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            myFunction(this);
        }
    };
    xhttp.open("GET", "./xml/glossario"+tipoTema+".xml", true);
    xhttp.send();
}

function myFunction(xml) {
    var xmlDoc = xml.responseXML;
    var zonaDefi = document.querySelector("#zonaDefi");
    var letras = xmlDoc.getElementsByTagName("letra");

    for (var i = 0; i <= letras.length - 1; i++){
        var divLetra = document.createElement("div");
        divLetra.setAttribute("id", "l" + (letras[i].getAttribute('id')).toUpperCase());
        divLetra.setAttribute("style", "display: none");
        divLetra.setAttribute("class", "definicoes");
        var qualLetra = document.createElement("h1");
        qualLetra.innerHTML = letras[i].getAttribute('id');
        divLetra.appendChild(qualLetra);
        if(letras[i].childNodes.length > 1){
            var conteLetra = letras[i].childNodes;
            for (var j = 0; j <= conteLetra.length - 1; j++) {
                if (conteLetra[j].hasChildNodes()) {
                    var definicao = document.createElement("div");
                    definicao.setAttribute("style", "display: none");
                    definicao.setAttribute("class", "definicao");
                    var titulo = document.createElement("h1");
                    titulo.innerHTML = conteLetra[j].childNodes[1].innerHTML;
                    definicao.appendChild(titulo);

                    var conteudo = document.createElement("p");
                    conteudo.innerHTML = conteLetra[j].childNodes[3].innerHTML;
                    definicao.appendChild(conteudo);

                    divLetra.appendChild(definicao);
                }
            }
        }
        var clear = document.createElement("div");
        clear.setAttribute("class", "clear");
        clear.setAttribute("style", "display: block !important");
        divLetra.appendChild(clear);
        zonaDefi.appendChild(divLetra);
    }
    init();
}

function init(){
    idAbecedario = document.querySelector("#abecedario");
    letraAtual = document.querySelector("#a");
    conteudoAtual = document.querySelector("#lA");

    if ($(window).width() <= 600) {
        elementosMobile();
    } else {
        verElementos(false);
    }

    letraAtual.setAttribute("class","letra "+ativo);
    conteudoAtual.style.display = "block";

    idAbecedario.addEventListener("click",mudarConteudo,false);
}

function verElementos(esconder){
    nPaginas = Math.ceil((conteudoAtual.childNodes.length - 2)/10);
    if(nPaginas == 0){
        setaDireita.style.display = "none";
        setaEsquerda.style.display = "none";
    } else if(nPaginas == 1){
        for (var i = 1; i < conteudoAtual.childNodes.length - 1; i++) {
            conteudoAtual.childNodes[i].style.display = "inline-table";
        }
        setaDireita.style.display = "none";
        setaEsquerda.style.display = "none";
    } else {
        var priPagina;
        if(paginaAtual == 0){
            priPagina = paginaAtual + 1;
            var fim = priPagina + 10;
            mudardisplay(esconder,priPagina,"block","none",fim);
        } else {
            priPagina = parseInt(paginaAtual+"1");
            var fim = conteudoAtual.childNodes.length - 1;
            if(fim> priPagina && fim < priPagina+9){
                mudardisplay(esconder,priPagina,"none","block",fim);
            } else {
                fim = priPagina + 10;
                mudardisplay(esconder,priPagina,"block","block",fim);
            }
        }
    }
}

function mudardisplay(esconder,priPagina,displayD,displayE,fim){
    var i = priPagina;
    for(i; i < fim; i++){
        if(esconder)
            conteudoAtual.childNodes[i].style.display = "none";
        else{
            conteudoAtual.childNodes[i].style.display = "inline-table";
            setaDireita.style.display = displayD;
            setaEsquerda.style.display = displayE;
        }
    }
}

function mudarConteudo(e) {
    var oClicado = e.target;
    if (oClicado.id != "naoLetra" && oClicado.nodeName == "LI") {
        idLetra = oClicado.id;
        if (idLetra != "abecedario") { }
        contCorresp();
    }   
}

function contCorresp(){
    aLetra = document.querySelector("#"+idLetra);
    oConteudo = document.querySelector("#l"+idLetra.toUpperCase());

    letraAtual.setAttribute("class","letra");
    aLetra.setAttribute("class","letra "+ativo);

    conteudoAtual.style.display = "none";
    oConteudo.style.display = "block";

    letraAtual = aLetra;
    conteudoAtual = oConteudo;

    if ($(window).width() <= 600) {
        elementosMobile();
    } else {
        verElementos(false);
    }
}

function elementosMobile() {
    for (var i = 1; i < conteudoAtual.childNodes.length - 1; i++) {
        conteudoAtual.childNodes[i].style.display = "inline-table";
    }
}

function clickMudarPagina(onde){
    verElementos(true);
    if(onde=="direita")
        paginaAtual += 1;
    else
        paginaAtual -= 1;
    verElementos(false);
    $("html, body").animate({ scrollTop: $('#zonaGlossario').offset().top + 50 }, 1000);
}