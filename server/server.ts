import express from 'express';
export async function serverMain() {
  const app = express();

  const port = 3001;
  app.listen(port, () => {
    console.log(`tunic-text-server listening on ${port}`);
  });
}

serverMain();