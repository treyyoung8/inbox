import React from 'react';
import MessageList from './messageList';
import Body from './body';

const Message = ({starred, changeStar, subject, read, id, changeRead, expandBox, body, expand, selected, changeSelection}) => {
    return (
        <>
            <div className={`row message ${read ? 'read' : 'unread'} ${(typeof selected !== 'undefined') && selected === true ? 'selected' : ''}`} onClick={() => expandBox(id)}>
                <div className='col-xs-1'>
                    <div className='row'>
                        <div className='col-xs-2'>
                            <input type='checkbox' checked={`${(typeof selected !== 'undefined') && selected === true ? 'checked' : ''}`} onClick={() => changeSelection(id)} />
                        </div>
                        <div className='col-xs-2'>
                            <i className={`star fa ${starred ? 'fa-star' : 'fa-star-o'}`} onClick={() => changeStar(id)}></i>
                        </div>
                    </div>
                </div>
                <div className='col-xs-11'>
                    <span className='label label-warning'>dev</span>
                    <span className='label label-warning'>gschool</span>
                    <a>
                        {subject}
                    </a>
                </div>
            </div>
            {expand && <Body body={body} />}
        </>
    )
}

export default Message



/* <div className={`row message ${read ? 'read' : 'unread'}`} onClick={(e) => expandBox(e)}> */