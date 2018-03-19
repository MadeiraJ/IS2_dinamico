var numeroDestaques = 0;
var numeroVideos = 0;

$(document).ready(function () {
    var classe = $('body').attr('class');

    if(classe.includes("alimentacao"))
        classe = "ALIMENTACAO";
    else if (classe.includes("sexualidade"))
        classe = "SEXUALIDADE";
    else if(classe.includes("consumos"))
        classe = "CONSUMOS";

    getDestaques(classe, 7);
    
    $.ajax({
        url: `/handlers/HandlerTemas.ashx?type=2`,
        type: "POST",
        data: {classe: classe},
        dataType: "json",
        success: function (artigoEmDestaque) {
            addArtigoEmDestaque(
                artigoEmDestaque.imagem,
                artigoEmDestaque.titulo,
                artigoEmDestaque.texto,
                artigoEmDestaque.url
            );
        } //success
    }); //ajax

    getVideos(classe, 3);

    $.ajax({
        url: `/handlers/HandlerTemas.ashx?type=4`,
        type: "POST",
        data: { classe: classe },
        dataType: "json",
        success: function (listaDeDocumentos) {
            for (var i = 0; i < listaDeDocumentos.length; i++) {
                listaDeDocumentos[i] = JSON.parse(listaDeDocumentos[i]);
                addDocumento(
                    classe,
                    listaDeDocumentos[i].nome,
                    listaDeDocumentos[i].link
                );
            } //for
        } //success
    }); //ajax

    $.ajax({
        url: `/handlers/HandlerTemas.ashx?type=5`,
        type: "POST",
        data: { classe: classe },
        dataType: "json",
        success: function (listaDeLinks) {
            for (var i = 0; i < listaDeLinks.length; i++) {
                listaDeLinks[i] = JSON.parse(listaDeLinks[i]);
                addLink(
                    classe,
                    listaDeLinks[i].nome,
                    listaDeLinks[i].url
                );
            } //for
        } //success
    }); //ajax


    $(".conteudo .carregarMais").click(function () {
        var before = numeroDestaques;
        getDestaques(classe, 6);
        if(numeroDestaques == before)
            $(".conteudo .carregarMais").hide();
    }); //artigos button click

    $("#zonaDeVideos .carregarMais").click(function () {
        var before = numeroVideos;
        getVideos(classe, 6);
        if(numeroVideos == before)
            $("#zonaDeVideos .carregarMais").hide();
    }); //videos button click
}); //document 

function addArtigoEmDestaque(imagem, titulo, texto, url) {
    var bloco =
            `<a href="artigo.html?artigo=${url}">
                <div class="wow fadeIn">
                    <div class="bloco-2 post hvr-grow">
                        <img src="${imagem}">
                        <div class="zonaTexto">
                            <p class="tituloArtigo">${titulo}</p>
                            <p class="textoArtigo">${texto}</p>
                        </div>
                    </div>
                </div>
            </a>`;
    $(".col1").after(bloco);
} //addArtigoEmDestaque

function addBlocoArtigo(i, imagem, titulo, texto, url, extra) {
    var inserirNaColuna = emQueColunaDeveriaAdicionar(i);

    var bloco =
            `<a href="artigo.html?artigo=${url}">
                <div class="wow fadeIn">
                    <div class="bloco-1 post hvr-grow ${extra}">
                        <img src="${imagem}">
                        <div class="zonaTexto">
                            <p class="tituloArtigo">${titulo}</p>
                            <p class="textoArtigo">${texto}</p>
                        </div>
                    </div>
                </div>
            </a>`;

    $(inserirNaColuna).append(bloco);
} //addBlocoArtigo

function addBlocoSabiasQue(i, texto, extra) {
    var inserirNaColuna = emQueColunaDeveriaAdicionar(i);

    var bloco =
            `<div class="wow fadeIn">
                <div class="bloco-1 sabiasQue ${extra}">
                    <p class="tituloArtigo">SABIAS QUE</p>
                    <p class="textoArtigo">${texto}</p>
                </div>
            </div>`;
    $(inserirNaColuna).append(bloco);
} //addBlocoSabiasQue

