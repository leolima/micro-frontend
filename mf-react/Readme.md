
Vocabulário:
    - [Aplicação remota] é um app isolado que não é o host.


Contras:

- O gerenciador de estado tem que ser compativel com todas as frameworks.
    caso contrario o host ficará encarregado de encaminhar as propriedades para aplicações remotas.

- Utilizar css module pode causar conflitos entre estilos de outras aplicações.
    precisamos isolar o css de modo que seja impossivel css de uma aplicação comprometer o de outra.

- [Module Federation] Arquivos remoteEntry (dependências) de todos os apps são carregados na primeira chamada.
    e isso com o tempo pode tornar o primeiro load demorado.


Pros

- Organização padrão de uma aplicação React. É possível utilizar uma estrutura de monorepo com lerna, turborepo +
    yarn workspaces para gerenciar dependencias e realizar tarefas repetitivas.

- Roteamento completo, com rotas dinamicas, parametrizadas e protegidas.

- Gerenciamento de estados é possível utilizar Redux, Zustand, ContextAPI. E isso funciona bem com aplicações remotas
    escritas em React.

- Compartilhamento de código. tanto o host como os apps remotos podem exportar componentes ou códigos que 
    podem ser reaproveitados em diferentes partes. (desde que compatíveis)

- Code spliting (lazy loading). Padrão para aplicações React, E funciona para cada rota ou ação programada.