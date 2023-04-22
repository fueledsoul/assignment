import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { userActions } from "../_actions";
import "./Audit.css";
import { Navbar, Nav } from "react-bootstrap";
import { useEffect } from "react";
function Auditpage(props) {
  const { user, users } = props;

  useEffect(() => {
    props.getUsers();
  }, []);

  const handleDeleteUser = (id) => {
    return (e) => props.deleteUser(id);
  };

  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand></Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link>
            <Link to="/">Home</Link>
          </Nav.Link>
          <Nav.Link href="#features">Auditor</Nav.Link>
          <Nav.Link>
            <Link to="/login">Logout</Link>
          </Nav.Link>
        </Nav>
      </Navbar>
      <div className="col-md-8">
        <h1>Hi {user.firstName}!</h1>
        <p>You're logged in with React!!</p>
        <h3>All login audit :</h3>
        {users.loading && <em>Loading users...</em>}
        {users.error && (
          <span className="text-danger">ERROR: {users.error}</span>
        )}

        <table className="table-bordered" id="customers">
          <thead className="header">
            <tr>
              <th>Id</th>
              <th>Role</th>
              <th>Created Date</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Action</th>
            </tr>
          </thead>
          {users.items &&
            users.items.map((u, index) => {
              return (
                <tr>
                  <td>{u.id}</td>
                  <td>{u.role}</td>
                  <td>{u.createdDate}</td>
                  <td>{u.firstName}</td>
                  <td>{u.lastName}</td>
                  <td className="d-flex">
                    {u.deleting ? (
                      <em> - Deleting...</em>
                    ) : u.deleteError ? (
                      <span className="text-danger">
                        - ERROR: {u.deleteError}
                      </span>
                    ) : (
                      <span>
                        - <a onClick={handleDeleteUser(u.id)}>Delete</a>
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
        </table>
      </div>
    </div>
  );
}

function mapState(state) {
  const { users, authentication } = state;
  const { user } = authentication;
  return { user, users };
}

const actionCreators = {
  getUsers: userActions.getAll,
  deleteUser: userActions.delete,
};

const connectedAuditPage = connect(mapState, actionCreators)(Auditpage);
export { connectedAuditPage as Auditpage };
