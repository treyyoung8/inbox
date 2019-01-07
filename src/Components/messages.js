import React from 'react';
import MessageList from './messageList';
import Body from './body';

const Message = ({starred, changeStar, subject, read, id, changeRead, expandBox, body, expand, selected, changeSelection, currentUnread, labels}) => {

    const multipleFunctions = (id) => {
        changeRead(id)
        currentUnread()
        expandBox(id)
    }

    const dev = labels.includes('dev')
    const personal = labels.includes('personal')
    const gschool = labels.includes('gschool')
    
    return (
        <>
            <div className={`row message ${read ? 'read' : 'unread'} ${(typeof selected !== 'undefined') && selected === true ? 'selected' : ''}`}>
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
                <div className='col-xs-11' onClick={() => multipleFunctions(id)}>
                    {dev && <span className='label label-warning'>dev</span>}
                    {personal && <span className='label label-warning'>personal</span>}
                    {gschool && <span className='label label-warning'>gschool</span>}
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