import Messages from '@/components/Messages'
import { useSelector, useDispatch  } from 'react-redux';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ReactDOM from 'react-dom';
import styles from '@/styles/index.module.css'
import Input from '@/components/Input';
import Parameters_user from '@/components/Parameters_user';
import Header from '@/components/Header';
import { fetchIP, fetchForUserId } from '@/asyncActions/Fetch'


// Генерируем случайный цвет аватара
function randomColor() {
  return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
}

export default function Home() {

  const var_ipAddress = useSelector(store => store.setIPAddress.var_ipAddress);
  const var_userId = useSelector(store => store.setUserID.var_userId); // (есть в return)
  const var_sessionId = useSelector(store => store.setSessionID.var_sessionId); // (есть в return)
  const dispatch = useDispatch();

  const [isInitialRender, setIsInitialRender] = useState(true);
  const [Val, setVal] = useState('');

  // const ip = useRef('')   // можно поменять
  const snils = useRef('')

  // начальное состояние чата
  const messages = useRef([]);

  const [me, setMe] = useState({
    username: 'Вы',
    color: randomColor(),
  });

  const [maiaOutput, setMaiaOutput] = useState({
    username: 'MAIA',
    color: randomColor(),
  });

  // const IDfromURL = useRef(''); //  ?????
  const options = useRef([]); // Плучаем от Степы

  const router = useRouter();

  const changeSnils = (value) => {  // для обмена между компонентами
    snils.current = value;
  }

  useEffect(() => {
      dispatch(fetchIP());
  }, []);

  useEffect(() => {
    console.log("ЮЮЮ !!! (isInitialRender= ", isInitialRender);
    if (isInitialRender) {
      setIsInitialRender(false);
      return;
    }
    console.log("ipAddress4= ", var_ipAddress);

    const url = new URL(window.location.href);
    const IDfromURL = url.search.substring(12);
    console.log("URL.href = ", url.href);
    console.log("IDfromURL = ", IDfromURL);

    console.log("SSSSS localStorage User_Id = ",  localStorage.getItem('User_Id'));

    if (IDfromURL == "" || localStorage.getItem('ipAddress') != var_ipAddress) {
      dispatch(fetchForUserId(var_ipAddress));
      console.log("var_userId5 = ", var_userId)
      console.log("var_sessionId5= ", var_sessionId)
    }
    else {
      console.log("1111111111111111");
      console.log(localStorage.getItem('User_Id'))
      fetch(localStorage.getItem('URL_BACK')+'/session/get', { // Корректируем в соответствии с бэком
        method: 'POST',
        body: JSON.stringify({id: IDfromURL,
                              user_id: localStorage.getItem('User_Id')}) // Отправляем ID пользователя
      })
      .then(response => response.json())
      .then(data => {
        const history = JSON.parse(JSON.stringify(data))
        console.log(history)

        history.forEach((mes) => {
          const ClientMessage = {
            data: mes.request,
            member: me
          }

          setVal({});
          messages.current = [...messages.current, ClientMessage]

          const MAIAMessage = { // Получаем сообщение от GPT
            data: mes.response,
            member: maiaOutput
          }
          console.log(mes.response)
          setVal({});
          messages.current = [...messages.current, MAIAMessage]
        })
      })
      .catch(error => console.log(error))
  }

}, [var_ipAddress]);

useEffect(() => {
  console.log("DDDDD !!! (isInitialRender= ", isInitialRender);

  if (isInitialRender) {
    setIsInitialRender(false);
    return;
  }

  console.log("var_userId6 = ", var_userId)
  localStorage.setItem('ipAddress', var_ipAddress);
  localStorage.setItem('User_Id', var_userId);
  console.log("22 localStorage User_Id = ", localStorage.getItem('User_Id'));

  console.log("var_sessionId6= ", var_sessionId)
  router.push('?session_id='+ var_sessionId)

}, [var_userId, var_sessionId]);


  function onSendMessage(message) {
    const newMessage = {
      data: message,
      member: me
    }
    console.log("MeMeMe: ", messages);
    setVal({});
    messages.current = [...messages.current, newMessage]
  }

  function onSendMessageMaia(message) {
    const maiaMessage = {
      data: message,
      member: maiaOutput
    }
    console.log("MaiaMaia: ");
    setVal({});
    messages.current = [...messages.current, maiaMessage]
  }

  return(
    <div className={styles.all}>
      <div className={styles.header}>
        <Header />
      </div>
      <div className={styles.components}>
        <div className={styles.left_side}>
          <Parameters_user onSendMessage={onSendMessage} onSendMessageMaia={onSendMessageMaia} options={options.current} onChange={changeSnils}/>
          {/* <Parameters userID={UserID.current}/> */}
        </div>
        <div className={styles.right_side}>
          <div className={styles.top}>
            <Messages messages={messages.current} me={me}/>
          </div>
          <div className={styles.bottom}>
            <Input onSendMessage={onSendMessage} onSendMessageMaia={onSendMessageMaia} snils={snils}/>
          </div>
        </div>
      </div>
    </div>
  )
}
