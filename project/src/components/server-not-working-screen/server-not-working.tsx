import React from 'react';
import Message from '../message/message';

const  SERVER_NOT_WORKING_MESSAGE = 'Sorry for inconvenience. We are working to fix it';

function ServerNotWorking(): JSX.Element {
  return (
    <div className="user-page">
      <Message
        message={SERVER_NOT_WORKING_MESSAGE}
        fontSize={40}
      />
    </div>
  );
}

export default ServerNotWorking;
