import React, { useEffect, useState } from "react";
import supabase from "../config/supabaseClient";
import TodoCard from "../components/TodoCard";

const Home = () => {
  const [todos, setTodos] = useState(null);
  const [fetchError, setFetchError] = useState(null); // Add fetchError state

  useEffect(() => {
    const fetchTodos = async () => {
      
        const { data, error } = await supabase.from("todos").select();
        if (error) {
          setFetchError("Error fetching Todos");
          setTodos(null);
        }
      if (data) {
        setTodos(data);
        setFetchError(null);
      }
    };

    fetchTodos();
  }, []);

  return (
    <div className="page home">
      {fetchError && <p>{fetchError}</p>}
      {todos && (
        <div className="smoothie-grid">
          {todos.map((todo) => (
            <TodoCard key={todo.id} todo={todo} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
