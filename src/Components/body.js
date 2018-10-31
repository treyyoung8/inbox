import React from 'react';
import Message from './messages'

const Body = ({body}) => {
    return (
        <div class='row message-body'>
            <div class='col-xs-11 col-xs-offset-1'>
                {body}
            </div>
        </div> 
    )
}

export default Body