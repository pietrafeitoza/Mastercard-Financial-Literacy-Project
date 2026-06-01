// Overlay de parabéns exibido sobre a TelaTrilha ao concluir todas as ilhas iniciantes.
class TelaParabens2 extends Phaser.Scene {
    constructor() {
        super({ key: 'telaParabens2' });
    }

    preload() {
        this.load.image('logo', 'assets/identidade_de_marca/logo.png');
    }

    // Create: monta o overlay completo: fundo escuro, card animado e botões de ação
    create() {

        // Referências de posição central da tela (365×600) usadas como âncora para posicionar o fundo e o container do card
        const CX = 182.5; // Centro horizontal (365 / 2)
        const CY = 300; // Centro vertical  (600 / 2)

        // Fundo escuro fora do container para cobrir a trilha inteira
        this.add.rectangle(CX, CY, 365, 600, 0x000000, 0.75)
            .setInteractive(); // setInteractive() absorve cliques e impede que atinjam a trilha ao fundo

        // Container central: agrupa todos os elementos visuais do card
        const container = this.add.container(CX, CY);
        container.setAlpha(0); // Invisível até a animação de entrada disparar
        container.setScale(0.85); // Começa levemente menor para o efeito de "surgir"

        // Fundo do card
        const cardW = 290;
        const cardH = 370;
        const cardFundo = this.add.graphics();
        cardFundo.fillStyle(0x1a0a0a, 1);
        cardFundo.lineStyle(2, 0xB60000, 1);
        cardFundo.fillRoundedRect(-cardW / 2, -cardH / 2, cardW, cardH, 16);
        cardFundo.strokeRoundedRect(-cardW / 2, -cardH / 2, cardW, cardH, 16);

        // Círculo do troféu
        const circuloTrofeu = this.add.graphics();
        circuloTrofeu.fillStyle(0xB60000, 1);
        circuloTrofeu.fillCircle(0, -cardH / 2 + 2, 38);

        // Emoji de troféu centralizado dentro do círculo vermelho
        const trofeuTexto = this.add.text(0, -cardH / 2 + 2, '🏆', {
            fontSize: '28px'
        }).setOrigin(0.5);

        // Título principal: "Parabéns!"
        const txtParabens = this.add.text(0, -cardH / 2 + 75, 'Parabéns!', {
            fontFamily: 'Inclusive Sans',
            fontSize: '26px',
            color: '#ffffff',
            stroke: '#ffffff',
            strokeThickness: 0.5,
            align: 'center'
        }).setOrigin(0.5);

        // Subtítulo da fase concluída
        const txtFase = this.add.text(0, -cardH / 2 + 110, 'FASE INTERMEDIÁRIA CONCLUÍDA', {
            fontFamily: 'Inclusive Sans',
            fontSize: '13px',
            color: '#B60000',
            align: 'center'
        }).setOrigin(0.5);

        // Linha que divide título/subtítulo do corpo descritivo
        const separador = this.add.graphics();
        separador.lineStyle(1, 0xB60000, 0.6);
        separador.lineBetween(-110, -cardH / 2 + 130, 110, -cardH / 2 + 130);

        // Texto descritivo da conquista
        const txtDescricao = this.add.text(0, -cardH / 2 + 170, 'Você completou todas as ilhas!\nAgora avance para a fase\navançada.', {
            fontFamily: 'Inclusive Sans',
            fontSize: '13px',
            color: '#cccccc',
            align: 'center',
            lineSpacing: 4,
            wordWrap: { width: 240 }
        }).setOrigin(0.5);

        // Mini card "DESBLOQUEADO"
        const miniCardY = -cardH / 2 + 255;

        // Fundo do mini card com borda vermelha
        const miniCardFundo = this.add.graphics();
        miniCardFundo.fillStyle(0x2a0a0a, 1);
        miniCardFundo.lineStyle(1.5, 0xB60000, 1);
        miniCardFundo.fillRoundedRect(-110, miniCardY - 28, 220, 56, 10);
        miniCardFundo.strokeRoundedRect(-110, miniCardY - 28, 220, 56, 10);

        // Label "DESBLOQUEADO" em vermelho - destaque de status acima do nome do item
        const txtDesbloqueado = this.add.text(-100, miniCardY - 14, 'DESBLOQUEADO', {
            fontFamily: 'Inclusive Sans',
            fontSize: '11px',
            color: '#B60000',
        }).setOrigin(0, 0.5);

        // Nome do item desbloqueado
        const txtCartao = this.add.text(-100, miniCardY + 6, 'Cartão Avançado', {
            fontFamily: 'Inclusive Sans',
            fontSize: '13px',
            color: '#ffffff',
        }).setOrigin(0, 0.5);

        // Logo Mastercard
        const logoMastercard = this.add.image(73, miniCardY, 'logo').setScale(0.18);

        // Botão "Continuar"
        // Ação principal do overlay: valida pontuação mínima e avança a progressão
        const btnY = -cardH / 2 + 322;

        // Fundo vermelho do botão
        const btnFundo = this.add.graphics();
        btnFundo.fillStyle(0xB60000, 1);
        btnFundo.fillRoundedRect(-100, btnY - 20, 200, 40, 20);

        // Rótulo do botão centralizado sobre o fundo
        const txtContinuar = this.add.text(0, btnY, 'Continuar →', {
            fontFamily: 'Inclusive Sans',
            fontSize: '18px',
            color: '#ffffff',
            resolution: 2, // Resolução dobrada para texto nítido em telas de alta densidade
        }).setOrigin(0.5);

        // Zone invisível sobreposta ao botão para capturar eventos de ponteiro
        // Separa a lógica de interação do elemento visual, evitando problemas de hit area
        const btnZone = this.add.zone(0, btnY, 200, 40).setInteractive({ useHandCursor: true });

        // Efeitos de hover e click: feedback visual imediato ao jogador
        btnZone.on('pointerover', () => { btnFundo.setAlpha(0.85); });
        btnZone.on('pointerout',  () => { btnFundo.setAlpha(1); });

        // Ao clicar: micro-animação de "aperto" antes de navegar
        btnZone.on('pointerdown', () => {
            this.tweens.add({
                targets: container,
                scaleX: 0.97,
                scaleY: 0.97,
                duration: 80,
                yoyo: true,
                onComplete: () => {
                    // Desbloqueia o modo avançado via flag dedicada
                    this.registry.set('avancadoDesbloqueado', true);
                    localStorage.setItem('avancadoDesbloqueado', 'true');
                    // Para esta cena e a trilha antes de iniciar a tela de dificuldade
                    this.scene.stop();
                    this.scene.stop('telaTrilhaIntermediaria');
                    this.scene.start('telaDificuldade');
                }
            });
        });

        // Adiciona todos os elementos ao container na ordem de renderização
        container.add([
            cardFundo,
            circuloTrofeu,
            trofeuTexto,
            txtParabens,
            txtFase,
            separador,
            txtDescricao,
            miniCardFundo,
            txtDesbloqueado,
            txtCartao,
            logoMastercard,
            btnFundo,
            txtContinuar,
            btnZone,
        ]);

        // "Voltar para a trilha"
        const txtVoltar = this.add.text(CX, CY + cardH / 2 + 22, 'Voltar para a trilha', {
            fontFamily: 'Inclusive Sans',
            fontSize: '14px',
            color: '#ffffff',
            align: 'center',
        }).setOrigin(0.5)
          .setAlpha(0) // Invisível até o card terminar de entrar
          .setInteractive({ useHandCursor: true });

        // Feedback de hover: diminui opacidade para indicar clicabilidade
        txtVoltar.on('pointerover', () => { txtVoltar.setAlpha(0.65); });
        txtVoltar.on('pointerout',  () => { txtVoltar.setAlpha(1); });
        // Para apenas esta cena — a TelaTrilha continua ativa ao fundo
        txtVoltar.on('pointerdown', () => {
            this.registry.set('avancadoDesbloqueado', true);
            localStorage.setItem('avancadoDesbloqueado', 'true');
            this.scene.stop();
        });
        // Animação de entrada do card
        // Back.easeOut cria o efeito de "ultrapassar e voltar" (elástico suave) reforçando a sensação de conquista ao exibir o card
        this.tweens.add({
            targets: container,
            alpha: 1,
            scaleX: 1,
            scaleY: 1,
            duration: 350,
            ease: 'Back.easeOut',
            onComplete: () => {
                // "Voltar" aparece com fade-in só após o card estar totalmente visível, para não distrair o jogador durante a animação principal
                this.tweens.add({
                    targets: txtVoltar,
                    alpha: 1,
                    duration: 200
                });
            }
        });
    }
}