import { useState, useRef } from 'react'
import { nanoid } from 'nanoid'
import ListeItem from './components/listeItem'

function App() {
  const [list, setList] = useState([
    // { id: nanoid(4), content: "item 1" },
    // { id: nanoid(4), content: "item 2" },
    // { id: nanoid(4), content: "item 3" },
  ])

  const [todo, setTodo] = useState("")
  const [validation, setValidation] = useState(false)



  console.log(list);

  const inputRef = useRef(null)

  const handleSubmit = (event) => {
    event.preventDefault()

    if(todo === "") {
      setValidation(true)
      return
    }
    setList([...list, { id: nanoid(), content: todo }])
    setTodo("")
  }

  function deleteItem(id){
    setList(list.filter(item => item.id !== id))
  }


  return (
    <div className="h-screen ">
      <div className="max-w-4xl mx-auto pt-20 px-6">
        <h1 className="text-3xl text-slate-100 mb-4">La To-do liste</h1>
        <form onSubmit={handleSubmit} className="mb-10">
          <label htmlFor="todo-item" className="text-slate-50">
            Ajouter une chose à faire
          </label>
          <input type="text" className="mt-1 block w-full rounded" value={todo} onChange={(event) => setTodo(event.target.value)} ref={inputRef}/>

          {validation && <p className="text-red-500">Veuillez ajouter une chose à faire</p>}
          <button className="mt-4 py-2 px-2 bg-slate-50 rounded min-w-[115px]" onClick={handleSubmit}>Ajouter</button>
        </form>
        <ul>
          {list.length === 0 && (
            <li className="text-slate-50">Aucune chose à faire</li>
          )}
          {list.length > 0 && list.map((item) => (
            <ListeItem key={item.id} itemData={item} deleteItem={deleteItem}/>
          ))}
        </ul>
      </div>

    </div>
  )
}

export default App
