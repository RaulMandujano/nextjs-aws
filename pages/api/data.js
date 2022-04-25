import axios from 'axios';

export default (req, res) => {
    axios.get(`https://www.breakingbadapi.com/api/characters`)
        .then(rs => res.status(rs.status).json(rs.data))
        .catch(err => res.status(err.status || err.statusCode || 500).send(err?.response?.data || err?.response || err))
    
}