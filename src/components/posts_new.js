import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { createPost } from '../actions'

class PostsNew extends Component {
  renderField(field) {
    const { meta: {touched, error} } = field
    // before
    // const className = `form-group ${field.meta.touched && field.meta.error ? 'has-danger' : ''}`
    // after
    const className = `form-group ${touched && error ? 'has-danger' : ''}`
    return (
      <div className={className}>
        <label>
          {field.label}
        </label>
        <input
          className="form-control"
          type="text" 
          {...field.input}
        />
        <div className="text-help">
          {/* before */}
          {/* {field.meta.touched ? field.meta.error : ''} */}
          {/* after */}
          {touched ? error : ''}
        </div>
        
      </div>
    )
  }

  onSubmit(values) {
    this.props.createPost(values, () => {
      this.props.history.push('/')
    })
  }
  
  render() {
    const { handleSubmit } = this.props
    return (
      <div>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field 
            label="Title For Post"
            name="title"
            component={this.renderField}
          />
          <Field 
            label="Categories"
            name="categories"
            component={this.renderField}
          />
          <Field 
            label="Post Content"
            name="content"
            component={this.renderField}
          />
          <button type="submit" className="btn btn-primary">Submit</button>
          <Link className="btn btn-danger" to="/">
            Cancel
          </Link>
        </form>
      </div>
    )
  }
}

function validate(values) {
  const errors = {}

  //validate inputs from values
  if(!values.title) {
    errors.title = "Enter a title!"
  }
  if(!values.categories) {
    errors.categories = "Enter a category"
  }
  if(!values.content) {
    errors.content = "Enter some content"
  }

  //if errors is empty the form is fine to submit
  //if errors has any properties, redux form assumes form is invalid
  return errors;
}

export default reduxForm({
  validate,
  form: 'PostsNewForm'
})(
   connect(null, {createPost})(PostsNew)
  )