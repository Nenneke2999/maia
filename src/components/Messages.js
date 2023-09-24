import {useEffect, useRef} from 'react';
import React from 'react';
import styles from '@/styles/Home.module.css'

// Автоматически переносимся к последнему сообщению
export default function Messages({messages, me}) {
  const bottomRef = useRef(null);
  useEffect(() => {
    if (bottomRef && bottomRef.current) {
      bottomRef.current.scrollIntoView({behavior: 'smooth'});
    }
  });
  return (
    <ul className={styles.messagesList}>
      {messages.map(m => Message(m, me))}
      <div ref={bottomRef}></div>
    </ul>
  );
}

// Отображение сообщений
function Message({member, data}, me) {
    // 1 Определяем, кто отправил сообщение
    const {username, color} = member;
    // 2 Проверяем, от нас ли пришло сообщение (для отображения справа или слева)
    const messageFromMe = member.username === 'Вы';
    const className = messageFromMe ?
      `${styles.messagesMessage} ${styles.currentMember}` : styles.messagesMessage;
    // 3 Показываем сообщение и аватар
    return (
      <li className={className}>
        <span
          className={styles.avatar}
          style={{backgroundColor: color}}
        />
        <div className={styles.messageContent}>
          <div className={styles.username}>
            {username}
          </div>
          <div className={styles.text}>{data}</div>
        </div>
      </li>
    );
  }