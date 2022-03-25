import React from "react";
import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      country: "",
      city: "",
      job: "",
      contact: [],
      error: ""
    };
  }
  componentDidMount() {
    this.getApiData();
    this.interval = setInterval(() => {
      this.getApiData();
    }, 1000);
  }
  getApiData() {
    const url = "http://localhost:8001/api/add";
    axios
      .get(url)
      .then((response) => {
        this.setState({
          contact: response.data
        });
      }, [])
      .catch((e) => {
        console.log(e);
        this.setState({
          error: "No data found"
        });
      });
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  handleFormSubmit(e) {
    e.preventDefault();

    let formData = new FormData();
    formData.append("name", this.state.name);
    formData.append("email", this.state.email);
    formData.append("country", this.state.country);
    formData.append("city", this.state.city);
    formData.append("job", this.state.job);

    axios({
      method: "POST",
      url: "http://localhost/api/contact.php/",
      data: formData,
      config: { headers: { "Content-Type": "multipart/form-data" } }
    })
      .then(function (response) {
        console.log(response);
        alert("New Contact Successfully Added.");
        this.componentDidMount();
      })
      .catch((e) => console.log(e));
  }

  render() {
    return (
      <div className="container">
        <h1 className="page-header text-center">Contact Management</h1>
        <div className="col-md-8">
          <h3>Contact Table</h3>
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Country</th>
                <th>City</th>
                <th>Job</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {this.state.contact.map((contact, index) => (
                <tr key={index}>
                  <td>{contact.name}</td>
                  <td>{contact.email}</td>
                  <td>{contact.country}</td>
                  <td>{contact.city}</td>
                  <td>{contact.job}</td>
                  <tr>
                    <td>
                      <button key={index} className="btn btn-danger">
                        Delete
                      </button>
                    </td>
                    <td>
                      <button key={index} className="btn btn-primary">
                        Edit
                      </button>
                    </td>
                  </tr>
                </tr>
              ))}
            </tbody>
          </table>
          {this.state.error ? this.state.error : null}
        </div>
        <div className="col-md-4">
          <div className="panel panel-primary">
            <div className="panel-heading">
              <span className="glyphicon glyphicon-user"></span> Add New Contact
            </div>
            <div className="panel-body">
              <form>
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  value={this.state.name}
                  onChange={(e) => this.setState({ name: e.target.value })}
                />

                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={this.state.email}
                  onChange={(e) => this.setState({ email: e.target.value })}
                />

                <label>Country</label>
                <input
                  type="text"
                  name="country"
                  className="form-control"
                  value={this.state.country}
                  onChange={(e) => this.setState({ country: e.target.value })}
                />

                <label>City</label>
                <input
                  type="text"
                  name="city"
                  className="form-control"
                  value={this.state.city}
                  onChange={(e) => this.setState({ city: e.target.value })}
                />

                <label>Job</label>
                <input
                  type="text"
                  name="job"
                  className="form-control"
                  value={this.state.job}
                  onChange={(e) => this.setState({ job: e.target.value })}
                />
                <br />
                <input
                  type="submit"
                  className="btn btn-primary btn-block"
                  onClick={(e) => this.handleFormSubmit(e)}
                  value="Create Contact"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
