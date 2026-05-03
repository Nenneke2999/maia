import { useEffect } from 'react';
import styles from '@/styles/Modal.module.css'

function Modal({ isOpen, onClose, name, text }) {

  if (!isOpen) {
    return null;
  }

  useEffect(() => {
    var string = "Уважаемый(-ая) " + name + ", мы можем Вам предложить:";
    var str = string.split("");
    var answer = text.split("");
    var el = document.getElementById('str');
    var el_ans = document.getElementById('ans');
    (function animate() {
      str.length > 0 ? el.innerHTML += str.shift(): clearTimeout(running);
      var running = setTimeout(animate, 90);
    })();
    setTimeout((function animate_ans() {
      answer.length > 0 ? el_ans.innerHTML += answer.shift(): clearTimeout(running);
      var running = setTimeout(animate_ans, 90);
    }), 4500);
  }, [])

  return (
    <div className={styles.modal} onClick={onClose}>
      <div className={styles.modal_content} onClick={(e) => e.stopPropagation()}>
        <img src="CoolMAIA.svg" className={styles.image}/>
        <div className={styles.close_button} onClick={onClose}></div>
        <div id='str' className={styles.text}></div>
        <p id='ans' className={styles.text_ans}></p>
      </div>
    </div>
  );
}

export default Modal;