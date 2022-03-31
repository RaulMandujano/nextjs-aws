import { Amplify, API } from "aws-amplify"
import config from "../../src/aws-exports"
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions } from '@mui/material';

import Button from '@mui/material/Button';
import Link from 'next/link'

import DeleteIcon from '@mui/icons-material/Delete';
import SaveAltIcon from '@mui/icons-material/SaveAlt';

import ResponsiveAppBar from "../../src/Components/ResponsiveAppBar"

import { getAllCharacter } from "../../src/utils/api-utils"
// import { listCharacterData } from "../../src/graphql/queries"

import * as mutations from "../../src/graphql/mutations"


Amplify.configure(config)


const CharactersList = (props) => {

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

      <Link href="/savedCharacter">
      <Button variant="contained">Saved Characters</Button>
      </Link>

      {
          characters.map((character, index) => {

            return (
              <div key={index}>
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
              </div>
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

export async function getStaticProps() {
    const fetchedCharacters = await getAllCharacter();

    return {
        props: {
            characters: fetchedCharacters
        }
    }
}

export default CharactersList