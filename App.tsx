import { useState } from 'react'
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { Feather } from '@expo/vector-icons'

const INITIAL_MESSAGES = [
  { id: '1', user_id: '1', message: 'Oi' },
  { id: '2', user_id: '2', message: 'Oi' },
  { id: '3', user_id: '2', message: 'Tudo bem?' },
].reverse()

const MY_ID = '1'

export default function App() {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState(INITIAL_MESSAGES)

  function sendMessage() {
    if (message.trim().length > 0) {
      const newMessage = {
        id: new Date().getTime().toString(),
        user_id: MY_ID,
        message,
      }

      setMessages((prevState) => [newMessage, ...prevState])
      setMessage('')
    }
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        inverted
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text
            key={item.id}
            style={[
              styles.message,
              item.user_id === MY_ID ? styles.myMessage : styles.friendMessage,
            ]}
          >
            {item.message}
          </Text>
        )}
      />

      <View style={styles.footer}>
        <TextInput
          onChangeText={setMessage}
          placeholder='Digite a mensagem aqui...'
          value={message}
          style={styles.input}
        />
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={sendMessage}
          style={styles.send}
        >
          <Feather color='#ffffff' name='send' size={24} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flex: 1,
    padding: 32,
  },
  message: {
    borderRadius: 12,
    marginBottom: 12,
    padding: 16,
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#105dfb',
    borderBottomRightRadius: 0,
    color: '#ffffff',
  },
  friendMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#d7d7d7',
    borderBottomLeftRadius: 0,
    color: '#000000',
  },
  input: {
    backgroundColor: '#d2d6da',
    borderRadius: 12,
    flex: 1,
    height: 56,
    padding: 16,
  },
  send: {
    alignItems: 'center',
    backgroundColor: '#105dfb',
    borderRadius: 12,
    height: 56,
    justifyContent: 'center',
    width: 56,
  },
  footer: {
    flexDirection: 'row',
    gap: 7,
  },
})
