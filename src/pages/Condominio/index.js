import React, { Component, Form, useState } from 'react'
import { Link, withRouter } from "react-router-dom";
import api from "../../services/api";

import './styles.css'

const Apartamentos = ({ apartamentos }) => {
    console.log(apartamentos);
    return (
        <table>
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
                        <tr key={ap.apartamentoid}>{console.log(ap.idapartamento)}
                            <td>{ap.numero}</td>
                            <td>{ap.bloco}</td>
                            {/* <td>{ap.username}</td> */}
                            <td>
                                <button className="button muted-button">Edit</button>
                                <button className="button muted-button">Delete</button>
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



class Condominio extends Component {
    state = {
        apartamentos: [],
        numeroadd: null,
        blocoadd:""


        // password: "",
        // error: ""
    };

    handleAdd = async e => {
        e.preventDefault();
        const { numeroadd, blocoadd } = this.state;
        if (!numeroadd || blocoadd.length === 0) {
            this.setState({ error: "Preencha todos os dados para se cadastrar" });
        } else {
            try {
                const formData = new FormData();
                formData.append('Numero', numeroadd);
                formData.append('Bloco', blocoadd);
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
        //this.setState();
        //alert('mahh oe');
    }

    render() {
        return (
            <React.Fragment>
                <div className="container">
                    <h1>CRUD App with Hooks</h1>
                    <div className="flex-row">
                        <div className="flex-large">
                            <h2>Add user</h2>
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
                            <button onClick={this.handleAdd} >Cadastrar grátis</button>
                        </div>
                        <div className="flex-large">
                            <h2>Apartamentos</h2>
                            <Apartamentos apartamentos={this.state.apartamentos} />
                            {/* <UserTable users={users} /> */}
                        </div>
                    </div>
                </div>
            </React.Fragment>

        )
    }
}


export default withRouter(Condominio);