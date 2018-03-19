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

var idPost = 1;

$(document).ready(function () {
    idPost = getUrlParameter("post");
    
    $.ajax({
        url: `/handlers/HandlerForumTopicoAberto.ashx?type=1`,
        type: "POST",
        data: { id : idPost },
        dataType: "json",
        success: function (respostas) {
            addResposta(
              respostas.data,
              respostas.texto,
              respostas.quemRespondeu
            );
            contadorRespostas();
        } //success
    }); //ajax
    
    $.ajax({
        url: `/handlers/HandlerForumTopicoAberto.ashx?type=2`,
        type: "POST",
        data: { id : idPost },
        dataType: "json",
        success: function (pergunta) {
            addDescricao(
              pergunta.texto,
              pergunta.data
            );

            addTitulo(pergunta.pergunta);
        } //success
    }); //ajax

    goToNextPergunta(idPost);
}); //document

function addTitulo(texto) {
    var inserirNaColuna = ".zonaTitulo";
    var titulo =
            ` <p class="tituloTopico">${texto}</p>`;
    $(inserirNaColuna).append(titulo);
} //adTitulo
  
function addDescricao(texto,data) {
    var inserirNaColuna = ".div_descricao";
    var descricao =
            `<p class ="textoResposta" style="padding-top: 5%;  padding-bottom: 0;">${texto}</p>
                <div class="clear"></div>
                <p class ="dataDescricao">${data}</p>
                <div class="clear"></div>`;

    $(inserirNaColuna).append(descricao);
} //addDescricao

function contadorRespostas() {
    var numeroRespostas = document.getElementsByClassName('div_Respostas');
    var inserirNaColuna = ".zonaNrRespostasAberto";
    var nrRespostas =
            `<span class="topicoNrRespostasAberto">${numeroRespostas.length}  respostas</span>`;

    $(inserirNaColuna).append(nrRespostas);
} //contadorRespostas

function addResposta(data,texto,quemRespondeu) {
    var inserirNaColuna = ".zonaRespostas";

    var resposta =
        ` <div class="div_Respostas" style="margin-top: 8%">
            <p class ="dataResposta">Postado a ${data}</p>
            <p class ="textoResposta">${texto}</p>
            <div class ="clear"></div>
            <p class ="quemRespondeu">Respondido por ${quemRespondeu}</p>
            <div class ="clear"></div>
        </div>`;

    $(inserirNaColuna).append(resposta);
} //addResposta
    
function addClear(classeCss) {
    $(classeCss).append('<div class="clear"></div>');
}

function goToNextPergunta(idPost) {
    $.ajax({
        url: `/handlers/HandlerForumTopicoAberto.ashx?type=3`,
        type: "POST",
        data: { id : idPost },
        dataType: "json",
        success: function (idProximaPergunta) {
            if(idProximaPergunta)
                $(".zonaProximo a").attr("href", `topico.html?post=${idProximaPergunta}`);
            else
                $(".zonaProximo").hide();
        }, //success
        error: function (erro) {
            $(".zonaProximo").hide();
        } //error
    }); //ajax
} //goToNextPergunta