import styles from '@/styles/Modal.module.css'
import { DropzoneComponent } from "./DropContex";

function Modal({ isOpen, onClose }) {

    if (!isOpen) {
        return null;
    }

    return (
        <div className={styles.modal} onClick={onClose}>
        <div className={styles.modal_content} onClick={(e) => e.stopPropagation()}>
            <p className={styles.text}>Загрузка файла</p>
            <DropzoneComponent onChange={onClose}/>
            <div className={styles.close_button} onClick={onClose}></div>
        </div>
        </div>
    );
}

export default Modal;