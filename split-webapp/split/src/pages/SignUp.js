import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import { Grid, Box, TextField, Button } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import { NavLink } from "react-router-dom";
import "../App.css";
import AccountCircle from "@material-ui/icons/AccountCircle";
import VpnKey from "@material-ui/icons/VpnKey";
import InputAdornment from "@material-ui/core/InputAdornment";
import PropTypes from "prop-types";
import mainLogo from "./split2.png";

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        username: "",
        password: "",
        confPassword: ""
      },
      failed: false,
      badpwd: false
    };
  }

  handleTextChange = event => {
    const { user } = this.state;
    user[event.target.name] = event.target.value;
    this.setState({ user, failed: false, badpwd: false });
  };

  // Creates a new user JSON and sends to the create account end point.
  // User should get logged in as well as session created.

  createUser() {
    const { user } = this.state;
    const { history } = this.props;

    if (!this.validateUsername()) {
      this.setState({
        failed: true
      });
    }

    if (user.password.length === 0) {
      this.setState({
        badpwd: true
      });
    }

    if (
      this.validatePassword &&
      !user.password.length === 0 &&
      this.validatePassword()
    ) {
      fetch("api/account/register", {
        method: "POST",
        body: JSON.stringify({
          username: user.username,
          password: user.password
        }),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(res => {
          return res.json();
        })
        .then(data => {
          if (data.success === true) {
            history.push("/home/split");
          } else {
            this.setState({
              user,
              failed: true
            });
          }
        })
        .catch(err => console.log(err));
    }
  }

  validatePassword() {
    const { user } = this.state;
    return user.password === user.confPassword;
  }

  validateUsername() {
    const { user } = this.state;
    return user.username !== "";
  }

  render() {
    const { failed, user, badpwd } = this.state;
    return (
      <React.Fragment key="SignUpKey">
        <CssBaseline />
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
          style={{ minHeight: "100vh" }}
        >
          <Grid item xs={0}>
            <Container fixed justifyContent="center">
              <Container fixed>
                <Box
                  component="div"
                  borderRadius={12}
                  className="SignInContainer"
                >
                  <img
                    src={mainLogo}
                    style={{ width: "50%", marginTop: "10%" }}
                    alt="main logo for sign up"
                  />
                  <Box component="div" className="InnerContainer">
                    <Typography component="h3" className="SignIn">
                      Sign Up
                    </Typography>
                    <form className="root" noValidate autoComplete="off">
                      <TextField
                        id="username"
                        label="Username"
                        name="username"
                        variant="filled"
                        error={failed}
                        helperText={
                          failed
                            ? "Invalid Username. Cannot be empty or in use."
                            : ""
                        }
                        onChange={this.handleTextChange}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <AccountCircle />
                            </InputAdornment>
                          )
                        }}
                      />

                      <TextField
                        required
                        error={badpwd}
                        helperText={badpwd ? "Password required" : ""}
                        id="outlined-password-input"
                        name="password"
                        type="password"
                        label="Password"
                        variant="filled"
                        value={user.password}
                        onChange={this.handleTextChange}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <VpnKey />
                            </InputAdornment>
                          )
                        }}
                      />
                      <TextField
                        required
                        error={!this.validatePassword()}
                        helperText={
                          !this.validatePassword()
                            ? "Passwords do not match"
                            : ""
                        }
                        id="outlined-password-input-confirm"
                        name="confPassword"
                        type="password"
                        label="Confirm Password"
                        variant="filled"
                        onChange={this.handleTextChange}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <VpnKey />
                            </InputAdornment>
                          )
                        }}
                      />
                    </form>

                    <Typography component="h3" className="LogIn">
                      <NavLink to="/">
                        <Button
                          variant="contained"
                          color="primary"
                          borderRadius={30}
                          className="margin"
                        >
                          Return to Log In
                        </Button>
                      </NavLink>

                      <NavLink to="/SignUp">
                        <Button
                          variant="contained"
                          color="primary"
                          borderRadius={30}
                          className="margin"
                          onClick={() => this.createUser()}
                        >
                          Sign up
                        </Button>
                      </NavLink>
                    </Typography>
                  </Box>
                </Box>
              </Container>
            </Container>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

SignUp.propTypes = {
  history: PropTypes.node.isRequired
};

export default SignUp;
