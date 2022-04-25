import { Amplify, API } from "aws-amplify"
import config from "../../src/aws-exports"
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions, Grid } from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import SaveAltIcon from '@mui/icons-material/SaveAlt';

import ResponsiveAppBar from "../../src/components/ResponsiveAppBar"

import { listCharacterData } from "../../src/graphql/queries"

import * as mutations from "../../src/graphql/mutations"


Amplify.configure(config)


const savedCharacter = (props) => {

  const handleSaveCharacter = async (currentCharacter) => {
    console.log(`Character saved`)

    const CreateCharacterDataInput = {
      name: currentCharacter.name,
      birthday: currentCharacter.birthday,
      occupation: currentCharacter.occupation,
      img: currentCharacter.img,
      status: currentCharacter.status,
      nickname: currentCharacter.nickname,
      appearance: currentCharacter.appearance,
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
  
  console.log(props);
  const { characters } = props

  return (
    <div>
      <ResponsiveAppBar />
      {
          characters.map((character, index) => {

            return (
              <Grid key={index}
              container
              direction="row"
              justifyContent="center"
              sx={{ float: 'left', width: 300, height: 700, margin: 2, }}
              >
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

                    <SaveAltIcon size="small" color="primary" onClick={() => handleSaveCharacter(character)} />
                    <DeleteIcon size="small" color="primary" onClick={handleDeleteCharacter} />

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


export async function getStaticProps() {
    
  let characters = []
    try {
        const response = await API.graphql({
          query: listCharacterData,
          authMode: 'API_KEY'
        })
        characters = response.data.listCharacterData.items

      } catch (err) {
        console.log("Retrieve movie list error", err)
    }

    return {
        props: {
            characters: characters
        }
    }
}


export default savedCharacter