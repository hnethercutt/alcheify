'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import SpotifySearchBar from './spotify-search-bar';
import GenreSelector from './genre-selector';
import type { PlaylistRequest, SpotifySong, SpotifyArtist } from '@/types/playlist';
import { generatePlaylist } from '@/services/playlist-service';
import { TextField, Chip, FormControl, FormLabel, FormControlLabel, RadioGroup, Radio, Select, MenuItem, SelectChangeEvent, Stack } from '@mui/material';
import { useId } from 'react';
import Image from 'next/image';
import { AutoAwesomeOutlined, AutoAwesome, AutoFixHighOutlined, LoopOutlined, LabelOutlined } from '@mui/icons-material';
import './generate-playlist-form.css';
import BrewAnimation from './brew-animation';

export default function GeneratePlaylistForm() {
  const [requestFormData, setRequestFormData] = useState<PlaylistRequest>({
    vibe: '',
    notes: '',
    referenceSongs: [],
    excludeArtists: [],
    excludeGenres: [],
    allowDuplicateArtists: true,
    includeReferenceSongs: true,
    generateTitleAndDescription: true
  });

  // Will probably condense all of these later
  const handleRefSongSelected = (selectedSong: SpotifySong) => {
    setRequestFormData((prevRequestFormData) => ({
      ...prevRequestFormData,
      referenceSongs: [...(prevRequestFormData.referenceSongs ?? []), selectedSong],
    }));
  };

  const deleteRefSong = (indexToRemove: number) => {
    setRequestFormData((prevRequestFormData) => ({
      ...prevRequestFormData,
      referenceSongs: prevRequestFormData.referenceSongs?.filter((_, index) => index !== indexToRemove),
    }));
  };

  const handleExcludeArtistSelected = (selectedArtist: SpotifyArtist) => {
    setRequestFormData((prevRequestFormData) => ({
      ...prevRequestFormData,
      excludeArtists: [...(prevRequestFormData.excludeArtists ?? []), selectedArtist],
    }));
  };

  const deleteExcludeArtist = (indexToRemove: number) => {
    setRequestFormData((prevRequestFormData) => ({
      ...prevRequestFormData,
      excludeArtists: prevRequestFormData.excludeArtists?.filter((_, index) => index !== indexToRemove),
    }));
  };

  const handleExcludeGenresSelected = (selectedGenres: string[]) => {
    setRequestFormData(prevRequestFormData => ({
      ...prevRequestFormData,
      excludeGenres: selectedGenres
    }));
  };

  const handleDupeArtistsSelected = (e: React.ChangeEvent<HTMLInputElement>, value: string) => {
    setRequestFormData(prevRequestFormData => ({
      ...prevRequestFormData,
      allowDuplicateArtists: value === 'true' ? true : false
    }));
  };

  const handleIncludeRefSongsSelected = (e: React.ChangeEvent<HTMLInputElement>, value: string) => {
    setRequestFormData(prevRequestFormData => ({
      ...prevRequestFormData,
      includeReferenceSongs: value === 'true' ? true : false
    }));
  };

  const handleGenTitleAndDescSelected = (e: React.ChangeEvent<HTMLInputElement>, value: string) => {
    setRequestFormData(prevRequestFormData => ({
      ...prevRequestFormData,
      generateTitleAndDescription: value === 'true' ? true : false
    }));
  };

  const router = useRouter();

  const [isBrewing, setIsBrewing] = useState(false);
  const generateBtnClicked = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsBrewing(true);
    generatePlaylist(requestFormData).then(function(_playlistUrl) {
      let params = new URLSearchParams();
      params.set('playlistUrl', `${_playlistUrl}`);
      router.push(`/success?${params.toString()}`);
    });
  };

  const updateFormInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    let { name, value } = e.target;

    setRequestFormData((prevRequestFormData) => ({
      ...prevRequestFormData,
      [name]: value,
    }));
  };

  const id = useId();

  return (
    <div className='page'>
      <div className='generate-form-container flex-column'>
        <div className='form-header'>
          <h1>Brew a Playlist Potion</h1>
          <Image src="./potion.svg" alt="logo" width={48} height={48} onClick={() => router.push('/')}></Image>
        </div>
        <div className='essence'>
          <div className='flex-row'>
            <span><AutoAwesomeOutlined sx={{ color: 'var(--spotify-green)'}}/></span><h2>The Essence</h2>
          </div>
          <p className='grey-font subheader'>Describe the overall sound or vibe you're going for</p>
          <div className='vibe flex-column'>
            <TextField
              name='vibe'
              multiline
              rows={3}
              onChange={updateFormInput}
              placeholder='Looking out a backseat car window on a foggy, rainy day...'
              sx={{
                width: '500px',
                '& .MuiOutlinedInput-root': {
                  color: 'var(--foreground)',
                  fontFamily: 'var(--font-inter)',
                  fontSize: '14px',
                  backgroundColor: 'var(--dark-blue)',
                  borderWidth: '1.5px',
                  borderRadius: '12px',
                  '& fieldset': {
                    borderColor: 'var(--blue-grey)'
                  },
                  '&:hover fieldset': {
                    borderColor: '#1ed760',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#1ed760',
                    borderWidth: '2px'
                  }
                }
              }} />
          </div>
        </div>
        <div className='flex-row'>
          <span className='divider'></span><AutoAwesome sx={{ color: 'var(--blue-grey)', fontSize: 18}}/><span className='divider'></span>
        </div>
        <div className='section-margins'>
          <div>
            <div className='flex-row'>
              <span><Image src="./leaf.svg" alt="logo" width={24} height={24}></Image></span><h2>Reagants</h2>
            </div>
            <p className='grey-font subheader'>Add reference songs that match the essence</p>
          </div>
          <div className='search-bar-section flex-column'>
            {requestFormData.referenceSongs && requestFormData.referenceSongs.length > 0 && (
              <div className='chips-container'>
                <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: 'wrap', width: '525px'}}>
                  {requestFormData.referenceSongs?.map((item, index) => (
                    <div key={index}>
                      <Chip
                        label={`${item.title} - ${item.artist}`}
                        variant="outlined"
                        sx={{
                          mt: 1,
                          mb: 1,
                          color: "var(--foreground)",
                          borderColor: "var(--spotify-green)",
                          "& .MuiChip-deleteIcon": { color: "var(--spotify-green)" },
                        }}
                        onDelete={() => deleteRefSong(index)}
                      />
                    </div>
                  ))}
                </Stack>
              </div>
            )}
            <SpotifySearchBar onSongSelected={handleRefSongSelected} />
          </div>
          {requestFormData.referenceSongs && requestFormData.referenceSongs.length > 0 && (
            <div className='references-option flex-row'>
              <p className='grey-font'>Include these reference songs in your playlist?</p>
              <FormControl>
                <RadioGroup
                  row
                  aria-labelledby={`${id}-label`}
                  defaultValue="true"
                  name="radio-buttons-group"
                  onChange={handleIncludeRefSongsSelected}
                >
                  <FormControlLabel
                    value="true"
                    label="Yes"
                    control={
                      <Radio
                        sx={{
                          color: '#b3b3b3',
                          '&.Mui-checked': {
                            color: '#1ed760'
                          }
                        }}
                      />}/>
                  <FormControlLabel
                    value="false"
                    label="No"
                    control={
                      <Radio
                        sx={{
                          color: '#b3b3b3',
                          '&.Mui-checked': {
                            color: '#1ed760'
                          }
                        }}
                      />}/>
                </RadioGroup>
              </FormControl>
            </div>
          )}
        </div>
        <div className='flex-row'>
          <span className='divider'></span><AutoAwesome sx={{ color: 'var(--blue-grey)', fontSize: 18}}/><span className='divider'></span>
        </div>
        <div className='section-margins'>
          <div>
            <div className='flex-row'>
              <span><AutoFixHighOutlined sx={{ color: 'var(--spotify-green)'}}/></span><h2>Modifiers</h2>
            </div>
            <p className='grey-font subheader'>Secondary ingredients to fine-tune your playlist</p>
            <div className='search-bar-section flex-column'>
              <p className='subheader exclude-subheader'>Artists to exclude</p>
              {requestFormData.excludeArtists && requestFormData.excludeArtists.length > 0 && (
                <div className='chips-container'>
                  <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: 'wrap', width: '525px'}}>
                    {requestFormData.excludeArtists?.map((item, index) => (
                      <div key={index}>
                        <Chip
                          label={`${item.name}`}
                          variant="outlined"
                          sx={{
                            mt: 2,
                            mb: 1,
                            color: "var(--foreground)",
                            borderColor: "var(--spotify-green)",
                            "& .MuiChip-deleteIcon": { color: "var(--spotify-green)" },
                          }}
                          onDelete={() => deleteExcludeArtist(index)}
                        />
                      </div>
                    ))}
                  </Stack>
                </div>
              )}
              <SpotifySearchBar onArtistSelected={handleExcludeArtistSelected} />
            </div>
          </div>
          <div className='flex-column exclude-genres'>
            <p className='subheader exclude-subheader'>Genres to exclude</p>
            <GenreSelector onGenresSelected={handleExcludeGenresSelected} />
          </div>
          <div className='radio-sections-container'>
            <div className='radio-sections repeating-artists'>
              <LoopOutlined sx={{mr: 2, color: 'var(--spotify-green)'}}/>
              <FormControl>
                <label className='section-label'>Repeating Artists</label>
                <p className='subtext'>Allow an artist to appear more than once?</p>
                <RadioGroup
                  row
                  aria-labelledby={`${id}-label`}
                  defaultValue="true"
                  name="radio-buttons-group"
                  onChange={handleDupeArtistsSelected}
                >
                  <FormControlLabel
                    value="true"
                    label="Yes"
                    control={
                      <Radio
                        sx={{
                          color: '#b3b3b3',
                          '&.Mui-checked': {
                            color: '#1ed760'
                          }
                        }}
                      />}/>
                  <FormControlLabel
                    value="false"
                    label="No"
                    control={
                      <Radio
                        sx={{
                          color: '#b3b3b3',
                          '&.Mui-checked': {
                            color: '#1ed760'
                          }
                        }}
                      />}/>
                </RadioGroup>
              </FormControl>
            </div>
            <div className='radio-sections potion-label'>
              <div>
                <LabelOutlined sx={{mr: 2, color: 'var(--spotify-green)'}}/>
                <FormControl>
                  <label className='section-label'>Potion Label</label>
                  <p className='subtext'>Generate a title and description?</p>
                  <RadioGroup
                    row
                    aria-labelledby={`${id}-label`}
                    defaultValue="true"
                    name="radio-buttons-group"
                    onChange={handleGenTitleAndDescSelected}
                  >
                    <FormControlLabel
                      value="true"
                      label="Yes"
                      control={
                        <Radio
                          sx={{
                            color: '#b3b3b3',
                            '&.Mui-checked': {
                              color: '#1ed760'
                            }
                          }}
                        />}/>
                    <FormControlLabel
                      value="false"
                      label="No"
                      control={
                        <Radio
                          sx={{
                            color: '#b3b3b3',
                            '&.Mui-checked': {
                              color: '#1ed760'
                            }
                          }}
                        />}/>
                  </RadioGroup>
                </FormControl>
              </div>
            </div>
          </div>
        </div>
        <div className='flex-row'>
          <span className='divider'></span><AutoAwesome sx={{ color: 'var(--blue-grey)', fontSize: 18}}/><span className='divider'></span>
        </div>
        <div className='notes flex-column'>
          <TextField
            name='notes'
            multiline
            rows={3}
            onChange={updateFormInput}
            placeholder='Add any additional notes here'
            sx={{
              width: '500px',
              '& .MuiOutlinedInput-root': {
                color: 'var(--foreground)',
                fontFamily: 'var(--font-inter)',
                fontSize: '14px',
                backgroundColor: 'var(--dark-blue)',
                borderRadius: '12px',
                '& fieldset': {
                  borderColor: 'var(--blue-grey)'
                },
                '&:hover fieldset': {
                  borderColor: '#1ed760'
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#1ed760',
                  borderWidth: '2px'
                }
              }
            }} />
        </div>
        <div className='generate-btn-container'>
          <button type="submit" disabled={isBrewing} className='generate-btn flex-row' onClick={generateBtnClicked}><AutoAwesome sx={{ mr: 1 }}/>

          <p>{isBrewing ? 'Brew Playlist' : 'Brew Playlist'}</p></button>
        </div>
      </div>
      {isBrewing && <BrewAnimation />}
    </div>
  );
}
