import { useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from '@/styles/index.module.css'
import Parameters from '@/components/Parameters';
import Header from '@/components/Header';

export default function Home() {

  const ipAddress = useRef(''); // Ip пользователя
  const UserID = useRef('');

  const router = useRouter();

  useEffect(() => {
    fetch('https://api.ipify.org?format=json') // В любом случае достаем IP пользователя
    .then(response => response.json())
    .then(data => localStorage.setItem("ip_address", data.ip))
    .catch(error => console.log(error))

    ipAddress.current = localStorage.getItem("ip_address")

    fetch('http://localhost:4000/session/create', { // Корректируем в соответствии с бэком
      method: 'POST',
      body: JSON.stringify({ip: ipAddress.current}) // Отправляем IP пользователя
    })
    .then(response => response.json())
    .then(data => {
      UserID.current = data.user_id
      router.push('?session_id='+data.session_id)
    })
    
  }, []);

  return(
    <div className={styles.all}>
      <div className={styles.header}>
        <Header />
      </div>
      <div className={styles.components}>
        <div className={styles.left_side}>
          <Parameters userID={UserID.current}/>
        </div>
      </div>
    </div>
  )
}
