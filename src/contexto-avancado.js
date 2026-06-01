class ContextoAvancado extends Phaser.Scene {
    constructor() {
        super({ key: 'contextoAvancado' });
    }

    // Init: recebe os dados enviados pela tela da trilha via scene.start()
    init(data) {
        this.ilha = data.ilha || 'ilha1';
        this.modo = data.modo || 'avancado';
    }

    preload() {
        this.load.image('branco', 'assets/identidade_de_marca/branco.jpg');
        this.load.image('retangulo', 'assets/identidade_de_marca/retangulo_2.png');
        this.load.image('voltar', 'assets/navegacao/voltar.png');
    }

    create() {

        // Dados de contexto para cada ilha: título, subtítulo e texto explicativo
        // Para alterar o conteúdo de uma ilha, basta editar aqui
       const conteudoPorIlha = {
            ilha1: {
                titulo: 'Você iniciou sua jornada como empreendedor e freelancer!',
                subtitulo: 'O capital é o seu bem mais precioso e qualquer erro pode custar o seu projeto.',
                explicacao: 'Use o Mastercard Pré-pago como blindagem de risco para separar seus investimentos do seu sustento pessoal.'
            },
            ilha2: {
                titulo: 'Seu fluxo de caixa agora movimenta grandes valores e decisões reais.',
                subtitulo: 'Com o Cartão de Débito Mastercard, você gerencia a liquidez imediata do seu negócio e vida pessoal.',
                explicacao: 'O jogo aqui é maximizar rendimentos e garantir que cada saída seja uma decisão estratégica de investimento.'
            },
            ilha3: {
                titulo: 'O banco reconheceu seu sucesso e liberou o Cartão de Crédito Mastercard.',
                subtitulo: 'Para você, o crédito é uma alavanca para construir patrimônio e escalar seus resultados.',
                explicacao: 'Domine a engenharia financeira: use o prazo do banco para crescer enquanto seu capital rende juros compostos.'
            },
            ilha4: {
                titulo: 'Seu patrimônio atingiu um nível que exige blindagem e proteção de elite.',
                subtitulo: 'Com o Mastercard Platinum, você acessa seguros avançados contra riscos e golpes sofisticados.',
                explicacao: 'É hora de planejar o futuro e ensinar a próxima geração a cuidar do legado que você construiu.'
            },
            ilha5: {
                titulo: 'Você chegou ao topo da pirâmide! O mundo agora é o seu quintal.',
                subtitulo: 'Seu Mastercard Black é um passaporte para experiências globais e otimização de alta performance.',
                explicacao: 'Foque em seguros internacionais de elite e no networking que apenas ambientes Priceless podem proporcionar.'
            },
        };

        // Recupera o conteúdo da ilha atual, com fallback para ilha1 se não encontrar
        const conteudo = conteudoPorIlha[this.ilha] || conteudoPorIlha['ilha1'];

        // Elementos visuais
        this.add.image(182.5, 300, 'branco');
        this.add.image(182.5, 45, 'retangulo').setDisplaySize(365, 90);

        const textoTitulo = this.add.text(
            this.cameras.main.centerX, 165,
            conteudo.titulo,
            {
                fontFamily: 'Inclusive Sans',
                fontSize: '20px',
                color: '#000000',
                align: 'center',
                wordWrap: { width: 320 }
            }
        ).setOrigin(0.5, 0.5).setAlpha(0);

        this.tweens.add({ targets: textoTitulo, alpha: 1, duration: 600, delay: 500 });

        const textoMeio = this.add.text(
            this.cameras.main.centerX, 297,
            conteudo.subtitulo,
            {
                fontFamily: 'Inclusive Sans',
                fontSize: '20px',
                color: '#B60000',
                align: 'center',
                wordWrap: { width: 320 }
            }
        ).setOrigin(0.5, 0.5).setAlpha(0);

        this.tweens.add({ targets: textoMeio, alpha: 1, duration: 800, delay: 1000 });

        const textoExplicativo = this.add.text(
            this.cameras.main.centerX, 436,
            conteudo.explicacao,
            {
                fontFamily: 'Inclusive Sans',
                fontSize: '20px',
                color: '#000000',
                align: 'center',
                wordWrap: { width: 320 }
            }
        ).setOrigin(0.5, 0.5).setAlpha(0);

        this.tweens.add({ targets: textoExplicativo, alpha: 1, duration: 700, delay: 1500 });

        // Botão Continuar
        let graphics = this.make.graphics();
        graphics.fillStyle(0xB60000, 1);
        graphics.fillRoundedRect(0, 0, 180, 50, 25);
        graphics.generateTexture('botao_continuar', 180, 50);

        const botaoImg = this.add.image(0, 0, 'botao_continuar');
        const botaoTexto = this.add.text(0, -2, 'Continuar', {
            fontFamily: 'Inclusive Sans',
            fontSize: '20px',
            color: '#ffffff',
            resolution: 2,
        }).setOrigin(0.5);

        const containerBotao = this.add.container(182.5, 530, [botaoImg, botaoTexto]);
        containerBotao.setSize(180, 50);
        containerBotao.setInteractive({ useHandCursor: true });

        // Ao continuar: passa ilha e modo para a cena de perguntas
        containerBotao.on('pointerdown', () => {
            this.scene.start('cenaPergunta', {
                ilha: this.ilha,
                modo: this.modo
            });
        });

        // Botão voltar: retorna ao mapa da trilha
        this.add.image(315, 560, 'voltar').setScale(0.8).setInteractive({ useHandCursor: true }).on('pointerdown', () => {
            this.scene.start('telaTrilhaAvancada');
        }).setDepth(12);
    }
}