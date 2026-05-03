import { useState, useEffect, useRef } from 'react';
import Modal from './Modal';
import styles from '@/styles/Parameters.module.css'

export default function Parameters({userID}) {

    const IDfromURL = useRef(''); // session_id из ссылки
    const Answer = useRef('Ответ модели'); //Ответ модели

    const name = useRef("");
    const age = useRef("");
    const family = useRef("");
    const education = useRef("");
    const cash = useRef("");
    const summary = useRef("");

    const [isOpen, setIsOpen] = useState(false); // Модальное окно

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    // Показываем значение range
    useEffect(() => {
        var rangeSlider = document.getElementById("range-age");
        var rangeBullet = document.getElementById("rs-bullet");

        rangeSlider.addEventListener("input", showSliderValue, false);

        rangeSlider.value = 0;
        rangeSlider.style.left = (0) + "px";

        function showSliderValue() {
        rangeBullet.innerHTML = rangeSlider.value;
        var bulletPosition = (rangeSlider.value /rangeSlider.max);
        rangeBullet.style.left = (bulletPosition * 21) + "vw";
        rangeBullet.style.left = (bulletPosition * 21) + "vw";
        }

        var rangeSlider_cash = document.getElementById("range-cash");
        var rangeBullet_cash = document.getElementById("cash-bullet");

        rangeSlider_cash.addEventListener("input", showSliderValue_cash, false);

        rangeSlider_cash.value = 0;
        rangeSlider_cash.style.left = (0) + "px";

        function showSliderValue_cash() {
        rangeBullet_cash.innerHTML = rangeSlider_cash.value;
        var bulletPosition_cash = (rangeSlider_cash.value /rangeSlider_cash.max);
        rangeBullet_cash.style.left = (bulletPosition_cash * 21) + "vw";
        rangeBullet_cash.style.left = (bulletPosition_cash * 21) + "vw";
        }
    }, []);

    // Нажимаем Submit и отправлем запрос
    function handleClick() {

        summary.current = age.current.value + "; " + family.current.value + "; " + education.current.value + "; " + cash.current.value;

        const instr_pattern = 'Составь лучшее банковское предложение для клиента с такими парамерами: '

        const url = new URL(window.location.href)
        IDfromURL.current = url.href.slice(34) // Берем session_id из ссылки и передаем в запрос

        fetch('http://localhost:4000/chat/'+IDfromURL.current, { // Корректируем в соответствии с бэком
            method: 'POST',
            body: JSON.stringify({
                user_id: userID,
                instruction: instr_pattern,
                text: summary.current, // Сделать общий запрос со всеми параметрами
                lang: 'ru'
            })
        })
        .then(response => response.json())
        .then(data => {
            Answer.current = JSON.parse(data);
            openModal()
        })
        .catch(error => console.log(error))
        // openModal()
    }

    return (
        <div className={styles.split_left}>

            <form>
                <input type="text" className={styles.name} ref={name} placeholder="Name" id='name'/>
                <label for="name" className={styles.form__label}>Ваше имя</label>
            </form>

            <form className={styles.age}>
                <p className={styles.age_title}>Возраст:</p>

                <span id="rs-bullet" className={styles.age_label}>0</span>
                <input type="range" className={styles.range} ref={age} min="0" max="80" step="1" id="range-age">
                </input>
                <div className={styles.box_minmax}>
                    <span>0</span><span>200</span>
                </div>
            </form>

            <form className={styles.titles}>
                <p className={styles.little_title}>Семейное положение:</p>

                    <input id="radio-1" type="radio" className={styles.radiobutton} ref={family} name="radio" value="Холост/Не замужем"/>
                    <label for="radio-1" className={styles.radiobutton_label}>Холост/Не замужем</label>

                    <input id="radio-2" type="radio" className={styles.radiobutton} ref={family} name="radio" value="Женат/Замужем"/>
                    <label for="radio-2" className={styles.radiobutton_label}>Женат/Замужем</label>
            </form>

            <form className={styles.titles}>
                <p className={styles.little_title}>Уровень образования:</p>

                <input id="radio-3" type="radio" className={styles.radiobutton} ref={education} name="radio" value="Основное общее (неполное среднее)"/>
                <label for="radio-3" className={styles.radiobutton_label}>Основное общее (неполное среднее)</label>

                <input id="radio-4" type="radio" className={styles.radiobutton} ref={education} name="radio" value="Среднее (полное) общее"/>
                <label for="radio-4" className={styles.radiobutton_label}>Среднее (полное) общее</label>

                <input id="radio-5" type="radio" className={styles.radiobutton} ref={education} name="radio" value="Среднее профессиональное"/>
                <label for="radio-5" className={styles.radiobutton_label}>Среднее профессиональное</label>

                <input id="radio-6" type="radio" className={styles.radiobutton} ref={education} name="radio" value="Неполное высшее профессиональное"/>
                <label for="radio-6" className={styles.radiobutton_label}>Неполное высшее профессиональное</label>

                <input id="radio-7" type="radio" className={styles.radiobutton} ref={education} name="radio" value="Высшее (высшее профессиональное)"/>
                <label for="radio-7" className={styles.radiobutton_label}>Высшее (высшее профессиональное)</label>
            </form>

            <form className={styles.age}>
                <p className={styles.age_title}>Месячный доход:</p>

                <span id="cash-bullet" className={styles.age_label}>0</span>
                <input type="range" className={styles.range} ref={cash} min="0" max="500000" step="10000" id="range-cash">
                </input>
                <div className={styles.box_minmax}>
                    <span>0</span><span>500 000</span>
                </div>
            </form>

            <div className={styles.prompt_button}>
                <button className={styles.image_button} type="button" onClick={handleClick}>Отправить</button>
            </div>

            <div>
                <Modal isOpen={isOpen} onClose={closeModal} name={name.current.value} text={Answer.current}/>
            </div>

        </div>
    );
  }
