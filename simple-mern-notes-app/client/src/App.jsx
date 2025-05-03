import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [notes, setNotes] = useState([]);


  const handleSubmit = async (e) => {
      e.preventDefault();
      try{
        setTitle('');
        setContent('');
        setNotes([...notes,{title, content}]);
        const res = await axios.post ('http://localhost:5000/api/notes', { title, content });
        console.log(res.data);
      }
      catch(err){
        console.log(err);
      }
  }


  useEffect(()=>{
    axios.get('http://localhost:5000/api/notes').then((res)=>{
      setNotes(res.data);
    }
    ).catch((err)=>{
      console.log(err);
    });
  },[]);

  return(
<>
<h1 className="text-center">Welcome to the Note Taking App</h1>
{/* Note Form */}
<div>
  <form onSubmit={handleSubmit}>
    <div className="mb-3 d-flex flex-column">
    <label htmlFor="title" className="form-label">Title</label>
      <input id='title' value={title} className='form-control' required type="text" placeholder='Title'onChange={(e)=>{setTitle(e.target.value)}}/>
    </div>
    <div className="mb-3 d-flex flex-column">
       <label htmlFor="content" className="form-label">Content</label>
      <textarea id='content' value={content} className='form-control' required type="text" placeholder='Content' onChange={(e)=>{setContent(e.target.value)}}/>
    </div>

    <button type="submit" className="btn btn-primary">Submit</button>
  </form>
</div>


{/* All Notes */}

<h3 className='mt-4'>All Notes</h3>
<ul className="list-group mt-3" >
    {notes.map(e=>(
  <li key={e._id} className="list-group-item">
      <h5>{e.title}</h5>
    <p>{e.content}</p>
  </li>
    ))}
</ul>
</>
  );
}

export default App;
