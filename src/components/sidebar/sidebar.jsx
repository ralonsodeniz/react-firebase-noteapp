import React, { useState, useCallback } from "react";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import { Divider, Button } from "@material-ui/core";
import { createStructuredSelector } from "reselect";

import { useStoreContext } from "../../redux/store";
import { addNoteStart } from "../../redux/notes/actions";
import { selectNotesArray } from "../../redux/notes/selectors";

import SidebarItem from "../sidebar-item/sidebar-item";

import styles from "./styles";

const selectSidebarData = createStructuredSelector({
  notesArray: selectNotesArray
});

const Sidebar = ({ classes }) => {
  const [sidebarState, setSidebarState] = useState({
    addingNote: false,
    title: ""
  });

  const { state, dispatch } = useStoreContext();

  const { addingNote, title } = sidebarState;

  const { notesArray } = selectSidebarData(state);

  const handleAddNote = () => {
    setSidebarState(prevState => ({
      ...prevState,
      addingNote: !prevState.addingNote,
      title: ""
    }));
  };

  const handleUpdateTitle = event =>
    setSidebarState({ ...sidebarState, title: event.target.value });

  const handleCreateNote = useCallback(() => {
    dispatch(addNoteStart(title));
    setSidebarState(prevState => ({
      ...prevState,
      addingNote: !prevState.addingNote,
      title: ""
    }));
  }, [dispatch, title]);

  return (
    <div className={classes.sidebarContainer}>
      <Button onClick={handleAddNote} className={classes.newNoteBtn}>
        {addingNote ? "Cancel" : "New note"}
      </Button>
      {addingNote && (
        <div>
          <input
            type="text"
            className={classes.newNoteInput}
            placeholder="Enter note title"
            onChange={handleUpdateTitle}
            value={title}
          />
          <Button
            className={classes.newNoteSubmitBtn}
            onClick={handleCreateNote}
          >
            Submit Note
          </Button>
        </div>
      )}
      <List>
        {notesArray.map((note, noteIndex) => (
          <div key={noteIndex}>
            <SidebarItem note={note} />
            <Divider />
          </div>
        ))}
      </List>
    </div>
  );
};

export default withStyles(styles)(Sidebar);
