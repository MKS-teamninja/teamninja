var React = require('react');
var ReactDOM = require('react-dom');

class SearchBox extends React.Component {
  constructor() {
    super();

    this.state = {
      value: 'SearchBox'
    };
  }
  render() {
    return (
      <form className="search-form" onSubmit={this._handleSubmit.bind(this)}>
        <input
          type="text"
          value={this.state.value}
          onChange={this._handleClick}
        />
      </form>
    );
  }
  _handleSubmit(e) {
    e.preventDefault();
  }

  _getInitialState() {
    return {value: 'SearchBox'};
  }

  _handleClick(event) {
    this.setState({value: event.target.value});
  }
}

ReactDOM.render(
  <SearchBox />,  document.getElementById('app')
  );






// var Waitlist = React.createClass({
//   render: function () {
//     return <div className="waitlist">
//       {this.props.roster.map( person =>
//         <div key={person.id} className="person">{ person.name }</div>
//       )}
//     </div>
//   }
// })

// var WaitlistMgr = React.createClass({
//   getInitialState: function () {
//     return {
//       people: [
//         { id: 10, name: 'alice' },
//         { id: 11, name: 'bob'}
//       ],
//       newPersonName: '[Type person name here]'
//     }
//   },

//   setNewPersonName: function (e) {
//     this.setState({ newPersonName: e.target.value })
//   },

//   add: function () {
//     console.log("Adding new person:", this.state.newPersonName)
//     this.state.people.push(
//       { id: Math.round(Math.random() * 1000), name: this.state.newPersonName }
//     )
//   },

//   render: function () {
//     return <div className="waitlist-mgr">
//       <Waitlist roster={this.state.people} />

//       <input type="text"
//         value={this.state.newPersonName}
//         onChange={this.setNewPersonName} />

//       <p>Add new person: {this.state.newPersonName}</p>
//       <button onClick={this.add}>Add Person</button>
//     </div>
//   }
// })

// ReactDOM.render(
//   <WaitlistMgr />,
//   document.getElementById('app')
// )