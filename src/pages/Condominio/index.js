import React, { Component, Form, useState } from 'react'
import { Link, withRouter } from "react-router-dom";
import api from "../../services/api";

import './styles.css'
import { async } from 'q';
// import MultiSelect from 'multiselect-dropdown-react';

const Apartamentos = ({ apartamentos }) => {
    // console.log(apartamentos);
    return (
        <table >
            <thead>
                <tr>
                    <th>Numero</th>
                    <th>Bloco</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                {apartamentos.length > 0 ? (
                    apartamentos.map(ap => (
                        <tr key={ap.idapartamento}>
                            <td>{ap.numero}</td>
                            <td>{ap.bloco}</td>
                            <td>
                                <button className="button muted-button">Edit</button>
                                <button onClick={() => handleDelete(ap.idapartamento)} className="button muted-button">Delete</button>
                            </td>
                        </tr>
                    ))
                ) : (
                        <tr>
                            <td colSpan={3}>Sem Apartamento Cadastrado</td>
                        </tr>
                    )}
            </tbody>
        </table>
    )
};

const handleDelete = async(idapartamento) => {
    const formData = new FormData();
    formData.append('Idapartamento', idapartamento);

    // new FormData();
    var res = await api.post("/apartamento/excluir", formData);
    
    alert('Apartamento excluido');
    window.location.href = '/app';

}


class Condominio extends Component {
    state = {
        apartamentos: [],
        pessoas: [],
        numeroadd: null,
        blocoadd: ""


        // password: "",
        // error: ""
    };



    handleAdd = async e => {
        e.preventDefault();

        const { numeroadd, blocoadd, pessoas } = this.state;
        // console.log(pessoas.map((p) => return));


        let pessoasAP = pessoas.filter(function (elem, index, array) {
            return elem.checked;
        });

        console.log(pessoasAP);

        pessoasAP = pessoasAP.map((p) => {
            return p.idpessoa
        });

        console.log(pessoasAP);

        if (!numeroadd || blocoadd.length === 0 || pessoasAP.length === 0) {
            this.setState({ error: "Preencha todos os dados para se cadastrar" });
        } else {
            try {
                const formData = new FormData();
                formData.append('Numero', numeroadd);
                formData.append('Bloco', blocoadd);
                formData.append('Apartamentopessoa', JSON.stringify(pessoasAP));

                // new FormData();
                var res = await api.post("/apartamento/cadastrar", formData);
                console.log(res);
                if (res.data.sucess) {
                    window.location.href = '/app';
                } else {
                    //this.props.history.push("/");
                }
            } catch (err) {
                console.log(err);
                this.setState({ error: "Ocorreu um erro ao registrar sua conta." });
            }
        }
    };

    //const response = await api.post("/usuario/login", formData);
    //if (response.data.authenticated) {
    componentDidMount() {
        api.get('/apartamento').then(res => this.setState({ apartamentos: res.data }));
        api.get('/pessoa').then(res => { this.setState({ pessoas: res.data }); });

        //this.setState();
        //alert('mahh oe');
    }

    handleChange(event, thiss) {
        console.log('event.target.name', event.target.name);
        console.log('event.target.value', event.target.value);
        console.log('event.target.checked', event.target.checked);

        //console.log(this);


        this.setState({ pessoas: this.state.pessoas.map((p) => event.target.value == p.idpessoa ? { ...p, checked: event.target.checked } : { ...p }) });

        console.log(this.state.pessoas);


    }

    render() {
        return (
            <React.Fragment>
                <div className="container">
                <button onClick={() => window.location.href = '/app' } >Apartamentos</button><hr />
                <button onClick={() => window.location.href = '/pessoa' } >Pessoas</button>
                    <h1>Apartamentos</h1>
                    <div className="flex-row">
                        <div className="flex-large">
                            <h2></h2>
                            {this.state.error && <p>{this.state.error}</p>}
                            <input
                                type="number"
                                placeholder="Numero"
                                onChange={e => this.setState({ numeroadd: e.target.value })}
                            />
                            <input
                                type="text"
                                placeholder="Bloco"
                                onChange={e => this.setState({ blocoadd: e.target.value })}
                            />
                            <div className="tabelaOverflow">
                                {
                                    this.state.pessoas.map(pes => (
                                        <tr key={pes.idpessoa} >
                                            <td>
                                                <input type="checkbox" value={pes.idpessoa} onChange={e => this.handleChange(e, this)}></input>
                                            </td>
                                            <td>{pes.nome}</td>
                                        </tr>
                                    ))
                                }
                            </div>
                            <button onClick={this.handleAdd} >Cadastrar Apartamento</button>
                        </div>
                        <div className="flex-large">
                            <h2>Apartamentos</h2>
                            <div className="tabelaOverflow">
                                <Apartamentos apartamentos={this.state.apartamentos} />
                            </div>
                            {/* <UserTable users={users} /> */}
                        </div>
                    </div>
                </div>
            </React.Fragment>

        )
    }
}


export default withRouter(Condominio);