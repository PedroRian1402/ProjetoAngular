Para iniciar o servidor local, é preciso abrir dois terminais certificar-se que esta na pasta Angular dentro de Projeto Angular, e escrever no primeiro terminal o codigo abaixo:

npm start

No segundo terminal, basta escrever: 

npx json-server db.json --port 3000

Após isso o servidor do Angular vai estar aberto na porta padrão (http://localhost:4200) e a API simulada na porta 3000.

Para realizar testes unitários:

ng test

O projeto está esencialmente dividido em três camadas. 
Na primeira camada é a base de todo o nosso projeto , localizada na types, foi feita a modulação e tipagens de Project e Task.
A segunda camada é a criação de estado e dados, foi foi realizada a gestão de estado com signals e a comunicação restful de forma assicrona este processo é realizado na pasta services.
E a ultima camada é a parte de componentes visuais onde cada componente é independente, gerindo o seu proprio ficheiro Html, typescript e estilos CSS. Foi criado três componentes essenciais, todos na pasta components, sendo eles o dashboard, o elemento pai, que lê o signals e injeta em outros dois componentes chamados de ProjectCard e ProjectForm.