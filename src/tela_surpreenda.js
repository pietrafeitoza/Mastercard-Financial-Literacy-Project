// Tela do presente Mastercard Surpreenda — exibida após TelaParabensFinal
// Mostra a caixa animada, explica o Surpreenda e leva ao código
class TelaSurpreendaPresente extends Phaser.Scene {
    constructor() {
        super({ key: 'telaSurpreendaPresente' });
    }

    preload() {
        this.load.image('branco', 'assets/identidade_de_marca/branco.jpg');
        this.load.image('logo', 'assets/identidade_de_marca/logo.png');
        this.load.image('estrela', 'assets/icones_gerais/estrela.png');
        this.load.image('voltar', 'assets/navegacao/voltar.png');
        this.load.audio('clique', 'assets/sons/clique.mp3');
    }

    create() {
        const W = 365;
        const H = 600;
        const CX = W / 2;

        // Fundo branco
        this.add.image(CX, 300, 'branco').setDepth(0);

        // Barra vermelha do topo
        const barraTopo = this.add.graphics().setDepth(1);
        barraTopo.fillStyle(0xB60000, 1);
        barraTopo.fillRect(0, 0, W, 90);

        // Título da tela
        this.add.text(CX, 115, 'Seu presente chegou!', {
            fontFamily: 'Inclusive Sans',
            fontSize: '18px',
            color: '#000000',
            stroke: '#000000',
            strokeThickness: 0.5,
            align: 'center'
        }).setOrigin(0.5).setDepth(2);

        this.add.text(CX, 145, 'Você ganhou um código exclusivo\n Mastercard Surpreenda', {
            fontFamily: 'Inclusive Sans',
            fontSize: '12px',
            color: '#B60000',
            align: 'center',
            wordWrap: { width: 300 }
        }).setOrigin(0.5).setDepth(2);

        // Caixa de presente animada (desenhada via Graphics)
        this.caixaContainer = this.add.container(CX, 230).setDepth(3);

        // Corpo da caixa
        const corpo = this.add.graphics();
        corpo.fillStyle(0xB60000, 1);
        corpo.fillRoundedRect(-42, 0, 84, 62, 5);

        // Faixa horizontal da caixa
        const faixaH = this.add.graphics();
        faixaH.fillStyle(0xFFCC00, 1);
        faixaH.fillRect(-42, 22, 84, 14);

        // Faixa vertical do corpo
        const faixaV = this.add.graphics();
        faixaV.fillStyle(0xFFCC00, 1);
        faixaV.fillRect(-7, 0, 14, 62);

        // Tampa
        const tampa = this.add.graphics();
        tampa.fillStyle(0xCC1111, 1);
        tampa.fillRoundedRect(-48, -34, 96, 30, 5);

        // Faixa vertical da tampa
        const faixaVTampa = this.add.graphics();
        faixaVTampa.fillStyle(0xFFCC00, 1);
        faixaVTampa.fillRect(-7, -34, 14, 30);

        // Laço esquerdo
        const lacoEsq = this.add.graphics();
        lacoEsq.fillStyle(0xFFCC00, 1);
        lacoEsq.fillEllipse(-18, -38, 28, 20);

        // Laço direito
        const lacoDireito = this.add.graphics();
        lacoDireito.fillStyle(0xFFCC00, 1);
        lacoDireito.fillEllipse(18, -38, 28, 20);

        // Nó central do laço
        const no = this.add.graphics();
        no.fillStyle(0xFFAA00, 1);
        no.fillCircle(0, -38, 8);

        this.caixaContainer.add([corpo, faixaH, faixaV, tampa, faixaVTampa, lacoEsq, lacoDireito, no]);

        // Animação da tampa subindo e descendo
        this.tweens.add({
            targets: [tampa, faixaVTampa, lacoEsq, lacoDireito, no],
            y: '-=14',
            duration: 700,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });

        // Faíscas ao redor da caixa
        const faixPosicoesBase = [
            { x: CX - 65, y: 192 }, { x: CX + 65, y: 192 },
            { x: CX - 70, y: 240 }, { x: CX + 70, y: 240 },
            { x: CX - 65, y: 290 }, { x: CX + 65, y: 290 },
        ];

        faixPosicoesBase.forEach((pos, i) => {
            const faisca = this.add.image(pos.x, pos.y, 'estrela')
                .setScale(0.001)
                .setTint(0xFFCC00)
                .setDepth(3)
                .setAlpha(0.2);

            this.tweens.add({
                targets: faisca,
                alpha: 1,
                scale: 0.005,
                duration: 600,
                delay: i * 150,
                yoyo: true,
                repeat: -1,
                ease: 'Sine.easeInOut'
            });
        });

        // Card de informações sobre o Surpreenda
        const cardInfo = this.add.graphics().setDepth(2);
        cardInfo.fillStyle(0xFFF8F8, 1);
        cardInfo.lineStyle(1, 0xE8C0C0, 1);
        cardInfo.fillRoundedRect(22, 310, W - 44, 190, 14);
        cardInfo.strokeRoundedRect(22, 310, W - 44, 190, 14);

        // Título do card
        this.add.text(CX, 330, 'O que é o Mastercard Surpreenda?', {
            fontFamily: 'Inclusive Sans',
            fontSize: '14px',
            color: '#B60000',
            align: 'center',
            stroke: '#B60000',
            strokeThickness: 0.3
        }).setOrigin(0.5).setDepth(3);

        // Linha divisória no card
        const linhaCard = this.add.graphics().setDepth(3);
        linhaCard.lineStyle(0.8, 0xE8C0C0, 1);
        linhaCard.lineBetween(38, 346, W - 38, 346);

        // Texto explicativo
        this.add.text(CX, 358, 'Programa de benefícios gratuito onde cada compra com seu cartão Mastercard vale pontos. Troque por vouchers, descontos e experiências exclusivas em parceiros.', {
            fontFamily: 'Inclusive Sans',
            fontSize: '12px',
            color: '#444444',
            align: 'center',
            lineSpacing: 4,
            wordWrap: { width: 295 }
        }).setOrigin(0.5, 0).setDepth(3);

        // 3 ícones de benefícios
        const beneficios = [
            { x: CX - 95, icon: '📱', label: 'Cadastre-se' },
            { x: CX,      icon: '🛒', label: 'Acumule pontos' },
            { x: CX + 95, icon: '🎁', label: 'Use pontos' },
        ];

        beneficios.forEach(b => {
            // Círculo de fundo
            const cirBen = this.add.graphics().setDepth(3);
            cirBen.fillStyle(0xFFEEEE, 1);
            cirBen.fillCircle(b.x, 458, 22);

            this.add.text(b.x, 458, b.icon, {
                fontSize: '18px'
            }).setOrigin(0.5).setDepth(4);

            this.add.text(b.x, 485, b.label, {
                fontFamily: 'Inclusive Sans',
                fontSize: '10px',
                color: '#B60000',
                align: 'center'
            }).setOrigin(0.5).setDepth(3);
        });

        /// Botão "Abrir meu presente" — container garante que fundo e texto pulsem juntos
        const btnContainer = this.add.container(CX, 540).setDepth(4);

        const btnG = this.add.graphics();
        btnG.fillStyle(0xB60000, 1);
        btnG.fillRoundedRect(-110, -24, 220, 48, 24);

        const txtBtn = this.add.text(0, 0, 'Abrir meu presente ✦', {
            fontFamily: 'Inclusive Sans',
            fontSize: '15px',
            color: '#ffffff',
            resolution: 2
        }).setOrigin(0.5);

        btnContainer.add([btnG, txtBtn]);

        // Pulsação suave — agora o container inteiro pulsa junto
        this.tweens.add({
            targets: btnContainer,
            scaleX: 1.03,
            scaleY: 1.03,
            duration: 900,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });

        const btnZone = this.add.zone(CX, 540, 220, 48)
            .setInteractive({ useHandCursor: true }).setDepth(5);

        btnZone.on('pointerdown', () => {
            let permissaoSom = this.registry.get('sfx_ligado');
            if (permissaoSom !== false) this.sound.play('clique', { volume: 0.8 });

            // Animação de "abertura" da caixa antes de trocar
            this.tweens.add({
                targets: this.caixaContainer,
                scaleX: 1.15,
                scaleY: 1.15,
                duration: 180,
                yoyo: true,
                onComplete: () => {
                    this.cameras.main.fadeOut(600, 255, 255, 255);
                    this.cameras.main.once('camerafadeoutcomplete', () => {
                        this.scene.start('telaSurpreendaCodigo');
                    });
                }
            });
        });

        // Fade de entrada (vem de preto)
        this.cameras.main.fadeIn(500, 0, 0, 0);

        // Animação de entrada da caixa
        this.caixaContainer.setAlpha(0);
        this.caixaContainer.setScale(0.5);
        this.tweens.add({
            targets: this.caixaContainer,
            alpha: 1,
            scaleX: 1,
            scaleY: 1,
            duration: 500,
            delay: 300,
            ease: 'Back.easeOut'
        });
    }
}