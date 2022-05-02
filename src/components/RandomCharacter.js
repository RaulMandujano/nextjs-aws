import { Amplify, DataStore, API } from "aws-amplify";
import config from "../../src/aws-exports";
import * as React from 'react';


import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions, Grid } from '@mui/material';


import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Box from '@mui/material/Box';


import * as mutations from "../../src/graphql/mutations"


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

  
  const handleDeleteCharacter = () => {
    console.log('Character Deleted')
  }
  //Fetching Data
  
  const [randomCharacter, setRandomCharacter] = React.useState([])

  React.useEffect (() => {
    randomData();
  }, []);

  const randomData = () =>  {
    fetch("https://www.breakingbadapi.com/api/characters?limit=6&offset=6")
    .then(response => response.json())
    .then(randomReceivedData => setRandomCharacter(randomReceivedData))
  }

  console.log(randomCharacter)

  return (
    <div>

    <Typography variant="h4">
        Random  Characters
    </Typography>

      {
        randomCharacter && randomCharacter.map((random) => {

            return (

            <Box sx={{ display: "inline", margin: "auto" }}>
              <Grid key={character.char_id}
              container
              direction="row"
              justifyContent="center"
              sx={{ float: 'left', width: 300, height: 700, margin: 2 }}
              >
                <Card>
                    
                  <CardActionArea key={index}>
                    <CardMedia
                      component="img"
                      title="Profile Image"
                      height="450"
                      image={random.img}
                      alt="Breking Bad Character"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h4" component="div">
                        {random.nickname}
                      </Typography>
                      <Typography gutterBottom variant="h6" component="div">
                        {random.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Occupation: {random.occupation}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>

                  <IconButton aria-label="add to favorites" onClick={() => handleSaveCharacter(random)} >
                    <FavoriteIcon size="small" color="primary" />
                  </IconButton>
                  <IconButton aria-label="add to favorites" onClick={handleDeleteCharacter} >
                    <ClearIcon size="small" color="primary" />
                  </IconButton>
                  
                  </CardActions>

                </Card>
              </Grid>
            </Box>
            )
      })}
    </div>
  );
}


export default CharactersList