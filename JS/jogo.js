var altura = 0;
var largura = 0;
var vidas = 1;
var tempo = 5;

function TamanhoTela(){
    altura = window.innerHeight;
    largura = window.innerWidth;
    console.log(largura, altura);
}
TamanhoTela();

function posicaorandom(){
    if(document.getElementById('mosquito')){
    document.getElementById('mosquito').remove();
        if(vidas > 3){
            window.location.href='gameover.html'
        }else{
            document.getElementById('v'+vidas).src="/IMG/coracao_vazio.png";
            vidas++;
        }
    }
    var posicaoX = Math.floor(Math.random() * largura) -90;
    var posicaoY = Math.floor(Math.random() * altura) -90;
    posicaoX = posicaoX < 0 ? 0 : posicaoX;
    posicaoY = posicaoY < 0 ? 0 : posicaoY;

    console.log(posicaoX, posicaoY);
    
    // Elemento HTML
    var mosquito = document.createElement('img');
    mosquito.src = '/IMG/mosquito.png'   
    mosquito.className = tamanhoAleatorio() +' '+ ladoAleatorio();
    mosquito.style.left = posicaoX + 'px';
    mosquito.style.top = posicaoY+ 'px';
    mosquito.style.position = 'absolute';
    document.body.appendChild(mosquito);
    mosquito.id = 'mosquito';

    // gracias for le passe heróe de japón
    mosquito.onclick = function(){
        this.remove();
    }
}

function tamanhoAleatorio(){
    var classe = Math.floor(Math.random()*3)
    switch(classe){
        case 0:
            return 'mosquito1'
        case 1:
            return 'mosquito2'
        case 2:
            return 'mosquito3'
    }
}

function ladoAleatorio(){
    var classe = Math.floor(Math.random()*3)
    switch(classe){
        case 0:
            return 'ladoA'
        case 1:
            return 'ladoB'
    }
}

var cronometro = setInterval(function(){
    tempo -= 1
    if(tempo < 0){
        window.location.href = 'win.html'
    }else{
        document.getElementById('cronometro').innerHTML = tempo;
    }
}, 1000)