import React from 'react';

const Toolbar = (props) => {
    var checkRead = false
    const correctNum = props.messages.filter(message => message.read === false)
    if (correctNum.length === 1) {
        checkRead = true
    }

    return (
        <div className='row toolbar'>
            <div className='col-md-12'>
                <p className='pull-right'>
                    <span className='badge badge'>{props.unread}</span>
                {`unread ${checkRead ? 'message' : 'messages'}`}
                </p>

                <a className='btn btn-danger' onClick={(e) => props.showCompose(e)}>
                    <i className='fa fa-plus'></i>
                </a>

                <button className='btn btn-default'>
                    <i className='fa fa-minus-square-o'></i>
                </button>

                <button className='btn btn-default' onClick={() => props.markRead()}>Mark As Read</button>

                <button className='btn btn-default' onClick={() => props.markUnread()}>Mark As Unread</button>

                <select className='form-control label-select'>
                    <option>Apply label</option>
                    <option value='dev' onClick={(event) => props.labelType(event)}>dev</option>
                    <option value='personal'>personal</option>
                    <option value='gschool'>gschool</option>
                </select>

                <select className='form-control label-select'>
                    <option>Remove label</option>
                    <option value='dev'>dev</option>
                    <option value='personal'>personal</option>
                    <option value='gschool'>gschool</option>
                </select>

                <button className='btn btn-default'>
                    <i className='fa fa-trash-o'></i>
                </button>
            </div>
        </div>
    )
}

export default Toolbar;

// onClick={() => props.markRead()}