import Messages from '@/components/Messages'
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from '@/styles/Home.module.css'
import Input from '@/components/Input';
import Parameters from '@/components/Parameters';

// Генерируем случайный цвет аватара
function randomColor() {
  return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
}

export default function Home() {
  // начальное состояние чата
  const [messages, setMessages] = useState([]);
  const [me, setMe] = useState({
    username: 'Вы',
    color: randomColor(),
  });

  const ipAddress = useRef(''); // Ip пользователя
  const IDfromURL = useRef(''); // session_id из ссылки
  const UserID = useRef('');

  const router = useRouter();

  useEffect(() => {
    fetch('https://api.ipify.org?format=json') // В любом случае достаем IP пользователя
        .then(response => response.json())
        .then(data => localStorage.setItem("ip_address", data.ip))
        .catch(error => console.log(error))
    ipAddress.current = localStorage.getItem("ip_address")

    // Проверяем, по какой ссылке перешел пользователь
    const url = new URL(window.location.href)
    IDfromURL.current = url.href.slice(34)

    if (IDfromURL.current !== "") {

        if (sessionStorage.getItem(ipAddress.current) !== 'null') {
          console.log('hello')
          UserID.current = sessionStorage.getItem(ipAddress.current)

          fetch('http://localhost:4000/session/get', { // Корректируем в соответствии с бэком
              method: 'POST',
              body: JSON.stringify({
                  id: IDfromURL.current,
                  user_id: UserID.current
              })
          })
          .then(response => response.json())
          .then(data => {
              const history = JSON.parse(data)

              history.forEach((mes) => {
                  const ClientMessage = {
                      data: mes.request,
                      member: me
                  }

                  setMessages([...messages, ClientMessage])

                  const MAIAMessage = { // Получаем сообщение от GPT
                      content: mes.response,
                      member: 'MAIA'
                  }

                  setMessages([...messages, MAIAMessage])
              })
          })
          .catch(error => console.log(error))
        }

        else {
            fetch('http://localhost:4000/session/create', { // Корректируем в соответствии с бэком
            method: 'POST',
            body: JSON.stringify({ip: ipAddress.current}) // Отправляем IP пользователя
            })
            .then(response => response.json())
            .then(data => {
                sessionStorage.setItem("session_id", data.session_id)
                sessionStorage.setItem(ipAddress.current, data.user_id)
            })

            UserID.current = sessionStorage.getItem("user_id")

            router.push('?session_id='+sessionStorage.getItem("session_id"))
        }
    }

    else {
        fetch('http://localhost:4000/session/create', { // Корректируем в соответствии с бэком
              method: 'POST',
              body: JSON.stringify({ip: ipAddress.current}) // Отправляем IP пользователя
        })
        .then(response => response.json())
        .then(data => {
            sessionStorage.setItem("session_id", data.session_id)
            sessionStorage.setItem(ipAddress.current, data.user_id)
            router.push('?session_id='+sessionStorage.getItem("session_id"))
        })

        UserID.current = sessionStorage.getItem("user_id")
        }
    }, []);

  function onSendMessage(message) {
    const newMessage = {
      data: message,
      member: me
    }
    setMessages([...messages, newMessage])
  }

  return(
    <div>
      <Parameters userID={UserID.current}/>
      <div className={styles.appContent}>
        <Messages messages={messages} me={me}/>
        <Input onSendMessage={onSendMessage}/>
      </div>
    </div>
  )
}
