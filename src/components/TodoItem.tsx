import Checkbox from "./Checkbox"
import Tag, { TagType } from "./Tag"
import { TodoType } from "./TodoList"

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
    return <div onClick={clickHandler}>
        <Checkbox checked={todoItem.completed}/>
        <h3>{todoItem.title}</h3>
        <p>{todoItem.dueDate?.toLocaleDateString()}</p>
        {todoItem.tagList.map((tag: TagType) => <Tag useTag={() => [tag]} />)}
    </div>
}