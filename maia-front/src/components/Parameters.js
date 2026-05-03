import { useState, useRef } from 'react';
import { render } from 'react-dom';
import styles from '@/styles/Parameters.module.css'
import Modal from './Modal';

export default function Parameters({userID, options}) {

    const [nameLang, setNameLang] = useState("ru");
    const [val, setVal] = useState("");
    const [val1, setVal1] = useState("");
    const [val2, setVal2] = useState("");
    const [val3, setVal3] = useState("");
    const [val4, setVal4] = useState("");
    const [val5, setVal5] = useState("");
    const [val6, setVal6] = useState("");
    const [valText, setValText] = useState("");
    const [summary, setSummary] = useState("");
    const [sep, setSep] = useState("; ");
    const [instr_pattern, setInstrPattern] = useState("");
    const snils = useRef('');
    const client_info = useRef('cfkvmdklvnnkl');
    const IDfromURL = useRef(''); // session_id из ссылки

    // const [selectedValue, setSelectedValue] = useState('');
    const SelectedValue = useRef('')

    const [isOpen, setIsOpen] = useState(false); // Модальное окно

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    // Нажимаем Submit и отправлем запрос
    function handleClick() {

        if (nameLang === 'ru') {
            setInstrPattern(' Сгенерируй 5 промптов для языковой модели, чтобы подобрать персональное бансковское предложение для клиента с такими параметрами:.')
        }
        else{
            setInstrPattern(' Generate 5 prompts.')
        }

        const url = new URL(window.location.href)
        IDfromURL.current = url.href.slice(34) // Берем session_id из ссылки и передаем в запрос
        const response = fetch('http://localhost:4000/chat/'+IDfromURL.current, { // Корректируем в соответствии с бэком
                method: 'POST',
                body: JSON.stringify({user_id: userID,
                                    instruction: valText+instr_pattern,
                                    text: summary, // Сделать общий запрос со всеми параметрами
                                    lang: nameLang})
            })
            .then(response => response.json())
            .then(data => {
                const newMessageResponse = { // Получаем сообщение от GPT
                    data: message,
                    member: 'MAIA'
                }

                setMessages([...messages, newMessageResponse])
            })
            .catch(error => console.log(error))
    }

    function handleClick2() {
        const url = new URL(window.location.href)
        IDfromURL.current = url.href.slice(34) // Берем session_id из ссылки и передаем в запрос

        console.log(snils.current.value)
        fetch('http://localhost:4000/user/get'+IDfromURL.current, { // Корректируем в соответствии с бэком
            method: 'GET',
            body: JSON.stringify({
                user_id: userID,
                snils: snils.current.value
            })
        })
        .then(response => response.json())
        .then(data => {
            client_info.current = JSON.parse(data);
        })
        .catch(error => console.log(error))

        client_info.current = 'Hello!'
        setVal({});
    }

    function handleClick3() {
        openModal()
    }

    const handleChange0 = (event) => {
        setNameLang(event.target.value);
    }

    const handleChange1 = (event) => {
        setVal({});
        SelectedValue.current = event.target.value;
    }

    const handleChange2 = (event) => {
        setVal2(event.target.value + sep);
    }

    const handleChange3 = (event) => {
        setVal3(event.target.value + sep);
    }

    const handleChange4 = (event) => {
        setVal4(event.target.value + sep);
    }

    const handleChange5 = (event) => {
        setVal5("возраст: " + event.target.value + sep);
    }

    const handleChange6 = (event) => {
        setVal6("доходы: " + event.target.value + '000' + sep);
    }

    const handleChangeText = (event) => {
        setValText(event.target.value);
    }

    return (
        <div className={styles.split_left} >

        <div className={styles.left_header}>
            <h3>Данные для обучения</h3>
        </div>
        <form className={styles.form21} id="root">
            <p>База данных
                <select className={styles.select21} onChange={handleChange1} value={SelectedValue.current}>
                {Array.from(options).map(option =>
                        <option value={option}>{option}</option>
                )}
                </select>
            </p>
        </form>

        <div className={styles.prompt_button2}>
            <button className={styles.image_button2} type="button" onClick={handleClick3}>Загрузить файл</button>
        </div>

        <div>
            <Modal isOpen={isOpen} onClose={closeModal}/>
        </div>

        {/* <form className={styles.form21}>
            <p>Образование:
                <select className={styles.select21} onChange={handleChange2}>
                    <option value=""></option>
                    <option value="образование: среднее">Среднее</option>
                    <option value="образование: среднее специальное">Среднее специальное</option>
                    <option value="образование: высшее">Высшее</option>
                    <option value="образование: ученая степень">Ученая степень</option>
                </select>
            </p>
        </form>


        <form className={styles.form21}>
            <p>Семья:
                <select className={styles.select21} onChange={handleChange3}>
                    <option value=""></option>
                    <option value="семья: женат">Женат</option>
                    <option value="семья: холост">Холост</option>
                    <option value="семья: разведен">Разведен</option>
                    <option value="семья: вдовец вдова">Вдовец/вдова</option>
                </select>
            </p>
        </form>

        <form className={styles.form21}>
            <p>Иждивенцы:
                <select className={styles.select21} onChange={handleChange4}>
                    <option value=""></option>
                    <option value="иждивенцы: 0">0</option>
                    <option value="иждивенцы: 1">1</option>
                    <option value="иждивенцы: 2">2</option>
                    <option value="иждивенцы: 3">3</option>
                    <option value="иждивенцы: 4">4</option>
                    <option value="иждивенцы: 5">5</option>
                    <option value="иждивенцы: 6">6</option>
                    <option value="иждивенцы: 7">7</option>
                    <option value="иждивенцы: 8">8</option>
                    <option value="иждивенцы: 9">9</option>
                    <option value="иждивенцы: 10">10</option>
                </select>
            </p>
        </form> */}

        <form className={styles.form22}>
            <p>СНИЛС
                <input type="text" className={styles.text22} onChange={handleChange5} ref={snils}/>
            </p>
        </form>

        <div className={styles.prompt_button2}>
            <button className={styles.image_button2} type="button" onClick={handleClick2}>Найти клиента</button>
        </div>

        {/* <form className={styles.form22}>
            <p>Месячный доход (тыс. руб.):
                <input type="text" className={styles.text22} onChange={handleChange6} />
            </p>
        </form> */}

        <form className={styles.form22}>
            <p>Данные клиента
                <textarea className={styles.input_text} value={client_info.current} readOnly/>
            </p>
        </form>

        <div className={styles.prompt_button}>
            <button className={styles.image_button} type="button" onClick={handleClick2}>Обучить модель</button>
        </div>

        <div className={styles.prompt_button2}>
            <button className={styles.image_button2} type="button" onClick={handleClick}>Уточнить запрос</button>
        </div>

    </div>
    );
}