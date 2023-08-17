import React, {useState} from "react";
import { useSelector } from "react-redux";
import Loader from "../../../../Components/Loader/loader";
import STATUS from "../../../../statuses";
import "./filterbox.css"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import { useDispatch } from "react-redux";
import { updateFilterValues } from "../../../../redux/dashboardSlice";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const Filterbox = () => {
  const dispatch = useDispatch();
  const tagsStatus = useSelector((status) => status.dashboardState.filterTags.status); 
  const tags = useSelector((status) => status.dashboardState.filterTags.data); 

  const [difficulty, setDifficulty] = useState('');

  const handleDifficultyChange = (event) => {
    let value = event.target.value
    setDifficulty(value);
    const filterValues = {
      difficulty: value === ''?0:value,
    }
    dispatch(updateFilterValues(filterValues));
  };

  const [tagName, setTagName] = useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    
    const filterValues = {
      tags: value
    }
    dispatch(updateFilterValues(filterValues));
    
    setTagName(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <div className="filterboxContainer">
    <div className="filterboxTitle">
        <p>Filter Box</p>
    </div>
    <div className="filterBoxItems">
    {tagsStatus !== STATUS.IDLE? <Loader />:
    (<div style={{padding: "5px"}}>
        <FormControl sx={{ s: 1, minWidth: 150 }}>
        <InputLabel id="demo-simple-select-autowidth-label">Difficulty Level</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={difficulty}
          onChange={handleDifficultyChange}
          autoWidth
          label="Difficulty Level"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={1}>Easy</MenuItem>
          <MenuItem value={2}>Medium</MenuItem>
          <MenuItem value={3}>Hard</MenuItem>
        </Select>
        </FormControl>
        <FormControl sx={{ m: 1, width: 150 }}>
        <InputLabel id="demo-multiple-checkbox-label">Tags</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={tagName}
          onChange={handleChange}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {tags.map(({name, id}) => (
            <MenuItem key={id} value={name}>
              <Checkbox checked={tagName.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      </div>
    )}
        </div>
    </div>
  );
};

export default Filterbox;
