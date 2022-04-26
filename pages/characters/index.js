import { Amplify, API, formRow } from "aws-amplify"
import config from "../../src/aws-exports"
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions, Grid } from '@mui/material';
import {useRouter} from 'next/router';

// import Button from '@mui/material/Button';
// import Link from 'next/link'

import ClearIcon from '@mui/icons-material/Clear';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';


// import { getAllCharacter } from "../../src/utils/api-utils"
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
  const [characters, setCharacters] = React.useState([...props.characters])
  const router = useRouter();
  const [isFirstTime, setIsFirstTime] = React.useState(true)
  React.useEffect(() => {
    if(isFirstTime) return setIsFirstTime(false);
    const search = router.query.search
    fetch(`https://www.breakingbadapi.com/api/characters${search ? `?name=${router.query.search}` : ''}`)
      .then(res => res.json())
      .then(res => setCharacters(res))
  }, [router.query.search])

  console.log(characters)

  return (
    <div>


      {
          characters.map((character, index) => {

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

export const getServerSideProps = async (context) => {
  const search = context.query.search
  const characters = await (await fetch(`https://www.breakingbadapi.com/api/characters${search ? '?search=${search}': ''}`)).json()
  return {
    props: {
      characters
    }
  }
}


export default CharactersList