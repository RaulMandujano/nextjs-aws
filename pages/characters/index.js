import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions } from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import SaveAltIcon from '@mui/icons-material/SaveAlt';

import ResponsiveAppBar from "../../src/components/ResponsiveAppBar"

import { getAllCharacter } from "../../src/utils/api-utils"


const CharactersList = (props) => {

console.log(props);
const { characters } = props

  return (
    <div>
    <ResponsiveAppBar />

{
    characters.map((character, index) => <div key={index}>

    <Card sx={{ maxWidth: 345 }}>
         
      <CardActionArea>
        <CardMedia
          component="img"
          height="450"
          image={character.img}
          alt="Breking Bad Character"
        />
        <CardContent>
          <Typography gutterBottom variant="h4" component="div">
            {character.nickname}
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            {character.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Occupation: {character.occupation}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <DeleteIcon size="small" color="primary" />
        <SaveAltIcon size="small" color="primary" />

      </CardActions>

    </Card>
</div>)
}

    </div>
  );
}


export async function getStaticProps() {
    const fetchedCharacters = await getAllCharacter();

    return {
        props: {
            characters: fetchedCharacters
        }
    }
}

export default CharactersList