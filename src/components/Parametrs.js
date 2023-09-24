import { useState } from 'react';
import styles from '@/styles/Parametrs.module.css'

export default function Parametrs(UserID) {

    const [nameLang, setNameLang] = useState("ru");
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

    // Нажимаем Submit и отправлем запрос
    function handleClick() {

        if (nameLang === 'ru') {
            setInstrPattern(' Сгенерируй 5 промптов для языковой модели, чтобы подобрать персональное бансковское предложение для клиента с такими параметрами:.')
        }
        else{
            setInstrPattern(' Generate 5 prompts.')
        }

        const url = new URL(window.location.href)
        IDfromURL.current = url.href.slice(33) // Берем session_id из ссылки и передаем в запрос
        const response = fetch('http://localhost:4000/chat/'+IDfromURL.current, { // Корректируем в соответствии с бэком
                method: 'POST',
                body: JSON.stringify({user_id: UserID,
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
        setSummary(val1 +  val2 +  val3 +  val4 +  val5 +  val6);
    }

    const handleChange0 = (event) => {
        setNameLang(event.target.value);
    }

    const handleChange1 = (event) => {
        setVal1(event.target.value + sep);
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
        <div className={styles.split_left}>

        <div className={styles.left_header}>
            <h3>Параметры: </h3>
        </div>

        <form className={styles.form21}>
            <p>Языковая модель:
            <br/>
                <select className={styles.select21} onChange={handleChange0}>
                    <option selected value="ru">Русский</option>
                    <option value="en">Английский</option>
                </select>
            </p>
        </form>

        <form className={styles.form21}>
            <p>Пол клиента:
            <br/>
                <select className={styles.select21} onChange={handleChange1}>
                    <option value=""></option>
                    <option value="пол: мужской">Мужской</option>
                    <option value="пол: женский">Женский</option>
                </select>
            </p>
        </form>


        <form className={styles.form21}>
            <p>Образование:
            <br/>
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
            <br/>
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
            <br/>
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
        </form>

        <form className={styles.form22}>
            <p>Возраст (лет):
            <br/>
                <input type="text" className={styles.text22} onChange={handleChange5} />
            </p>
        </form>

        <form className={styles.form22}>
            <p>Доходы в мес. (тыс. руб.):
            <br/>
                <input type="text" className={styles.text22} onChange={handleChange6} />
            </p>
        </form>


        <div className={styles.left_header2}>
           <p>Инструкция:</p>
        </div>

        <textarea type={styles.text} className={styles.input_text} placeholder="Инструкция" onChange={handleChangeText}></textarea>

            <div className={styles.around_button}>
                <button className={styles.collect_button} type="button" onClick={handleClick2}>Собрать набор</button>
            </div>

        <textarea className={styles.summary_text} value = {summary} placeholder="Для просмотра нажмите [Собрать набор]"></textarea>

        <div className={styles.prompt_button}>
            <button className={styles.image_button} type="button" onClick={handleClick}>Prompt It</button>
        </div>


    </div>
    );
  }