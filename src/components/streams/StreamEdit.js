import React from "react";
import { connect } from "react-redux";
import { fetchStream, editStream } from "../../actions";
import { Field, reduxForm } from "redux-form";
import Login from "./LogIn";

class StreamEdit extends React.Component {
  renderInput({ input, label, meta }) {
    return (
      <div className="field">
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        {meta.touched ? <div style={{ color: "red" }}>{meta.error}</div> : null}
      </div>
    );
  }
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  onSubmit = formValues => {
    this.props.editStream(this.props.match.params.id, formValues);
  };

  protectMe() {
    if (this.props.stream.userId === this.props.userId) {
      return (
        //
        <div>
          <h3>Edit A Stream</h3>
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
    } else if (this.props.userId === null) {
      return <Login />;
    } else {
      return <div>You do not have permission to edit this video</div>;
    }
  }

  render() {
    if (!this.props.stream) {
      return <div>Loading...</div>;
    }
    return <div>{this.protectMe()}</div>;
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
  form: "streamEdit",
  validate
})(StreamEdit);

const mapStateToProps = (state, ownProps) => {
  return {
    stream: state.streams[ownProps.match.params.id],
    userId: state.auth.userId
  };
};

export default connect(
  mapStateToProps,
  { fetchStream, editStream }
)(formWrapped);
