import './App.css';
import { useEffect, useState } from 'react';
import Header from './components/Header'
function App() {
  const [data, setData] = useState({});
  const [currentPage, setCurrentPage] = useState(0);

  const getAllContacts = async (page = 0, size = 10) => {
    try{
      setCurrentPage(page);
      const {data} = await getAllContacts(page, size);
      setData(data);
      console.log(data);
    } catch(error){
      console.log("Oops!")
    }
  }

  useEffect(() => {
    getAllContacts();
  })

  return (
    <div>
      {/* <Header></Header> */}
    </div>
  );
}

export default App;
