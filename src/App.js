import React, { Component } from 'react';
import './App.css';
import Toolbar from './Components/toolbar.js'
import Message from './Components/messages'
import Compose from './Components/compose.js'
import Header from './Components/header.js'
import MessageList from './Components/messageList'

class App extends Component {
  constructor(props) {
    super(props)
      this.state = {
        messages: [],
        composeStatus: false,
        expand: false,
    }
  }

  async componentDidMount() {
    let response = await fetch('http://localhost:8082/api/messages',)
    let json = await response.json()
    // let selected = json.filter(message => message.selected)
    // let unRead = json.filter(message => !message.read)

    this.setState({
      messages: json,
      
    })
  }

  showCompose = (event) => {
    this.setState({
      composeStatus: !this.state.composeStatus
    })
  }

  changeRead = (messageId) => {
    const newMessages = this.state.messages.map(message => {
      if (message.id === messageId) {
        message.read = !message.read
      }
      return message
    })
    this.setState({
      messages: newMessages
    })
  }

  changeStar = (messageId) => {
    const newMessages = this.state.messages.map(message => {
      if (message.id === messageId) {
        message.starred = !message.starred
      }
      return message
    })
    this.setState({
      messages: newMessages
    })
  }

  changeSelection = (messageId) => {
    const newMessages = this.state.messages.map(message => {
      if (message.id === messageId) {
        message.selected = !message.selected
      }
      return message
    })
    this.setState({
      messages: newMessages
    })
  }

  expandBox = (event) => {
    this.setState({
      expand: !this.state.expand
    })
  }

  // markRead = () => {
  //   const newMessages = this.state.messages.map(message => {
  //     if (message.selected === true) {
  //     message.read = true
  //     }
  //     return newMessages
  //   })
  //   this.setState({
  //     messages: newMessages
  //   })
  // }
  
  render() {
    return (
      <>
      <Header />
      <Toolbar  showCompose={this.showCompose}
                selectAll={this.markRead} />
      {this.state.composeStatus && <Compose />}
      <MessageList  messages={this.state.messages}
                    starred={this.state.starred}
                    changeStar={this.changeStar}
                    changeRead={this.changeRead}
                    expandBox={this.expandBox}
                    expand={this.state.expand}
                    changeSelection={this.changeSelection} />
      </>
    );
  }
}

export default App;