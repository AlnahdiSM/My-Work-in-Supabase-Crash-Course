import { useState } from "react"
import { useNavigate } from "react-router-dom"
import supabase from "../config/supabaseClient"

const Create = () => {
  const navigate = useNavigate()
  const [messages, setMessages] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('')
  const [formError, setFormError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!title || !description || !date) {
      setFormError('من فضل إملء جميع الحقول .')
      return
    }

    try {
      const { data, error } = await supabase
        .from('todos')
        .insert([{ title, description, date }])

      if (error) {
        setFormError('حصل خطأ أثناء إضافة المهمة .')
      } else {
        setMessages('تم إضاف المهمة بنجاح .')
        setFormError(null)
        navigate('/')
      }
    } catch (error) {
      console.log(error)
      setFormError('An error occurred while adding the smoothie.')
    }
  }

  return (
    <div className="page create">
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">المهمة</label>
        <input 
          type="text" 
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="description">وصف المهمة</label>
        <textarea 
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label htmlFor="date">تاريخ المهمة</label>
        <input 
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <button>أضف</button>

        {formError && <p className="error">{formError}</p>}
        {messages && <p className="success">{messages}</p>}
      </form>
    </div>
  )
}

export default Create