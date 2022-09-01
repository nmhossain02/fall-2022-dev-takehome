/**
 * Thank you for applying to Bits of Good. You are free to add/delete/modify any 
 * parts of this project. That includes changing the types.ts, creating css files, 
 * modifying import statements, using contexts, etc. We do recommend to keep it simple. 
 * You will not be judged based on complexity. We also recommend using 
 * multiple components instead of coding everything on this file :)
 * 
 * Have fun! Please reach out to hello@bitsofgood.org or amz@gatech.edu if you
 * have any questions!
 * 
 * Bits of Good Engineering Team
 * 
 */
// TODO: Start coding from here

import { useState } from "react"
import TodoAdder from "./TodoAdder"
import { TagType } from "./Tag"
import TodoItem from "./TodoItem"
import SortingOptions, { SortingOptionsType } from "./SortingOptions"
import "./TodoList.css"

// Here's a baseline todo item type. 
// Feel free to extend or create your own interface!
export type TodoType = {
  title: string,
  dueDate?: Date,
  tagList: TagType[],
  completed: boolean,
}

export default function TodoList() {
  const [todos, setTodos] = useState<TodoType[]>([])

  const SetTodoMaker = (index: number) => (newTodo: TodoType) => {
      let newArray = [...todos]
      newArray[index] = newTodo
      setTodos(newArray)
  }
  const DeleteTodoMaker = (index: number) => () => {
    let newArray = [...todos]
    newArray.splice(index, 1)
    setTodos(newArray)
  }
  const AddTodo = (newTodo: TodoType) => setTodos([...todos, newTodo])

  const defaultOptions: SortingOptionsType = {
    sortAscending: false,
    sortCompletion: false,
    tagFilters: new Set<string>(),
    colorFilters: new Set<string>()
  }
  const [options, setOptions] = useState<SortingOptionsType>(defaultOptions)
  const DateComparator = (a: TodoType, b: TodoType) => {
    if (!a.dueDate) {
      return 1
    }
    if (!b.dueDate) {
      return -1
    }
    return a.dueDate?.valueOf() - b.dueDate?.valueOf()
  }
  const OrderTodos = () => {
    let reordered: TodoType[] =[...todos]
    if (options.sortAscending) {
      reordered = reordered.sort(DateComparator)
    }
    if (options.colorFilters.size > 0) {
      reordered = reordered.filter(todo => options.colorFilters.size <= todo.tagList.reduce((a, b) => a + (options.colorFilters.has(b.color ?? "NO COLOR") ? 1 : 0), 0)) // AND filter
      // reordered = reordered.filter(todo => todo.tagList.some(tag => options.colorFilters.has(tag.color ?? "NO COLOR"))) // OR filter
    }
    console.log(options.tagFilters)
    if (options.tagFilters.size > 0) {
      reordered = reordered.filter(todo => options.tagFilters.size <= todo.tagList.reduce((a, b) => a + (options.tagFilters.has(b.title) ? 1 : 0), 0)) // AND filter
      // reordered = reordered.filter(todo => todo.tagList.some(tag => options.tagFilters.has(tag.title))) // OR filter
    }
    if (options.sortCompletion) {
      let incomplete: TodoType[] = [], completed: TodoType[] = []
      reordered.forEach(todo => {
        todo.completed ? completed.push(todo) : incomplete.push(todo)
      })
      reordered = incomplete.concat(completed)
    }
    return reordered
  }
  return <>
    <h1>Todo List Maker</h1>
    <TodoAdder addTodo={AddTodo}/>
    <div className="options-label">Sort and filter:</div>
    <SortingOptions useOptions={() => [options, setOptions] } />
    {OrderTodos().map((todo, index) => <TodoItem useTodo={ () => [todo, SetTodoMaker(index), DeleteTodoMaker(index)] } />)}
  </>
}
