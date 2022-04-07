# Easy Restaurant User Interface

<img src="exemplo-image.png" alt="exemplo imagem">

### Ajustes e melhorias

O projeto ainda está em desenvolvimento e as próximas atualizações serão voltadas nas seguintes tarefas:

- [ ] Correção de pequenos bugs
- [ ] Automação para instalação
- [ ] Finalização de testes

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

* Comando para instalar as dependencias necessárias

```
npm install
```

* Comando para subir a aplicação , a flag "-o" irá abrir uma nova guia no seu navegador com a aplicação rodando
    
    * Mais informações em: https://angular.io/cli/serve
 
``` 
ng serve -o
```


## ☕ Usando Easy Restaurant

* Ao subir a aplicação a tela principal será a tela de Login:
* Quando executado o script de banco ele gerou um usuário padrão
    * user: admin , password: admin
* Após autenticado, o usuário terá acesso a todas as telas do sistema



## 📫 Contribuindo para Easy Restaurant

Para contribuir com Easy Restaurant, siga estas etapas:

1. Bifurque este repositório para o front-end.
2. 1. Bifurque o repositório da API para o back-end em: https://github.com/fernando-albsilva/ER.Api.
3. Crie um branch: `git checkout -b <nome_branch>`.
4. Faça suas alterações e confirme-as: `git commit -m '<mensagem_commit>'`
5. Envie para o branch original: `git push origin <nome_do_projeto> / <local>`
6. Crie a solicitação de pull.

Como alternativa, consulte a documentação do GitHub em [como criar uma solicitação pull](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request).

## 🤝 Colaboradores

Agradecemos às seguintes pessoas que contribuíram para este projeto:

<table>
  <tr>
    <td align="center">
      <a href="#">
        <img src="https://avatars.githubusercontent.com/u/49257064?s=400&u=d167a6f5fb872a47f0dcf619d274bfa9baf89283&v=4" width="100px;" alt="Foto do Fernando no GitHub"/><br>
        <sub>
          <b>Iuri Silva</b>
        </sub>
      </a>
    </td>
  
  </tr>
</table>

<!-- 
## 😄 Seja um dos contribuidores<br>

Quer fazer parte desse projeto? Clique [AQUI](CONTRIBUTING.md) e leia como contribuir. -->

## 📝 Licença

Esse projeto está sob licença. Veja o arquivo [LICENÇA](LICENSE.md) para mais detalhes.

