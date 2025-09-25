
// Modificação: mudar as frases para frases de anime e adiconar uma classe de dado a mais, "anime"

function init(SeletorFrase, seletorAutor, seletorAnime, seletorBtn) {
    // Selecionando elementos do DOM
    const frase = document.querySelector(SeletorFrase);
    const autor = document.querySelector(seletorAutor);
    const anime = document.querySelector(seletorAnime);
    const btn = document.querySelector(seletorBtn);
    const body = document.querySelector('body');
    let citacaoAtual = '';
    let citacaoURL = '';
    const copy = document.querySelector('.btn-copy');
    const whatsapp = document.querySelector('.btn-whatsapp');

    // Tratativa de erro
    if (frase && autor && anime && btn) {
        // Função Assincrona puxando a frase da API
        async function activeApp() {
            try {
                // Frase API

                // Faz um fetch na url
                const dadosResponse = await (fetch('./phrases.json'));
                // Aguarda o retorno do Fetch e transforma em JSON
                const dadosJSON = await (await dadosResponse).json();
                // Puxando as frases de forma aleatoria
                const aleatorio = dadosJSON[Math.floor(Math.random() * 200)];

                // Insere os dados no DOM
                frase.innerText = aleatorio.quote;
                autor.innerText = aleatorio.author;
                anime.innerText = aleatorio.anime;

                // Modificação: Prepara a citação numa variavel para ser copiada
                citacaoAtual = `${aleatorio.quote} - ${aleatorio.author} - ${aleatorio.anime}`;
                
                // Modificação: prepara a citação codificada numa variavel para ser enviada por url 
                citacaoURL = encodeURIComponent(citacaoAtual);

                // Modificação: Prepara a url com a citação codificada
                const linkWhatsapp = `https://api.whatsapp.com/send?text=${citacaoURL}`;
                // Modificação: Atualiza o botão/link com a url codificada
                whatsapp.href = linkWhatsapp;

                return gradientColor();

                
            } catch (erro) {
                console.log(erro);
            }

            
        }

        async function gradientColor() {
            // Gradient Colors API

            try {
                // Faz um fetch na url
                const colorsResponse = await (fetch('./colors.json'));
                // Aguarda o retorno do Fetch e transforma em JSON
                const colorsJSON = await (await colorsResponse).json();
                // Puxando as cores de forma aleatoria

                const aleatorioColors = colorsJSON[Math.floor(Math.random() * 85)].color;

                // Adicionado cor ao Body
                body.style.background = aleatorioColors;
            } catch (erro) {
                console.log(erro)
            }
        }

        
        // Evento do botão
        btn.addEventListener('click', activeApp);

        // Modificação: função para copiar a citação usando a api do navegador, clip boardAPI
        copy.addEventListener('click', function(){
            navigator.clipboard.writeText(citacaoAtual)

        });

        // Ativando a função quando entra no site
        activeApp();
    }


}
// Chamando a função geral para inicar o codigo
init('.frase', '.autor', '.anime' , '.btn-novo');


