import React from 'react'
import ReactDOM from 'react-dom'
import logo from './logo.svg'
import './App.css'
import projects_json from './json/projects.json'

class App extends React.Component {
  render () {
    return (
      <div>
        <Home />
        <Team />
        <Projects />
        <Contact />
      </div>
    )
  }
}

// nav items
const items = [{
  id: 0,
  itemName: 'Home',
  className: 'item'
}, {
  id: 1,
  itemName: 'Team',
  className: 'item'
}, {
  id: 2,
  itemName: 'Work',
  className: 'item'
}, {
  id: 3,
  itemName: 'Contact',
  className: 'item'
}]

// nav
class Nav extends React.Component {
  constructor () {
    super()
    this.state = {
      open: false
    }
  }
  navToggle () {
    this.setState({
      open: !this.state.open
    })
  }
  render () {
    return (
      <div>
        <button className={this.state.open ? 'open nav-icon' : 'nav-icon'}
        onClick={this.navToggle.bind(this)}>
          <span />
          <span />
          <span />
        </button>
        <NavList propClass={this.state.open ? 'shown' : 'hidden'}
        items={items} />
      </div>
    )
  }
}
window.Nav = Nav

// ul
class NavList extends React.Component {
  render () {
    const {
      items,
      propClass
    } = this.props
    const itemsElements = items.map((items) => (
      <li id={items.id} key={items.id} className="nav-li">
          <NavItem
              itemName = { items.itemName }
              className = { items.className }
              href = { items.href }
              propClass = { propClass }
          />
      </li>
    ))
    return (
      <ul className={'nav-items ' + this.props.propClass}>{itemsElements}</ul>
    )
  }
}
window.Nav.NavList = NavList

// li
class NavItem extends React.Component {
  handleClick () {
    console.log(this.props.itemName)
  }
  render () {
    const {
      itemName,
      className
    } = this.props
    return (
        <a className={className} onClick={this.handleClick.bind(this)}
        href={'#' + (this.props.itemName).toLowerCase()}>
          {itemName}
        </a>
    )
  }
}
window.Nav.NavItem = NavItem

ReactDOM.render(
  <Nav />, document.getElementById('Nav')
)

class Home extends React.Component {
  render () {
    return (
      <div id="home">
        <div className="header">
          <h1 className="title">ALMAMUT</h1>
          <img src={logo} className="header-logo" alt="logo" />
        </div>
        <div className="polygon"></div>
      </div>
    )
  }
}

class Team extends React.Component {
  render () {
    return (
      <div id="team">
      </div>
    )
  }
}

class Projects extends React.Component {
  constructor () {
    super()
    this.state = {items: []}
  }
  componentWillMount () {
    this.setState({items: projects_json.items})
  }
  render () {
    let items = this.state.items
    return (
      <div className="Projects">
        <h2 className="our_projects">Our Projects.</h2>
        {items.map(item =>
          <ProjectItem key={item.id} proj={item}/>)}
      </div>
    )
  }
}

class ProjectItem extends React.Component {
  render () {
    let imgURL = this.props.proj.image

    return (
      <div className="p_item">
        <div className="p_img_container">
          <img className="p_img" src={imgURL} alt={'logo - ' + this.props.proj.name} />
        </div>
        <h4 className="p_title">{this.props.proj.name}</h4>
        <hr />
        <p className="p_summary">{this.props.proj.summary}</p>
      </div>
    )
  }
}

class Contact extends React.Component {
  constructor () {
    super()
    this.state = {
      submitted: null
    }
  }

  render () {
    let submitted
    if (this.state.submitted !== null) {
      submitted = <div className="alert alert-success">
        <p>ContactForm data:</p>
        <pre><code>{JSON.stringify(this.state.submitted, null, '  ')}</code></pre>
      </div>
    }

    return (
    <div>
      <div className="panel panel-default">
        <div className="panel-body">
          <ContactForm ref="contactForm" />
        </div>
        <div className="panel-footer">
          <button type="button" className="btn btn-primary btn-block" onClick={this.handleSubmit.bind(this)}>Submit</button>
        </div>
      </div>
      {submitted}
    </div>
    )
  }
  handleChange (field, e) {
    var nextState = {}
    nextState[field] = e.target.checked
    this.setState(nextState)
  }

  handleSubmit () {
    if (this.refs.contactForm.isValid()) {
      this.setState({submitted: this.refs.contactForm.getFormData()})
      let query = this.refs.contactForm.getFormData()
      console.log(query)
      fetch(`contact?name=${query.name}&mail=${query.email}&body=${query.message}`)
      .then((response) => console.log( response.json()))    
    } else {
      console.log(this.refs.contactForm.state.errors)
    }
  }
}

/**
 * The contact form
 */
class ContactForm extends React.Component {
  constructor () {
    super()
    this.state = {
      errors: {}
    }
  }
  isValid () {
    let fields = ['name', 'email', 'message']

    let errors = {}

    fields.forEach(function (field) {
      let value = document.getElementById(field).value
      if (value === '' || value === null) {
        errors[field] = 'This field is required'
      }
    })

    // Direct mutation of state ONLY used because asynchronous nature of setState
    // doesn't allow to call to the new state immediately as need it.
    this.state.errors = errors

    let isValid = true
    for (let error in errors) {
      isValid = false
      break
    }
    return isValid
  }

  getFormData () {
    var data = {
      name: this.refs.name.value,
      email: this.refs.email.value,
      message: this.refs.message.value
    }
    return data
  }

  render () {
    return (
    <div className="form-horizontal">
      {this.renderTextInput('name', 'Name')}
      {this.renderTextInput('email', 'Email')}
      {this.renderTextarea('message', 'Message')}
    </div>
    )
  }

  renderTextInput (id, label) {
    return this.renderField(id, label,
      <input type="text" placeholder={label} className="form-control" id={id} ref={id}/>
    )
  }

  renderTextarea (id, label) {
    return this.renderField(id, label,
      <textarea className="form-control" placeholder={label} id={id} ref={id}/>
    )
  }

  renderField (id, label, field) {
    return (
    <div className={$c('form-group', {'has-error': id in this.state.errors})}>
        {field}
    </div>
    )
  }
}

// Utils
function $c (staticClassName, conditionalClassNames) {
  let classNames = []
  if (typeof conditionalClassNames === 'undefined') {
    conditionalClassNames = staticClassName
  } else {
    classNames.push(staticClassName)
  }
  for (let className in conditionalClassNames) {
    if (conditionalClassNames[className]) {
      classNames.push(className)
    }
  }
  return classNames.join(' ')
}

export default App