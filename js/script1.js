// @JoaoPedroSousa
// @linkedin = https://www.linkedin.com/in/jo%C3%A3o-pedro-sousa-barros-29313b235/ 

class Tabela {

    constructor(){
        this.id = 1;
        this.arrayTabela = [];
        this.editId = null;
    }

    salvar(){
       let tabela = this.lerDados();

        if(this.validaCampos(tabela)){
            if(this.editId == null ){
                this.adicionar(tabela);
            }else {
                this.atualizar(this.editId, tabela);
            }
            
        }

        this.listaTabela();
        this.cancelar();
    }

    listaTabela(){
        let tbody = document.getElementById('tbody');
        tbody.innerText = '';

        for(let i = 0; i < this.arrayTabela.length; i++){
            let tr = tbody.insertRow();

            let td_id = tr.insertCell();
            let td_autor = tr.insertCell();
            let td_idade = tr.insertCell();
            let td_acoes = tr.insertCell();

            td_id.innerText = this.arrayTabela[i].id;
            td_autor.innerText = this.arrayTabela[i].nomeAutor;
            td_idade.innerText = this.arrayTabela[i].idadeAutor;

            td_id.classList.add('center');

            let imgEdit = document.createElement('img');
            imgEdit.src = 'img/editar.png';
            imgEdit.setAttribute("onclick", "tabela.editar("+ JSON.stringify(this.arrayTabela[i]) +")");

            let imgDelete = document.createElement('img');
            imgDelete.src = 'img/excluir.png'
            imgDelete.setAttribute("onclick", "tabela.deletar("+ this.arrayTabela[i].id +")");


            td_acoes.appendChild(imgEdit);
            td_acoes.appendChild(imgDelete);

            console.log(this.arrayTabela);

        }
    }

    adicionar(tabela){
        tabela.idade = parseFloat (tabela.idade);
        this.arrayTabela.push(tabela);
        this.id++;
    }

    atualizar(id, tabela){
        for(let i = 0; i < this.arrayTabela.length; i++){
            if(this.arrayTabela[i].id == id){
                this.arrayTabela[i].nomeAutor = tabela.nomeAutor;
                this.arrayTabela[i].idadeAutor = tabela.idadeAutor;
            }
        }
    }

    editar (dados){
        this.editId = dados.id;

        document.getElementById('nome').value = dados.nomeAutor;
        document.getElementById('idade').value = dados.idadeAutor;

        document.getElementById('btn1').innerText = 'Atualizar';
    }
    

    lerDados() {
        let tabela = {};
      tabela.id = this.id;
      tabela.nomeAutor = document.getElementById('nome').value;
      tabela.idadeAutor = document.getElementById('idade').value;

        return tabela;
    }

    validaCampos (tabela){
        let msg = '';

        if(tabela.nomeAutor == ''){
            msg +='- informe o nome do Autor \n';
        }

        if(tabela.idadeAutor == ''){
            msg +='- informe a idade do Autor \n';
        }

        if(msg != ''){
            alert(msg);
            return false;
        }

        return true;
    }

    cancelar(){
        document.getElementById('nome').value = '';
        document.getElementById('idade').value = '';

        document.getElementById('btn1').innerText = 'salvar';
        this.editId = null;

    }

    deletar(id){
        if(confirm('Deseja realmente deletar o produto do ID ' + id)){

            let tbody = document.getElementById('tbody');

            for (let i = 0; i < this.arrayTabela.length; i++){
                if(this.arrayTabela[i].id == id){
                    this.arrayTabela.splice(i, 1);
                    tbody.deleteRow(i);
                }
        }

        console.log(this.arrayTabela);
        }
    }
}

var tabela = new Tabela();