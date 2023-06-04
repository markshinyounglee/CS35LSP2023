import React from 'react';
import { StreamChat } from 'stream-chat';
import { Chat, Channel, ChannelHeader, MessageInput, MessageList, Thread, Window } from 'stream-chat-react';

import 'stream-chat-react/dist/css/v2/index.css';

const chatClient = new StreamChat('dz5f4d5kzrue'); // API key
const userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiY29vbC1kYXJrbmVzcy04IiwiZXhwIjoxNjg1ODQ5MjI1fQ.n-u6YEIYvP89W_DzwgDdeGwapET1wracBSfMfjty25c';

chatClient.connectUser(
  {
    id: 'cool-darkness-8',
    name: 'cool',
    image: 'https://getstream.io/random_png/?id=cool-darkness-8&name=cool',
  },
  userToken,
);

const channel = chatClient.channel('messaging', 'custom_channel_id', {
  // add as many custom fields as you'd like
  image: 'https://www.drupal.org/files/project-images/react.png',
  name: 'Talk about React',
  members: ['cool-darkness-8'],
});

const App = () => (
  <Chat client={chatClient} theme='str-chat__theme-light'>
    <Channel channel={channel}>
      <Window>
        <ChannelHeader />
        <MessageList />
        <MessageInput />
      </Window>
      <Thread />
    </Channel>
  </Chat>
);

export default PlayerChatroom;