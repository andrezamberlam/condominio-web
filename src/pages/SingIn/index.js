import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

import Logo from "../../assets/condominio-web.png";
import api from "../../services/api";
import { login } from "../../services/auth";

import { Form, Container } from "./styles";

class SignIn extends Component {
    state = {
        email: "",
        password: "",
        error: ""
    };

    handleSignIn = async e => {
        e.preventDefault();
        const { email, password } = this.state;
        if (!email || !password) {
            this.setState({ error: "Preencha e-mail e senha para continuar!" });
        } else {
            try {
                const formData = new FormData();
                formData.append('Email', email);
                formData.append('Senha', password);
                const response = await api.post("/usuario/login", formData);
                if (response.data.authenticated) {
                    console.log(response.data.accessToken);
                    login(response.data.accessToken);
                    this.props.history.push("/app");
                } else {
                    this.setState({
                        error:
                            "Houve um problema com o login, verifique suas credenciais."
                    });
                }
            } catch (err) {
                this.setState({
                    error:
                        "Houve um problema com o login, verifique suas credenciais."
                });
            }
        }
    };

    render() {
        return (
            <Container>
                <Form onSubmit={this.handleSignIn}>
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
                    <button type="submit">Entrar</button>
                    <hr />
                    <Link to="/singup">Criar conta grátis</Link>
                </Form>
            </Container>
        );
    }
}

export default withRouter(SignIn);