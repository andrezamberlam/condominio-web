import React, { Component, Form, useState } from 'react'
import { Link, withRouter } from "react-router-dom";
import api from "../../services/api";

import './styles.css'
import { async } from 'q';
// import MultiSelect from 'multiselect-dropdown-react';

const Pessoas = ({ pessoas }) => {
    // console.log(apartamentos);
    return (
        <table >
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>Telefone</th>
                    <th>Email</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                {pessoas.length > 0 ? (
                    pessoas.map(pes => (
                        <tr key={pes.idpessoa}>
                            <td>{pes.nome}</td>
                            <td>{pes.telefone}</td>
                            <td>{pes.email}</td>
                            <td>
                                <button className="button muted-button">Edit</button>
                                <button onClick={() => handleDelete(pes.idpessoa)} className="button muted-button">Delete</button>
                            </td>
                        </tr>
                    ))
                ) : (
                        <tr>
                            <td colSpan={3}>Nenhuma Pessoa Cadastrada</td>
                        </tr>
                    )}
            </tbody>
        </table>
    )
};

const handleDelete = async (idpessoa) => {
    const formData = new FormData();
    formData.append('IdPessoa', idpessoa);

    var res = await api.post("/pessoa/excluir", formData);

    alert('Pessoa excluida');
    window.location.href = '/pessoa';

}


class Pessoa extends Component {
    state = {
        apartamentos: [],
        pessoas: [],
        nomepes: "",
        datanascimentopes: "",
        emailpes: "",
        telefonepes: "",
        cpfpes: ""


        // password: "",
        // error: ""
    };



    handleAdd = async e => {
        e.preventDefault();

        const { nomepes, datanascimentopes, emailpes, telefonepes, cpfpes } = this.state;
        console.log(nomepes, datanascimentopes, emailpes, telefonepes, cpfpes);
        // console.log(pessoas.map((p) => return));


        if (!nomepes || !datanascimentopes || !emailpes || !telefonepes || !cpfpes) {
            this.setState({ error: "Preencha todos os dados para se cadastrar" });
        } else {
            try {
                const formData = new FormData();
                // formData.append('Numero', numeroadd);
                formData.append('Nome', nomepes);
                formData.append('Datanascimento', datanascimentopes);
                formData.append('Email', emailpes);
                formData.append('Telefone', telefonepes);
                formData.append('Cpf', cpfpes);

                var res = await api.post("/pessoa/cadastrar", formData);
                console.log(res);
                if (res.data.sucess) {
                    alert('Pessoa cadastrada');
                    window.location.href = '/pessoa';
                } else {

                    alert(res.data.message);
                }
            } catch (err) {
                console.log(err);
                this.setState({ error: "Ocorreu um erro ao registrar sua conta." });
            }
        }
    };

    componentDidMount() {
        api.get('/apartamento').then(res => this.setState({ apartamentos: res.data }));
        api.get('/pessoa').then(res => { this.setState({ pessoas: res.data }); });
    }

    render() {
        return (
            <React.Fragment>
                <div className="container">
                    <button onClick={() => window.location.href = '/app'} >Apartamentos</button><hr />
                    <button onClick={() => window.location.href = '/pessoa'} >Pessoas</button>
                    <h1>Pessoas</h1>
                    <div className="flex-row">
                        <div className="flex-large">
                            <h2></h2>
                            {this.state.error && <p>{this.state.error}</p>}
                            Nome
                            <input
                                type="text"
                                placeholder="Nome"
                                onChange={e => this.setState({ nomepes: e.target.value })}
                            />
                            Endereço de e-mail
                            <input
                                type="email"
                                placeholder="Endereço de e-mail"
                                onChange={e => this.setState({ emailpes: e.target.value })}
                            />
                            Data de nascimento
                            <input type="date"
                                placeholder="Data de nascimento"
                                onChange={e => this.setState({ datanascimentopes: e.target.value })}
                            />
                            Telefone
                            <input
                                type="text"
                                placeholder="Telefone"
                                onChange={e => this.setState({ telefonepes: e.target.value })}
                            />
                            CPF
                            <input
                                type="number"
                                maxLength="11"
                                placeholder="CPF"
                                onChange={e => this.setState({ cpfpes: e.target.value })}
                            />

                            <button onClick={this.handleAdd} >Cadastrar Pessoa</button>
                        </div>
                        <div className="flex-large">
                            <h2>Pessoas Cadastradas</h2>
                            <div className="tabelaOverflow">
                                <Pessoas pessoas={this.state.pessoas} />
                            </div>
                            {/* <UserTable users={users} /> */}
                        </div>
                    </div>
                </div>
            </React.Fragment>

        )
    }
}


export default withRouter(Pessoa);