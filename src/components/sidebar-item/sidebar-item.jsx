import React, { useCallback } from "react";
import { withStyles } from "@material-ui/core/styles";
import { createStructuredSelector } from "reselect";

import { useStoreContext } from "../../redux/store";
import {
  setSelectedNoteId,
  setSelectedNote,
  deleteNoteStart
} from "../../redux/notes/actions";
import { selectNoteId } from "../../redux/notes/selectors";

import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import DeleteIcon from "@material-ui/icons/Delete";

import { removeHTMLTags } from "../../helpers/helpers";

import styles from "./styles";

const selectSidebarItemData = createStructuredSelector({
  selectedNoteId: selectNoteId
});

const SidebarItem = ({ note, classes }) => {
  const { state, dispatch } = useStoreContext();

  const { selectedNoteId } = selectSidebarItemData(state);

  const handleSelectNote = useCallback(
    noteId => {
      dispatch(setSelectedNoteId(noteId));
      dispatch(setSelectedNote(note));
    },
    [note, dispatch]
  );

  const handleDeleteNote = useCallback(
    (noteId, noteTitle) => {
      if (window.confirm(`Are you sure you want to delete: ${noteTitle}`)) {
        dispatch(deleteNoteStart(noteId));
        if (selectedNoteId === noteId) {
          dispatch(setSelectedNoteId(""));
          dispatch(setSelectedNote({}));
        }
      }
    },
    [dispatch, selectedNoteId]
  );

  return (
    <div>
      <ListItem
        className={classes.listItem}
        selected={selectedNoteId === note.id}
        alignItems="flex-start"
      >
        <div
          className={classes.textSection}
          onClick={() => handleSelectNote(note.id)}
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
