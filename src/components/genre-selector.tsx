import genreData from '@/data/genres.json';
import { List, ListItem, ListItemText, ListItemIcon, Checkbox, Dialog, DialogContent, DialogActions, Chip, Stack } from '@mui/material';
import { useState, useEffect, Fragment } from 'react';
import { MusicOffOutlined } from '@mui/icons-material';
import _ from 'lodash';
import './genre-selector.css';

// For updating the parent component (the generate playlist form itself)
interface GenreSelectorProps {
  onGenresSelected: (genres: string[]) => void;
}

export default function GenreSelector({
  onGenresSelected,
}: GenreSelectorProps) {
  const [checkedGenres, setCheckedGenres] = useState<string[]>([]);

  useEffect(() => {
    // Notify parent component when genres/subgenres are checked/unchecked
    onGenresSelected(checkedGenres);
  }, [checkedGenres]);

  const handleCheckGenre = (genre: string) => {
    setCheckedGenres((prevCheckedGenres) => {
      // If the genre is on the list, means we are currently unchecking
      if (prevCheckedGenres.includes(genre)) {
        return prevCheckedGenres.filter((item) => item !== genre);
      }

      // Otherwise, add/check the genre
      return [...prevCheckedGenres, genre];
    });
  };

  // For opening and closing the dialog box
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Fragment>
      {checkedGenres.length > 0 && (
        <div className="chips-container">
          <Stack
            direction="row"
            spacing={1}
            useFlexGap
            sx={{ flexWrap: 'wrap', width: '525px' }}
          >
            {checkedGenres.map((item, index) => (
              <div key={index}>
                <Chip
                  label={item}
                  variant="outlined"
                  sx={{
                    color: 'var(--foreground)',
                    borderColor: 'var(--spotify-green)',
                    '& .MuiChip-deleteIcon': { color: 'var(--spotify-green)' },
                  }}
                  onDelete={() => handleCheckGenre(item)}
                />
              </div>
            ))}
          </Stack>
        </div>
      )}
      <div className="genre-btn-container">
        <button className="genre-btn flex-row" onClick={handleClickOpen}>
          <MusicOffOutlined sx={{ mr: 1 }} />
          <p>Select Genres to Exclude</p>
        </button>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            sx: {
              backgroundColor: 'var(--dark-blue)',
              color: '#fff',
            },
          },
        }}
      >
        <DialogContent sx={{ pb: 0 }}>
          <List className="flex-column">
            {genreData.map((genre, index) => (
              <ListItem key={index}>
                <ListItemIcon>
                  <Checkbox
                    size="small"
                    edge="start"
                    sx={{
                      color: '#b3b3b3',
                      '&.Mui-checked': {
                        color: '#1ed760',
                      },
                    }}
                    disableRipple
                    checked={checkedGenres.includes(genre)}
                    onClick={(e) => e.stopPropagation()}
                    onChange={() => handleCheckGenre(genre)}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={genre}
                  sx={{
                    '& .MuiListItemText-primary': {
                      fontSize: '16px',
                    },
                  }}
                />
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center' }}>
          <button className="close-btn" onClick={handleClose}>Close</button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}
