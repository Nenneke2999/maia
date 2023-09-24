import Image from 'next/image'
import { Inter } from 'next/font/google'
import Messages from '@/components/Messages'
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from '@/styles/Home.module.css'
import Input from '@/components/Input';
import Parametrs from '@/components/Parametrs';

// Генерируем случайный цвет аватара
function randomColor() {
  return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
}

export default function Home() {
  // начальное состояние чата
  const [messages, setMessages] = useState([]);
  const [members, setMembers] = useState([]);
  const [me, setMe] = useState({
    username: 'Вы',
    color: randomColor(),
  });

  const ipAddress = useRef(''); // Ip пользователя
  const IDfromURL = useRef(''); // session_id из ссылки

  const user_dictionary = {}

  const addUser = (ip_address, user_id) => {
    if (!user_dictionary[ip_address]) {
        user_dictionary[ip_address] = user_id
    }
  }

  const router = useRouter();

  useEffect(() => {
    fetch('https://api.ipify.org?format=json') // В любом случае достаем IP пользователя
        .then(response => response.json())
        .then(data => localStorage.setItem("ip_address", data.ip))
        .catch(error => console.log(error))
    ipAddress.current = localStorage.getItem("ip_address")
    }, [])

  // useEffect(() => {
  //   // Проверяем, по какой ссылке перешел пользователь
  //   const url = new URL(window.location.href)
  //   IDfromURL.current = url.href.slice(33)

  //   if (IDfromURL.current !== "" && IDfromURL.current !== 'null') {

  //       if (ipAddress.current in user_dictionary) {

  //           const user_id = user_dictionary[ipAddress.current]

  //           const response = fetch('http://localhost:4000/session/get', { // Корректируем в соответствии с бэком
  //               method: 'POST',
  //               body: JSON.stringify({user_id: user_id, // Отправляем ID пользователя
  //                                     session_id: IDfromURL.current})
  //           })
  //           .then(response => response.json())
  //           .then(data => {
  //               const history = JSON.parse(data)

  //               history.forEach((mes) => {
  //                   const ClientMessage = {
  //                       data: mes.request,
  //                       member: me
  //                   }

  //                   setMessages([...messages, ClientMessage])

  //                   const MAIAMessage = { // Получаем сообщение от GPT
  //                       content: mes.response,
  //                       member: 'MAIA'
  //                   }

  //                   setMessages([...messages, MAIAMessage])
  //               })
  //           })
  //           .catch(error => console.log(error))

  //       }
  //       else {
  //           fetch('http://localhost:4000/session/create', { // Корректируем в соответствии с бэком
  //           method: 'POST',
  //           body: JSON.stringify({ip: ipAddress.current}) // Отправляем IP пользователя
  //           })
  //           .then(response => response.json())
  //           .then(data => {
  //               localStorage.setItem("session_id", data.session_id)
  //               localStorage.setItem("user_id", data.user_id)
  //           })

  //           addUser(ipAddress.current, localStorage.getItem("user_id"))

  //           router.push('?session_id='+localStorage.getItem("session_id"))
  //       }
  //   }
  //   else{
  //     const response = fetch('http://localhost:4000/session/create', { // Корректируем в соответствии с бэком
  //             method: 'POST',
  //             body: JSON.stringify({ip: ipAddress.current}) // Отправляем IP пользователя
  //         })
  //         .then(response => response.json())
  //         .then(data => {
  //             localStorage.setItem("session_id", data.session_id)
  //             localStorage.setItem("user_id", data.user_id)
  //         })

  //         addUser(ipAddress.current, localStorage.getItem("user_id"))

  //         router.push('?session_id='+localStorage.getItem("session_id"))
  //   }
  // }, [])

  function onSendMessage(message) {
    const newMessage = {
      data: message,
      member: me
    }
    setMessages([...messages, newMessage])
  }

  return(
    <div>
      <Parametrs UserID={user_dictionary[ipAddress.current]}/>
      <div className={styles.appContent}>
        <Messages messages={messages} me={me}/>
        <Input onSendMessage={onSendMessage}/>
      </div>
    </div>
  )
}
