import React, { useEffect, useState } from 'react';
import { StreamChat } from 'stream-chat';
// or const StreamChat = require('stream-chat').StreamChat;
import { 
  Chat, 
  Channel,
  ChannelHeader, 
  ChannelList,
  LoadingIndicator,
  MessageList,
  MessageInput, 
  Thread, 
  Window, 
  useChatContext 
} from 'stream-chat-react';
import 'stream-chat-react/dist/css/index.css'

const api_key = process.env.BEEFREAL_CHATROOM_API_KEY;

const user = {
  id:'mslee',
  name:'Mark Lee',
  image: 'https://getstream.imgix.net/image/random_svg/FS.png',
}

export default function App() {
  // keep track of client and channel states
  const [client, setClient] = useState(null)
  const [channel, setChannel] = useState(null)

  useEffect(() => {
    async function init() {
      const serverClient=StreamChat.getInstance('aerjqsdst2dq', 's53u3yvy65aq5secy2rux8g5bn7y4ae5mpzv4bss74wd2ewpfajw3fdwqvdcfn56');
      const token = serverClient.createToken(user.id);
      // const client = StreamChat.getInstance('aerjqsdst2dq');
      
  
      await serverClient.connectUser(user, token)      

      const channel = serverClient.channel('messaging', 'beef-talk', {
        // image: '../resources/aurora',
        name: 'Beef Contest',
        members: [user.id]
      })

      await channel.watch()

      setChannel(channel)
      setClient(serverClient)
    }

    init()

    if (client) return () => client.disconnectUser()
  }, [])

  if(!channel || !client) return <LoadingIndicator />

  return (
    <Chat client={client} theme="messaging light">
      <Channel channel={channel}>
        <Window>
          <ChannelHeader />
          <MessageList />
          <MessageInput />
        </Window>
        <Thread />
      </Channel>
    </Chat>
  )
}