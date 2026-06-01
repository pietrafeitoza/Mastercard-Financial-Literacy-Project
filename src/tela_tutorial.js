// Extende a classe Phaser.Scene para criar a tela de tutorial
class TelaTutorial extends Phaser.Scene {
    constructor() {
        super({ key: 'telaTutorial' });
    }

    // Preload: carrega os assets visuais usados na tela de tutorial
    preload() {
        this.load.image('branco', 'assets/identidade_de_marca/branco.jpg');
        this.load.image('retangulo', 'assets/identidade_de_marca/retangulo_2.png');
        this.load.image('seta', 'assets/navegacao/seta.png');
        this.load.image('voltar', 'assets/navegacao/voltar.png');
    }

    // Create: monta os textos, destaques visuais, animações e o fluxo de navegação do tutorial
    create() {
        // Background e barra superior: constroem a base visual da cena
        this.add.image(182.5, 300, 'branco');
        this.add.image(182.5, 45, 'retangulo').setDisplaySize(365, 90);

        // true = primeiro clique avança para a segunda parte do tutorial
        // false = segundo clique sai da cena e vai para a seleção de dificuldade
        this.primeiroClique = true;

        // Guardamos isso para conseguir parar a animação quando o usuário clicar no "continuar", evitando que ela continue pulsando durante as transições
        this.animacaoBotao = null;

        // Controla se a segunda parte ainda está sendo exibida aos poucos.
        this.segundaParteEmTransicao = false;

        // Intervalo padrão entre a aparição dos parágrafos sequenciais. Guardados para não precisar alterar vários trechos manualmente
        const delayEntreParagrafos = 500;

        // Primeiro bloco do tutorial: explica a progressão por níveis
        const textoParagrafo1 = this.add.text(
            this.cameras.main.centerX,
            115,
            'O Masterclass tem 3 níveis, você só pode passar de nível quando concluir o anterior.',
            {
                fontFamily: 'Inclusive Sans',
                fontSize: '22px',
                color: '#000000e7',
                align: 'center',
                wordWrap: { width: 320 }
            }
        ).setOrigin(0.5, 0).setAlpha(0);

        // Fade do primeiro texto. O delay está em zero para ele aparecer imediatamente depois da cena ser criada
        const tweenParagrafo1 = this.tweens.add({
            targets: textoParagrafo1,
            alpha: 1,
            duration: 600
        });

        // Segundo bloco: detalha que cada nível muda contexto e dificuldade
        const textoParagrafo2 = this.add.text(
            this.cameras.main.centerX,
            221,
            'Cada nível tem uma dificuldade e um contexto diferentes, nos quais as perguntas irão se basear.',
            {
                fontFamily: 'Inclusive Sans',
                fontSize: '22px',
                color: '#B60000',
                align: 'center',
                wordWrap: { width: 320 }
            }
        ).setOrigin(0.5, 0).setAlpha(0);

        // O segundo texto aparece depois do intervalo padrão para criar leitura escalonada
        const tweenParagrafo2 = this.tweens.add({
            targets: textoParagrafo2,
            alpha: 1,
            duration: 600,
            delay: delayEntreParagrafos
        });

        // Terceiro bloco da primeira etapa: apresenta o Wink como ajuda do jogador
        const textoParagrafo3 = this.add.text(
            this.cameras.main.centerX,
            355,
            'Não se preocupe! O Wink irá te acompanhar na sua jornada. Clique nele quando estiver com dúvida ou precisar de uma ajudinha.',
            {
                fontFamily: 'Inclusive Sans',
                fontSize: '22px',
                color: '#000000e7',
                align: 'center',
                wordWrap: { width: 320 }
            }
        ).setOrigin(0.5, 0).setAlpha(0);

        // Quarto bloco: detalhamento da pontuação. Ele só se revela depois do primeiro clique no botão continuar
        const textoParagrafo4 = this.add.text(
            this.cameras.main.centerX,
            165,
            'A sua pontuação é representada em R$. Você deve ter no mínimo 100 pontos para avançar ao próximo nível.',
            {
                fontFamily: 'Inclusive Sans',
                fontSize: '22px',
                color: '#B60000',
                align: 'center',
                wordWrap: { width: 320 }
            }
        ).setOrigin(0.5, 0).setAlpha(0);

        // Quinto bloco: complementa a explicação da pontuação mostrando como os pontos são ganhos.
        const textoParagrafo5 = this.add.text(
            this.cameras.main.centerX,
            330,
            'Ao acertar uma pergunta de primeira, você ganha 10 pontos, enquanto ganha menos quando pede dicas ou erra. O custo do aprendizado!',
            {
                fontFamily: 'Inclusive Sans',
                fontSize: '22px',
                color: '#000000e7',
                align: 'center',
                wordWrap: { width: 320 }
            }
        ).setOrigin(0.5, 0).setAlpha(0);

        // Recupera a pontuação global para exibir o mesmo HUD usado em outras cenas
        const pontuacao = this.registry.get('pontuacao') || 0;
        const textoPontuacao = this.add.text(335, 30, `R$ ${pontuacao}`, {
            fontFamily: 'Inclusive Sans',
            fontSize: '20px',
            color: '#ffffff',
            align: 'right'
        }).setOrigin(1, 0).setDepth(1000).setAlpha(0);

        // Círculo de destaque em volta do HUD da pontuação
        const circuloPontuacao = this.add.circle(313, 42, 28)
            .setStrokeStyle(3, 0xffffff, 1)
            .setFillStyle(0xffffff, 0.08)
            .setDepth(999)
            .setAlpha(0);

        // Seta lateral apontando para a HUD de pontuação
        const setaPontuacao = this.add.image(203, 42, 'seta')
            .setScale(0.5)
            .setTint(0xffffff)
            .setDepth(999)
            .setAlpha(0);
        const posicaoInicialSetaPontuacao = setaPontuacao.x;

        // Usando make.graphics evita depender de um asset separado e mantém o estilo padronizado da interface.
        let graphics = this.make.graphics();
        graphics.fillStyle(0xB60000, 1);
        graphics.fillRoundedRect(0, 0, 180, 50, 25);
        graphics.generateTexture('botao_continuar', 180, 50);

        // O botão é montado com imagem + texto dentro de um container, que facilita mover, escalar e animar tudo como uma coisa só
        const botaoImg = this.add.image(0, 0, 'botao_continuar');
        const botaoTexto = this.add.text(0, -2, 'Continuar', {
            fontFamily: 'Inclusive Sans',
            fontSize: '20px',
            color: '#ffffff',
            resolution: 2,
        }).setOrigin(0.5);

        const containerBotao = this.add.container(182.5, 540, [botaoImg, botaoTexto]);
        containerBotao.setSize(180, 50);
        containerBotao.setInteractive({ useHandCursor: true });

        // Elas são guardadas para que possamos cancelar tudo caso o jogador escolha pular essa etapa/ clique em continuar antes das animações terminarem
        const tweenParagrafo3 = this.tweens.add({
            targets: textoParagrafo3,
            alpha: 1,
            duration: 600,
            delay: delayEntreParagrafos * 2,
            onComplete: () => {
                // Aqui a função é chamada de fato para ligar a animação do botão
                iniciarOndulacaoBotao();
            }
        });

        let tweenParagrafo4 = null;
        let tweenParagrafo5 = null;
        let tweenHudPontuacao = null;
        let tweenSetaPontuacao = null;
        let delayedOndulacaoSegundaParte = null;
        const textosPrimeiraParte = [textoParagrafo1, textoParagrafo2, textoParagrafo3];
        const tweensPrimeiraParte = [tweenParagrafo1, tweenParagrafo2, tweenParagrafo3];
        const elementosHudPontuacao = [circuloPontuacao, textoPontuacao, setaPontuacao];

        // Cria o effeito de expansão e contração do botão para chamar atenção do jogador
        const iniciarOndulacaoBotao = () => {
            this.animacaoBotao = this.tweens.add({
                targets: containerBotao,
                scale: 1.1,
                duration: 600,
                yoyo: true,
                repeat: 5,
                ease: 'Sine.easeInOut'
            });
        };

        const pararTween = (tween) => {
            if (tween?.isPlaying()) {
                tween.stop();
            }
        };

        const pararAnimacoesDeDestaque = () => {
            pararTween(this.animacaoBotao);
            this.animacaoBotao = null;

            if (tweenSetaPontuacao) {
                tweenSetaPontuacao.stop();
                tweenSetaPontuacao = null;
            }
        };

        const finalizarSegundaParte = () => {
            this.segundaParteEmTransicao = false;
            [tweenParagrafo4, tweenParagrafo5, tweenHudPontuacao].forEach(pararTween);

            if (delayedOndulacaoSegundaParte) {
                delayedOndulacaoSegundaParte.remove(false);
                delayedOndulacaoSegundaParte = null;
            }

            textoParagrafo4.setAlpha(1);
            textoParagrafo5.setAlpha(1);
            elementosHudPontuacao.forEach((elemento) => elemento.setAlpha(0.65));
            setaPontuacao.x = posicaoInicialSetaPontuacao;
        };

        // A seta faz um pequeno movimento lateral contínuo para reforçar visualmente
        // que a pontuação destacada no topo é o elemento que o texto está explicando.
        const iniciarMovimentoSetaPontuacao = () => {
            pararTween(tweenSetaPontuacao);

            setaPontuacao.x = posicaoInicialSetaPontuacao;
            tweenSetaPontuacao = this.tweens.add({
                targets: setaPontuacao,
                x: posicaoInicialSetaPontuacao + 20,
                duration: 700,
                yoyo: true,
                repeat: -1,
                ease: 'Sine.easeInOut'
            });
        };

        // Botão de voltar no canto inferior direito
        this.add.image(315, 560, 'voltar').setScale(0.8).setInteractive({ useHandCursor: true }).on('pointerdown', () => {
            this.scene.start('telaInicial');
        });

        // O botão continuar deve ter dois comportamentos:
        // 1. no primeiro clique, troca os textos iniciais pelos textos sobre pontuação
        // 2. no segundo clique, sai do tutorial e vai para a tela de dificuldade
        containerBotao.on('pointerdown', () => {
            if (this.primeiroClique) {
                // Mudamos a flag para lembrar que a primeira etapa já foi concluída
                // Assim, se o jogador clicar de novo depois, o código entra no outro bloco
                this.primeiroClique = false;

                // Durante a troca visual entre a primeira e a segunda parte,
                // o botão fica temporariamente bloqueado para evitar cliques duplos.
                containerBotao.disableInteractive();

                // Se o botão estiver ondulando, a animação precisa parar agora. Isso evita que ele continue chamando atenção enquanto a próxima parte ainda está sendo explicada.
                pararAnimacoesDeDestaque();

                // Se o jogador clicou antes de todos os textos aparecerem, cancelamos os tweens pendentes para impedir que a primeira parte continue surgindo por cima da segunda.
                tweensPrimeiraParte.forEach(pararTween);

                // Garante um estado consistente antes do fade out da primeira parte.
                textosPrimeiraParte.forEach((texto) => texto.setAlpha(1));

                // Garantimos que o botão volte ao tamanho normal antes de continuar a transição.
                containerBotao.setScale(1);

                // Reposta visual ao clique para dar o efeito de apertar
                this.tweens.add({
                    targets: containerBotao,
                    scale: 0.95,
                    duration: 100,
                    yoyo: true,
                    onComplete: () => {
                        // Depois do efeito do clique, escondemos os três primeiros textos com fade out
                        this.tweens.add({
                            targets: textosPrimeiraParte,
                            alpha: 0,
                            duration: 200,
                            onComplete: () => {
                                // Quarto parágrafo aparece
                                tweenParagrafo4 = this.tweens.add({
                                    targets: textoParagrafo4,
                                    alpha: 1,
                                    duration: 200,
                                    onComplete: () => {
                                        // A partir daqui a segunda parte já começou de fato, então o jogador pode clicar novamente para pular o restante das animações.
                                        containerBotao.setInteractive({ useHandCursor: true });

                                        // Assim que o texto fala sobre pontuação, mostramos também o elemento real da interface: o R$, o círculo e a seta.
                                        tweenHudPontuacao = this.tweens.add({
                                            targets: elementosHudPontuacao,
                                            alpha: 0.65,
                                            duration: 300,
                                            onComplete: () => {
                                                iniciarMovimentoSetaPontuacao();
                                            }
                                        });

                                        // Depois de um intervalo, mostramos o quinto parágrafo
                                        this.segundaParteEmTransicao = true;
                                        tweenParagrafo5 = this.tweens.add({
                                            targets: textoParagrafo5,
                                            alpha: 1,
                                            duration: 200,
                                            delay: delayEntreParagrafos,
                                            onComplete: () => {
                                                // Quando o último parágrafo termina de entrar,a  segunda parte deixa de estar "em transição".
                                                this.segundaParteEmTransicao = false;

                                                // A ondulação retoma quando o último parágrafo aparece
                                                delayedOndulacaoSegundaParte = this.time.delayedCall(delayEntreParagrafos, () => {
                                                    iniciarOndulacaoBotao();
                                                });
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            } else {
                // Se o botão ainda estiver ondulando, a animação precisa parar antes da troca de cena
                pararAnimacoesDeDestaque();

                if (this.segundaParteEmTransicao) {
                    // Se o jogador clicou antes de a segunda parte terminar, cancelamos as animações pendentes e exibimos imediatamente o estado final dela.
                    finalizarSegundaParte();
                }

                // Se entrou aqui, significa que o jogador já viu a segunda parte
                // ou escolheu pular o restante das animações dela.
                containerBotao.disableInteractive();

                // Efeito de apertar o botão
                this.tweens.add({
                    targets: containerBotao,
                    scale: 0.95,
                    duration: 100,
                    yoyo: true,
                    onComplete: () => {
                        // Quando o efeito do clique termina, a câmera faz um fade out
                        this.cameras.main.fadeOut(700);

                        // A nova cena só começa depois que o fade acabar completamente
                        this.cameras.main.once('camerafadeoutcomplete', () => {
                            this.scene.start('telaDificuldade');
                        });
                    }
                });
            }
        });
    }
}
