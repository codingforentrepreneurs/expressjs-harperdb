import './configEnv.js';

import express from 'express';
import DogModel, {configureAppSchema} from './crud.js'

const app = express();
const PORT = process.env.PORT ? process.env.PORT : 8000;

app.get('/', (req, res) => res.json('<h1>Express Server</h1>'));

app.get('/add', async (req, res) => {
    const records =[{
            id: 1,
            name: "Fido",
            color: "Brown",
            favoriteFood: "peanut butter",
            favoriteToy: "chew toy"
      }, 
      {
        id: 2,
        name: "Spot",
        favoriteFood: "bone",
        favoriteToy: "ball"
      }
      
    ]
    const response = await new DogModel().entryAdd(records)
    res.json(response)
});

app.get("/new-attribute", async (req, res) => {
    const attribute = req.query.attribute ? `${req.query.attribute}` : "favoriteFood" 
    const response = await new DogModel().entryCreateAttribute(attribute)
    return res.json(response);
})

app.get('/list', async (req, res) => {
    const response = await new DogModel().entryList()
    res.json(response)
});

// detail lookup
app.get("/detail/:id", async (req, res) => {
    const response = await new DogModel().entryDetail(req.params.id)
    return res.json(response);
})

app.listen(PORT, async () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
  await configureAppSchema()
  await new DogModel().configure()
});