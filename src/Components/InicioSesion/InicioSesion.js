import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import md5 from 'md5';
import moment from "moment";
import React from 'react';
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import Cookies from 'universal-cookie';
import '../../CSS/App.css';
import InicioSesionGoogle from './InicioSesionGoogle';

const baseUrl = "http://localhost:3001/usuario"
const cookies = new Cookies();
toast.configure()
class InicioSesion extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            form: {
                nombreusuario: "",
                contrasena: "",
                rol: "admin",
                fechacreacion: moment().format("DD-MM-YYYY hh:mm:ss"),
            },
            urlAvatar: "https://scontent-bog1-1.xx.fbcdn.net/v/t1.0-9/10409440_759040310816193_9203063013688875270_n.jpg?_nc_cat=101&ccb=3&_nc_sid=85a577&_nc_ohc=njocKDhf8JkAX_hYCjs&_nc_ht=scontent-bog1-1.xx&oh=e25d7431932061653fb0e36cc00af801&oe=605B375B",
        }
    }
    Copyright() {
        return (
            <Typography variant="body2" color="textSecondary" align="center">
                {'Copyright © '}
                <Link color="inherit" href="https://material-ui.com/">
                    Your Website
        </Link>{' '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
        );
    }
    handleChange = async e => {
        await this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        });
    }
    iniciarSesion = async () => {
        await axios.get(baseUrl, { params: { nombreusuario: this.state.form.nombreusuario, contrasena: md5(this.state.form.contrasena) } })
            .then(response => {
                return response.data;
            })
            .then(response => {
                if (response.length > 0) {
                    var respuesta = response[0];
                    cookies.set('id', respuesta.id, { path: "/" });
                    cookies.set('nombreusuario', respuesta.nombreusuario, { path: "/" });
                    cookies.set('rol', respuesta.rol, { path: "/" });
                    cookies.set('fechacreacion', respuesta.fechacreacion, { path: "/" });
                    cookies.set('primernombre', respuesta.primernombre, { path: "/" });
                    cookies.set('primerapellido', respuesta.primerapellido, { path: "/" });
                    console.log("entra");
                    alert(`Bienvenido ${respuesta.primernombre}`)
                    if (respuesta.rol == "admin") {
                        window.location.href = "./admin";
                    } else {
                        window.location.href = "./user";
                    }
                    //#region Error
                    // toast("Bienvenido "+respuesta.primernombre,
                    //   {
                    //     position: toast.POSITION.TOP_CENTER,
                    //     autoClose: 3000,
                    //   });
                    //#endregion
                } else {
                    alert("El usuario o la contraseña no son correctos")
                    //#region Error
                    // toast("El usuario o la contraseña no son correctos",
                    //   {
                    //     position: toast.POSITION.TOP_CENTER,
                    //     autoClose: 3000,
                    //   });
                    //#endregion
                }
            })
            .catch(error => {
                console.log(error)
            })
    }
    componentDidMount() {
        if (cookies.get('nombreusuario')) {
            if (cookies.get('rol') == "admin") {
                window.location.href = "./admin";
            } else {
                window.location.href = "./user";
            }
        }
    }
    render() {
        return (
            <Container component="main" maxWidth="xs"
                style={{
                    justifyContent: "center",
                    textAlign: "center",
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginTop: 150,
                    flexGrow: 1,
                }}
            >
                <InicioSesionGoogle />
                <CssBaseline />
                <div className="Margen">
                    <Grid
                        container
                        spacing={3}
                        style={{
                            justifyContent: "center",
                            textAlign: "center",
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Grid item xs={10}>
                            <Avatar alt="Remy Sharp"

                                src={this.state.urlAvatar}
                            />
                        </Grid>
                        <Grid item xs={10}>
                            <Typography component="h1" variant="h5" justify="center" alignItems="center" >
                                Iniciar Sesion
              </Typography>
                        </Grid>
                    </Grid>
                    <TextField
                        type="text"
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="nombreusuario"
                        label="Correo electronico"
                        name="nombreusuario"
                        autoComplete="email"
                        autoFocus
                        onChange={this.handleChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="contrasena"
                        label="Contraseña"
                        type="password"
                        id="contrasena"
                        autoComplete="current-password"
                        onChange={this.handleChange}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={() => this.iniciarSesion()}
                    >
                        Iniciar Sesion
            </Button>
                </div>
                <Box mt={8}>
                    {this.Copyright()}
                </Box>
            </Container>
        );
    }
}
export default (InicioSesion);