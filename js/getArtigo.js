var definicoes = [];
var contdef = [];
var htmlTexto;

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        } //if
    } //for
}; //getUrlParameter

$(document).ready(function () {
    $.ajax({
        url: `/handlers/HandlerArtigos.ashx`,
        type: "POST",
        data: {artigo : getUrlParameter('artigo')},
        dataType: "json",
        success: function (artigo) {
            if(!artigo)
                window.location.href = "404.html";
            else {
                $(document.body).addClass((artigo.tipo).toLowerCase());
                $(document).attr('title', `Artigo: ${artigo.titulo}`);
                $(".tituloZonaConteudo .destaquesTitulo").append(artigo.titulo);
                $(".tituloZonaConteudo .detalhe .autor").append(`Palavras de<br>${artigo.autor}`);
                $(".tituloZonaConteudo .detalhe .data").append(`Publicado em<br>${artigo.data}`);
                $(".tituloZonaConteudo .imagemCapa").append(`<img src="${artigo.imagemCapa}">`);
                $(".conteudo").append(artigo.texto);

                montarConteudo(artigo.texto, artigo.tipo)
                
                artigosRelacionados = JSON.parse(artigo.artigosRelacionados)
                for (var i = 0; i < artigosRelacionados.length; i++) {
                    var artigoR = artigosRelacionados[i];
                    artigoR = JSON.parse(artigoR);
                    addArtigoRelacionado(artigoR.imagemCapa, artigoR.titulo, artigoR.resumo, artigoR.numeroArtigo);
                } //for
                addClear(".outrosArtigos");

                $(".btn_voltarInicio").click(function(){
                    window.location.href = (artigo.tipo).toLowerCase() + ".html";
                });
            } //else 
        }, //success
        error: function (args) {
            window.location.href = "404.html";
        } //error
    }) //ajax  
}); //document

function addArtigoRelacionado(imagem, titulo, texto, url) {
    var bloco =
            `<a href="artigo.html?artigo=${url}">
                <div class="bloco-1 post hvr-grow">
                    <img src="${imagem}">
                    <div class="zonaTexto">
                        <p class="tituloArtigo">${titulo}</p>
                        <p class="textoArtigo">${texto}</p>
                    </div>
                </div>
            </a>`;
    $(bloco).insertBefore(".btn_voltarInicio");
} //addArtigoRelacionado

function addClear(classeCss) {
    $(classeCss).append('<div class="clear"></div>');
} //addClear


//zona de verificação de palavra contida no glossario
function montarConteudo(texto, tema) {
    qualXML = linkXML(tema.toLowerCase());
    
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            getDataXML(this);

            verificarPalavras(texto);
        }
    };
    xhttp.open("GET", "./xml/glossario" + qualXML + ".xml", true);
    xhttp.send();
}//montarConteudo

function getDataXML(xml) {
    var xmlDoc = xml.responseXML;
    var titulos = xmlDoc.getElementsByTagName("titulo");
    var conteudo = xmlDoc.getElementsByTagName("conteudo");

    for (var i = 0; i < titulos.length; i++) {
        definicoes.push(titulos[i].innerHTML);
        contdef.push(conteudo[i].innerHTML);       
    }//for
}//getDataXML

function linkXML(tema) {
    var tipoTema = "";
    if (tema == "alimentacao") {
        tipoTema = "A";
    }
    else if (tema == "consumos") {
        tipoTema = "C";
    }
    else if (tema == "sexualidade") {
        tipoTema = "S";
    }
    return tipoTema;
}//linkXML

function verificarPalavras(texto) {
    for (var i = 0; i < definicoes.length; i++) {
        var procurar = definicoes[i];
        var regEx = new RegExp(procurar, "ig");
        var result;
        var indices = [];
        while ((result = regEx.exec(texto))) {
            indices.push(result.index);
        }

        var palavraNoTexto = "";
        for (var j = 0; j < indices.length; j++) {
            palavraNoTexto = texto.substring(indices[j], indices[j] + procurar.length);          
        }
        texto = texto.replace(regEx, '<mark class="hoverDefin">' + palavraNoTexto + '<span class="hoverDefin-bottom"> ' + contdef[i] + '</span></mark>');
    }
    
    $(".conteudo").append(texto);
}//verificarPalavras
