import React from 'react';
import { useState, useRef } from 'react';
import styles from '@/styles/input.module.css'

export default function Input({onSendMessage, onSendMessageMaia, snils}) {
  console.log("--------  Input  --------------");

  const [text, setText] = useState('');
  const IDfromURL = useRef(''); // session_id из ссылки

  // Рендеринг при изменении текстового поля
  function onChange(e) {
    const text = e.target.value;
    setText(text);
  }

  // Отправка сообщения
  function onSubmit(e) {
    e.preventDefault(); // Запрещаем обновление страницы после отправки сообщения
    setText('');
    onSendMessage(text);

    // Продолжение диалога с моделью в чате
    const url = new URL(window.location.href)
    console.log("=====> URL === ", url);
    IDfromURL.current = url.search.substring(12); // Берем session_id из ссылки и передаем в запрос
    console.log("=====> URL.search === ", IDfromURL.current);
    console.log("IN INPUT  ==> localStorage User_Id = ", localStorage.getItem('User_Id'));

    fetch(localStorage.getItem('URL_BACK')+'/chat/'+IDfromURL.current, { // Корректируем в соответствии с бэком
      method: 'POST',
      body: JSON.stringify({
        user_id: localStorage.getItem('User_Id'),
        client_snils: parseInt(snils.current),
        text: text,
        is_internal: true
      })
    })
    .then(response => response.json())
    .then(data => {
      onSendMessageMaia(data.result);
    })
    .catch(error => console.log(error))
  }

  return (
    <div className={styles.input_mes}>
      <form onSubmit={e => onSubmit(e)}>
        <input
          onChange={e => onChange(e)}
          value={text}
          type='text'
          placeholder='Введите сообщение'
          autoFocus
          className={styles.text}
        />

        <button type="submit" style={{display: 'none'}} id="send-button">
          Send
        </button>
        <label htmlFor="send-button">
          <img src="button_v.svg" alt="button_v" width={45} height={45} className={styles.svg_button} />
        </label>

      </form>
    </div>
  );
}