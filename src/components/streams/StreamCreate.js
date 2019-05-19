import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { createStream } from "../../actions";
import LogIn from "./LogIn";

class StreamCreate extends React.Component {
  renderInput({ input, label, meta }) {
    return (
      <div className="field">
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        {meta.touched ? <div style={{ color: "red" }}>{meta.error}</div> : null}
      </div>
    );
  }

  onSubmit = formValues => {
    this.props.createStream(formValues);
  };

  showUp = () => {
    if (this.props.isSignedIn) {
      return (
        <div>
          <form
            onSubmit={this.props.handleSubmit(this.onSubmit)}
            className="ui form"
          >
            <Field
              name="title"
              component={this.renderInput}
              label="Enter Title"
            />
            <Field
              name="description"
              component={this.renderInput}
              label="Enter Description"
            />
            <button className="ui button teal">Submit</button>
          </form>
        </div>
      );
    }
    return <LogIn />;
  };

  render() {
    return <div>{this.showUp()}</div>;
  }
}

const validate = formValues => {
  const errors = {};

  if (!formValues.title) {
    errors.title = "You must enter a title";
  }
  if (!formValues.description) {
    errors.description = "You must eneter a description";
  }
  return errors;
};

const formWrapped = reduxForm({
  form: "streamCreate",
  validate
})(StreamCreate);

const mapStateToProps = state => {
  return {
    isSignedIn: state.auth.isSignedIn
  };
};

export default connect(
  mapStateToProps,
  { createStream }
)(formWrapped);
