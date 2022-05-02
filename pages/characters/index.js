import { Amplify, DataStore, API } from "aws-amplify";
import config from "../../src/aws-exports";
import { CharacterData } from '../../src/models';
import * as React from 'react';


import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions, Grid } from '@mui/material';
import {useRouter} from 'next/router';


import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';


import * as mutations from "../../src/graphql/mutations"
import { VolunteerActivismOutlined } from "@mui/icons-material";


Amplify.configure(config)


const CharactersList = () => {
  

  const handleSaveCharacter = async (characters) => {
    console.log(`Character saved`)

    const CreateCharacterDataInput = {
      name: characters.name,
      birthday: characters.birthday,
      occupation: characters.occupation,
      img: characters.img,
      status: characters.status,
      nickname: characters.nickname,
      appearance: characters.appearance,
    }

    try {
      const response = await API.graphql({
        query: mutations.createCharacterData,
        variables: { input: CreateCharacterDataInput },
        authMode: 'API_KEY'
      })
      console.log("New Character Saved")
      console.log(response)
    } catch (err) {
      console.log("Save character Error", err)
    }

  }

  //Fetching Data

  const handleDeleteCharacter = () => {
    console.log('Character Deleted')
  }

  const [characters, setCharacters] = React.useState([])
  const search = useRouter().query.search

  React.useEffect (() => {
    loadData();
    console.log(search);
  }, [search, loadData]);

  const loadData = () =>  {
    const url = `https://www.breakingbadapi.com/api/characters${search ? `?name=${search}` : ''}`;
    console.log(url)
    fetch(url)
    .then(response => response.json())
    .then(receivedData => setCharacters(receivedData))
  }

  console.log(characters)

  return (
    <div>


      {
          characters && characters.map((character, index) => {

            return (
              <Grid key={index}
              container
              direction="row"
              justifyContent="center"
              sx={{ float: 'left', width: 300, height: 700, margin: 2, }}
              >
                <Card>
                    
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

                  <IconButton aria-label="add to favorites">
                    <FavoriteIcon size="small" color="primary" onClick={() => handleSaveCharacter(character)} />
                  </IconButton>
                  <IconButton aria-label="add to favorites">
                    <ClearIcon size="small" color="primary" onClick={handleDeleteCharacter} />
                  </IconButton>
                  
                  </CardActions>

                </Card>
              </Grid>
            )
          }
        )
      }
    </div>
  );
}


export default CharactersList