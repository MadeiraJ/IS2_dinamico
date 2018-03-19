var numeroNoticias = 0;
var numeroEventos = 0;
$(document).ready(function () {
    getNoticias(3);

    getEventos(2);

    $.ajax({
        url: `/handlers/HandlerDivulgacao.ashx?type=3`,
        type: "POST",      
        dataType: "json",
        success: function (listaPublicacoes) {
            for (var i = 0; i < listaPublicacoes.length; i++) {
                listaPublicacoes[i] = JSON.parse(listaPublicacoes[i]);
                addPublicacao(
                    listaPublicacoes[i].titulo,
                    listaPublicacoes[i].conteudo      
                );
            }//for
        }//success
    });

    $(".contentorDasNoticias .mostrarMais").click(function () {
        getNoticias(2);
    }); //noticias button click

    $(".contentorDosEventos .mostrarMais").click(function () {
        getEventos(2);
    }); //eventos button click

    $("#fotoDetalhe #fechar").click(function () {
        $("#fotoDetalhe").hide();
    }); //eventos button click

});

function getNoticias(x){
    $.ajax({
        url: `/handlers/HandlerDivulgacao.ashx?type=1`,
        type: "POST",
        data: {
            numeroNoticiasRecebidos: numeroNoticias,
            numeroDeNoticiasPedidos: x
        },
        dataType: "json",
        success: function (listaNoticias) {
            for (var i = 0; i < listaNoticias.length; i++) {
                listaNoticias[i] = JSON.parse(listaNoticias[i]);
                if (listaNoticias[i] != null) {
                    addNoticia(
                        listaNoticias[i].imagem,
                        listaNoticias[i].data,
                        listaNoticias[i].titulo,
                        listaNoticias[i].texto,
                        listaNoticias[i].url
                    );
                } else {
                    $(".contentorDasNoticias .mostrarMais").css('visibility', 'hidden');
                    break;
                }
            }//for
            numeroNoticias += listaNoticias.length;
        }//success
    });    
}//getNoticias

function getEventos(x) {
    $.ajax({
        url: `/handlers/HandlerDivulgacao.ashx?type=2`,
        type: "POST",
        data: {
            numeroEventosRecebidos: numeroEventos,
            numeroDeEventosPedidos: x
        },
        dataType: "json",
        success: function (listaEventos) {
            for (var i = 0; i < listaEventos.length; i++) {
                listaEventos[i] = JSON.parse(listaEventos[i]);
                if (listaEventos[i] != null) {
                    addEvento(
                       listaEventos[i].data,
                       listaEventos[i].horas,
                       listaEventos[i].local,
                       listaEventos[i].titulo,
                       listaEventos[i].descricao,
                       listaEventos[i].imagem
                    );
                } else {
                    $(".contentorDosEventos .mostrarMais").css('visibility', 'hidden');
                    break;
                }               
            }//for
            numeroEventos += listaEventos.length;
            $(".imagemEventos").click(function () {
                var bg = $(this).css('background-image');
                bg = bg.replace('url(','').replace(')','').replace(/\"/gi, "");
                $("#fotoDetalhe .imagem img").attr("src", bg);
                $("#fotoDetalhe").show();
            }); //eventos imagem click

            addClear(".contentorDosEventos .mostrarMais");
        }//success
    });
}//getEventos


function addNoticia(imagem, data, titulo, texto, url) {
    var inserirNaColuna = ".contentorDasNoticias .mostrarMais";

    var noticia =
        `<div class="hvr-grow wow fadeIn contentorNoticia" onclick="window.location='noticia.html?noticia=${url}';">
            <div class ="imagemNoticia" style="background-image: url('${imagem}');"></div>
            <div class ="zonaTextoNoticia">
                <p class ="postadoNoticia">Postado a ${data}</p>
                <p class ="tituloNoticia">${titulo}</p>
                <p class ="textoNoticia">${texto}</p>
            </div>
            <div class ="clear"></div>
        </div>`;

    $(noticia).insertBefore(inserirNaColuna);
}

function addEvento(data, horas, local, titulo, descricao, imagem) {
    var inserirNaColuna = ".contentorDosEventos .mostrarMais";

    var evento =
        `<div class="contentorEvento">
            <div class="zonaTextoEvento">
                <p class ="proximoEvento">PRÓXIMO EVENTO</p>
                <p class ="dataEvento">${data}</p>
                <p class ="horasEvento">${horas}</p>
                <p class ="localEvento">${local}</p>
                <p class ="tituloEvento">${titulo}</p>
                <p class ="descricaoEvento">${descricao}</p>
            </div>
            <div class ="imagemEventos" style="background-image: url('${imagem}');></div>
            <div class ="clear"></div>
        </div>`;

    $(evento).insertBefore(inserirNaColuna);
}
    

function addPublicacao(titulo,conteudo) {
    var inserirNaColuna = ".contentorPublicacoes";

    var publicacao =
        `<div class="divSeccao">
            <span class ="tituloSeccao">${titulo}</spam>
            <div class="iconMaisMenos">
                <img class="botaoMaisMenos" onclick="mostraPublicacao(this)" src="imagens/icon_mais.png">
            </div>
            <div class ="zonaPublicacoes" style="display: none">
                ${conteudo}
            </div>
        </div>`;

    $(inserirNaColuna).append(publicacao);
}

function addClear(classeCss) {
    $(classeCss).append('<div class="clear"></div>');
}
