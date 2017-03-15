import React, { Component, PropTypes } from 'react'
import { Button } from 'antd'
class ContextButton extends Component {
  static contextTypes = {
    color: React.PropTypes.string,
    name: React.PropTypes.string,
  }

  render() {
    return (<Button style={{ background: this.context.color }}>
      { this.props.children }
    </Button>)
  }
}

class Message extends Component {
  render() {
    return (<div>
      {this.props.text} <ContextButton>Delete</ContextButton>
    </div>)
  }
}
 
class MessageList extends Component {
  static childContextTypes = {
    color: React.PropTypes.string,
    name: React.PropTypes.string
  }
  getChildContext() {
    return { color: "#51ace1", name: "enochjs" }
  }
  render() {
    const messages = ['context1', 'context2', 'context3', 'context4', 'context5']
    return (<div>
      {
        messages.map((item, index) => <Message key={index} text={item.text} />)
      }
    </div>)
  }
}

export {
  ContextButton,
  Message,
  MessageList,
}
