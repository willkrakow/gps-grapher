import React, { useState } from 'react'

export default function TestUpload() {
    const [ data, setData ] = useState(null);
    const [ title, setTitle ] = useState('');
    const [ parsed, setParsed ] = useState([]);

    function handleTitleChange(e) {
        setTitle(e.target.value)
    }

    function handleFileChange(e) {
        setData(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        let temp = data;
        setParsed(temp)
        console.log(data, title)
    }



    if (!parsed) {
        return (
            <div>
                <form onSubmit={handleSubmit}>
                    <input name="data" type="file" onChange={handleFileChange} />
                    <input name="title" type="text" onChange={handleTitleChange} />
                    <button type="Submit">Submit</button>
                </form>
            </div>
        )
    }
    return (
      <div>
          <h1>There is a file</h1>
        <form onSubmit={handleSubmit}>
          <input name="data" type="file" onChange={handleFileChange} />
          <input name="title" type="text" onChange={handleTitleChange} />
        </form>
      </div>
    );


}