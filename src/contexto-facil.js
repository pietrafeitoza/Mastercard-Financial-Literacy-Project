class ContextoFacil extends Phaser.Scene {
    constructor() {
        super({ key: 'contextoFacil' });
    }

    // Init: recebe os dados enviados pela tela da trilha via scene.start()
    init(data) {
        this.ilha = data.ilha || 'ilha1';
        this.modo = data.modo || 'iniciante';
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
                titulo: 'Seus pais te entregam um envelope com as cores da Mastercard: é o seu primeiro Cartão Pré-pago.',
                subtitulo: 'Você receberá sua mesada e terá que aprender a equilibrar seus desejos.',
                explicacao: 'Cada escolha sua deixará o Wink mais orgulhoso ou mais atento!'
            },
            ilha2: {
                titulo: 'Você conquistou sua vaga como Jovem Aprendiz e o seu primeiro salário acabou de cair na conta.',
                subtitulo: 'Com o novo Cartão de Débito Mastercard no bolso, você sente o poder da independência real. Mas a vida adulta chega rápido com escolhas difíceis.',
                explicacao: 'O Wink está de olho para ver se você vai dominar o seu salário ou deixar que ele domine você.'
            },
            ilha3: {
                titulo: 'A vida adulta chegou com tudo! Agora você tem responsabilidades reais.',
                subtitulo: 'O banco te enviou o seu primeiro Cartão de Crédito Mastercard, um novo passo na sua jornada financeira.',
                explicacao: 'Entre faturas que chegam, pontos que acumulam e o seu Score que sobe ou desce, o Wink te guiará nessa aventura.'
            },
            ilha4: {
                titulo: 'Você chegou ao topo da montanha! Nesta fase, o foco é proteger tudo o que você construiu.',
                subtitulo: 'Seu Cartão Mastercard evoluiu com você, tornando-se um verdadeiro escudo.',
                explicacao: 'Você agora gerencia não apenas o seu dinheiro, mas planeja grandes reformas mantendo seus investimentos rendendo.'
            },
            ilha5: {
                titulo: 'Você venceu a corrida! Agora, você possui o ativo mais valioso de todos: o Tempo.',
                subtitulo: 'Após décadas de trabalho e uso inteligente do seu Cartão Mastercard, chegou a hora de colher os frutos.',
                explicacao: 'Esta fase é sobre proteger seu legado com segurança, garantindo um futuro estável para a próxima geração.'
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
            this.scene.start('telaTrilha');
        }).setDepth(12);
    }
}