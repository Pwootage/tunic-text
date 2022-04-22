import express from 'express';
import bodyparser from 'body-parser';
import * as fs from 'fs/promises';

export async function serverMain() {
  const app = express();
  app.use(bodyparser.json());

  app.get('/api/context', async (req, res) => {
    const list = await fs.readdir('./data');
    res.send(list);
  });

  app.get('/api/context/:id', async (req, res) => {
    const id = req.params.id;
    let data: any = {};
    try {
      data = JSON.parse(await fs.readFile(`./data/${id}/data.json`, {encoding: 'utf-8'}));
    } catch (e) {
      // Don't care
    }
    res.send(data);
  });

  app.post('/api/context/:id', async (req, res) => {
    const id = req.params.id;

    try {
      let data: any = req.body;
      await fs.writeFile(`./data/${id}/data.json`, JSON.stringify(data));
    } catch (e) {
      // Don't care
    }
    res.send({});
  });
  const port = 3001;
  app.listen(port, () => {
    console.log(`tunic-text-server listening on ${port}`);
  });
}

serverMain();