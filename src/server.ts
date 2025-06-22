import { app } from "./app";

const PORT = process.env.PORT || 8080;

async function main() {
  app.listen(PORT, () => {
    console.log("SERVER IS RUNNING ON", PORT);
  });
}

main()