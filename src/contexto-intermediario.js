class ContextoIntermediario extends Phaser.Scene {
    constructor() {
        super({ key: 'contextoIntermediario' });
    }

    // Init: recebe os dados enviados pela tela da trilha via scene.start()
    init(data) {
        this.ilha = data.ilha || 'ilha1';
        this.modo = data.modo || 'intermediario';
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
                    titulo: 'Sua primeira mesada digital chegou! A adolescência é o ponto de partida da sua liberdade.',
                    subtitulo: 'O desafio é aprender a não gastar tudo no primeiro dia e entender que cada escolha tem um custo.',
                    explicacao: 'Cuidar do próprio dinheiro é o primeiro passo para crescer.'
                },
                ilha2: {
                    titulo: 'Primeiro emprego, grandes conquistas! Agora você é um jovem adulto com cartão de débito.',
                    subtitulo: 'Suas escolhas agora impactam seu saldo real. É hora de equilibrar boletos e momentos de lazer.',
                    explicacao: 'Gestão consciente é o segredo para a independência financeira.'
                },
                ilha3: {
                    titulo: 'Vida adulta e metas maiores. O crédito é seu aliado para mobiliar a casa ou viajar o mundo.',
                    subtitulo: 'Nesta fase, o jogo muda: você usa o crédito com sabedoria para manter suas reservas rendendo.',
                    explicacao: 'Inteligência estratégica para construir o seu patrimônio.'
                },
                ilha4: {
                    titulo: 'Auge da carreira e maturidade! Com Black ou Platinum, você protege o que mais importa.',
                    subtitulo: 'Seu foco agora é o conforto da família, segurança em viagens e aproveitar benefícios exclusivos.',
                    explicacao: 'O sucesso é colher os privilégios de uma vida bem planejada.'
                },
                ilha5: {
                titulo: 'A liberdade total é sua! Você atingiu o nível onde o dinheiro trabalha para o seu estilo de vida.',
                subtitulo: 'Mais que compras, agora você investe em experiências inesquecíveis e em deixar sua marca no mundo.',
                explicacao: 'Viver o presente com a tranquilidade de quem dominou todas as etapas do jogo.'
            },
        }

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
            this.scene.start('telaTrilhaIntermediaria');
        }).setDepth(12);
    }
}