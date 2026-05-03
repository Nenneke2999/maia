import React from 'react';
import { useEffect, useState } from 'react';
import styles from '@/styles/Home.module.css'

export default function Input({onSendMessage}) {
  const [text, setText] = useState('');

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
  }

  return (
    <div className={styles.input}>
      <form onSubmit={e => onSubmit(e)}>
        <input
          onChange={e => onChange(e)}
          value={text}
          type='text'
          placeholder='Enter your message and press ENTER'
          autoFocus
        />
        <button>Send</button>
      </form>
    </div>
  );
}