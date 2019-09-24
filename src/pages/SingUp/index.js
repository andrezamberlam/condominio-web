import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";


import Logo from "../../assets/condominio-web.png";

import { Form, Container } from "./styles";

import api from '../../services/api';

class SignUp extends Component {
    state = {
        email: "",
        password: "",
        error: ""
    };

    handleSignUp = async e => {
        e.preventDefault();
        console.log('asdasd');
        const { email, password } = this.state;
        if (!email || !password) {
            this.setState({ error: "Preencha todos os dados para se cadastrar" });
        } else {
            try {
                const formData = new FormData();
                formData.append('Email', email);
                formData.append('Senha', password);
                // new FormData();
                var res = await api.post("/usuario/cadastrar", formData);
                console.log(res);
                if (res.data.error) {
                    this.setState({ error: res.data.message });
                } else {
                    this.props.history.push("/");
                }
            } catch (err) {
                console.log(err);
                this.setState({ error: "Ocorreu um erro ao registrar sua conta." });
            }
        }
    };

    render() {
        return (
            <Container>
                <Form onSubmit={this.handleSignUp}>
                    <img src={Logo} alt="condominio web logo" />
                    {this.state.error && <p>{this.state.error}</p>}

                    <input
                        type="email"
                        placeholder="Endereço de e-mail"
                        onChange={e => this.setState({ email: e.target.value })}
                    />
                    <input
                        type="password"
                        placeholder="Senha"
                        onChange={e => this.setState({ password: e.target.value })}
                    />
                    <button type="submit">Cadastrar grátis</button>
                    <hr />
                    <Link to="/">Fazer login</Link>
                </Form>
            </Container>
        );
    }
}

export default withRouter(SignUp);