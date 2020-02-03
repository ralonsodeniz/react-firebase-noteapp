import React, { useCallback } from "react";
import { withStyles } from "@material-ui/core/styles";
import { createStructuredSelector } from "reselect";

import { useStoreContext } from "../../redux/store";
import { setSelectedNote, deleteNoteStart } from "../../redux/notes/actions";
import { selectNote } from "../../redux/notes/selectors";

import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import DeleteIcon from "@material-ui/icons/Delete";

import { removeHTMLTags } from "../../helpers/helpers";

import styles from "./styles";

const selectSidebarItemData = createStructuredSelector({
  selectedNote: selectNote
});

const SidebarItem = ({ note, classes }) => {
  const { state, dispatch } = useStoreContext();

  const { selectedNote } = selectSidebarItemData(state);

  const handleSelectNote = useCallback(
    note => {
      dispatch(setSelectedNote(note));
    },
    [dispatch]
  );

  const handleDeleteNote = useCallback(
    (noteId, noteTitle) => {
      if (window.confirm(`Are you sure you want to delete: ${noteTitle}`)) {
        dispatch(deleteNoteStart(noteId));
        if (selectedNote.id === noteId) {
          dispatch(setSelectedNote({}));
        }
      }
    },
    [dispatch, selectedNote]
  );

  return (
    <div>
      <ListItem
        className={classes.listItem}
        selected={selectedNote.id === note.id}
        alignItems="flex-start"
      >
        <div
          className={classes.textSection}
          onClick={() => handleSelectNote(note)}
        >
          <ListItemText
            primary={note.title}
            secondary={removeHTMLTags(note.body.substring(0, 30) + "...")}
          ></ListItemText>
        </div>
        <DeleteIcon
          onClick={() => handleDeleteNote(note.id, note.title)}
          className={classes.deleteIcon}
        />
      </ListItem>
    </div>
  );
};

export default withStyles(styles)(SidebarItem);
