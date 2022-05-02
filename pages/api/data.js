// import axios from 'axios';

// export default (req, res) => {
//     axios.get(`https://www.breakingbadapi.com/api/characters`)
//         .then(rs => res.status(rs.status).json(rs.data))
//         .catch(err => res.status(err.status || err.statusCode || 500).send(err?.response?.data || err?.response || err))
    
// }

export default async function handler(req, res) {
    if (req.method === 'POST') {
  
      const response = await fetch(
        `https://www.breakingbadapi.com/api/characters`
      )
  
      const characterData = await response.json()
  
      res.status(200).json(characterData)
    }
  }