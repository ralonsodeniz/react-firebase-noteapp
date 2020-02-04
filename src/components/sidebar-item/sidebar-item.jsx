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
      (!selectedNote || (selectedNote && selectedNote.id !== note.id)) &&
        dispatch(
          setSelectedNote({
            title: note.title,
            id: note.id,
            body: note.body
          })
        );
    },
    [dispatch, selectedNote]
  );

  const handleDeleteNote = useCallback(
    (noteId, noteTitle) => {
      if (window.confirm(`Are you sure you want to delete: ${noteTitle}`)) {
        if (selectedNote && selectedNote.id === noteId) {
          dispatch(setSelectedNote(null));
        }
        dispatch(deleteNoteStart(noteId));
      }
    },
    [dispatch, selectedNote]
  );

  return (
    <div>
      <ListItem
        className={classes.listItem}
        selected={selectedNote && selectedNote.id === note.id}
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
