class Configuracao extends Phaser.Scene {
    constructor() {
        super({ key: 'configuracao' });
    }

    preload() {
        this.load.image('fechar', 'assets/navegacao/fechar.png');
        this.load.image('fundo', 'assets/identidade_de_marca/fundo.png');
        this.load.image('conta', 'assets/icones_gerais/conta.png');
        this.load.image('editar', 'assets/icones_gerais/edit.png');
        this.load.image('som', 'assets/icones_gerais/som.png');
        this.load.image('som-off', 'assets/icones_gerais/som-off.png');
        this.load.image('musica-off', 'assets/icones_gerais/musica-off.png');
        this.load.image('musica', 'assets/icones_gerais/musica.png');
        this.load.image('acessibilidade', 'assets/icones_gerais/acessibilidade.png');
    }

    create() {
        // Esse bloqueador escurece o jogo ao fundo e impede clique fora da janela
        const bloqueadorFundo = this.add.rectangle(199.5, 300, 365, 600, 0x000000, 0.6)
            .setInteractive() 
            .setOrigin(0.5);

        // Recupera o nome salvo anteriormente para preencher a tela de perfil
        const nome = this.registry.get('nomeJogador') || 'Jogador';

        let larguraJogo = this.sys.game.config.width;
        let alturaJogo = this.sys.game.config.height;

        let larguraJanela = 400;
        let alturaJanela = 600;
            
        const tela = this.add.image(larguraJanela / 2, alturaJanela - 260, 'fundo').setScale(0.75);
       
        // Centraliza a câmera da cena para funcionar como modal sobre o jogo principal
        let posX = (larguraJogo - larguraJanela) / 2;
        let posY = (alturaJogo - alturaJanela) / 2;

        this.cameras.main.setViewport(posX, posY, larguraJanela, alturaJanela);

        this.add.text(larguraJanela / 2, 135, 'Configurações', { 
            fontFamily: 'Inclusive Sans',
            fontSize: '26px',
            align: 'center',
            color: '#000000',
            stroke: '#000000',
            strokeThickness: 0.8,
        }).setOrigin(0.5);

        this.add.text(larguraJanela / 2, 300, 'Sons e música', { 
            fontFamily: 'Inclusive Sans',
            fontSize: '22px',
            align: 'center',
            color: '#000000',
            stroke: '#000000',
            strokeThickness: 0.8,
        }).setOrigin(0.5);

        this.add.text(larguraJanela / 2, 430, 'Modo daltonismo', { 
            fontFamily: 'Inclusive Sans',
            fontSize: '22px',
            align: 'center',
            color: '#000000',
            stroke: '#000000',
            strokeThickness: 0.8,
        }).setOrigin(0.5);

        this.add.image(larguraJanela / 2, 200, 'conta').setScale(0.6);

        let textoNome = this.add.text(larguraJanela / 2, 250, `${nome}`, { 
            fontFamily: 'Inclusive Sans',
            fontSize: '24px',
            align: 'center',
            color: '#000000',
        }).setOrigin(0.5);

        let posicaoXEdit = textoNome.x + (textoNome.width / 2) + 20;
        let posicaoYEdit = textoNome.y;
      
        const botaoEditarNome = this.add.image(posicaoXEdit, posicaoYEdit, 'editar')
            .setScale(0.9)
            .setInteractive();

        botaoEditarNome.on('pointerover', () => { botaoEditarNome.setScale(1.0); }); 
        botaoEditarNome.on('pointerout', () => { botaoEditarNome.setScale(0.9); });  

        botaoEditarNome.on('pointerdown', () => {
            // Impede a criação de vários inputs HTML caso o botão seja clicado mais de uma vez
            if (document.getElementById('inputNomeJogador')) return;

            // O nome é editado com um input HTML porque o Phaser não oferece esse campo nativamente
            this.inputNome = document.createElement("input");
            this.inputNome.id = 'inputNomeJogador'; 
            this.inputNome.type = "text";
            this.inputNome.value = textoNome.text; 
            this.inputNome.maxLength = 15;
            this.inputNome.style.textAlign = "center";
            
            // Converte a posição do texto do Phaser para a posição real do input na página
            let posXcentro = posX + textoNome.x;
            let posYinput = posY + textoNome.y;

            const updateInputPosition = () => {
                // Usa o tamanho atual do canvas para corrigir a posição do input em diferentes escalas
                const canvasBounds = this.game.canvas.getBoundingClientRect();
                const scaleX = canvasBounds.width / larguraJogo; 
                const scaleY = canvasBounds.height / alturaJogo; 
               
                let ajusteParaBaixo = 50; 

                const left = canvasBounds.left + (posXcentro * scaleX) - (120 * scaleX);
                const top = canvasBounds.top + (posYinput * scaleY) - (22.5 * scaleY) + (ajusteParaBaixo * scaleY);

                this.inputNome.style.left = left + "px";
                this.inputNome.style.top = top + "px";
                this.inputNome.style.width = (240 * scaleX) + "px";
                this.inputNome.style.height = (45 * scaleY) + "px";
                this.inputNome.style.fontSize = (18 * scaleY) + "px";
            };

            this.inputNome.style.position = "absolute";
            this.inputNome.style.border = "none";
            this.inputNome.style.borderRadius = "8px";
            this.inputNome.style.paddingLeft = "0";
            this.inputNome.style.background = "#d9d9d9";
            this.inputNome.style.zIndex = "10";
            this.inputNome.style.outline = "2px solid #333";

            updateInputPosition();

            // Reposiciona o input se o canvas mudar de tamanho para ele não ficar desalinhado
            this.scale.on('resize', updateInputPosition);

            document.body.appendChild(this.inputNome);
            this.inputNome.focus();

            this.inputNome.addEventListener('keydown', (event) => {
                if (event.key === 'Enter') {
                    let novoNome = this.inputNome.value.trim();
                    
                    if (novoNome !== "") {
                        // Atualiza o texto visível e também salva o nome para uso nas outras cenas
                        textoNome.setText(novoNome);
                        
                        this.registry.set('nomeJogador', novoNome);
                        
                        // Recalcula a posição do lápis porque a largura do nome pode mudar
                        botaoEditarNome.x = textoNome.x + (textoNome.width / 2) + 20;
                    }
                    
                    this.inputNome.remove();
                }
            });
        });

        let btnFechar = this.add.image(larguraJanela / 2, alturaJanela - 50, 'fechar')
            .setOrigin(0.5)
            .setScale(0.1)
            .setInteractive();

        btnFechar.on('pointerover', () => { btnFechar.setScale(0.11); }); 
        btnFechar.on('pointerout', () => { btnFechar.setScale(0.1); });  

        btnFechar.on('pointerdown', () => {
            // Se fechar a tela enquanto o input estiver aberto, destroi o HTML pra não ficar flutuando
            if (this.inputNome) {
                this.inputNome.remove();
            }
            this.scene.stop(); 
        });


        // Lê o estado atual (se não existir, o padrão é true/ligado)
        let estadoMusica = this.registry.get('musica_ligada') !== false;
        let estadoSom = this.registry.get('sfx_ligado') !== false;

        // Cria o botão de música já com a imagem correta baseada no estado atual
        this.btnMusica = this.add.image(160, 360, estadoMusica ? 'musica' : 'musica-off').setScale(0.8);
        this.btnMusica.setInteractive({ useHandCursor: true });
        
        this.btnMusica.on('pointerdown', () => {
        estadoMusica = !estadoMusica;
        
        // Atualiza o registry e a textura do botão
        this.registry.set('musica_ligada', estadoMusica);
        this.btnMusica.setTexture(estadoMusica ? 'musica' : 'musica-off').setScale(0.8);

        // Busca a música direto do registry
        const musicaGlobal = this.registry.get('instanciaMusica');

        if (musicaGlobal) {
            if (estadoMusica) {
                musicaGlobal.resume(); 
            } else {
                musicaGlobal.pause();
            }
        }
    });
        // Cria o botão de efeitos sonoros (SFX) com a imagem correta
        this.btnSom = this.add.image(240, 360, estadoSom ? 'som' : 'som-off').setScale(0.8);
        this.btnSom.setInteractive({ useHandCursor: true });

        this.btnSom.on('pointerdown', () => {
            // Inverte o estado
            estadoSom = !estadoSom;
            let permissaoSom = this.registry.get('sfx_ligado');
            // Salva no registry para as Cenas de Pergunta lerem
            this.registry.set('sfx_ligado', estadoSom);
            
            // Atualiza a imagem do botão
            this.btnSom.setTexture(estadoSom ? 'som' : 'som-off').setScale(0.8);
        });

        // --- SISTEMA DE ACESSIBILIDADE ---

        this.btnDaltonismo = this.add.image(larguraJanela / 2, 480, 'acessibilidade').setScale(0.7).setInteractive({ useHandCursor: true });

        this.btnDaltonismo.on('pointerdown', () => {
            // Lê o modo atual, avança para o próximo e volta ao zero ao chegar no fim da lista
            let modoAtual = this.registry.get('modoDaltonismo') || 0;
            let proximoModo = modoAtual + 1;
        
            if (proximoModo > 3) {
                proximoModo = 0;
            }

            this.registry.set('modoDaltonismo', proximoModo);

            // O filtro é aplicado direto no canvas para afetar todas as cenas do jogo
            let canvasDoJogo = this.game.canvas;

            if (proximoModo === 0) {
                canvasDoJogo.style.filter = 'none'; 
                this.btnDaltonismo.setAlpha(1); 
            } 
            else if (proximoModo === 1) {
                canvasDoJogo.style.filter = 'hue-rotate(45deg) contrast(1.1)'; 
                this.btnDaltonismo.setAlpha(0.8); // protanopia
            }
            else if (proximoModo === 2) {
                canvasDoJogo.style.filter = 'sepia(40%) hue-rotate(-30deg) contrast(1.2)'; 
                this.btnDaltonismo.setAlpha(0.6); // deuteranopia
            }
            else if (proximoModo === 3) {
                canvasDoJogo.style.filter = 'hue-rotate(180deg) saturate(1.5)'; 
                this.btnDaltonismo.setAlpha(0.4); // tritanopia
            }
        });
    }
}