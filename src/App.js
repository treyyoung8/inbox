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
        unread: 0,
    }
  }

  async componentDidMount() {
    let response = await fetch('http://localhost:8082/api/messages',)
    let json = await response.json()
    // let selected = json.filter(message => message.selected)
    let currentUnread = json.filter(message => !message.read).length

    this.setState({
      messages: json,
      unread: currentUnread
    })
  }

  showCompose = (event) => {
    this.setState({
      composeStatus: !this.state.composeStatus
    })
  }

  changeRead = async (messageId) => {
    let message = {
      messageIds: [messageId],
      command: "read",
      "read": true
    }

    const result = await fetch('http://localhost:8082/api/messages', {
      method: 'PATCH',
      body: JSON.stringify(message),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })

    const newMessages = this.state.messages.map(message => {
      if (message.id === messageId) {
        message.read = true
      }
      return message
    })
    this.setState({
      messages: newMessages
    })
  }

  changeStar = async (messageId) => {
    let message = {
      messageIds: [messageId],
      command: "star",
      "star": ![messageId.star]
    }

    const result = await fetch('http://localhost:8082/api/messages', {
      method: 'PATCH',
      body: JSON.stringify(message),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })
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

  changeToUnread = async (messageId) => {
    let message = {
      messageIds: [messageId],
      command: "read",
      "read": false
    }

    const result = await fetch('http://localhost:8082/api/messages', {
      method: 'PATCH',
      body: JSON.stringify(message),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })

    const newMessages = this.state.messages.map(message => {
      if (message.id === messageId) {
        message.read = false
      }
      return message
    })
    this.setState({
      messages: newMessages
    })
  }

  changeSelection = async (messageId) => {
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

  expandBox = (messageId) => {
    const newExpand = this.state.messages.map(message => {
      if (message.id === messageId) {
        this.state.expand = !this.state.expand
      }
    })
    this.setState({
      expand: newExpand
    })
  }

  markRead = () => {
    const newMessages = this.state.messages.filter(message => message.selected === true)
    newMessages.forEach(message => this.changeRead(message.id))
  }

  markUnread = () => {
    const newMessages = this.state.messages.filter(message => message.selected === true)
    newMessages.forEach(message => this.changeToUnread(message.id))
  }

  currentUnread = () => {
    const updatedUnread = this.state.messages.filter(message => message.read == false)
    this.setState({
      unread: updatedUnread.length
    })
  }

  // selectionStage = () => {
  //   const selectionStatus = this.state.messages.map(message => {
  //     if (message.selected === true) {
  //       return 'fa-check-square-o'
  //     } else (message.selected === false) {
  //       return 'fa-square-o'
  //     }
  //   })
  // }
  
  render() {
    return (
      <>
      <Header />
      <Toolbar  showCompose={this.showCompose}
                markRead={this.markRead}
                markUnread={this.markUnread}
                unread={this.state.unread}
                currentUnread={this.currentUnread}
                messages={this.state.messages}
                selectionStage={this.selectionStage} />
      {this.state.composeStatus && <Compose />}
      <MessageList  messages={this.state.messages}
                    starred={this.state.starred}
                    changeStar={this.changeStar}
                    changeRead={this.changeRead}
                    expandBox={this.expandBox}
                    expand={this.state.expand}
                    changeSelection={this.changeSelection}
                    currentUnread={this.currentUnread} />
      </>
    );
  }
}

export default App;