import Checkbox from "./Checkbox"
import Tag, { TagType } from "./Tag"
import { TodoType } from "./TodoList"
import "./TodoItem.css"

type props = {
    useTodo: any
}

export default function TodoItem({ useTodo }: { useTodo: any }) {
    const [todoItem, setTodo, deleteTodo] = useTodo()
    const clickHandler = () => {
        const newTodo: TodoType = {...todoItem}
        newTodo.completed = !newTodo.completed
        setTodo(newTodo)
    }
    return <div className="TodoItem" onClick={clickHandler}>
        <div className="top-row">
            <Checkbox checked={todoItem.completed}/>
            <h3 style={{textDecoration: todoItem.completed ? "line-through" : "none"}}>{todoItem.title}</h3>
            <p>{todoItem.dueDate?.toLocaleDateString()}</p>
        </div>
        <div className="tag-wrapper">
            {todoItem.tagList.map((tag: TagType) => <Tag useTag={() => [tag]} />)}
        </div>
    </div>
}