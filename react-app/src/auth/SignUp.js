import React from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

class SignUp extends React.Component {
  state = {
    username: "",
    password: "",
    department: ""
  };

  handleChange = event => {
    const { id, value } = event.target;
    this.setState({ [id]: value });
  };

  submitForm = event => {
    event.preventDefault();
    const endpoint1 = "/register";
    const endpoint2 = "/login";
    axios
      .post(endpoint1, this.state)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.error("Account Creation Error", err);
      });

    axios
      .post(endpoint2, this.state)
      .then(res => {
        if (res) {
          localStorage.setItem("jwt", res.data.token);
          this.props.history.push("/users");
        } else {
          console.log(res);
        }
      })
      .catch(err => {
        console.error("Account Creation Error", err);
      });
  };

  render() {
    if (this.state.toUsers === true) {
      return <Redirect to="/users" />;
    }
    return (
      <>
        <h3>Sign-Up</h3>
        <form onSubmit={this.submitForm}>
          <div>
            <p>Username</p>
            <label htmlFor="username" />
            <input
              id="username"
              onChange={this.handleChange}
              value={this.state.username}
              type="text"
            />
          </div>
          <div>
            <p>Password</p>
            <label htmlFor="password" />
            <input
              id="password"
              onChange={this.handleChange}
              value={this.state.password}
              type="password"
            />
          </div>
          <div>
            <p>Department</p>
            <label htmlFor="department" />
            <input
              id="department"
              onChange={this.handleChange}
              value={this.state.department}
              type="text"
            />
          </div>
          <div>
            <button type="submit">Create User</button>
          </div>
        </form>
      </>
    );
  }
}

export default SignUp;
