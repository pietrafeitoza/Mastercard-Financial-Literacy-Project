
// Cena do Phaser responsável por exibir o mapa de progresso do jogo, as ilhas 
class TelaTrilhaAvancada extends Phaser.Scene {
    constructor() {
        super({ key: 'telaTrilhaAvancada' });
        // Saldo local mantido por compatibilidade caso a cena use esse valor no futuro
        this.saldo = 0;
    }

    // Preload: carrega todos os assets (imagens) necessários para esta cena
    preload() {
        this.load.image('fundo_mapa3', 'assets/identidade_de_marca/tela.trilha3.png'); // Imagem de fundo do mapa
        this.load.image('lista', 'assets/icones_gerais/lista.png'); // Ícone de menu (para contraste com fundo escuro)
        this.load.image('voltar', 'assets/navegacao/voltar.png'); // Botão de voltar
        this.load.image('retangulo_2', 'assets/identidade_de_marca/retangulo_2.png'); // Barra decorativa do topo da tela

        // Assets visuais de cada nível da trilha
        this.load.image('part_01', 'assets/icones_trilha/part_01.png'); // Ícone calculadora
        this.load.image('part_02', 'assets/icones_trilha/part_02.png'); // Ícone banco
        this.load.image('part_03', 'assets/icones_trilha/part_03.png'); // Ícone brasão
        this.load.image('part_04', 'assets/icones_trilha/part_04.png'); // Ícone sinal de mais
        this.load.image('part_05', 'assets/icones_trilha/part_05.png'); // Ícone gráfico
        this.load.image('part_06', 'assets/icones_trilha/part_06.png'); // Ícone porquinho
        this.load.audio('pop-up', 'assets/sons/pop-up.mp3');
        this.load.audio('erro', 'assets/sons/erro.mp3');
        this.load.audio('clique', 'assets/sons/clique.mp3'); 

    }

    // Create: monta todos os elementos visuais, animações e eventos da cena
    create() {


        // Recupera o nome do jogador salvo no registry global do Phaser
        const nome = this.registry.get('nomeJogador') || 'Jogador';

        // Fundo do mapa: garante que a imagem preencha a tela inteira sem barras pretas
        const fundo = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'fundo_mapa3');
        fundo.setDisplaySize(this.cameras.main.width, this.cameras.main.height);

        // Barra decorativa do topo: garante que fique acima do fundo e dos níveis
        const barraTopo = this.add.image(182.5, 45, 'retangulo_2').setDisplaySize(365, 90).setDepth(10);

        // Lê a pontuação global e desenha o texto no mesmo lugar usado na cena de perguntas
        const pontuacao = this.registry.get('pontuacao') || 0;
        this.add.text(335, 30, `R$ ${pontuacao}`, {
            fontFamily: 'Inclusive Sans',
            fontSize: '20px',
            color: '#ffffff',
            align: 'right'
        }).setOrigin(1, 0).setDepth(1000);

