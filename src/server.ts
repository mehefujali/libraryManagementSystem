import { app } from "./app";

const PORT = process.env.PORT || 8080;

async function main(): Promise<void> {
  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log("SERVER IS RUNNING ON", PORT);
  });
}

main();