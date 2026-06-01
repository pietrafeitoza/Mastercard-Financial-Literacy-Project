const perguntas = {
    // Perguntas do Nível Fácil
    iniciante: {
        // Ilha 1
        ilha1: [
            {
                fundo: 'iniciante_i1_q1',
                alternativas: [
                    'Compra lanche todo dia na escola e gasta R$120,00 por mês.',
                    'Não compra lanche na escola e guarda o dinheiro para gastar fora.',
                    'Compra um lanche uma vez por semana, gastando somente R$24 no mês.'
                ],
                correta: 2,
                dica:'Tente pensar em uma escolha que permita se divertir sem gastar todo o dinheiro de uma vez.',
                feedback: [
                    'Seu dinheiro no mês é limitado, então gaste-o com cautela. Encontre o equilíbrio para gerir seu dinheiro corretamente.',
                    'Ótimo! Você encontrou o equilíbrio entre satisfazer sua vontade e gerir bem o dinheiro.'
                ]
            },
            {
                fundo: 'iniciante_i1_q2',
                alternativas: [
                    'Gasta tudo no churrasco, pois vai te fazer muito feliz, mas fica sem dinheiro até a próxima semana.',
                    'Vai ao hambúrguer, se diverte e ainda consegue economizar R$10,00.',
                    'Vai ao hambúrguer e vai implorar aos pais para adiantar a mesada para o churrasco.'
                ],
                correta: 1,
                dica: 'O segredo não é apenas guardar, mas sim equilibrar o agora e o amanhã.',
                feedback: [
                    'Você nunca deve gastar todo seu dinheiro. É importante guardar um pouco para eventualidades.',
                    'Ótimo! Você se divertiu e ainda guardou dinheiro. Isso é equilíbrio financeiro!'
                ]
            },
            {
                fundo: 'iniciante_i1_q3',
                alternativas: [
                    'Tentar passar o cartão várias vezes até o banco liberar por insistência.',
                    'Gastar tudo o que tem e pedir o resto emprestado para um estranho.',
                    'Guardar uma parte da mesada no cartão (ex: R$50) por alguns meses até somar o valor total.'
                ],
                correta: 2,
                dica: 'Pense em uma forma honesta e organizada de conseguir o que você quer ao longo do tempo.',
                feedback: [
                    'Insistir não resolve! O cartão pré-pago só libera o que você carregou.',
                    'Juntar um pouquinho todo mês é o jeito mais inteligente de realizar um sonho grande sem dever nada a ninguém.'
                ]
            },
            {
                fundo: 'iniciante_i1_q4',
                alternativas: [
                    'Esperar alguns dias para ver se alguém encontra e te devolve.',
                    'Bloquear o cartão imediatamente pelo aplicativo ou central de atendimento.',
                    'Sair correndo e tentar gastar o que resta antes que alguém ache o cartão.'
                ],
                correta: 1,
                dica: 'Pense na diferença entre o que é vital para sobreviver e o que é apenas vontade.',
                feedback: [
                    'Esperar é arriscado! Qualquer pessoa pode usar seu saldo enquanto isso.',
                    'Segurança em primeiro lugar! Ao bloquear rápido, seu saldo fica protegido e você pode solicitar uma segunda via.'
                ]
            }

        ],
 
        // Ilha 2
        ilha2: [
            {
                fundo: 'iniciante_i2_q1',
                alternativas: [
                    'O valor fica "congelado" e só sai da conta daqui a 30 dias.',
                    'O banco paga para você e depois te manda uma conta por correio.',
                    'O valor é retirado imediatamente do seu saldo disponível na conta corrente.'
                ],
                correta: 2,
                dica: 'Pense no nome do cartão: "débito" vem de debitar, ou seja, subtrair na hora.',
                feedback: [
                    'O débito não funciona como crédito. O dinheiro sai na hora!',
                    'O débito é dinheiro vivo, só que digital! Gastou agora, sumiu da conta na hora. Fique de olho no extrato!'
                ]
            },
            {
                fundo: 'iniciante_i2_q2',
                alternativas: [
                    'Você ganhou um bônus de boas-vindas do banco por ser um novo trabalhador.',
                    'Você está pegando um empréstimo automático com uma das taxas de juros mais caras do mercado.',
                    'Esse dinheiro é um seguro que você pode usar e devolver sem custos em 6 meses.'
                ],
                correta: 1,
                dica: 'Bancos raramente dão dinheiro de graça. Se aparecer um valor extra na conta, pergunte: de onde veio e qual é o custo?',
                feedback: [
                    'O cheque especial não é presente! É um empréstimo automático com juros altíssimos.',
                    'Cuidado! O Cheque Especial é um empréstimo de emergência muito caro. O ideal é fingir que esse valor nem existe!'
                ]
            },
            {
                fundo: 'iniciante_i2_q3',
                alternativas: [
                    'Conferir seus gastos obrigatórios do mês primeiro e só comprar se sobrar dinheiro.',
                    'Comprar a blusa agora, afinal, você trabalhou duro e merece um prêmio imediato.',
                    'Usar o limite do cheque especial para comprar a blusa e depois ver como paga as outras contas.'
                ],
                correta: 0,
                dica: 'Pergunte-se: se eu gastar agora, consigo pagar aluguel, comida e transporte até o fim do mês?',
                feedback: [
                    'Ótimo! Diferencie o "eu quero" do "eu preciso". O prazer da blusa nova dura um dia, mas a fome dura o mês todo!',
                    'Gestão de salário exige priorizar custos fixos antes de gastar com desejos. Isso evita dívidas logo no início da vida adulta.'
                ]
            },
            {
                fundo: 'iniciante_i2_q4',
                alternativas: [
                    'Clicar logo para não perder o prêmio, afinal, é um brinde oficial.',
                    'Ignorar a mensagem e nunca digitar dados do cartão em links suspeitos.',
                    'Preencher apenas o número do cartão, mas não a senha, para garantir a segurança.'
                ],
                correta: 1,
                dica: 'Se você não participou de nenhuma promoção, como poderia ter ganhado um prêmio? Desconfie sempre de mensagens inesperadas.',
                feedback: [
                    'Se parece bom demais para ser verdade, provavelmente é golpe! Nunca clique em links suspeitos.',
                    'Correto! Bancos e bandeiras de cartão nunca pedem sua senha ou dados por mensagem. Acesse sempre pelo app oficial.'
                ]
            }
        ],
 
        // Ilha 3
        ilha3: [
            {
                fundo: 'iniciante_i3_q1',
                alternativas: [
                    'O banco está te dando o notebook de presente por você ser adulto.',
                    'Você está usando um dinheiro que não é seu ainda, criando uma promessa de pagamento para o mês que vem.',
                    'O valor é descontado na hora do seu salário, igual ao cartão de débito.'
                ],
                correta: 1,
                dica: 'A palavra "crédito" significa confiança. O banco confia que você vai devolver o dinheiro depois.',
                feedback: [
                    'O crédito não é presente! É um empréstimo que precisa ser pago no mês seguinte.',
                    'O crédito é um empréstimo instantâneo! Use com sabedoria, pois no mês que vem a fatura chega.'
                ]
            },
            {
                fundo: 'iniciante_i3_q2',
                alternativas: [
                    'O restante da dívida desaparece como um bônus de fidelidade.',
                    'O restante da dívida vai para o mês que vem com juros altíssimos (o famoso Crédito Rotativo).',
                    'Seu limite de crédito aumenta automaticamente no mês seguinte.'
                ],
                correta: 1,
                dica: 'Pagar o mínimo parece aliviar, mas pense: de onde vem o lucro do banco quando você faz isso?',
                feedback: [
                    'A dívida não desaparece! Ela cresce com os juros do rotativo.',
                    'Pagar o mínimo é o começo de uma bola de neve! Tente sempre pagar o valor total da fatura.'
                ]
            },
            {
                fundo: 'iniciante_i3_q3',
                alternativas: [
                    'Gastar muito mais do que ganha só para acumular mais pontos e milhas.',
                    'Passar os gastos que você já teria no crédito e pagar a fatura total em dia com o dinheiro reservado.',
                    'Deixar a fatura vencer para o banco ver que você tem movimento na conta.'
                ],
                correta: 1,
                dica: 'Os pontos só valem a pena se você não pagar juros por eles. Qual opção não gera dívida?',
                feedback: [
                    'Gastar mais para acumular pontos gera dívidas que superam qualquer benefício.',
                    'Use o sistema a seu favor! Se você paga em dia, ganha pontos e prêmios sem pagar um centavo de juros.'
                ]
            },
            {
                fundo: 'iniciante_i3_q4',
                alternativas: [
                    'Parcelar no máximo de vezes possível, ignorando o valor final com juros.',
                    'Pagar à vista com a reserva e usar o cartão apenas para compras supérfluas.',
                    'Passar o valor no cartão e usar a reserva para quitar a fatura total no vencimento, ganhando tempo e milhas.'
                ],
                correta: 2,
                dica: 'O cartão é seu aliado nos imprevistos! Se você tem a reserva, use o prazo do cartão a seu favor, mas garanta que o dinheiro estará lá no dia do vencimento.',
                feedback: [
                    'Parcelar com juros ou pagar o mínimo cria uma bola de neve. O segredo é usar o cartão para ganhar prazo e quitar o total com sua reserva no vencimento.',
                    'Você usou o prazo do seu Mastercard a seu favor, enquanto seu dinheiro continuou rendendo na reserva. Isso é inteligência financeira pura!'
                    
                ]
            }
        ],
 
        // Ilha 4
        ilha4: [
            {
                fundo: 'iniciante_i4_q1',
                alternativas: [
                    'O banco cancela a dívida da viagem automaticamente se você perder a mala.',
                    'Você tem acesso a seguros gratuitos (como Seguro de Viagem e Proteção de Compra) oferecidos pela bandeira do cartão.',
                    'O cartão dobra o valor do seu saldo toda vez que você sai do país.'
                ],
                correta: 1,
                dica: 'Cartões de crédito costumam oferecer muito mais do que crédito. Você já leu os benefícios do seu cartão?',
                feedback: [
                    'O banco não cancela dívidas por perda de bagagem. Mas o cartão oferece seguros para isso!',
                    'Nesta fase, seu cartão é mais que crédito, é um escudo! Conheça os benefícios da sua categoria Mastercard.'
                ]
            },
            {
                fundo: 'iniciante_i4_q2',
                alternativas: [
                    'Cada filho terá uma fatura separada que eles mesmos devem pagar ao banco.',
                    'O limite do adicional é infinito e não consome o limite do cartão titular.',
                    'O titular define o limite de gastos de cada cartão e todas as despesas vêm em uma única fatura.'
                ],
                correta: 2,
                dica: 'Se o cartão adicional é vinculado ao titular, quem você acha que recebe a cobrança no final do mês?',
                feedback: [
                    'O adicional não tem fatura própria. Tudo vai para a fatura do titular.',
                    'Dar um adicional é treinar a próxima geração! Você mantém o controle do orçamento familiar enquanto ensina autonomia.'
                ]
            },
            {
                fundo: 'iniciante_i4_q3',
                alternativas: [
                    'Pedir que o cliente digite a senha e o CVV em um link enviado por e-mail ou WhatsApp.',
                    'Enviar um funcionário até sua casa para recolher o cartão físico e "periciá-lo".',
                    'Bloquear o cartão preventivamente e solicitar que o cliente entre em contato pelos canais oficiais.'
                ],
                correta: 2,
                dica: 'Um banco de verdade nunca precisa da sua senha para te ajudar. Qual opção respeita essa regra?',
                feedback: [
                    'Nenhum banco pede senha por link! Isso é golpe.',
                    'O seu banco já tem seus dados, ele nunca vai te pedir senha por link! Em caso de dúvida, abra o aplicativo oficial.'
                ]
            },
            {
                fundo: 'iniciante_i4_q4',
                alternativas: [
                    'Sacar todo o dinheiro do investimento e pagar tudo à vista, mesmo sem ganhar desconto.',
                    'Parcelar sem juros no cartão, mantendo seu dinheiro investido e rendendo enquanto paga as parcelas.',
                    'Deixar para reformar daqui a 10 anos, pois usar o cartão para grandes valores diminui o limite para sempre.'
                ],
                correta: 1,
                dica: 'Se o dinheiro está rendendo no investimento e o parcelamento não tem juros, qual opção faz o dinheiro trabalhar mais para você?',
                feedback: [
                    'Sacar o investimento desnecessariamente faz você perder os juros que estavam rendendo.',
                    'O tempo é seu aliado! Se o dinheiro investido rende mais do que o custo do parcelamento, você está ganhando.'
                ]
            }
        ],
 
        // Ilha 5
        ilha5: [
            {
                fundo: 'iniciante_i5_q1',
                alternativas: [
                    'Trocar seus pontos e milhas acumulados por passagens aéreas e hospedagens.',
                    'Cancelar o cartão imediatamente para não pagar anuidade, mesmo perdendo todos os pontos.',
                    'Transferir todos os seus pontos para um desconhecido que prometeu pagar em dinheiro vivo depois.'
                ],
                correta: 0,
                dica: 'Você passou anos acumulando pontos. Qual opção aproveita ao máximo esse patrimônio conquistado?',
                feedback: [
                    'Seus pontos são como uma "segunda aposentadoria"! Use-os para realizar sonhos sem mexer na sua renda mensal.',
                    'Na aposentadoria, usar programas de fidelidade permite manter um padrão de vida alto com os bônus conquistados.'
                ]
            },
            {
                fundo: 'iniciante_i5_q2',
                alternativas: [
                    'O banco dobrar o seu limite como recompensa por você ser uma pessoa bondosa.',
                    'A dívida não ser paga pelo parente e o valor ser descontado automaticamente da sua aposentadoria.',
                    'O cartão ser cancelado pelo banco por "excesso de uso" em lojas que você não frequenta.'
                ],
                correta: 1,
                dica: 'Se o seu nome está no contrato, quem o banco vai cobrar se a outra pessoa não pagar?',
                feedback: [
                    'O banco não recompensa quem empresta o nome. Pelo contrário, você assume o risco total.',
                    'Nunca empreste seu nome para dívidas que você não possa pagar sozinho. Se o outro não pagar, a conta sobra para você!'
                ]
            },
            {
                fundo: 'iniciante_i5_q3',
                alternativas: [
                    'Usar o limite total do cartão para comprar máquinas e insumos, esperando pagar com o lucro do primeiro mês.',
                    'Vender sua casa e investir tudo no novo projeto, afinal, o risco faz parte da vida.',
                    'Planejar e usar o cartão apenas para compras que caibam na sua reserva de lazer, mantendo a reserva de emergência intocada.'
                ],
                correta: 2,
                dica: 'Todo negócio novo tem riscos. Qual opção permite realizar o sonho sem comprometer o que você já conquistou?',
                feedback: [
                    'Arriscar tudo no primeiro mês é perigoso! Lucro leva tempo para aparecer.',
                    'Sonhar não tem idade, mas arriscar o essencial, sim! Use seu crédito como ponte, não como corda bamba.'
                ]
            },
            {
                fundo: 'iniciante_i5_q4',
                alternativas: [
                    'O banco pode aumentar o valor das parcelas sempre que o salário mínimo subir.',
                    'O desconto é direto na fonte, ou seja, você recebe menos todo mês antes de pagar aluguel ou comida.',
                    'Esse tipo de empréstimo cancela automaticamente o seu cartão Mastercard.'
                ],
                correta: 1,
                dica: 'Se o dinheiro é descontado antes de chegar até você, como isso afeta sua capacidade de pagar as despesas do dia a dia?',
                feedback: [
                    'O banco não aumenta parcelas arbitrariamente, mas o desconto direto na fonte já é problema suficiente.',
                    'Cuidado com o dinheiro fácil! O desconto direto no contracheque tira o seu poder de escolha.'
                ]
            }
    
        ]
    },

    // Perguntas do Nível Intermediário
    intermediario: {

    // Ilha 1: Cartão Pré-pago
        ilha1: [
            { 
                fundo: 'intermediario_i1_q1', 
                alternativas: ['O banco dobra o valor da sua recarga automaticamente todo mês.', 'Ele permite que você gaste além do saldo e pague depois com juros.', 'Você só gasta o valor exato que recarregou, evitando surpresas no seu orçamento.'], 
                correta: 2, 
                dica: 'Use o pré-pago para "caixinhas" de gastos específicos; se o saldo acabar, suas contas essenciais continuam pagas!', 
                feedback: ['Controle Total! Sem risco de dívidas, você define seu próprio limite de diversão.', 'O pré-pago não permite crédito. Ele é seu aliado para manter o gasto sob rédea curta.'] 
            },
            { 
                fundo: 'intermediario_i1_q2', 
                alternativas: ['Pesquisar a reputação da loja e nunca fornecer a senha do seu cartão no site.', 'Digitar os seus dados e salvá-los no navegador para facilitar sua próxima compra.', 'Passar os dados e depois cancelar o seu cartão físico por segurança.'], 
                correta: 0, 
                dica: 'No mundo digital, a pressa é inimiga do seu saldo. Sites legítimos nunca pedem sua senha de 4 dígitos do cartão!', 
                feedback: ['Escudo Ativado! Credenciais são valiosas. Verificar a loja protege seu saldo de recarga.', 'Segurança em primeiro lugar! Sites falsos roubam dados; sempre use canais oficiais.'] 
            },
            { 
                fundo: 'intermediario_i1_q3', 
                alternativas: ['Porque o seu saldo em real se transforma em dobro quando você cruza a fronteira.', 'Porque você trava a cotação da moeda no dia exato da sua recarga.', 'Porque o seu cartão pré-pago é o único que não cobra IOF internacional.'], 
                correta: 1, 
                dica: 'Recarregar aos poucos (fazer preço médio) é a tática dos grandes investidores para fugir das altas repentinas do dólar.', 
                feedback: ['Planejamento Certeiro! Você evita a flutuação do câmbio e sabe exatamente quanto pode gastar.', 'No câmbio, o mercado oscila todo dia. O pré-pago é seu porto seguro.'] 
            },
            { 
                fundo: 'intermediario_i1_q4', 
                alternativas: ['Ele oferece viagens ilimitadas para você, mesmo se você estiver sem saldo.', 'Ele só funciona se você cadastrar o cartão de uma pessoa responsável por você.', 'Ele permite que você separe o "dinheiro do transporte" do restante do seu orçamento.'], 
                correta: 2, 
                dica: 'Definir um valor fixo semanal para transporte no pré-pago te ajuda a perceber se você está gastando mais do que deveria com deslocamento.', 
                feedback: ['Organização é Tudo! Separar orçamentos por "caixinhas" evita que você fique a pé no fim do mês.', 'Misturar gastos de lazer com transporte na mesma conta dificulta saber para onde o dinheiro está indo.'] 
            }
        ],

        // Ilha 2: Cartão de Débito
        ilha2: [
            { 
                fundo: 'intermediario_i2_q1', 
                alternativas: ['Ter um limite de crédito aprovado, mesmo que você esteja sem dinheiro na conta.', 'Ter o valor total da compra disponível na sua conta corrente no momento.', 'Estar com a fatura do seu mês anterior totalmente paga e liberada.'], 
                correta: 1, 
                dica: 'Antes de passar grandes compras, dê uma olhadinha rápida no extrato pelo app para evitar o "cartão recusado".', 
                feedback: ['Dinheiro na Mão! O débito é o uso imediato do seu patrimônio disponível.', 'O débito não é crédito. Se o saldo não estiver na conta agora, a compra não passa.'] 
            },
            { 
                fundo: 'intermediario_i2_q2', 
                alternativas: ['O seu cartão físico só funciona se você o inserir na máquina em uma posição específica.', 'Ela obriga o vendedor a ditar todos os valores para você em voz alta.', 'Pagamentos por aproximação até certos valores dispensam a senha, facilitando o seu uso e o de seus amigos.'], 
                correta: 2, 
                dica: 'A aproximação não é só rapidez, é inclusão! Ela permite que todos paguem com dignidade e privacidade.', 
                feedback: ['Autonomia é Direito! A tecnologia contactless torna o pagamento acessível e rápido para todos.', 'Tecnologias que dependem de movimentos complexos ou inserção exata podem excluir pessoas.'] 
            },
            { 
                fundo: 'intermediario_i2_q3', 
                alternativas: ['Criar um micro-investimento ou poupança automática para você sem esforço.', 'Pagar um imposto bancário obrigatório para você manter a conta ativa.', 'Pagar uma taxa de serviço por cada vez que você usar o cartão físico.'], 
                correta: 0, 
                dica: 'Centavos acumulados diariamente podem pagar uma conta inteira no final do ano. Investimento invisível é investimento inteligente!', 
                feedback: ['Grão em Grão! Automatizar a economia faz seu patrimônio crescer sem você perceber.', 'Gastar os centavos sem rumo não constrói futuro. O arredondamento é a forma mais indolor de começar a investir.'] 
            },
            { 
                fundo: 'intermediario_i2_q4', 
                alternativas: ['Você faz o saque rápido e tenta esconder a sua senha com a mão.', 'Tentar remover o dispositivo com as próprias mãos para ajudar o banco.', 'Você não utiliza a máquina e informa o banco ou a segurança imediatamente.'], 
                correta: 2, 
                dica: 'Prefira caixas eletrônicos dentro de agências ou locais vigiados; eles são muito mais difíceis de serem adulterados.', 
                feedback: ['Prevenção é Tudo! Dispositivos estranhos (chupa-cabras) roubam dados; nunca use máquinas suspeitas.', 'Ignorar sinais de adulteração é colocar seu saldo em risco total. Na dúvida, proteja seus dados e saia do local.'] 
            }
        ],

        // Ilha 3: Cartão de Crédito
        ilha3: [
            { 
                fundo: 'intermediario_i3_q1', 
                alternativas: ['Porque o seu dinheiro fica rendendo na conta enquanto você paga as parcelas com sua renda mensal.', 'Porque assim sobra mais limite para você gastar com lazer imediato.', 'Porque o banco dá descontos automáticos para você se parcelar muitas vezes.'], 
                correta: 0, 
                dica: 'Parcelar sem juros é usar o dinheiro do banco de graça. Mantenha o valor total rendendo no CDI e lucre com a diferença!', 
                feedback: ['Inteligência Financeira! Se não há juros, o tempo trabalha a favor do seu dinheiro investido.', 'Desembolsar o valor total sem desconto à vista é perder o rendimento que esse dinheiro teria no seu banco.'] 
            },
            { 
                fundo: 'intermediario_i3_q2', 
                alternativas: ['O banco deleta uma das suas compras anteriores como um prêmio para você.', 'Você libera seu limite de crédito mais cedo e evita o risco de esquecer a conta.', 'Nenhuma, o ideal para você é segurar o pagamento até o último segundo.'], 
                correta: 1, 
                dica: 'Pagar antes do vencimento ajuda a construir um "score" melhor, facilitando aumentos de limite no futuro.', 
                feedback: ['Organização e Crédito! Antecipar ajuda a manter um bom histórico e libera seu limite para emergências.', 'Esperar o último dia pode causar atrasos por imprevistos técnicos, gerando juros desnecessários.'] 
            },
            { 
                fundo: 'intermediario_i3_q3', 
                alternativas: ['É o dia em que o banco aumenta o seu limite de crédito automaticamente.', 'É o dia em que todas as lojas oferecem 50% de desconto para você.', 'É o dia logo após o fechamento da sua fatura, garantindo a você até 40 dias para pagar.'], 
                correta: 2, 
                dica: 'Planeje compras grandes para o dia seguinte ao fechamento da fatura para ganhar o máximo de prazo possível sem pagar juros.', 
                feedback: ['Estratégia de Prazo! Saber essa data é como ganhar um empréstimo gratuito de um mês do banco.', 'Comprar no dia anterior ao fechamento faz a conta chegar "amanhã". O mestre do crédito usa o calendário a seu favor.'] 
            },
            { 
                fundo: 'intermediario_i3_q4', 
                alternativas: ['Deixar o cartão guardado na gaveta para mostrar que você não precisa de crédito.', 'Usar o seu cartão com frequência e pagar o valor total da fatura em dia.', 'Pagar sempre o valor mínimo da fatura rigorosamente no dia do vencimento.'], 
                correta: 1, 
                dica: 'Concentrar seus gastos mensais no cartão e pagar tudo em dia é a forma mais rápida de provar que você merece um limite maior.', 
                feedback: ['Histórico Positivo! O uso consciente e o pagamento integral mostram que você é um bom gestor.', 'Pagar o mínimo ou não usar o crédito mostra instabilidade ou desinteresse. O banco quer parceiros previsíveis.'] 
            }
        ],

        // Ilhas 4 e 5: Gestão e Legado
        ilha4: [
            { 
                fundo: 'intermediario_i4_q1', 
                alternativas: ['Você aciona o Seguro de Atraso de Viagem para reembolso de sua alimentação e hotel.', 'O banco cancela a sua fatura do mês atual como um pedido de desculpas.', 'Você ganha um upgrade gratuito para a primeira classe no seu próximo voo.'], 
                correta: 0, 
                dica: 'Para esses seguros valerem, você PRECISA ter pago a passagem integralmente com o cartão elegível.', 
                feedback: ['Conforto na Crise! Benefícios de viagem transformam imprevistos em situações gerenciáveis.', 'Ficar no saguão gastando do próprio bolso sem saber que tem cobertura é o erro de quem não lê os benefícios.'] 
            },
            { 
                fundo: 'intermediario_i4_q2', 
                alternativas: ['O benefício só funciona se você tiver pago um seguro extra na loja.', 'O seguro do cartão paga o conserto ou repõe o produto que você comprou com ele.', 'O banco obriga a loja a te dar um aparelho novo de graça.'], 
                correta: 1, 
                dica: 'Antes de pagar por um seguro estendido na loja, verifique se seu cartão já não oferece essa proteção de graça!', 
                feedback: ['Seguro Invisível! Esse benefício já está incluso em muitas categorias e poupa muito dinheiro.', 'Aceitar o prejuízo ou gastar fortunas em consertos externos sem consultar o seguro do cartão é desperdício de recurso.'] 
            },
            { 
                fundo: 'intermediario_i4_q3', 
                alternativas: ['Deixar cobrando, pois o valor é pequeno e não afetará o seu longo prazo.', 'Bloquear o seu cartão físico para forçar o cancelamento de todas as suas contas.', 'Cancelar no site oficial e passar a usar um Cartão Virtual para suas novas assinaturas.'], 
                correta: 2, 
                dica: 'Use um cartão virtual diferente para cada assinatura importante; assim, se um site vazar dados, você só precisa cancelar um virtual.', 
                feedback: ['Gestão Ativa! Pequenos gastos são "vazamentos" de dinheiro. Use a tecnologia a seu favor.', 'Ignorar "gastos formiga" ou bloquear o cartão físico desnecessariamente causa caos. O cartão virtual é sua linha de defesa inteligente.'] 
            },
            { 
                fundo: 'intermediario_i4_q4', 
                alternativas: ['Compras em sites estrangeiros são totalmente isentas de impostos brasileiros para você.', 'O IOF incide sobre o valor convertido em reais na data do processamento da sua compra.', 'O IOF é uma taxa fixa de 10% aplicada em qualquer compra que você fizer pela internet.'], 
                correta: 1, 
                dica: 'Verifique se o site internacional aceita pagamentos em Reais; às vezes a conversão direta deles é melhor que a do IOF.', 
                feedback: ['Olho no Câmbio! Considere sempre o imposto federal e a cotação da moeda no seu planejamento.', 'Acreditar que o preço do site estrangeiro é o preço final na fatura é um erro comum. O estrategista já soma o IOF no orçamento.'] 
            }
        ],

        ilha5: [
            { 
                fundo: 'intermediario_i5_q1', 
                alternativas: ['Enviar uma foto nítida da frente e do verso do seu cartão por mensagem.', 'Gerar um Cartão Virtual com limite específico para aquela compra e deletá-lo depois.', 'Dar o seu cartão físico e anotar a sua senha em um papel para a pessoa levar.'], 
                correta: 1, 
                dica: 'Nunca envie fotos do seu cartão. O cartão virtual é a única forma segura de emprestar limite sem perder o controle.', 
                feedback: ['Segurança Compartilhada! O cartão virtual protege seus dados e o seu limite total.', 'Compartilhar dados sensíveis ou o cartão físico expõe você a fraudes e perda de controle.'] 
            },
            { 
                fundo: 'intermediario_i5_q2', 
                alternativas: ['O cartão permite que você dirija acima do limite de velocidade permitido.', 'Ele garante que você não precise pagar o valor diário do aluguel do veículo.', 'Muitas categorias oferecem o Seguro de Aluguel de Veículos gratuito se você pagar com o cartão.'], 
                correta: 2, 
                dica: 'Para o seguro de aluguel valer, você deve recusar o seguro (CDW/LDW) da locadora. Leia os termos no portal Mastercard antes!', 
                feedback: ['Economia Inteligente! Esse benefício pode economizar centenas de reais em uma única viagem.', 'Pagar o seguro da locadora sem checar se seu cartão já cobre é queimar dinheiro.'] 
            },
            { 
                fundo: 'intermediario_i5_q3', 
                alternativas: ['É a data codificada de quando o seu cartão foi fabricado.', 'É a chave de segurança de 3 dígitos que valida suas transações sem o cartão físico.', 'É o código que mostra para você quanto de limite ainda resta no banco.'], 
                correta: 1, 
                dica: 'O CVV é como a sua assinatura digital. Quem tem o número do cartão e o CVV, tem acesso ao seu dinheiro na web.', 
                feedback: ['Chave de Segurança! Nunca compartilhe o CVV; ele é o "token" final de autorização.', 'Achar que o CVV é apenas um número irrelevante facilita a ação de hackers. Ele é a tranca final do seu cofre digital.'] 
            },
            { 
                fundo: 'intermediario_i5_q4', 
                alternativas: ['Ele permite que seus herdeiros usem o seu limite de crédito vitaliciamente.', 'Ele oferece uma indenização financeira para dar suporte imediato aos seus dependentes.', 'Ele garante que todas as suas dívidas de cartão sejam perdoadas e nada mais.'], 
                correta: 1, 
                dica: 'Um mestre das finanças não cuida apenas do presente, mas garante que quem ele ama esteja protegido em qualquer cenário.', 
                feedback: ['Legado e Cuidado! Pensar no futuro é o topo da educação financeira; traz tranquilidade para quem você ama.', 'Focar apenas no presente ignora a necessidade de proteção patrimonial em momentos difíceis.'] 
            }
        ]
        },
// Perguntas do Nível Avançado
    avancado: {

    // Ilha 1: Gestão de Projetos e Riscos (Pré-pago)
    ilha1: [
        { 
            fundo: 'dificil_i1_q1', 
            alternativas: ['Ele permite que os anúncios rodem mesmo sem saldo, gerando uma dívida posterior.', 'Ele limita o gasto ao valor da recarga, impedindo que erros de configuração consumam todo o seu dinheiro.', 'Ele oferece rendimento automático de 200% do CDI sobre o saldo parado na recarga.'], 
            correta: 1, 
            dica: 'Trate seu cartão pré-pago como um "cofre de guerra" para projetos específicos.', 
            feedback: ['Risco Controlado! No pré-pago, você blinda seu patrimônio contra gastos inesperados.', 'O pré-pago não gera dívida; ele funciona como um disjuntor para seu orçamento.'] 
        },
        { 
            fundo: 'dificil_i1_q2', 
            alternativas: ['Entregar seu cartão pessoal e confiar que ele gastará apenas o necessário.', 'Fornecer um cartão pré-pago com carga específica para a tarefa, monitorando tudo pelo app.', 'Pedir que ele use o próprio dinheiro e prometer pagar de volta no mês seguinte.'], 
            correta: 1, 
            dica: 'Use o extrato em tempo real do app para validar os custos sem precisar de relatórios manuais.', 
            feedback: ['Delegar com Segurança! O pré-pago permite autonomia para terceiros com controle total.', 'Confiar o cartão pessoal é um risco desnecessário à sua segurança financeira principal.'] 
        },
        { 
            fundo: 'dificil_i1_q3', 
            alternativas: ['O IOF não existe para cartões pré-pagos, apenas para cartões de crédito.', 'Você deve somar o percentual do IOF ao valor da compra para definir o valor da recarga.', 'O site estrangeiro devolve o valor do IOF como desconto na próxima compra.'], 
            correta: 1, 
            dica: 'Em compras internacionais, o saldo deve ser sempre "Valor do Produto + IOF + Spread".', 
            feedback: ['Cálculo de Custo Real! Considerar impostos evita que a transação falhe por centavos.', 'O IOF é um imposto federal obrigatório e incide sim sobre o pré-pago internacional.'] 
        },
        { 
            fundo: 'dificil_i1_q4', 
            alternativas: ['Porque ele impede cobranças automáticas abusivas caso você esqueça de configurar limites.', 'Porque ele garante acesso vitalício aos serviços mesmo se você ficar sem saldo.', 'Porque ele esconde sua identidade real de todos os sites de tecnologia.'], 
            correta: 0, 
            dica: 'Erros de código podem gerar cobranças exponenciais em APIs; o pré-pago limita esse prejuízo.', 
            feedback: ['Barreira de Proteção! O pré-pago funciona como um limitador físico para cobranças variáveis.', 'Softwares não oferecem acesso vitalício gratuito por falta de saldo.'] 
        }
    ],

    // Ilha 2: Fluxo de Caixa Avançado (Débito)
    ilha2: [
        { 
            fundo: 'dificil_i2_q1', 
            alternativas: ['O desconto à vista deve ser maior do que o rendimento que esse dinheiro geraria investido.', 'Não existe custo invisível, pagar no débito é sempre a melhor opção financeira.', 'O banco cobra uma taxa obrigatória por compras de alto valor no débito.'], 
            correta: 0, 
            dica: 'Se o desconto for menor que o rendimento mensal, o parcelamento sem juros pode ser melhor.', 
            feedback: ['Pensamento de Investidor! O custo de oportunidade é o que você deixa de ganhar ao desinvestir.', 'Dinheiro parado é custo; avalie sempre se o desconto à vista compensa a perda de liquidez.'] 
        },
        { 
            fundo: 'dificil_i2_q2', 
            alternativas: ['No débito o dinheiro saiu da conta na hora; o processo de disputa é mais complexo.', 'Não existe estorno para compras no débito em nenhuma hipótese legal.', 'O banco é obrigado a te devolver o dinheiro em 24h, independente do motivo.'], 
            correta: 0, 
            dica: 'Para compras grandes com entrega futura, o crédito é seu seguro jurídico.', 
            feedback: ['Proteção de Caixa! No débito a liquidez é imediata, dificultando o bloqueio do valor.', 'O estorno existe, mas como o dinheiro já saiu da sua conta, você fica descapitalizado durante a disputa.'] 
        },
        { 
            fundo: 'dificil_i2_q3', 
            alternativas: ['Elas impedem que o usuário gaste o próprio dinheiro em situações de lazer.', 'Elas limitam a perda financeira imediata, dando tempo para o bloqueio do cartão.', 'Elas aumentam o rendimento da conta automaticamente toda vez que são ativadas.'], 
            correta: 1, 
            dica: 'Mantenha um limite diário compatível com seu gasto comum e altere apenas quando necessário.', 
            feedback: ['Segurança Inteligente! Configurar limites baixos é uma camada extra de proteção física.', 'Limites são ferramentas de segurança, não têm impacto direto no rendimento do CDI.'] 
        },
        { 
            fundo: 'dificil_i2_q4', 
            alternativas: ['É um bônus de cashback que o banco oferece por usar o cartão fora do país.', 'É a diferença entre a cotação oficial da moeda e o valor efetivamente cobrado pelo banco.', 'É o nome do seguro saúde obrigatório que vem incluso em toda compra.'], 
            correta: 1, 
            dica: 'Compare sempre o spread do seu banco com casas de câmbio para otimizar conversões.', 
            feedback: ['Custo Transparente! Entender o spread ajuda a escolher o melhor método de câmbio.', 'O spread é um custo operacional do banco, não um benefício ou seguro.'] 
        }
    ],

    // Ilha 3: Alavancagem e Patrimônio (Crédito)
    ilha3: [
        { 
            fundo: 'dificil_i3_q1', 
            alternativas: ['Para poder gastar os R$ 12.000 em uma viagem de férias imediata.', 'Para manter os R$ 12.000 investidos rendendo, usando o lucro para ajudar nas parcelas.', 'Porque o banco perdoa as últimas parcelas se você pagar as primeiras em dia.'], 
            correta: 1, 
            dica: 'O segredo da riqueza é usar o dinheiro do banco enquanto o seu trabalha para você.', 
            feedback: ['Engenharia Financeira! Você lucra com os juros compostos do seu capital investido.', 'O banco nunca perdoa parcelas; o foco aqui é a arbitragem de juros.'] 
        },
        { 
            fundo: 'dificil_i3_q2', 
            alternativas: ['Porque o banco cancela seu cartão e seu CPF para sempre se você usar o mínimo.', 'Porque os juros do rotativo criam uma dívida em bola de neve extremamente cara.', 'Porque o pagamento mínimo é considerado uma doação e não reduz o saldo devedor.'], 
            correta: 1, 
            dica: 'Um empréstimo pessoal ou consignado pode custar 10x menos que o atraso da fatura.', 
            feedback: ['Fuja do Rotativo! Os juros do cartão são os mais altos do mercado.', 'O pagamento mínimo reduz a dívida, mas os juros sobre o restante crescem exponencialmente.'] 
        },
        { 
            fundo: 'dificil_i3_q3', 
            alternativas: ['O banco olha apenas seu saldo em conta, ignorando o uso do cartão.', 'O uso correto alimenta o Cadastro Positivo, provando que você é um tomador de baixo risco.', 'Quanto mais dívidas ativas você tiver no cartão, maior será seu score.'], 
            correta: 1, 
            dica: 'Ser um usuário pesado de crédito que nunca atrasa é o melhor currículo financeiro.', 
            feedback: ['Reputação é Dinheiro! Um bom histórico reduz taxas em grandes empréstimos futuros.', 'Ter dívidas não pagas baixa o score; o que conta é a pontualidade e o uso consciente.'] 
        },
        { 
            fundo: 'dificil_i3_q4', 
            alternativas: ['Você solicita o chargeback por desacordo comercial e o banco retém o pagamento.', 'O banco te dá o valor de presente e você continua com o acesso ao curso.', 'No crédito, o dinheiro volta automaticamente em 5 minutos sem precisar de provas.'], 
            correta: 0, 
            dica: 'O chargeback é sua última linha de defesa; use-o apenas com provas de fraude ou quebra de contrato.', 
            feedback: ['Poder do Consumidor! O crédito protege o comprador em casos de serviços não prestados.', 'O processo exige análise de evidências; não é automático ou instantâneo.'] 
        }
    ],

    // Ilha 4: Blindagem e Herança (Platinum/Black)
    ilha4: [
        { 
            fundo: 'dificil_i4_q1', 
            alternativas: ['Passa os dados, pois a pessoa parece profissional.', 'Desliga e liga para o número oficial que está atrás do seu cartão físico.', 'Passa dados falsos apenas para tentar enganar o suposto golpista.'], 
            correta: 1, 
            dica: 'Bancos nunca pedem tokens por telefone. O golpista usa o senso de urgência para te cegar.', 
            feedback: ['Zero Confiança! Sempre use os canais oficiais iniciados por VOCÊ.', 'Tentar enganar o golpista ainda te mantém na linha e expõe seus padrões de comportamento.'] 
        },
        { 
            fundo: 'dificil_i4_q2', 
            alternativas: ['Você exige o dinheiro de volta gritando com o gerente da loja original.', 'Você aciona o benefício de Proteção de Preço do cartão e recebe o reembolso.', 'O cartão cancela a primeira compra e refaz na loja mais barata automaticamente.'], 
            correta: 1, 
            dica: 'Guardar o print do anúncio com preço menor é essencial para o reembolso.', 
            feedback: ['Dinheiro de Volta! Esse benefício garante o menor preço do mercado retroativamente.', 'O processo é feito via seguradora do cartão, não diretamente no caixa da loja.'] 
        },
        { 
            fundo: 'dificil_i4_q3', 
            alternativas: ['Não há diferença técnica; ambos funcionam da mesma forma.', 'O recorrente mantém a assinatura ativa e o único se "auto-destrói", evitando fraudes.', 'O cartão de uso único dá descontos maiores em sites de tecnologia.'], 
            correta: 1, 
            dica: 'O cartão virtual recorrente te poupa o trabalho de atualizar 20 sites se perder o físico.', 
            feedback: ['Arquitetura de Segurança! O uso específico blinda seu limite contra vazamentos.', 'Não há descontos por tipo de cartão virtual; a vantagem é puramente de segurança e gestão.'] 
        },
        { 
            fundo: 'dificil_i4_q4', 
            alternativas: ['Ele terá acesso ilimitado ao seu dinheiro sem que você saiba onde gasta.', 'Você monitora o consumo dele em tempo real e define limites, preparando-o para a sucessão.', 'Cartões adicionais facilitam a ocultação de patrimônio em viagens.'], 
            correta: 1, 
            dica: 'Educação financeira se aprende na prática; analise os gastos do adicional junto com seu herdeiro.', 
            feedback: ['Educação de Elite! Transmitir responsabilidade patrimonial é o maior legado.', 'O cartão adicional é totalmente visível para o titular; não serve para ocultação.'] 
        }
    ],

    // Ilha 5: O Topo do Mundo (Black/Priceless)
    ilha5: [
        { 
            fundo: 'dificil_i5_q1', 
            alternativas: ['Eles pagam a conta do jantar para você como uma cortesia do banco.', 'Eles funcionam como assistentes 24h para reservas, indicações e experiências.', 'O serviço apenas traduz o cardápio para você através de um sistema de voz.'], 
            correta: 1, 
            dica: 'Use o Concierge como um secretário executivo global para economizar seu tempo.', 
            feedback: ['Tempo é Dinheiro! O Concierge abre portas em lugares exclusivos no mundo todo.', 'O serviço organiza e reserva, mas os custos do jantar ainda são seus.'] 
        },
        { 
            fundo: 'dificil_i5_q2', 
            alternativas: ['Você deve comprar um seguro à parte, pois o do cartão não é aceito.', 'Você emite o certificado gratuitamente pelo portal da Mastercard.', 'O seguro do cartão só cobre pequenos curativos, não internações.'], 
            correta: 1, 
            dica: 'Lembre-se de emitir a apólice no site da Mastercard ANTES do voo.', 
            feedback: ['Proteção Global! O seguro do cartão é robusto e aceito pela imigração europeia.', 'O seguro Black cobre valores altíssimos, incluindo repatriação e cirurgias.'] 
        },
        { 
            fundo: 'dificil_i5_q3', 
            alternativas: ['Seus pontos viram 200.000 milhas, dobrando seu poder de viagem ou venda.', 'Os pontos perdem o valor comercial se você transferir durante uma promoção.', 'O banco cobra metade dos seus pontos acumulados como taxa de transferência.'], 
            correta: 0, 
            dica: 'Nunca transfira pontos sem uma promoção de bônus ativada para não perder dinheiro.', 
            feedback: ['Multiplicação de Ativos! Saber o momento certo de transferir é investir em lifestyle.', 'Promoções de bônus são a forma mais rápida de emitir passagens em executiva.'] 
        },
        { 
            fundo: 'dificil_i5_q4', 
            alternativas: ['O banco te devolve o valor roubado e ainda dobra a quantia.', 'Você recebe o reembolso do valor sacado sob coação, dentro de um período específico.', 'O seguro só funciona se você conseguir filmar o assaltante com o celular.'], 
            correta: 1, 
            dica: 'Esse seguro geralmente vale por até 12h após o saque; guarde o comprovante.', 
            feedback: ['Segurança Física! Benefícios Black protegem seu dinheiro físico em riscos reais.', 'O banco não dobra o valor, mas recompõe seu patrimônio conforme a apólice.'] 
        }
    ]
    }
}
