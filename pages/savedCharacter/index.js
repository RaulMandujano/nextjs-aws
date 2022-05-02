import { Amplify, DataStore } from "aws-amplify"
import config from "../../src/aws-exports"
import { CharacterData } from '../../src/models'
import useSWR from "swr"

import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions, Grid } from '@mui/material';

import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';


Amplify.configure(config)


const SavedCharacter = () => {

  const [characterList, setCharacterList] = React.useState([])



  const handleDeleteCharacter = async (character) => {
    try {
      const characterToDelete = await DataStore.query(CharacterData, character.id)
      
      console.log(characterToDelete)
      await DataStore.delete(characterToDelete)
    } catch (err) {
      console.log("Save delete movie error: ", err)
    }
    }


  
  // console.log(props);
  // const { characters } = props

  const fetcher = async () => {
    try {
      let tempList = await DataStore.query(CharacterData)
      setCharacterList(tempList)
    } catch (err) {
      console.log('Retrieve movie list error', err)
    }
    return characterList
  }

  const { data, error } = useSWR('/savedCharacter', fetcher, {refreshInterval: 500
  })

  if (error) return <div>Failed to load list of movies.</div>
  if (!data) return <div>Loading...</div>

  return (
    <div>

      {
          characterList && characterList.map((character, index) => {

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
                      alt={character.nickname}
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

                    {/* <IconButton aria-label="add to favorites" onClick={() => handleSaveCharacter(character)}>
                    <FavoriteIcon size="small" color="primary" />
                    </IconButton> */}

                    <IconButton aria-label="add to favorites"onClick={() => handleDeleteCharacter(character)} >
                    <ClearIcon size="small" color="primary"  />
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


// export async function getStaticProps() {
    
//   let characters = []
//     try {
//         const response = await API.graphql({
//           query: listCharacterData,
//           authMode: 'API_KEY'
//         })
//         characters = response.data.listCharacterData.items

//       } catch (err) {
//         console.log("Retrieve movie list error", err)
//     }

//     return {
//         props: {
//             characters: characters
//         }
//     }
// }


export default SavedCharacter