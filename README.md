# Website pessoal de receitas
## Escopo do projeto
Esse projeto react consiste na criação de um website de receitas em que cada usuário pode anotar, armazenar e posteriormente recuperar as suas receitas do banco de dados.
## Tela Inicial
Na tela inicial(Authentica.jsx), o usuário encontrará uma página de autenticação em que ele poderá se cadastrar e/ou se logar para que ele tenha acesso à aplicação. Depois de ser cadastrado com sucesso pelo tratamento de erros de *try* e *catch*, ele terá acesso a aplicação (RecipeForm.jsx).
## "Dashboard" da aplicação
Na página do Dashboard, o usuário poderá preencher os campos relacionados a receita nos campos *'Receita'*, *'instruções'* e '*ingredientes*' e depois clicar no botão 'Guardar' para armazenar as informações no banco de dados. Ele também pode recuperar as suas receitas no botão 'Recuperar receitas'.
## Renderização e botões
Depois que o usuário é autenticado, o *Authenticate.jsx* passa os dados do user para *RecipeForm.jsx*(arquivo com os inputs e labels da página) e *RecipeList.jsx*(responsável por renderizar o useState que guarda as informações recuperadas do banco de dados e de renderizar o useState que armazena temporariamente as receitas que são enviadas ao banco de dados).
### Botão 'Guardar'
- O botão 'Guardar' pega as informações de *pair-values* de cada input e as armazena no setState pela função Send através de *e.target.name* e *e.target.value*
- A função assincrona 'Check', cria um novo objeto com o nome da receita, id do usuário e duas listas ".split('.')" para armazenar as instruções e ingredientes do usuário.
- Depois ele faz uma query no database identicando o documento e passando esse objeto. Caso ele identifique algum erro no banco de dados, ele captura esse erro com catch
### Botão 'Recuperar receitas'
- Ao clicar no botão, ele chamará 'fetchrecipes' que disparará a tela de carregamento e  depois de um segundo chamará 'searchrecipes' para fazer a requisição de leitura do banco de dados.
- Ele fará uma série de avaliações de erros do banco de dados e caso não houver nenhum erro, a tela de carregamento desaparecerá e as informações do usuário aprecerão na tela.
