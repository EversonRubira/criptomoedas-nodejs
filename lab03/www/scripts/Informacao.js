/**
 * Função que será executada quando a página estiver toda carregada,
 * criando a variável global "dados" com um objeto Informacao
 * @memberof window
 * @params {Event} event - objeto que representará o evento
 */
window.onload = function (event) {
    window.dados = new Informacao("informacao");
}

/**
 * Classe Informacao
 */
/**
 * @class Guarda toda informação existente num elemento HTML
 * @constructs Informacao
 * @param {string} id - id do elemento HTML que contém a informação.
 * 
 * @property {string} id - id do elemento HTML que contém a informação.
 * @property {ItemInformacao[]} informacao - Informação contida nos vários sub elementos do elemento principal.
 */
class Informacao {

    carregarMoedas() {
        // faz uma requisiçao GET à API para obter as moedas
        fetch('/api/coins')
            .then(response => response.json()) // converte a resposta para JSON
            .then(moeda => {
                // limpar o array informacao
                this.informacao = [];

                // Itera sobre cada moeda recebida da API e cria um novo objeto ItemInformacao
                moeda.forEach(moeda => {
                    const item = new ItemInformacao(moeda);
                    //Armazena cada item (moeda) na lista informacao
                    this.informacao.push(item);

                });

                // exibe a informação em tabela, enLista() ou emDiv
                this.emTabela();
                
            })
            // erro ao carregar as moedas
            .catch(error => {
                console.error('Erro ao carregar as moedas:', error);
            });
    }


    constructor(id) {
        this.id = id;
        this.informacao = [];

        /** @todo Converter o array de elementos filhos para um array de elementos "ItemInformacao" */

    }

    /**
     * Coloca a informação numa table HTML "dentro" do elemento com id=this.id
     */
    emTabela() {
        /** @todo 
         * Criar a estrutura da tabela utilizando DOM. 
         * A criação de cada linha deverá ser feita por um método de cada um dos objectos da classe "ItemInformacao" previamente guardados.
         * Não esquecer de substituir os filhos do elemento pai que contém a informação com a nova tabela - replaceChildren().
         */
        const tabela = document.createElement('table');//cria tabela
        this.informacao.forEach(item => {
            //cria uma linha para cada item
            const linha = item.emLinhaTabela();
            tabela.appendChild(linha); //adiciona a linha à tabela
        });

        const container = document.getElementById(this.id);
        container.replaceChildren(tabela); //substitui os filhos do elemento pai que contém a informação com a nova tabela
    }

    /**
     * Coloca a informação numa ul HTML "dentro" do elemento com id=this.id
     */
    emLista() {
        /** @todo 
         * Criar a estrutura da lista utilizando DOM. 
         * A criação de cada item da lista deverá ser feita por um método de cada um dos objectos da classe "ItemInformacao" previamente guardados.
         * Não esquecer de substituir os filhos do elemento pai que contém a informação com a nova lista - replaceChildren().
         */
        const lista = document.createElement('ul');//cria lista
        this.informacao.forEach(item=> {
            //cria uma linha para cada item
            const linha = item.emLinhaLista();
            lista.appendChild(linha); //adiciona a linha à lista
        });

        const container = document.getElementById(this.id);
        container.replaceChildren(lista); //substitui o conteudo atual pela lista

    }

    /**
     * Coloca a informação em divs HTML "dentro" do elemento com id=this.id
     */
    emDiv() {
        /** @todo 
         * Utilizar DOM para criar uma estrutura idêntica à incial.
         * A criação da div para cada item deverá ser realizada por um método de cada um dos objecto da classe "ItemInformacao" previamente guardados. 
         * Não esquecer de substituir os filhos do elemento pai que contém a informação com a nova lista - replaceChildren().
         */
        const container = document.getElementById(this.id);
        const bloco = document.createElement('div');//cria div

        this.informacao.forEach(item => {
            const divItem = item.emDiv(); //cada moeda vira um div com os campos
            bloco.appendChild(divItem); //cada moeda é adicionada à div
        });

        container.replaceChildren(bloco); //substitui o conteudo atual pela div com as moedas
    }
}