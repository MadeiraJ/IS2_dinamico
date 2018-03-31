var numeroDestaques = 0;
var numeroVideos = 0;

$(document).ready(function () {
    getDestaques(7);

    $.ajax({
        url: `/handlers/HandlerDestaques.ashx?type=2`,
        type: "POST",
        dataType: "json",
        success: function (artigoEmDestaque) {
            addArtigoEmDestaque(
                artigoEmDestaque.tema,
                artigoEmDestaque.imagem,
                artigoEmDestaque.titulo,
                artigoEmDestaque.texto,
                artigoEmDestaque.url
            );
        } //success
    }); //ajax

    getVideos(3);

    $(".listaDestaques .carregarMais").click(function () {
        var before = numeroDestaques;
        getDestaques(6);
        if(numeroDestaques == before)
            $(".listaDestaques .carregarMais").hide();
    }); //destaques button click

    $(".zonaVideos .carregarMais").click(function () {
        var before = numeroVideos;
        getVideos(6);
        if(numeroVideos == before)
            $(".zonaVideos .carregarMais").hide();
    }); //videos button click
}) //document

function addArtigoEmDestaque(tema, imagem, titulo, texto, url) {
    var nomeFicheiroImagem = tema.charAt(0).toUpperCase() + tema.substr(1).toLowerCase();
    var bloco =
        `<a href="artigo.html?artigo=${url}">
            <div class ="${tema.toLowerCase()} bloco-2 card artigo wow fadeIn hvr-grow">
                <img src="${imagem}">
                <div class ="textoBloco">
                    <div class ="blocoTopo">
                        <p class ="titulo">${titulo}</p>
                        <div class ="tag">
                            <img src="imagens/tag${nomeFicheiroImagem}.png">
                            <a href="${tema.toLowerCase()}.html">${verNomeTema(tema)} </a>
                        </div>
                        <div class ="clear"></div>
                    </div>
                    <p class ="texto">${texto}</p>
                </div>
            </div>
        </a>`;
    $(".col1").after(bloco);
} //addArtigoEmDestaque

function addBlocoArtigo(i, tema, imagem, titulo, texto, url) {
    var inserirNaColuna = emQueColunaDeveriaAdicionar(i);
    
    var nomeFicheiroImagem = tema.charAt(0).toUpperCase() + tema.substr(1).toLowerCase();

    var bloco =
            `<a href="artigo.html?artigo=${url}">
                <div class ="${tema.toLowerCase()} bloco-1 card artigo wow fadeIn hvr-grow">
                    <img src="${imagem}">
                    <div class ="textoBloco">
                        <div class ="blocoTopo">
                            <p class ="titulo">${titulo}</p>
                            <div class ="tag">
                                <img src="imagens/tag${nomeFicheiroImagem}.png">
                                <a href="${tema.toLowerCase()}.html">${verNomeTema(tema)}</a>
                            </div>
                            <div class ="clear"></div>
                        </div>
                        <p class ="texto">${texto}</p>
                    </div>
                </div>
            </a>`;

    $(inserirNaColuna).append(bloco);
} //addBlocoArtigo

function addBlocoSabiasQue(i, tema, imagem, texto) {
    var inserirNaColuna = emQueColunaDeveriaAdicionar(i);
    
    var nomeFicheiroImagem = tema.charAt(0).toUpperCase() +tema.substr(1).toLowerCase();
    var bloco =
            `<div class="${tema.toLowerCase()} bloco-1 card sabias-que wow fadeIn">
                <div class ="textoBloco">
                    <div class ="blocoTopo">
                        <p class ="titulo">SABIAS QUE</p>
                        <div class ="tag">
                            <img src="imagens/tag${nomeFicheiroImagem}.png">
                            <a href="${tema.toLowerCase()}.html">${verNomeTema(tema)} </a>
                        </div>
                        <div class ="clear"></div>
                    </div>
                    <p class ="texto">${texto}</p>
                </div>
             </div>`;
    $(inserirNaColuna).append(bloco);
} //addBlocoSabiasQue

function addBlocoVideo(i, tema, link, titulo, texto) {
    var inserirNaColuna = emQueColunaDeveriaAdicionar(i);

    var urlParaVideo = `http://img.youtube.com/vi/${link.split('&list=')[0].split('watch?v=')[1]}`;
    var nomeFicheiroImagem = tema.charAt(0).toUpperCase() + tema.substr(1).toLowerCase();

    var bloco =
            `<div onclick="verVideo(this)" name="${link}" style="cursor: pointer;">
                <div class ="${tema.toLowerCase()} bloco-1 card video wow fadeIn hvr-grow">
                <img class ="botaoClickImagem" src="imagens/play_btn.png">
                    <img class ="imgVideo" src="${urlParaVideo}/maxresdefault.jpg" onError="this.onerror=null;this.src='${urlParaVideo}/hqdefault.jpg'">
                    <div class ="textoBloco">
                        <div class ="blocoTopo">
                            <p class ="titulo">VIDEOS</p>
                            <div class ="tag">
                                <img src="imagens/tag${nomeFicheiroImagem}.png">
                                <a href="${tema.toLowerCase()}.html">${verNomeTema(tema)}</a>
                            </div>
                            <div class ="clear"></div>
                        </div>
                        <p class ="texto">${texto}</p>
                    </div>
                </div>
             </div>`;
    $(inserirNaColuna).append(bloco);
} //addBlocoVideo

