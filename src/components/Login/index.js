import { Component } from 'react'
import Cookies from 'js-cookie'
import { Navigate } from 'react-router-dom'

import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    errorMsg: '',
    showErrorMsg: false,
    showPassword: false,
    shouldRedirect: false, // Added for navigation
  }

  togglePasswordVisibility = () => {
    this.setState(prevState => ({ showPassword: !prevState.showPassword }))
  }

  onSuccessLogin = jwtToken => {
    Cookies.set('jwt_token', jwtToken, { expires: 30 })
    this.setState({ shouldRedirect: true }) // Trigger navigation
  }

  onFailureLogin = errorMsg => {
    this.setState({ errorMsg, showErrorMsg: true })
  }

  onSubmitForm = async event => {
    event.preventDefault()
    let { username, password } = this.state

    if (username.toLowerCase().trim() === 'tarun') username = 'rahul'
    if (password === 'tarun@9849') password = 'rahul@2021'

    const userDetails = { username, password }
    const LoginApiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(LoginApiUrl, options)
    const data = await response.json()

    if (response.ok) {
      this.onSuccessLogin(data.jwt_token)
    } else {
      this.onFailureLogin(data.error_msg)
    }
  }

  updateUsername = event => this.setState({ username: event.target.value })

  updatePassword = event => this.setState({ password: event.target.value })

  renderUsernameField = () => {
    const { username } = this.state
    return (
      <div className="input-field-container">
        <label htmlFor="username" className="login-input-label">
          USERNAME
        </label>
        <input
          type="text"
          value={username}
          className="login-input-field"
          placeholder="tarun"
          id="username"
          onChange={this.updateUsername}
        />
      </div>
    )
  }

  renderPasswordField = () => {
    const { password, showPassword } = this.state
    return (
      <div className="input-field-container">
        <label htmlFor="password" className="login-input-label">
          PASSWORD
        </label>
        <div className="password-field-container">
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            className="login-input-field"
            placeholder="tarun@9849"
            id="password"
            onChange={this.updatePassword}
          />
          <button
            type="button"
            data-testid="show-password"
            className="eye-button"
            onClick={this.togglePasswordVisibility}
          >
            <img
              src={
                showPassword
                  ? 'https://ik.imagekit.io/6nnzgbkjv4/eye-slash.png?updatedAt=1731650295141'
                  : 'https://ik.imagekit.io/6nnzgbkjv4/eye.png?updatedAt=1731650152246'
              }
              alt="toggle visibility"
              className="password-toggle-icon"
            />
          </button>
        </div>
      </div>
    )
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    const { errorMsg, showErrorMsg, shouldRedirect } = this.state

    if (jwtToken !== undefined || shouldRedirect) {
      return <Navigate to="/" />
    }

    return (
      <div className="login-container">
        <form className="login-form" onSubmit={this.onSubmitForm}>
          <h1 className="logo">Travel Trip</h1>
          {this.renderUsernameField()}
          {this.renderPasswordField()}
          <div>
            <button type="submit" className="login-button">
              Login
            </button>
            {showErrorMsg && <p className="error-msg">*{errorMsg}</p>}
          </div>
        </form>
      </div>
    )
  }
}

export default Login
