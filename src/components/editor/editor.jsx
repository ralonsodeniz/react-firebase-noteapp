import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import { withStyles } from "@material-ui/core/styles";
import { createStructuredSelector } from "reselect";

import { selectNoteId, selectNote } from "../../redux/notes/selectors";
import { useDebounce } from "../../helpers/helpers";
import { useStoreContext } from "../../redux/store";
import { updateNoteStarts } from "../../redux/notes/actions";

import styles from "./styles";

const selectEditorData = createStructuredSelector({
  selectedNoteId: selectNoteId,
  selectedNote: selectNote
});

const Editor = ({ classes }) => {
  // this should be  const [editorText, setEditorText] = useState(""); but I leave it like it is as a reminder of how to update the text when the note is changed using useEffect and prevState from the updater function of useState
  const [editorState, setEditorState] = useState({
    text: ""
  });

  const { state, dispatch } = useStoreContext();

  const { selectedNoteId, selectedNote } = selectEditorData(state);

  useEffect(() => {
    setEditorState(prevState => ({
      ...prevState,
      text: selectedNote ? (selectedNote.body ? selectedNote.body : "") : ""
    }));
  }, [selectedNoteId, selectedNote]);

  let { text } = editorState;

  const debouncedText = useDebounce(text, 1500);

  useEffect(() => {
    selectedNoteId !== "" &&
      dispatch(updateNoteStarts(selectedNoteId, debouncedText));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedText, dispatch]);

  const updateBody = async htmlStr => {
    setEditorState({ ...editorState, text: htmlStr });
  };

  return (
    <div className={classes.editorContainer}>
      <ReactQuill value={text} onChange={updateBody} />
    </div>
  );
};

// by using material-ui withStyles HOC it gives us accees to a property object in the component props called classes that has a key value pair for each class defined in the styles function inside style.js we pass to the HOC as first parameter
export default withStyles(styles)(Editor);
