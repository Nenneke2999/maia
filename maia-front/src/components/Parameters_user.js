import { useState, useRef } from 'react';
import styles from '@/styles/Parameters.module.css'
import Modal from './Modal';

export default function Parameters({onSendMessage, onSendMessageMaia, options, onChange}) {

    console.log("--------  Parameters  --------------");

    const client_info = useRef('');
    const info_for_prompt = useRef('');
    const IDfromURL = useRef(''); // session_id из ссылки
    const [Val, setVal] = useState('');
    const database = useRef('');
    const snils = useRef('');
    const answer = useRef('')

    const [isOpen, setIsOpen] = useState(false); // Модальное окно

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    // Нажимаем Submit и отправлем запрос
    function handleClick() {

        const InstrPattern = ' Сгенерируй 5 промптов для языковой модели, чтобы подобрать персональное банковское предложение для клиента с такими параметрами: '
        const url = new URL(window.location.href)
        IDfromURL.current = url.search.substring(12);
        onSendMessage(InstrPattern + "\n" + info_for_prompt.current);

        fetch(localStorage.getItem('URL_BACK')+'/chat/'+IDfromURL.current, { // Корректируем в соответствии с бэком
            method: 'POST',
            body: JSON.stringify({
                user_id: localStorage.getItem('User_Id'),
                client_snils: parseInt(snils.current),
                text: InstrPattern + info_for_prompt.current, // Сделать общий запрос со всеми параметрами
                is_internal: false
            })
        })
        .then(response => response.json())
        .then(data => {
            onSendMessageMaia(data.result);
            answer.current = data.result;
        })
        .catch(error => console.log(error))
    }

    function handleClick2() {

        const url = new URL(window.location.href)
        IDfromURL.current = url.search.substring(12);
        onSendMessage('Уточнить запрос');

        fetch(localStorage.getItem('URL_BACK')+'/chat/'+IDfromURL.current, { // Корректируем в соответствии с бэком
            method: 'POST',
            body: JSON.stringify({
                user_id: localStorage.getItem('User_Id'),
                client_snils: parseInt(snils.current),
                text: answer.current, // Сделать общий запрос со всеми параметрами
                is_internal: true
            })
        })
        .then(response => response.json())
        .then(data => {
            onSendMessageMaia(data.result);
        })
        .catch(error => console.log(error))
    }

    function foundUser() {
        const url = new URL(window.location.href)
        IDfromURL.current = url.search.substring(12);

        console.log(snils.current)
        fetch(localStorage.getItem('URL_BACK')+'/user/get/'+IDfromURL.current, { // Корректируем в соответствии с бэком
            method: 'POST',
            body: JSON.stringify({
                user_id: localStorage.getItem('User_Id'),
                client_snils: parseInt(snils.current)
            })
        })
        .then(response => response.json())
        .then(data => {
            client_info.current = 'ФИО: ' + data.full_name + '\n'
                                + 'Пол: ' + data.sex + '\n'
                                + 'Дата рождения: ' + data.birth + '\n'
                                + 'Профессия: ' + data.profession + '\n'
                                + 'Зарплата: ' + data.salary.toString() + '\n'
                                + 'Кол-во детей: ' + data.kids.toString();
            setVal({});
            info_for_prompt.current = 'пол: ' + data.sex + ', '
                                    + 'дата рождения: ' + data.birth + ', '
                                    + 'профессия: ' + data.profession + ', '
                                    + 'зарплата: ' + data.salary.toString() + ', '
                                    + 'количество детей: ' + data.kids.toString()
        })
        .catch(error => {
            console.log(error)
            client_info.current = 'Клиент не найден'
            setVal({});
        })
    }

    function loadFile() {
        openModal()
    }

    const selectDB = (event) => {
        setVal({});
        database.current = event.target.value;
    }

    const changeSnils = (event) => {
        snils.current = event.target.value;
        onChange(event.target.value);
    }

    return (

        <div className={styles.split_left} >

        <div className={styles.left_header}>
            <h3>Данные для обучения</h3>
        </div>
        <form className={styles.form21} id="root">
            <p className={styles.p}>База данных</p>
                <select className={styles.select21} onChange={selectDB} value={database.current}>
                {Array.from(options).map(option =>
                        <option value={option}>{option}</option>
                )}
                </select>
        </form>

        <div className={styles.prompt_button2}>
            <button className={styles.image_button1} type="button" onClick={loadFile}>Загрузить файл</button>
        </div>

        <div>
            <Modal isOpen={isOpen} onClose={closeModal}/>
        </div>

        <form className={styles.form22}>
                <input type="text" className={styles.text22} onChange={changeSnils} id="snils" placeholder='СНИЛС'/>
                <label htmlFor="snils" className={styles.form__label}>СНИЛС</label>
        </form>

        <div className={styles.prompt_button2}>
            <button className={styles.image_button2} type="button" onClick={foundUser}>Найти клиента</button>
        </div>

        <form className={styles.form23}>
            <p className={styles.p2}>Данные клиента</p>
                <textarea className={styles.input_text} value={client_info.current} readOnly/>
        </form>

        <div className={styles.prompt_button}>
            <button className={styles.image_button} type="button" onClick={handleClick}>Отправить запрос</button>
        </div>

        <div className={styles.prompt_button2}>
            <button className={styles.image_button2} type="button" onClick={handleClick2}>Уточнить запрос</button>
        </div>

    </div>
    );
}