import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import { v4 as uuidv4 } from "uuid";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function App() {
  const [todo, setTodo] = useState("");
  const [priority, setPriority] = useState("medium");
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [editingId, setEditingId] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [filterPriority, setFilterPriority] = useState("all");
  const [todoToDelete, setTodoToDelete] = useState(null);

  useEffect(() => {
    if (todos?.length >= 0) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos]);

  const handleAdd = () => {
    if (todo.trim() === "") return;

    if (editingId) {
      const updatedTodos = todos.map((item) =>
        item.id === editingId ? { ...item, todo: todo, priority } : item
      );
      setTodos(updatedTodos);
      setEditingId(null);
    } else {
      const newTodo = {
        id: uuidv4(),
        todo,
        isCompleted: false,
        priority,
        createdAt: new Date().toISOString(),
      };
      setTodos((prevTodos) => [...prevTodos, newTodo]);
    }
    setTodo("");
    setPriority("medium");
  };

  const handleEdit = (id) => {
    const todoToEdit = todos.find((item) => item.id === id);
    if (todoToEdit) {
      setTodo(todoToEdit.todo);
      setPriority(todoToEdit.priority);
      setEditingId(id);
    }
  };

  const handleDelete = (id) => {
    setTodos((prevTodos) => prevTodos.filter((item) => item.id !== id));
    setTodoToDelete(null);
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(todos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setTodos(items);
  };

  const handleCheckbox = (e) => {
    const { name, checked } = e.target;
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === name ? { ...todo, isCompleted: checked } : todo
      )
    );
  };

  const filteredTodos = todos
    .filter((todo) =>
      todo.todo.toLowerCase().includes(searchText.toLowerCase())
    )
    .filter((todo) =>
      filterPriority === "all" ? true : todo.priority === filterPriority
    );

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 border-red-300";
      case "medium":
        return "bg-yellow-100 border-yellow-300";
      case "low":
        return "bg-green-100 border-green-300";
      default:
        return "bg-purple-100 border-purple-300";
    }
  };

  return (
    <div className="min-h-screen bg-purple-100">
      <Navbar
        searchText={searchText}
        setSearchText={setSearchText}
        filterPriority={filterPriority}
        setFilterPriority={setFilterPriority}
      />
      <div className="container mx-auto my-5 rounded-xl p-8 bg-purple-300 min-h-[80vh] shadow-xl">
        <div className="addTodo space-y-4">
          <h2 className="text-2xl font-bold text-purple-900 mb-6">
            Add a Todo ✨
          </h2>
          <div className="flex gap-4 flex-col sm:flex-row">
            <input
              type="text"
              onChange={(e) => setTodo(e.target.value)}
              value={todo}
              className="w-full px-4 py-2 rounded-xl bg-white border border-purple-400 text-purple-900 placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
              placeholder="What's on your mind today?"
            />
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="sm:w-40 px-4 py-2 rounded-xl bg-white border border-purple-400 text-purple-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
            <button
              onClick={handleAdd}
              className="px-6 py-2 rounded-xl bg-purple-600 text-white font-semibold hover:bg-purple-700 transform hover:scale-105 transition-all duration-300 shadow-md"
            >
              {editingId ? "Update" : "Add Task"}
            </button>
          </div>
        </div>

        <div className="todos mt-8 space-y-4">
          <h2 className="text-xl font-bold text-purple-900">Your Todos</h2>

          {filteredTodos.length === 0 && (
            <div className="text-lg text-purple-900 text-center py-8 bg-purple-200 rounded-xl mt-4">
              Your task list is empty. Time to add some goals! 🎯
            </div>
          )}

          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="todos">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {filteredTodos.map((item, index) => (
                    <Draggable key={item.id} draggableId={item.id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`group todo relative ${getPriorityColor(
                            item.priority
                          )} rounded-xl p-4 transform hover:-translate-y-1 hover:shadow-lg transition-all duration-300 border mt-4`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <input
                                onChange={(e) => handleCheckbox(e)}
                                type="checkbox"
                                checked={item.isCompleted}
                                name={item.id}
                                className="w-5 h-5 rounded-md border-2 border-purple-400 checked:bg-purple-600 transition-all duration-300"
                              />
                              <div className="flex flex-col">
                                <span
                                  className={`text-lg text-purple-900 ${
                                    item.isCompleted
                                      ? "line-through text-gray-400"
                                      : ""
                                  }`}
                                >
                                  {item.todo}
                                </span>
                                <span className="text-sm text-purple-600">
                                  Priority: {item.priority}
                                </span>
                              </div>
                            </div>

                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <button
                                onClick={() => handleEdit(item.id)}
                                className="px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-all duration-300"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => setTodoToDelete(item)}
                                className="px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-all duration-300"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>

      {/* Confirmation Modal */}
      {todoToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg space-y-4">
            <h2 className="text-lg font-bold text-gray-800">
              Are you sure you want to delete this todo?
            </h2>
            <p className="text-gray-600">
              "{todoToDelete.todo}" will be permanently deleted.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setTodoToDelete(null)}
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(todoToDelete.id)}
                className="px-4 py-2 rounded bg-red-500 hover:bg-red-600 text-white"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
