import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      users: [],
      targetIndex: "",
    };
  }
  addRecord = (user)=>{
    this.setState(state=>{
      const users = state.users.concat(user);
      return {users}
    })
  }
  setTargetIndex = (i) =>{
    this.setState({
      targetIndex : i,
    })
  }
  render(){
    return <div className="container-fluid bg-light">
      <header className="row tracker-orange mb-5">
        <h1 className="p-2 ml-5">Hobby Tracker</h1>
      </header>
      <div className="row">
        <div className="col-xl-1 p-0 m-0"></div>
        <div className="col-xl-5 p-0 m-0"><div className="table-container"><Table setTargetIndex={this.setTargetIndex} users={this.state.users}/></div></div>
        <div className="col-xl-5 p-0 m-0"><div className="form-container"><Form addRecord={this.addRecord}/></div></div>
        <div className="col-xl-1 p-0 m-0"></div>
      </div>
      <div className="row">
        <div className="col-xl-1 p-0 m-0"></div>
        <div className="col-xl-6 p-0 m-0"><div className="display-container">{this.state.targetIndex === "" ? <br/> : <Display user={this.state.users[this.state.targetIndex]}/>}</div></div>
        <div className="col-xl-4 p-0 m-0"></div>
        <div className="col-xl-1 p-0 m-0"></div>
      </div>
      <footer>This is a sample app using React written by Nate Krieger for Tracker Management Systems</footer>
    </div>
  }
}
class Form extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        firstName : "",
        lastName : "",
        DOB : "",
        hobbies: "",
      };
      this.handleInputChange = this.handleInputChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
  }
  addRecord(record){
    this.props.addRecord(record);
  }
  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }
  handleSubmit(event){
    if(this.validateDate(this.state.DOB)){
      const user = {
        firstName : this.state.firstName,
        lastName : this.state.lastName,
        DOB : this.state.DOB,
        hobbies: this.state.hobbies,
      }
      this.addRecord(user);
      this.setState({
        firstName : "",
        lastName : "",
        DOB : "",
        hobbies: "",
      })
      event.preventDefault();
    }else{
      alert("No time travelers allowed!  Please choose a birthday in the past.")
    }
  }
  validateDate(input){
    const today = new Date()
    const inputDate = new Date(input)
    if(today-inputDate > 0){
      return true;
    }   
  }
  render() {
    return (
      <div className="width-50 p-0 mt-0  ml-3 mr-3 mb-3 mx-auto">
        <form onSubmit={this.handleSubmit}>
          <div className="row mt-0 mb-2 mr-2 ml-2">
            <label className="form-label">First Name: </label>
            <input className="text-input" onChange={this.handleInputChange} value={this.state.firstName} name="firstName" required="required" type="text"/>
          </div>
          <div className="row m-2">
            <label className="form-label">Last Name: </label>
            <input className="text-input" onChange={this.handleInputChange} value={this.state.lastName} name="lastName" required="required" type="text"/>
          </div>
          <div className="row m-2">
            <label className="form-label">Date of Birth: </label>
            <input className="text-input" onChange={this.handleInputChange} value={this.state.DOB} name="DOB" required="required" type="date"/>
          </div>
          <div className="row m-2">
            <label className="form-label">Hobbies: </label>
            <input className="text-input" onChange={this.handleInputChange} value={this.state.hobbies} name="hobbies" required="required" type="text"/>
          </div>
          <div className="row m-2 ml-5">
            <span className="form-label"></span>
            <input className="save-button" type="submit" value="Save"/>  
          </div>
        </form>
      </div> 
    );
  }
}
function Display(props) { 
  return <div className="container-fluid display-content border rounded mt-5">
      <h2 className="p-2 mt-2">Contact Details</h2>
      <ul className="display-list">
        <li className="p-2">First Name: {props.user.firstName}</li>
        <li className="p-2">Last Name: {props.user.lastName}</li>
        <li className="p-2">Date of Birth: {props.user.DOB}</li>
        <li className="p-2">Hobbies: {props.user.hobbies}</li>
      </ul>
    </div>
}
class Table extends React.Component{
  constructor(props) {
    super(props);
    this.state = {};
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(e){
    this.props.setTargetIndex(e.target.getAttribute("index"))
  }
  renderTableData() {
    return this.props.users.map((user, index) => {
       const {firstName, lastName, DOB, hobbies} = user
       return (
          <tr key={index}>
             <td>{firstName}</td>
             <td>{lastName}</td>
             <td><label index={index} onClick={this.handleClick} className="details-link p-0 m-0">Details</label></td>
          </tr>
       )
    })
  }
  render(){
    return <div className="p-0 ml-3 mr-3 mb-3 border rounded table-wrapper">
    <table>
      <tbody>
        <tr>
          <th scope="col">First Name</th>
          <th scope="col">Last Name</th>
          <th scope="col">Actions</th>
        </tr>
        {this.renderTableData()}  
      </tbody>
    </table>
  </div>
  }
}
ReactDOM.render(<App />, document.getElementById('root'));