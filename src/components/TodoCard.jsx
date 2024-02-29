
export default function TodoCard({ todo}) {
  return (
    <>
        <div className="smoothie-card">
            <h2>{todo.title}</h2>
            <p>{todo.description}</p>
            <div className="rating">
                {todo.date }
            </div>

        </div>
    </>
  )
}
