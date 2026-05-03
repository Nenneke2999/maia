import '@/styles/globals.css'
import { Provider } from 'react-redux'
import { store } from '@/store/store'
import { useEffect } from 'react';

export default function App({ Component, pageProps }) {

  useEffect(() => {
    localStorage.setItem('URL_BACK', "http://51.250.108.150:4000");
    // localStorage.setItem('URL_BACK', "http://localhost:4000");

    // Получение значения из localStorage

  if (!localStorage.getItem('ipAddress')) {
      localStorage.setItem('ipAddress', 'default');
    }
  else
    console.log("START ipAddress = ", localStorage.getItem('ipAddress'));

  if (!localStorage.getItem('User_Id')) {
    localStorage.setItem('User_Id', 'default');
  }
  else
    console.log("START User_Id= ", localStorage.getItem('User_Id'));


  }, []);

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}