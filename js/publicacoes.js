/**
 * Created by Fábio on 08/02/2018.
 */


function mostraPublicacao(botao){

   // var botoes= document.getElementsByClassName('botaoMaisMenos');
    var pai = botao.parentNode.parentNode;
    var publicacoes = pai.getElementsByClassName('zonaPublicacoes')[0];

    if(publicacoes.style.display == "none"){
        publicacoes.style.display = "block";
        botao.src = "imagens/icon_menos.png";
    }else{
        publicacoes.style.display = "none";
        botao.src = "imagens/icon_mais.png";
    }

    //for (var i = 0; i < botoes.length - 1; i++) {

    /*if (document.getElementsByClassName('zonaPublicacoes')[i].style.display == "none") {
        document.getElementsByClassName('zonaPublicacoes')[i].style.display = "block";
        document.getElementsByClassName('botaoMaisMenos')[i].src = "imagens/icon_menos.png";
    }
    else {
        document.getElementsByClassName('zonaPublicacoes')[i].style.display = "none";
        document.getElementsByClassName('botaoMaisMenos')[i].src = "imagens/icon_mais.png";

    }*/

    //}

}

