import React from 'react';
import Message from './messages';

const MessageList = (props) => {
return(
    props.messages.map(message => 
        <Message 
            body={message.body} 
            id={message.id} 
            subject={message.subject} 
            read={message.read} 
            starred={message.starred}
            selected={message.selected}
            labels={message.labels}
            changeStar={props.changeStar}
            changeRead={props.changeRead}
            expandBox={props.expandBox}
            expand={props.expand}
            changeSelection={props.changeSelection}
            currentUnread={props.currentUnread}
            />
        )
    )
}

export default MessageList