# Easy Restaurant User Interface

<!---Esses são exemplos. Veja https://shields.io para outras pessoas ou para personalizar este conjunto de escudos. Você pode querer incluir dependências, status do projeto e informações de licença aqui--->

<!-- ![GitHub repo size](https://img.shields.io/github/repo-size/iuricode/README-template?style=for-the-badge)
![GitHub language count](https://img.shields.io/github/languages/count/iuricode/README-template?style=for-the-badge)
![GitHub forks](https://img.shields.io/github/forks/iuricode/README-template?style=for-the-badge)
![Bitbucket open issues](https://img.shields.io/bitbucket/issues/iuricode/README-template?style=for-the-badge)
![Bitbucket open pull requests](https://img.shields.io/bitbucket/pr-raw/iuricode/README-template?style=for-the-badge) -->

<img src="exemplo-image.png" alt="exemplo imagem">

> Linha adicional de texto informativo sobre o que o projeto faz. Sua introdução deve ter cerca de 2 ou 3 linhas. Não exagere, as pessoas não vão ler.

### Ajustes e melhorias

O projeto ainda está em desenvolvimento e as próximas atualizações serão voltadas nas seguintes tarefas:

- [x] Tarefa 1
- [x] Tarefa 2
- [x] Tarefa 3
- [ ] Tarefa 4
- [ ] Tarefa 5

## 💻 Pré-requisitos

Antes de começar, verifique se você atendeu aos seguintes requisitos:

* Istalar o Microsoft® SQL Server® 2012 Service Pack 3 (SP3) Express https://www.microsoft.com/pt-BR/download/details.aspx?id=50003
* Instalar o SQL Server Management Studio (SSMS)  https://docs.microsoft.com/pt-br/sql/ssms/download-sql-server-management-studio-ssms?view=sql-server-ver15
* Baixar a API do projeto em https://github.com/fernando-albsilva/ER.Api
* Baixar a Ide de preferência, exemplos:
    * Rider https://www.jetbrains.com/pt-br/rider/
    * Visual Studio Community https://visualstudio.microsoft.com/pt-br/vs/community/
    * Visual Studio Code https://code.visualstudio.com/

## 🚀 Executando Easy Restaurant

Para executar o projeto para desenvolvimento siga estas etapas:

Windows:

* Entre no diretório onde baixou o projeto da API e procure o arquivo Run.sql em \ERapi\Banco\Run.sql
* Abra o arquivo em sua ferramenta de preferencia e rode o script para criar o banco
* Apos isso será necessario modificar o arquivo SqlConnectionFactory.cs que fica em \Application\DataBaseConnection
* Após aberto o arquivo SqlConnectionFactory deverá ser modificado o retorno do método GetConnectionString() com a sua conexão do banco de dados 
    
```
 public class SqlConnectionFactory : ISqlConnectionFactory
    {

        public string GetConnectionString()
        {  
            return "Data Source=(localdb)\\MSSQLLocalDB;" +
                  "Initial Catalog=ER;" +
                  "User id=sa;" +
                  "Password=123456;";
        }
    }
```

* Após o ajuste da string de conexão com o banco deverá fazer a build com a IDE escolhida e sua api estará executando
* Com o banco criado e a API executando é preciso fazer o download desse projeto que é onde se encontra a UI
* Após ter feito o download navega até o diretorio raiz da aplicação e rode os commandos:

* Comando para instalar as dependencias necessarias

```
npm install
```

* Comando para subir a aplicação , a flag "-o" irá abrir uma nova guia no seu navegador com a aplicação rodando
    
    * Mais informações em: https://angular.io/cli/serve
 
``` 
ng serve -o
```


## ☕ Usando <nome_do_projeto>

Para usar <nome_do_projeto>, siga estas etapas:

```
<exemplo_de_uso>
```

Adicione comandos de execução e exemplos que você acha que os usuários acharão úteis. Fornece uma referência de opções para pontos de bônus!

## 📫 Contribuindo para <nome_do_projeto>
<!---Se o seu README for longo ou se você tiver algum processo ou etapas específicas que deseja que os contribuidores sigam, considere a criação de um arquivo CONTRIBUTING.md separado--->
Para contribuir com <nome_do_projeto>, siga estas etapas:

1. Bifurque este repositório.
2. Crie um branch: `git checkout -b <nome_branch>`.
3. Faça suas alterações e confirme-as: `git commit -m '<mensagem_commit>'`
4. Envie para o branch original: `git push origin <nome_do_projeto> / <local>`
5. Crie a solicitação de pull.

Como alternativa, consulte a documentação do GitHub em [como criar uma solicitação pull](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request).

## 🤝 Colaboradores

Agradecemos às seguintes pessoas que contribuíram para este projeto:

<!-- <table>
  <tr>
    <td align="center">
      <a href="#">
        <img src="https://avatars3.githubusercontent.com/u/31936044" width="100px;" alt="Foto do Iuri Silva no GitHub"/><br>
        <sub>
          <b>Iuri Silva</b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="#">
        <img src="https://s2.glbimg.com/FUcw2usZfSTL6yCCGj3L3v3SpJ8=/smart/e.glbimg.com/og/ed/f/original/2019/04/25/zuckerberg_podcast.jpg" width="100px;" alt="Foto do Mark Zuckerberg"/><br>
        <sub>
          <b>Mark Zuckerberg</b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="#">
        <img src="https://miro.medium.com/max/360/0*1SkS3mSorArvY9kS.jpg" width="100px;" alt="Foto do Steve Jobs"/><br>
        <sub>
          <b>Steve Jobs</b>
        </sub>
      </a>
    </td>
  </tr>
</table>
 -->

<!-- ## 😄 Seja um dos contribuidores<br>

Quer fazer parte desse projeto? Clique [AQUI](CONTRIBUTING.md) e leia como contribuir.

## 📝 Licença

Esse projeto está sob licença. Veja o arquivo [LICENÇA](LICENSE.md) para mais detalhes.

[⬆ Voltar ao topo](#nome-do-projeto)<br> -->
