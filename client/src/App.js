import React from 'react'
import ReactDOM from 'react-dom'
import logo from './logo.svg'
import './App.css'
import projects_json from './json/projects.json'

class App extends React.Component {
  render () {
    return (
      <div id="o-wrapper" className="o-wrapper">
        <Home />
        <Team />
        <Projects />
        <Contact />
      </div>
    )
  }
}

class SocialMedia extends React.Component {
  render () {
    return (
      <ul className="socialBtns list-inline">
        <li><a href="http://fb.me/almamutcom" target="_blank" className="socialmedia btn facebook"/></li>
        <li><a href="https://twitter.com/almamutcom" target="_blank" className="socialmedia btn twitter"/></li>
        <li><a href="http://www.linkedin.com/company-beta/18210603/" target="_blank" className="socialmedia btn linkedin"/></li>
        <li><a href="https://github.com/almamutcom" target="_blank" className="socialmedia btn github"/></li>
      </ul>
    )
  }
}

// nav items
const items = [{
  id: 0,
  itemName: 'Home',
  className: 'item c-menu__link',
  rel: 'relativeanchor'
}, {
  id: 1,
  itemName: 'Team',
  className: 'item c-menu__link',
  rel: 'relativeanchor'
}, {
  id: 2,
  itemName: 'Work',
  className: 'item c-menu__link',
  rel: 'relativeanchor'
}, {
  id: 3,
  itemName: 'Contact',
  className: 'item c-menu__link',
  rel: 'relativeanchor'
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
    this.state.open = !this.state.open

    if (this.state.open) {
      document.body.classList.add('has-active-menu')
      document.getElementById('o-wrapper').classList.add('has-push-right')
      document.getElementById('navRight').classList.add('is-active')
      document.getElementById('c-mask').classList.add('is-active')
      document.getElementById('c-button--push-right').classList.add('open')
    } else {
      document.body.classList.remove('has-active-menu')
      document.getElementById('o-wrapper').classList.remove('has-push-right')
      document.getElementById('navRight').classList.remove('is-active')
      document.getElementById('c-mask').classList.remove('is-active')
      document.getElementById('c-button--push-right').classList.remove('open')
    }
  }

    // this.addEventListener('mouseleave', function (e) {
    //   e.preventDefault()
    //   this.close()
    // }.bind(this))
  render () {
    return (
      <div>
        <button id="c-button--push-right" type="button" aria-label="Push Right" className="nav-icon btn btn-default c-button"
        onClick={this.navToggle.bind(this)}>
          <span />
          <span />
          <span />
        </button>
        <NavList items={items} clicked={this.navToggle.bind(this)}/>
      </div>
    )
  }
}
window.Nav = Nav

// ul
class NavList extends React.Component {
  render () {
    const {
      items
    } = this.props
    const itemsElements = items.map((items) => (
      <li id={items.id} key={items.id} className="nav-li c-menu__item">
          <a className={items.className} onClick={this.props.clicked}
          href={'#' + (items.itemName).toLowerCase()}>
            {items.itemName}
          </a>
      </li>
    ))
    return (
      <div>
        <ul id="navRight" className="c-menu__items c-menu c-menu--push-right"> {itemsElements} 
        <SocialMedia />
        </ul>
      </div>
    )
  }
}
window.Nav.NavList = NavList

// li
class NavItem extends React.Component {
  // handleClick() {
  //   console.log('wabadaba')
  // }
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
          <h2>Let's walk</h2>
          <img src={logo} className="header-logo" alt="logo" /> <br/>
          <img src="img/almamut17word2.svg" className="logo-word" alt="logo" />
              <div className="polygon bottom"></div>
        </div>
      </div>
    )
  }
}

class Team extends React.Component {
  render () {
    return (
      <div id="team">
        <div className="about-us">
          <h3>A small team<br/>with big ideas.</h3>
          <div className="teamMember">
            <div className="polygon topMembers"></div>
            <img src="img/portraitB.jpg" className="imgMembers" />
            <img src="img/portraitS.jpg" className="imgMembers" />
            <div className="polygon bottomMembers"></div>
          </div>
        </div>
        <div className="small-team">
          <p className="us text-center">
            Since 2015 we design and develop responsive web apps focused in user experience and interface,
            collaborating to achieve quality and stand up.
          </p>
        </div>
        <Services/>
        <div className="polygon bottomTeam"></div>
      </div>
    )
  }
}

