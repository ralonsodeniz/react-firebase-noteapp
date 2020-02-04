import React, { useState, useEffect, useMemo, useCallback } from "react";
import ReactQuill from "react-quill";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import { withStyles } from "@material-ui/core/styles";
import { createStructuredSelector } from "reselect";

import { selectNote } from "../../redux/notes/selectors";
import { useDebounce } from "../../helpers/helpers";
import { useStoreContext } from "../../redux/store";
import {
  updateNoteBodyStart,
  updateNoteTitleStart
} from "../../redux/notes/actions";

import styles from "./styles";

const selectEditorData = createStructuredSelector({
  selectedNote: selectNote
});

const Editor = ({ classes }) => {
  // this should be  const [editorText, setEditorText] = useState(""); but I leave it like it is as a reminder of how to update the text when the note is changed using useEffect and prevState from the updater function of useState
  const [editorState, setEditorState] = useState({
    body: " ",
    title: "/initial title.../",
    id: ""
  });

  const { state, dispatch } = useStoreContext();

  const { selectedNote } = selectEditorData(state);

  let { body, title, id } = editorState;

  const debouncedBody = useDebounce(body, 1500);
  const debouncedTitle = useDebounce(title, 1500);

  useEffect(() => {
    selectedNote && setEditorState(selectedNote);
  }, [selectedNote]);

  useEffect(() => {
    id !== "" &&
      // we ask the body to be different than a initial value that cannot be achieved by the user to update the backend because if it leave it blank it will try to update everytime we click the note for the first time or when we click on a note after deleting a previous one
      debouncedBody !== " " &&
      dispatch(updateNoteBodyStart(id, debouncedBody));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedBody, dispatch]);

  useEffect(() => {
    id !== "" &&
      debouncedTitle !== "/initial title.../" &&
      dispatch(updateNoteTitleStart(id, debouncedTitle));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedTitle, dispatch]);

  const updateBody = useCallback(htmlStr => {
    setEditorState(prevState => ({ ...prevState, body: htmlStr }));
  }, []);

  const updateTitle = useCallback(event => {
    const { value } = event.target;
    setEditorState(prevState => ({ ...prevState, title: value }));
  }, []);

  return useMemo(
    () => (
      <div className={classes.editorContainer}>
        <BorderColorIcon className={classes.editIcon} />
        <input
          className={classes.titleInput}
          placeholder="Note title..."
          value={title}
          type="text"
          onChange={updateTitle}
        ></input>
        <ReactQuill value={body} onChange={updateBody} />
      </div>
    ),
    [body, updateBody, classes, updateTitle, title]
  );
};

// by using material-ui withStyles HOC it gives us accees to a property object in the component props called classes that has a key value pair for each class defined in the styles function inside style.js we pass to the HOC as first parameter
export default withStyles(styles)(Editor);
