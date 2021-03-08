import React, { Component } from "react";
import axios from "axios";

class Fib extends Component {
  state = {
    seenIndexes: [],
    values: [],
    index: "",
  };

  componentDidMount() {
    this.fetchValues();
    this.fetchIndexes();
  }

  async fetchValues() {
    try{
      const values = await axios.get("/api/values/current");
      console.log('values', values.data)
      this.setState({ values: values.data });
    }catch(err){
      console.log(err)
    }
  }

  async fetchIndexes() {
    try{
      const indexes = await axios.get("/api/values/all");
      this.setState({ seenIndexes: indexes.data });
    }catch(err){
      console.log(err)
    }
  }

  renderSeenIndexes() {
    return this.state.seenIndexes.map(({ number }) => number).join(", ");
  }

  submitForm = async (e) => {
    e.preventDefault();
    axios.post("api/values", {
      index: this.state.index,
    }).then(res => {
      console.log(res.data)
    }).catch(err => console.log(err));
    this.setState({ index: "" });
  };

  renderValues() {
    const entries = [];
    for (let key in this.state.values) {
      entries.push(
        <div key={key}>
          For index {key} I calculated {this.state.values[key]}
        </div>
      );
    }
    return entries;
  }

  render() {
    return (
      <div>
        <form onSubmit={this.submitForm}>
          <label>Enter your index:</label>
          <input
            type="text"
            value={this.state.index}
            onChange={(event) => this.setState({ index: event.target.value })}
          />
          <button type="submit">Submit</button>
        </form>

        <h3>Indexes I have seen</h3>
        {this.renderSeenIndexes()}

        <h3>Calculated Values</h3>
        {this.renderValues()}
      </div>
    );
  }
}

export default Fib
