## Backend em Nest.js com conexão Prisma ORM de uma aplicação para adicionar e sortear itens de forma aleatório seguindo a seguinte heurística:

cada item possui uma raridade, e a cada raridade é atribuido um valor X,

quando adicionado um item, é somado à uma variável no banco de dados que armazena o somatório de todas probabilidades,

ao requisitar um item, é gerado automaticamente um número aleatário e resgatado todos itens do banco de dados,

após essa etapa, é comparado um ponteiro que recebe o somatório dos itens um por vez

a comparaçãoe é feita da forma (ponteiro >= numeroSorteado) ? return item : continua loop


#### dessa forma é possível reduzir o espaço gasto no banco de dados e otimizar a velocidade de entrega
