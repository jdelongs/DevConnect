import React, { useState } from 'react'; 
import PropTypes from 'prop-types'; 
import { connect } from 'react-redux'; 
import { addComment, deleteComment } from '../../actions/post'; 

const CommentForm = ({ postId, addComment, deleteComment }) => {
    const [text, setText] = useState(''); 
    return (
        <div className="post-form">
      <form
        className="form my-1"
        onSubmit={e => {
          e.preventDefault();
          addComment(postId, { text });
          setText("");
        }}
      >
        <textarea
          name="text"
          cols="30"
          rows="5"
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Comment...."
          required
        ></textarea>
        <input type="submit" className="btn btn-dark my-1" value="Submit" />
      </form>
    </div>
    )
}

CommentForm.propTypes = {
    addComment: PropTypes.func.isRequired,
    deleteComment: PropTypes.func.isRequired,
}

export default connect(null, {addComment, deleteComment})(CommentForm)
