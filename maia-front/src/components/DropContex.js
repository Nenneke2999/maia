import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { Img_cloud } from "./img";
import styles from "@/styles/drop.module.css"

export function DropzoneComponent({ onChange }){

    var userID;

    const onDrop = useCallback(acceptedFiles => {
    console.log(acceptedFiles);
    if (acceptedFiles.length) {
      handleFiles(acceptedFiles);
    }
  }, []);

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [validFiles, setValidFiles] = useState([]);
  const [unsupportedFiles, setUnsupportedFiles] = useState([]);

  const validateFile = (file) => {
    const validTypes = ["text/csv"];
    if (validTypes.indexOf(file.type) === -1) {
        return false;
    }
    return true;
  }

  const handleFiles = (files) => {
    for(let i = 0; i < files.length; i++) {
      if (validateFile(files[i])) {
          // add to an array so we can display the name of file
          setSelectedFiles(prevArray => [...prevArray, files[i]]);
      } else {
          // add a new property called invalid
          files[i]['invalid'] = true;
          // add to the same array so we can display the name of the file
          setSelectedFiles(prevArray => [...prevArray, files[i]]);
          // set error message
          setErrorMessage('Unsupported type');
          setUnsupportedFiles(prevArray => [...prevArray, files[i]]);
      }
  }
  }

  const fileSize = (size) => {
    if (size === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(size) / Math.log(k));
    return parseFloat((size / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  const fileType = (fileName) => {
  return fileName.substring(fileName.lastIndexOf('.') + 1, fileName.length) || fileName;
  }

  const removeFile = (name) => {
    // find the index of the item
    // remove the item from array

    const validFileIndex = validFiles.findIndex(e => e.name === name);
    validFiles.splice(validFileIndex, 1);
    // update validFiles array
    setValidFiles([...validFiles]);
    const selectedFileIndex = selectedFiles.findIndex(e => e.name === name);
    selectedFiles.splice(selectedFileIndex, 1);
    // update selectedFiles array
    setSelectedFiles([...selectedFiles]);
    const unsupportedFileIndex = unsupportedFiles.findIndex(e => e.name === name);
    if (unsupportedFileIndex !== -1) {
        unsupportedFiles.splice(unsupportedFileIndex, 1);
        // update unsupportedFiles array
        setUnsupportedFiles([...unsupportedFiles]);
    }
  }

  const uploadFiles = () => {
    console.log('sending')
    console.log(selectedFiles)
    for (let i = 0; i < selectedFiles.length; i++) {
      const formData = new FormData();
        console.log(selectedFiles[i])
        formData.append('content', selectedFiles[i]);
        axios.post('http://85.192.34.185/api/v1/datasets/upload/', formData)
        .then(response => {
          console.log(response.data);
          userID = response.data.id;
        })
        .catch(error => {
          console.log(error);
        })
    }
  }

  const {
    getRootProps,
    getInputProps,
  } = useDropzone({
    onDrop
  });

  return (
    <div>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <div className={styles.Drop_mes}>
            <Img_cloud/>
        </div>
            <p className={styles.text}><span className={styles.browse}> Выберите файл </span> или перетащите файл сюда&nbsp; </p>
      </div>
        <div className={styles.file_display_container}>
        {
          selectedFiles.map((data, i) =>
            <ul className={styles.file_list}>
            <li>
            <div className={styles.file_status_bar} key={i}>
              <div>
                <div className={styles.file_type}>{fileType(data.name)}</div>
                <span className={`${styles.file_name} ${data.invalid ? styles.file_error : ''}`}>{data.name.substring(0,30)}...</span>
                <span className={styles.file_size}>({fileSize(data.size)})</span> {data.invalid && <span className={styles.file_error_message}>({errorMessage})</span>}
              </div>
            <div className={styles.file_remove} onClick={() => removeFile(data.name)}>X</div>
            </div>
            </li>
            </ul>
          )
        }
        </div>
        {unsupportedFiles.length === 0 && selectedFiles.length ?
          <button className={styles.file_upload_btn} onClick={() => {uploadFiles(); onChange()}}>Загрузить</button>: ''
        }
        {unsupportedFiles.length ? <p className={styles.please_remove}>Please remove all unsupported files</p> : ''}
    </div>
  );
}