class Services extends React.Component {
  constructor () {
    super()
    this.state = {
      items: [
        { id: 1,
          line1: 'Responsive',
          line2: 'Design',
          image: 'img/responsive.svg'
        },
        { id: 2,
          line1: 'UX & UI',
          line2: 'Design',
          image: 'img/uiux.svg'
        },
        { id: 3,
          line1: 'Web',
          line2: 'Development',
          image: 'img/web.svg'
        },
        { id: 4,
          line1: 'Mobile',
          line2: 'First',
          image: 'img/mobile.svg'
        }
      ]
    }
  }

  render () {
    let items = this.state.items
    return (
      <div id="services">
        <ul className="list-inline services">
          { items.map(item => <li key={item.id}><ServiceItem serv={item}/></li>)}
        </ul>
      </div>
    )
  }
}

class ServiceItem extends React.Component {
  render () {
    let imgURL = this.props.serv.image

    return (
      <div className="s-item">
        <div className="s-img-container">
          <img className="s-img" src={imgURL} alt={'logo - ' + this.props.serv.line1} />
        </div> <br/>
        <p className="s-title">{this.props.serv.line1}</p>
        <p className="s-title">{this.props.serv.line2}</p>
      </div>
    )
  }
}

class Projects extends React.Component {
  constructor () {
    super()
    this.state = {
      items: [],
      errorSent: false
    }
  }
  componentWillMount () {
    this.setState({items: projects_json.items})
  }
  render () {
    let items = this.state.items
    return (
      <section id="work">
        <div className="work">
          <h2 className="our-projects">WORK</h2>
          {items.map(item =>
            <ProjectItem key={item.id} proj={item}/>)}
        </div>
      </section>
    )
  }
}

class ProjectItem extends React.Component {
  render () {
    let imgURL = this.props.proj.image

    return (
      <div className="p-item">
        <div className="p-img-container">
          <img className="p-img" src={imgURL} alt={'logo - ' + this.props.proj.name} />
        </div>
        <h4 className="p-title">{this.props.proj.name}</h4>
        <hr />
        <p className="p-summary">{this.props.proj.summary}</p>
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
        <p>{this.state.submitted}</p>
      </div>
    }

    return (
    <div id="contact">
      <div className="polygon topContact"></div>
      <h2>Let's talk</h2>
      <div className="panel panel-default">
        <div className="panel-body">
          <ContactForm ref="contactForm" />
        </div>
        <div className="panel-footer">
          <button type="button" className="send btn btn-primary btn-block" onClick={this.handleSubmit.bind(this)}>Send</button>
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
      let query = this.refs.contactForm.getFormData()
      fetch(`contact?name=${query.name}&mail=${query.email}&body=${query.message}`)
      .then((response) => {
        if (response.ok) {
          this.setState({submitted: 'Thank you! Your message has been sent. We will get in touch as soon as possible'})
        } else {
          this.setState({submitted: 'Sorry. There seems to be a problem with our server, please contact us to our mail contacto@almamut.com, or wait a few minutes and try again'})
        }
      })
    } else {
      if(this.refs.contactForm.state.errors)
      this.refs.contactForm.showError(this.state.errorSent)
      this.state.errorSent = true
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
      let fld = document.getElementById(field)
      if (value === '' || value === null) {
        errors[field] = 'This field is required'
        let fld = document.getElementById(field)
        fld.classList.add('required')
      } else {
        fld.classList.remove('required')
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

  showError (errSent) {
    let errors = this.state.errors
    if(!errSent){
      for(var key in errors) {
        document.getElementById(key).placeholder += ' *'
      }
    }
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

  handleChange (id) {
    let fld = document.getElementById(id)
    fld.classList.remove('required')
  }

  renderTextInput (id, label) {
    return this.renderField(id, label,
      <input type="text" placeholder={label} 
      onChange={this.handleChange.bind(this, id)} 
      className="form-control" 
      id={id} 
      ref={id}/>
    )
  }

  renderTextarea (id, label) {
    return this.renderField(id, label,
      <textarea className="form-control" 
      onChange={this.handleChange.bind(this, id)} 
      placeholder={label} 
      id={id} 
      ref={id}/>
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

class Footer extends React.Component {
  render () {
    return (
      <p>with ❤ and code</p>
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
