import React, { useState } from 'react'
import axios from 'axios'

export default function Login({ history }) {

  const [formData, updateFormData] = useState({
    email: '',
    password: ''
  })

  function handleChange(event) {
    const { name, value } = event.target
    updateFormData({ ...formData, [name]: value })
  }

  async function handleSubmit(event) {
    event.preventDefault()
    try {
      const { data } = await axios.post('/api/login', formData)
      if (localStorage) {
        localStorage.setItem('token', data.token)
      }
      history.push('/')
    } catch (err) {
      console.log(err.response.data)
    }
  }

  return <div className='container px-6 pt-6 pb-6'>

<h5 className='title brandfont has-text-info is-size-3 mb-1 mt-4'>Log in</h5>

    <form onSubmit={handleSubmit}>
      <div className="field">
        <label className="label">Email</label>
        <div className="control">
          <input
            className="input"
            type="text"
            value={formData.email}
            onChange={handleChange}
            name={'email'}
          />
        </div>
      </div>
      <div className="field">
        <label className="label">Password</label>
        <div className="control">
          <input
            className="input"
            type="password"
            value={formData.password}
            onChange={handleChange}
            name={'password'}
          />
        </div>
      </div>
      <button className="button is-primary">Submit</button>
    </form>
  </div>
}