function addVideo(link, titulo, texto) {
    var video =
        `<a onclick="verVideo(this)" name="${link}">
        <div class="bloco-1 postVideo hvr-grow wow fadeIn">
            
            <img class="botaoClickImagem" src="imagens/play_btn.png">
            <img src="http://img.youtube.com/vi/${link.split('&list=')[0].split('watch?v=')[1]}/maxresdefault.jpg">

            <p class="titulo">${titulo}</p>
            <p class="texto">${texto}</p>
        </div>
    </a>`;
    $('.listaVideos').append(video);
} //addVideo

function addLink(classe, nome, url) {
    var imagem = "imagens/link_" + classe.toLowerCase() + ".png";
    var link = `<a href="${url}" target="_blank" class="wow fadeIn"><p class="linkUteis hvr-overline-from-left"><img src="${imagem}">${nome}</p></a>
        <br>`;
    $('#zonaLinks').append(link);
} //addLink

function addDocumento(classe, nome, url) {
    var imagem = "imagens/pin_" + classe.toLowerCase() + ".png";
    var documento = `<a href="${url}" target="_blank" class="wow fadeIn"> <p class="documentos hvr-overline-from-left"><img src="${imagem}">${nome}</p></a>
        <br>`;
    $('#zonaDocumentos').append(documento);
} //addDocumento

function addClear(classeCss) {
    $(classeCss).append('<div class="clear"></div>');
} //addClear


function getDestaques(classe, x){
    $.ajax({
        url: `/handlers/HandlerTemas.ashx?type=1`,
        type: "POST",
        data: {
            classe: classe,
            numeroArtigosRecebidos : numeroDestaques,
            numeroDeArtigosPedidos : x
        },
        dataType: "json",
        success: function (listaDestaques) {
            for (var i = 0; i < listaDestaques.length; i++) {
                listaDestaques[i] = JSON.parse(listaDestaques[i]);
                if (listaDestaques[i] != null) {
                    var tipoBloco = listaDestaques[i].tipo;
                    if (tipoBloco == "ARTIGO") {
                        addBlocoArtigo(
                            i + 1,
                            listaDestaques[i].imagem,
                            listaDestaques[i].titulo,
                            listaDestaques[i].texto,
                            listaDestaques[i].url
                        );
                    } //if

                    else if (tipoBloco == "SABIAS-QUE") {
                        addBlocoSabiasQue(
                            i + 1,
                            listaDestaques[i].texto
                        );
                    } //else if
                } else {
                    $(".conteudo .carregarMais").css('visibility', 'hidden');
                    break;
                }
            } //for
            numeroDestaques += listaDestaques.length;
        } //success
    }); //ajax
} //getDestaques

function getVideos(classe, x) {
    $.ajax({
        url: `/handlers/HandlerTemas.ashx?type=3`,
        type: "POST",
        data: {
            classe: classe,
            numeroVideosRecebidos : numeroVideos,
            numeroDeVideosPedidos : x
        },
        dataType: "json",
        success: function (listaDeVideos) {
            for (var i = 0; i < listaDeVideos.length; i++) {
                listaDeVideos[i] = JSON.parse(listaDeVideos[i]);
                if (listaDeVideos[i] != null) {
                    addVideo(
                        listaDeVideos[i].link,
                        listaDeVideos[i].titulo,
                        listaDeVideos[i].texto
                    );
                } else {
                    $("#zonaDeVideos .carregarMais").css('visibility', 'hidden');
                    break;
                }
            } //for
            addClear('.listaVideos');
            numeroVideos += listaDeVideos.length;
        } //success
    }); //ajax
} //getVideos

function emQueColunaDeveriaAdicionar(i) {
    valor = i - 2;
    i = valor % 3;

    inserirNaColuna = ".col1";
    if ($(document).width() <= 320){
        inserirNaColuna = ".col2";
    } //if mobile
    else if (i >= 0){
        if (i == 2)
            inserirNaColuna = ".col3";
        else if (i == 1)
            inserirNaColuna = ".col2";
    } //else (PC)
    return inserirNaColuna;
} //emQueColunaDeveriaAdicionar