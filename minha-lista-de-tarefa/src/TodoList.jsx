import "./TodoList.css";
import { useState , useEffect} from "react";
import ImgTask from './assets/icon.webp'
const TodoList = () => {

  const listaStorage = localStorage.getItem('Lista');

  const [lista , setLista] = useState(listaStorage ? JSON.parse(listaStorage) : [])
  const [novoItem, setNovoItem] = useState('')

  useEffect(() =>{
        localStorage.setItem('Lista' , JSON.stringify(lista))
  }, [lista])


  function adicionarItem(form){
     form.preventDefault()
     if(!novoItem){
       return;
     }
     setLista([...lista, {text: novoItem, isCompleted:false}])
     setNovoItem("")
     document.getElementById('input-entrada').focus();
  }

  function validarCompleto (index){
     const listaAux = [...lista];
     listaAux[index].isCompleted = !listaAux[index].isCompleted;
     setLista(listaAux)
  }

  function deletarTask(index){
     const listaAux = [...lista]
     listaAux.splice(index , 1)
     setLista(listaAux)
  }

  function deletarAll(){
         setLista([])
  }
  return (
    <div>
      <h1 className="titulo">Lista de Tarefas</h1>

      <form onSubmit={adicionarItem}>
        <input
         id="input-entrada"
         type="text"
         placeholder="Adicione uma Tarefa"
         value={novoItem}
         onChange={(e) =>{setNovoItem(e.target.value)}}
         
         />
        <button className="add">Add</button>
      </form>



      <div className="listaTarefa">
        <div style={{textAlign:'center'}}>
           

      {
        lista < 1 ? <img src={ImgTask}  className="imgCentral" /> :
        lista.map((item, index) =>(
          
          <div className={item.isCompleted ? 'Item completo' : 'item'  }key={index}  >
          <span onClick={() => {validarCompleto(index)}}>{item.text}</span>
          <button className="delete" onClick={() => {deletarTask(index)}}>Deletar</button>
        </div>
           
          ))
          
        }
        </div>
          
      {
      lista.length > 0 &&
          <button className="deleteAll" onClick={() => {deletarAll()}}>Deletar Todas</button>
      }
        </div>


    </div>
  );
};
export default TodoList;
