Instalei uma ferramenta chamada concurrently no terminal para poder iniciar o servidor do angular e do API ao mesmo tempo.

Para iniciar o servidor local, basta abrir o terminal certificar-se que esta na pasta Angular dentro de Projeto Angular, e escrever no terminal o codigo abaixo:

npm run dev

O concurrently vai abrir o servidor do Angular na porta padrão (http://localhost:4200) e a API simulada na porta 3000 em simultâneo.


Para realizar testes unitários:

ng test