        // Ícone de menu (canto superior esquerdo)
        this.add.image(40, 45, 'lista').setScale(0.65).setDepth(11)
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => {
            this.scene.stop('configuracao'); 
            this.scene.launch('configuracao');

            });
        // Círculo branco semi-transparente atrás do botão melhora o contraste com o fundo da trilha.
        this.add.circle(315, 560, 28, 0xffffff, 0.7)
            .setDepth(11)
            .setScale(0.75);

        // Botão de voltar permanece acima do círculo para ficar legível e clicável.
        this.add.image(315, 560, 'voltar').setScale(0.8).setInteractive({ useHandCursor: true }).on('pointerdown', () => {
            this.scene.start('telaDificuldade');
        }).setDepth(12);

        // Função auxiliar para adicionar efeito de "mexer" ao passar o mouse
        const adicionarEfeitoHover = (item) => {
            // Cada evento ajusta a escala para passar sensação de botão vivo
            item.on('pointerover', () => {
                // Se a ilha estiver bloqueada, ela não reage ao passar o mouse.
                if (item.getData('bloqueado')) return;
                this.tweens.add({
                    targets: item,
                    scale: 0.25, // pointerover > Aumenta um pouco ao passar o mouse
                    duration: 200,
                    ease: 'Power2'
                });
            });

            item.on('pointerout', () => {
                // Se a ilha estiver bloqueada, mantém o visual parado.
                if (item.getData('bloqueado')) return;
                this.tweens.add({
                    targets: item,
                    scale: 0.22, // pointerout > Volta ao tamanho original ao tirar o mouse
                    duration: 200,
                    ease: 'Power2'
                });
            });

            item.on('pointerdown', () => {
                // Se a ilha estiver bloqueada, não faz a animação de clique.
                if (item.getData('bloqueado')) return;
                this.tweens.add({
                    targets: item,
                    scale: 0.20, // pointerdown > Encolhe ao clicar
                    duration: 100,
                    yoyo: true, // E volta, criando efeito de "aperto"
                    ease: 'Power2'
                });
            });
        };

        // Lógica de desbloqueio e animação

        // Índice do nível atual desbloqueado (0 = primeiro nível da sequência)
        
        this.nivelDesbloqueado = this.registry.get('nivelDesbloqueado_avancado') || 0;

        // Função para adicionar o efeito de "flutuar" (sobe e desce infinitamente)
        // Usada para indicar visualmente o próximo passo ao jogador
        const adicionarFlutuacao = (item) => {
            this.tweens.add({
                targets: item,
                y: item.y - 10, // Sobe 10px a partir da posição atual
                duration: 1000,
                ease: 'Sine.easeInOut', // Suaviza início e fim, deixando o movimento orgânico
                yoyo: true, // Inverte automaticamente (desce de volta)
                loop: -1 // Repete infinitamente
            });
        };

        // Função que define o visual e a interatividade de cada nível
        const configurarNivel = (item, index) => {
            if (index < this.nivelDesbloqueado) {
                // Nível já completado: aparência normal, pode ser rejogado
                item.setData('bloqueado', false);
                item.setAlpha(1);
                item.clearTint();
                item.setInteractive({ useHandCursor: true });
            } else if (index === this.nivelDesbloqueado) {
                // Nível atual: aparência normal e flutuação para chamar atenção
                item.setData('bloqueado', false);
                item.setAlpha(1);
                item.clearTint();
                item.setInteractive({ useHandCursor: true });
                adicionarFlutuacao(item); // Só o atual flutua
            } else {
                // A ilha continua escura e parada, mas ainda pode abrir o pop-up.
                item.setData('bloqueado', true);
                item.setAlpha(0.6);
                item.setTint(0x888888);
                item.setInteractive({ useHandCursor: true });
            }
        };

        // Adicionando os níveis na trilha

        // Dados de cada nível: asset, posição x/y, ordem na sequência e texto do pop-up
        // Para reposicionar ou adicionar um nível, basta editar aqui sem mexer no resto do código
        const dadosNiveis = [
            {
                key: 'part_06', x: 200, y: 580, // 1º na sequência - início da trilha
                titulo: 'Fase 1 | Pré-adolescente \n(14-16 anos)',
                descricao: 'Você acabou de completar 14 anos e ganhou seu primeiro cartão pré-pago da Mastercard. \n\nCom grandes poderes, vêm grandes responsabilidades!'
            },
            {
                key: 'part_01', x: 85, y: 415, // 2º na sequência - asfalto inferior esquerdo
                titulo: 'Fase 2 | Final da Adolescência \n(16-19 anos)',
                descricao: 'Você está crescendo e o cartão de débito é sua nova ferramenta. \n\nSerá que você está pronto para o próximo nível, o cartão de crédito?'
            },
            {
                key: 'part_03', x: 230, y: 320, // 3º na sequência - centro-esquerda
                titulo: 'Fase 3 | Jovem Adulto \n(20-40 anos)',
                descricao: 'Crédito, dívidas e independência financeira. \n\nAs decisões ficam mais complexas e as consequências, também.'
            },
            {
                key: 'part_04', x: 266, y: 216, // 4º na sequência - curva para a direita
                titulo: 'Fase 4 | Adulto \n(40-65 anos)',
                descricao: 'Chegou a hora de encarar o endividamento de frente e planejar os próximos anos com consciência.'
            },
            {
                key: 'part_05', x: 120, y: 170, // 5º na sequência - topo da trilha
                titulo: 'Fase 5 | Aposentadoria \n(65+ anos)',
                descricao: 'A reta final da jornada. \n\nFoco em projeto de vida, endividamento e como garantir tranquilidade no futuro.'
            },
        ];

        // Cria todos os níveis a partir dos dados acima, já na ordem correta da trilha
        // Converte os dados em Game Objects interativos e guarda a sequência para configurar o estado
        const sequenciaNiveis = dadosNiveis.map(({ key, x, y, titulo, descricao }, index) => {
            const nivel = this.add.image(x, y, key)
                .setScale(0.22)
                .setOrigin(0.5, 1)
                .setDepth(2)
                .setInteractive({ useHandCursor: true }); // Ativa cliques e muda o cursor para mãozinha

            adicionarEfeitoHover(nivel);

            // Ao clicar no nível, exibe o pop-up com o resumo da ilha
            nivel.on('pointerdown', () => {
                this.exibirPopupIlha(titulo, descricao, index);
                let permissaoSom = this.registry.get('sfx_ligado');
                if (permissaoSom !== false) {
                this.sound.play('pop-up');
            } 
            });

            return nivel;
        });

        // Aplicando a configuração inicial de estado em cada nível (completo/ativo/bloqueado)
        sequenciaNiveis.forEach((item, index) => {
            configurarNivel(item, index);
        });

    }

    // Exibe o pop-up com o resumo da ilha ao clicar no ícone do nível
    exibirPopupIlha(titulo, descricao, index) {
        // Descobre se a ilha já pode ser acessada ou se ainda está bloqueada.
        const nivelDesbloqueado = index <= this.nivelDesbloqueado;
        // Quando a ilha está bloqueada, o botão Fechar fica centralizado.
        const posicaoBotaoFechar = nivelDesbloqueado ? -70 : 0;

        // Bloqueador escuro cobre a tela para impedir cliques fora do pop-up
        const bloqueador = this.add.rectangle(182.5, 300, 365, 600, 0x000000, 0.6)
            .setDepth(20)
            .setInteractive();

        // Container do pop-up começa pequeno e invisível para animar a entrada
        // Container centraliza todos os elementos do pop-up para animar abertura e fechamento juntos
        const containerPopup = this.add.container(182.5, 300)
            .setDepth(21)
            .setScale(0)
            .setAlpha(0);

        // Fundo branco do pop-up com borda vermelha para manter identidade visual
        const fundoPopup = this.add.rectangle(0, 0, 300, 300, 0xffffff)
            .setStrokeStyle(3, 0xB60000);

        // Título da ilha em vermelho escuro para destaque
        const txtTitulo = this.add.text(0, -110, titulo, {
            fontFamily: 'Inclusive Sans',
            fontSize: '15px',
            color: '#B60000',
            align: 'center',
            wordWrap: { width: 260 }
        }).setOrigin(0.5);

        // Linha separadora entre título e descrição
        const separador = this.add.rectangle(0, -75, 240, 2, 0xB60000);

        // Texto descritivo da ilha
        const txtDescricao = this.add.text(0, 0, descricao, {
            fontFamily: 'Inclusive Sans',
            fontSize: '13px',
            color: '#000000',
            align: 'center',
            wordWrap: { width: 250 }
        }).setOrigin(0.5);

        // Botão Fechar: fecha o pop-up e permanece na tela da trilha
        const btnFechar = this.add.text(posicaoBotaoFechar, 110, 'Fechar', {
            fontFamily: 'Inclusive Sans',
            fontSize: '15px',
            color: '#B60000',
            backgroundColor: '#ffffff',
            padding: { x: 16, y: 8 }
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });

        // Borda vermelha no botão Fechar para destaque sem preenchimento
        const bordaBtnFechar = this.add.rectangle(posicaoBotaoFechar, 110, 100, 36, 0xffffff)
            .setStrokeStyle(2, 0xB60000);

        // Agrupa todos os itens visuais para o tween atuar no pop-up inteiro
        const elementosPopup = [fundoPopup, txtTitulo, separador, txtDescricao, bordaBtnFechar, btnFechar];

        // Toda ilha mostra o botão Fechar. O Continuar só aparece nas liberadas.
        let btnContinuar = null;
        if (nivelDesbloqueado) {
            btnContinuar = this.add.text(70, 110, 'Continuar', {
                fontFamily: 'Inclusive Sans',
                fontSize: '15px',
                color: '#ffffff',
                backgroundColor: '#B60000',
                padding: { x: 16, y: 8 }
            }).setOrigin(0.5).setInteractive({ useHandCursor: true });

            elementosPopup.push(btnContinuar);
        }

        containerPopup.add(elementosPopup);

        // Anima a entrada do pop-up com efeito elástico de crescimento
        this.tweens.add({
            targets: containerPopup,
            scale: 1,
            alpha: 1,
            duration: 350,
            ease: 'Back.easeOut'
        });

        // Função reutilizável para animar o fechamento do pop-up
        const fecharPopup = (onComplete) => {
            this.tweens.add({
                targets: containerPopup,
                scale: 0,
                alpha: 0,
                duration: 200,
                ease: 'Back.easeIn',
                onComplete: () => {
                    containerPopup.destroy();
                    bloqueador.destroy();
                    if (onComplete) onComplete(); // Executa a ação específica de cada botão
                }
            });
        };

        // Botão Fechar: apenas fecha o pop-up e fica na trilha
        btnFechar.on('pointerdown', () => {
            fecharPopup(); // Sem callback: não navega para lugar nenhum
            let permissaoSom = this.registry.get('sfx_ligado');
            if (permissaoSom !== false) {
            this.sound.play('clique');
            } 
        });

        // Botão Continuar: fecha o pop-up e navega para a fase se estiver desbloqueada
        if (btnContinuar) {
            btnContinuar.on('pointerdown', () => {
                fecharPopup(() => {
                        // Som de clique isolado
                        let permissaoSom = this.registry.get('sfx_ligado');
                        if (permissaoSom !== false) {
                            this.sound.play('clique');
                        }
                        
                        // Mudança de cena e passagem de dados (fora da verificação de som)
                        let ilhaEscolhida = 'ilha' + (index + 1);
                        const modoSelecionado = this.registry.get('modoDificuldade') || 'avancado';
                        
                        this.scene.start('contextoAvancado', {
                            ilha: ilhaEscolhida,
                            modo: modoSelecionado
                        });
                    
                });
            });
        }

        // Clicar no bloqueador fecha o pop-up sem navegar, igual ao botão Fechar
        bloqueador.on('pointerdown', () => {
            fecharPopup();
        });
    }

};
