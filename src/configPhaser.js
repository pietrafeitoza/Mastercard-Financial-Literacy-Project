// Código de inicialização do jogo: carrega fonte, cria jogo Phaser e registra cenas.
window.onload = function () {
    // Configurações principais do Phaser
    const config = {
        type: Phaser.AUTO,
        backgroundColor: '#000000',
        scale: {
            mode: Phaser.Scale.FIT, 
            autoCenter: Phaser.Scale.NONE, 
            width: 365,
            height: 600,
        },

    scene: []

    };

    // Carrega a fonte personalizada antes de iniciar o jogo
    document.fonts.load("16px 'Inclusive Sans'").then(() => {
        // Cria a instância do jogo
        const game = new Phaser.Game(config);

        // Adiciona as cenas ao jogo
        game.scene.add('telaInicial', TelaInicial);
        game.scene.add('telaCarregamento', TelaCarregamento);
        game.scene.add('telaNome', TelaNome);
        game.scene.add('telaTutorial', TelaTutorial);
        game.scene.add('telaDificuldade', TelaDificuldade);
        game.scene.add('telaTrilha', TelaTrilha);
        game.scene.add('telaCreditos', TelaCreditos);
        game.scene.add('cenaPergunta', CenaPergunta);
        game.scene.add('configuracao', Configuracao);
        game.scene.add('contextoFacil', ContextoFacil);
        game.scene.add('contextoIntermediario', ContextoIntermediario);
        game.scene.add('contextoAvancado', ContextoAvancado);
        game.scene.add('telaParabens1', TelaParabens1);
        game.scene.add('telaParabens2', TelaParabens2);
        game.scene.add('telaTrilhaIntermediaria', TelaTrilhaIntermediaria);
        game.scene.add('telaTrilhaAvancada', TelaTrilhaAvancada);
        game.scene.add('telaParabens3', TelaParabens3);
        game.scene.add('telaFalha', TelaFalha);

        // NOVAS CENAS: Fluxo final Mastercard Surpreenda
        game.scene.add('telaSurpreendaPresente', TelaSurpreendaPresente); // Caixa presente + info Surpreenda
        game.scene.add('telaSurpreendaCodigo', TelaSurpreendaCodigo);     // Código MASTER-MIND + link
        
        const chaves = [
            'intermediarioDesbloqueado',
            'avancadoDesbloqueado',
            'nivelDesbloqueado_iniciante',
            'nivelDesbloqueado_intermediario',
            'nivelDesbloqueado_avancado',
            'nomeJogador',
            'pontuacao',
            'musica_ligada',
            'sfx_ligado',
            'modoDaltonismo'
        ];
    
        chaves.forEach(chave => {
            const valor = localStorage.getItem(chave);
            if (valor !== null) {
                // Converter tipos corretamente
                if (valor === 'true') game.registry.set(chave, true);
                else if (valor === 'false') game.registry.set(chave, false);
                else if (!isNaN(valor)) game.registry.set(chave, Number(valor));
                else game.registry.set(chave, valor);
            }
        });
    
        // A chave 'questoesPontuadas' precisa tratamento especial (objeto JSON)
        const qp = localStorage.getItem('questoesPontuadas');
        if (qp) game.registry.set('questoesPontuadas', JSON.parse(qp));

        // Define qual cena será iniciada primeiro
        game.scene.start('telaInicial');
    });
};