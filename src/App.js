import './App.css';
import { Route, Routes } from 'react-router-dom';
import Contacts from './components/Contacts';
import ContactsEdit from './components/ContactsEdit';
import { toast } from "react-toastify";
import axios from "axios";
import { useEffect, useState } from 'react';

export const URL = "https://shop-datas.onrender.com"

function App() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    getContacts();
  }, [])

  const getContacts = async () => {
    try {
      const res = await axios.get(`${URL}/list`);
      setContacts(res.data.contacts);
    } catch (error) {
      toast.error(error.res.data.message);
    }
  };

  return (
    <Routes>
      <Route exact path='/' element={<Contacts contacts={contacts} setContacts={setContacts} />}/>
      <Route path='/:id' element={<ContactsEdit  contacts={contacts} setContacts={setContacts} />}/>
    </Routes>
  );
}

export default App;
