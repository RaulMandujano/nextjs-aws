import * as React from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { ForkLeft } from '@mui/icons-material';




const Series = () => {

    const [series, setSeries] = React.useState([])

    React.useEffect (() => {
        seriesData();
    }, []);
  
    const seriesData = () =>  {
      fetch("https://www.breakingbadapi.com/api/episodes")
      .then(response => response.json())
      .then(seriesReceivedData => setSeries(seriesReceivedData))
    }
  
    console.log(series)

    return (

        <>

        <Typography variant="h4" sx={{ margin: 10 }}>
        Episodes
        </Typography>
            {
          series && series.map((serie, index) => {

            return(
                <Card sx={{ width: 400, margin: 5, float:'left' }} key={index}>
                <CardActionArea >
                    <CardContent >
                    <Typography gutterBottom variant="h5" component="div">
                        {serie.title}
                    </Typography>
                    <Typography gutterBottom variant="p" component="div">
                        {serie.series}
                    </Typography>
                    <Typography gutterBottom variant="p" component="div">
                        Season: {serie.season} Episode: {serie.episode}
                    </Typography>
                    </CardContent>
                </CardActionArea>
                </Card>
            )

        })}
        </>
    )
}

export default Series;