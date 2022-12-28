import logo from './logo.svg';
import './App.css';
import {useState} from 'react'

const KanbanCard = ({title, status}) => {
  return (
    <li className="kanban-card">
      <div className="card-title">{title}</div>
      <div className="card-status">{status}</div>
    </li>
  )
}

const KanbanNewCard = ({onSubmit}) => {
  const [title, setTitle] = useState('');
  const handleChange = (event) => {
    setTitle(event.target.value);
  }
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      onSubmit(title)
    }
  }
  return (
    <li className="kanban-card">
      <h3>添加新卡片</h3>
      <div className="card-title">
        <input type="text" value={title} onChange={handleChange} onKeyDown={handleKeyDown}/>
      </div>
    </li>
  )
}

function KanbanBoard() {
  const [showAdd, setShowAdd] = useState(false);
  const [todoList, setTodoList] = useState([
    {title: '开发任务-1', status: '22-05-22 18:15'},
    {title: '开发任务-3', status: '22-05-22 18:15'},
    {title: '开发任务-5', status: '22-05-22 18:15'},
    {title: '测试任务-3', status: '22-05-22 18:15'}]);
  const [ongoingList, setOngoingList] = useState([
    {title: '开发任务-4', status: '22-05-22 18:15'},
    {title: '开发任务-6', status: '22-05-22 18:15'},
    {title: '测试任务-2', status: '22-05-22 18:15'}]);
  const [doneList, setDoneList] = useState([
    {title: '开发任务-2', status: '22-05-22 18:15'},
    {title: '测试任务-1', status: '22-05-22 18:15'}]);

  const handleAdd = () => {
    setShowAdd(true)
  }

  const handleSubmit = (title) => {
    setTodoList(currentList => {
      return [
        {title, status: new Date().toDateString()},
        ...currentList
      ]
    })
  }
  return (
    <main className="kanban-board">
      <KanbanColumn className="column-todo" title={(<>待处理<button onClick={handleAdd} disabled={showAdd}>⊕ 添加新卡片</button></>)}>
        {showAdd && <KanbanNewCard onSubmit={handleSubmit}/>}
        {todoList.map(item => <KanbanCard key={item.title} {...item} />)}
      </KanbanColumn>
      <KanbanColumn className="column-ongoing" title="进行中">
        {ongoingList.map(item => <KanbanCard key={item.title} {...item} />)}
      </KanbanColumn>
      <KanbanColumn className="column-done" title="已完成">
        {doneList.map(item => <KanbanCard key={item.title} {...item} />)}
      </KanbanColumn>
    </main>
  )
}

function KanbanColumn({children, className, title}) {
  return (
    <section className={`kanban-column ${className}`}>
      <h2>{title}</h2>
      <ul>
      {children}
      </ul>
    </section>
  )
}

function App() {
  return (
    <div className="App">
    <header className="App-header">
      <h1>我的看板</h1>
      <img src={logo} className="App-logo" alt="logo"/>
    </header>
    <KanbanBoard/>
  </div>
  );
}

export default App;