function addVideo(tema, link, titulo, texto) {
    var urlParaVideo = `http://img.youtube.com/vi/${link.split('&list=')[0].split('watch?v=')[1]}/maxresdefault.jpg`;
    var nomeFicheiroImagem = tema.charAt(0).toUpperCase() + tema.substr(1).toLowerCase();
    var video =
            `<div onclick="verVideo(this)" name="${link}" style="cursor: pointer;">
                <div class ="${tema.toLowerCase()} video card wow fadeIn hvr-grow">
                    <img class="botaoClickImagem" src="imagens/play_btn.png">
                    <img class="imgVideo" src="${urlParaVideo}">
                    <div class ="textoBloco">
                        <div class ="blocoTopo">
                            <p class ="titulo">VIDEOS</p>
                            <div class ="tag">
                                <img src="imagens/tag${nomeFicheiroImagem}.png">
                                <a href="${tema.toLowerCase()}.html"> ${verNomeTema(tema)} </a>
                            </div>
                            <div class ="clear"></div>
                        </div>
                        <p class ="texto">${texto}</p>
                    </div>              
                </div>
             </div>`;
    $('.listaVideos').append(video);
} //addVideo

function addClear(classeCss) {
    $(classeCss).append('<div class="clear"></div>');
} //addClear

function verNomeTema(tema) {
    if (tema == "ALIMENTACAO") {
        return "ALIMENTAÇÃO";
    } else if (tema == "CONSUMOS") {
        return "CONSUMOS NOCIVOS";
    } else {
        return "SEXUALIDADE";
    }
} //verNomeTema

function getDestaques(x) {
    $.ajax({
        url: `/handlers/HandlerDestaques.ashx?type=1`,
        type: "POST",
        data: {
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
                            numeroDestaques + 1 + i,
                            listaDestaques[i].tema,
                            listaDestaques[i].imagem,
                            listaDestaques[i].titulo,
                            listaDestaques[i].texto,
                            listaDestaques[i].url
                        );
                    } //if

                    else if (tipoBloco == "SABIAS-QUE") {
                        addBlocoSabiasQue(
                            numeroDestaques + 1 + i,
                            listaDestaques[i].tema,
                            listaDestaques[i].imagem,
                            listaDestaques[i].texto
                        );
                    } //else if
                
                    else if (tipoBloco == "VIDEO") {
                        addBlocoVideo(
                            numeroDestaques + 1 + i,
                            listaDestaques[i].tema,
                            listaDestaques[i].link,
                            listaDestaques[i].titulo,
                            listaDestaques[i].texto
                        );
                    } //else if
                } else {
                    $(".listaDestaques .carregarMais").css('visibility', 'hidden');
                    break;
                }
            } //for
            numeroDestaques += listaDestaques.length;

            $('.listaVideos img').each(function() {
                if(thumbnailCerto.complete ) {
                    imageLoaded.call( this );
                } else {
                    $(this).one('load', thumbnailCerto);
                }
            });
        } //sucess
    }); //ajax
} //getDestaques


function getVideos(x) {
    $.ajax({
        url: `/handlers/HandlerDestaques.ashx?type=3`,
        type: "POST",
        data: {
            numeroVideosRecebidos : numeroVideos,
            numeroDeVideosPedidos : x
        },
        dataType: "json",
        success: function (listaDeVideos) {
            for (var i = 0; i < listaDeVideos.length; i++) {
                listaDeVideos[i] = JSON.parse(listaDeVideos[i]);
                if (listaDeVideos[i] != null) {
                    addVideo(
                        listaDeVideos[i].tema,
                        listaDeVideos[i].link,
                        listaDeVideos[i].titulo,
                        listaDeVideos[i].texto
                    );
                } else {
                    $(".zonaVideos .carregarMais").css('visibility', 'hidden');
                    break;
                }
            } //for
            addClear('.listaVideos');
            numeroVideos += listaDeVideos.length;
        } //sucess
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

function thumbnailCerto() {
    videos = $('.listaVideos img');
    for (var i = 0; i < videos.length; i++) {
        natWidth = videos[i].naturalWidth;
        natHeight = videos[i].naturalHeight;
        if (natWidth == 120 && natHeight == 90)
            videos[i].src = videos[i].onError;
    }
}