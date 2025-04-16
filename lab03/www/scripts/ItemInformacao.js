/**
 * Classe ItemInformacao
 */

/**
 * @class Guarda a informação existente num sub elemento
 * @constructs ItemInformacao
 * @param {HTMLElement} elemento - sub elemento para o qual se pretende obter a informação.
 * 
 * @property {string[]} campos - Texto dos vários sub elementos do elemento dado.
 */
class ItemInformacao {
    constructor (dados) {
        if (dados instanceof HTMLElement) {
            this.campos = Array.from(dados.children).map((elemento) => elemento.innerText);
        } else {
            this.campos = [
                dados.name,
                dados.symbol.toUpperCase(),
                dados.current_price.toLocaleString('pt-PT', { style: 'currency', currency: 'EUR' }),
                dados.market_cap.toLocaleString('pt-PT'),
                dados.image
            ];
        }
    }
       

    /**
     * Método genérico que devolve um elemento HTML com toda a informação
     * @param {string} tagTopo - etiqueta do topo da estrutura.
     * @param {string} tagCampo - etiqueta com a informação do campo.
     * @returns {HTMLElement} elemento HTML com a informação.
     */
    emEstrutura(tagTopo, tagCampo){
        /** @todo 
        * Dado o nome de um "tag de topo" (tagTopo) e de uma "tag de campo" (tagCampo),
        * criar um elemento "tag de topo" adicionando-lhe um elemento filho "tag de campo" 
        * por cada uma das strings existentes no array "campos" da instância da classe.
        */

    }

    /**
     * Devolve uma tr HTML com toda a informação
     * @returns {HTMLElement} tr HTML com a informação.
     */
    emLinhaTabela() {
        const linha = document.createElement("tr");
    
        this.campos.forEach(campo => {
            const celula = document.createElement("td");
    
            if (typeof campo === "string" && campo.startsWith("http")) {
                const img = document.createElement("img");
                img.src = campo;
                img.alt = "Ícone";
                img.style.height = "24px";
                img.style.width = "24px";
                celula.appendChild(img);
            } else {
                celula.innerText = campo;
            }
    
            linha.appendChild(celula);
        });
    
        return linha;
    }
    

   /**
 * Devolve um <li> com os campos separados por " | "
 * @returns {HTMLElement} li HTML com a informação.
 */
emLinhaLista() {
    const li = document.createElement("li");
    li.innerText = this.campos.join(" | "); // Junta os campos com separadores
    return li;
}


    /**
     * Devolve um div HTML com toda a informação
     * @returns {HTMLElement} div HTML com a informação.
     */
    /**
 * Cria uma estrutura de <div> para representar uma moeda,
 * com cada campo em sua própria <div>.
 * Se o campo for uma URL de imagem, exibe a imagem.
 * @returns {HTMLElement} div HTML com a informação.
 */
emDiv() {
    const divExterno = document.createElement("div"); // div que representa uma moeda

    this.campos.forEach(campo => {
        const divCampo = document.createElement("div"); // div de cada campo

        // Verifica se o campo é uma string que começa com "http" (provavelmente uma imagem)
        if (typeof campo === "string" && campo.startsWith("http")) {
            const img = document.createElement("img"); // cria tag <img>
            img.src = campo;               // define o caminho da imagem
            img.alt = "Ícone";             // texto alternativo
            img.style.height = "24px";     // altura visual
            divCampo.appendChild(img);     // insere a imagem na div
        } else {
            divCampo.innerText = campo;    // se não for imagem, insere o texto
        }

        divExterno.appendChild(divCampo);  // adiciona o campo na div principal
    });

    return divExterno; // retorna a estrutura pronta
}

}
