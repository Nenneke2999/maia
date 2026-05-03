// import { setIPAddress } from '../actions.js';
// import { useRouter } from 'next/navigation';

// export const URL_BACK = 'http://51.250.108.150:4000';


export function fetchIP(){
    return function(dispatch){
        console.log("Fetch start")
        fetch('https://api.ipify.org?format=json') // В любом случае достаем IP пользователя
            .then(response => response.json())
            .then(data => {
                console.log("Response In Fetch IP Address0: ", data.ip); // Вывод IP-адреса в консоль
                dispatch({type: 'SET_IP_ADDRESS', payload: data.ip}); 
            })
            .catch(error => console.log(error));
    }
}


// export function fetchIP() {
//     return async function(dispatch) {
//       try {
//         console.log("Fetch start");
//         const response = await fetch('https://api.ipify.org?format=json');
//         const data = await response.json();
//         console.log("Response In Fetch IP Address0: ", data.ip);
//         dispatch({ type: 'SET_IP_ADDRESS', payload: data.ip });
//       } catch (error) {
//         console.log(error);
//       }
//     };
//   }

export function fetchForUserId(ipAddress) {
    return function(dispatch) {
      fetch(localStorage.getItem('URL_BACK')+'/session/create', {  // Корректируем в соответствии с бэком
        method: 'POST',
        body: JSON.stringify({ ip: ipAddress })  // Отправляем IP пользователя
      })
        .then(response => response.json())
        .then(data => {
          const userId = data.user_id;
          const sessionId = data.session_id;
          console.log("Response In Fetch User_id = ", userId);
          console.log("Response In Fetch sessionId = ",  sessionId);
          dispatch({type: 'SET_USER_ID', payload: userId}); 
          dispatch({type: 'SET_SESSION_ID', payload: sessionId}); 
        });
    };
  }



//   export function fetchForUserId(ipAddress) {
//     return async function(dispatch) {
//       try {
//         const response = await fetch('http://localhost:4000/session/create', {
//           method: 'POST',
//           body: JSON.stringify({ ip: ipAddress })
//         });
  
//         if (!response.ok) {
//           throw new Error('Error');
//         }
  
//         const data = await response.json();
//         const userId = data.user_id;
//         const sessionId = data.session_id;

//         console.log("Response In Fetch User_id = ", userId);
//         console.log("Response In Fetch sessionId = ",  sessionId);
  
//         dispatch({type: 'SET_USER_ID', payload: userId });
//         dispatch({type: 'SET_SESSION_ID', payload: sessionId}); 

//       // return sessionId; // Возвращение sessionId из action-функции в качестве результата


//       } 
//       catch (error) {
//         console.log(error);
//         throw error;
//       }
//     };
//   }



// export function fetchForMaiaResponse(url, UserID, snils, text) {
//   return function(dispatch) {
//     fetch(url, {
//     method: 'POST',
//     body: JSON.stringify({
//       user_id: UserID,
//       client_snils: parseInt(snils), // Текст, вводимый из чата
//       text: text,
//       is_internal: true
//     })
//     })
//     .then(response => response.json())
//     .then(data => {
//       console.log("========>  ", data);
//       console.log("22 ========>  ", text);

//     // onSendMessageMaia(data.result);
//     })
//     .catch(error => console.log(error))

//   };
// }