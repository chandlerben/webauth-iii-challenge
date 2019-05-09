import React from "react";
import axios from "axios";

import requiresAuth from "../auth/requiresAuth";

class Users extends React.Component {
  state = {
    users: []
  };

  render() {
    return (
      <>
        <h2>
          <ul>
            {this.state.users.map(u => (
              <li key={u.id}>{u.username}</li>
            ))}
          </ul>
        </h2>
      </>
    );
  }

  componentDidMount() {
    const endpoint = "/users";
    // const token = localStorage.getItem("jwt");
    // const requestConfig = {
    //   headers: {
    //     authorization: token
    //   }
    // };
    axios
      .get(endpoint)
      .then(res => {
        this.setState({ users: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  }
}

export default requiresAuth(Users);
