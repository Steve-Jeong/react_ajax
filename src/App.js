import React, {Component} from 'react'; 

class Nav extends Component { 
  render() {
    var listTag = []
    for(let i=0; i < this.props.list.length; i++) {
      let li=this.props.list[i]
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
    article:
      {title:'Welcome', desc:'Hello, React & Ajax'},
    selected_id : 0,
    list:[]
  }

  
  componentDidMount() {
    fetch('list.json')
      .then(function(result) {
        // console.log('result : ', result)
        return result.json();
      })
      .then(function(json) {
        // console.log('json : ',json)
        this.setState({list:json})
      }.bind(this))
  }

  render() {
    return (
      <div className="App">
        <h1>WEB</h1>
        <Nav list={this.state.list} onClick={function(id) {
          this.setState({selected_id:id})
          fetch(id+'.json')
            .then(function(result){
              return result.json()
            })
            .then(function(json){
              this.setState({
                article:{
                  title:json.title,
                  desc:json.desc
                }
              })
            }.bind(this))
        }.bind(this)}></Nav>
        <Article title={this.state.article.title} desc={this.state.article.desc}></Article>
      </div>
    )
  }
}

export default App;
