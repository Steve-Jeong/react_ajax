import React, {Component} from 'react'; 

class Nav extends Component { 
  state = { 
    list : []
  }

  componentDidMount() {
    fetch('list.json')
      .then(function(result) {
        console.log('result : ', result)
        return result.json();
      })
      .then(function(json) {
        console.log('json : ',json)
        this.setState({list:json})
      }.bind(this))
  }

  render() {
    var listTag = []
    for(let i=0; i < this.state.list.length; i++) {
      let li=this.state.list[i]
      listTag.push(
        <li key={li.id}>
          <a href={li.id} onClick={function(id, e) {
            e.preventDefault();
            this.props.onClick(id)
          }.bind(this, li.id)}>
            {li.title}
          </a>
        </li>
      )
    }
    return (
      <ul>
        {listTag}
      </ul>
    )
  }
}

class Article extends Component {
  render () {
    return (
      <article>
        <h2>{this.props.title}</h2>
        {this.props.desc}
      </article>
    )
  }
}

class App extends Component {
  state = {
    article:[
      {title:'Welcome', desc:'Hello, React & Ajax'},
      {title:'HTML', desc:'HTML is ...'},
      {title:'CSS', desc:'CSS is ...'},
      {title:'JavaScript', desc:'JavaScript is ...'}
    ],
    selected_id : 0
  }
  render() {
    return (
      <div className="App">
        <h1>WEB</h1>
        <Nav onClick={function(id) {
          console.log('id', id)
          this.setState({selected_id:id})
          console.log('this.state.selected_id :', this.state.selected_id)
        }.bind(this)}></Nav>
        <Article title={this.state.article[this.state.selected_id].title} desc={this.state.article[this.state.selected_id].desc}></Article>
        {/* <Article title={this.state.selected_id} desc={this.state.selected_id}></Article> */}
      </div>
    )
  }
}

export default App;
