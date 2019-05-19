import React from "react";
import Modal from "../Modal";
import history from "../../history";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchStream, deleteStream } from "../../actions";
import StreamList from "./StreamList";

class StreamDelete extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  renderActions() {
    return (
      <React.Fragment>
        <button
          onClick={() => this.props.deleteStream(this.props.match.params.id)}
          className="ui button negative"
        >
          Delete
        </button>
        <Link to="/" className="ui button ">
          Cancel
        </Link>
      </React.Fragment>
    );
  }
  renderContent() {
    return (
      <div style={{ display: "flex" }}>
        This
        <div style={{ color: "purple", fontWeight: "bold", whiteSpace: "pre" }}>
          {" "}
          CANNOT{" "}
        </div>
        be undone!
      </div>
    );
  }

  renderTitle() {
    if (!this.props.stream) {
      return "Are you sure you want to delete...";
    }
    return ` Are you sure you want to delete ${this.props.stream.title}?`;
  }
  render() {
    return (
      <div>
        <StreamList />

        <Modal
          title={this.renderTitle()}
          content={this.renderContent()}
          actions={this.renderActions()}
          onDismiss={() => history.push("/")}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(
  mapStateToProps,
  { fetchStream, deleteStream }
)(StreamDelete);
