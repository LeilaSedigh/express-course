import { bootstrap } from "./app.mjs";

bootstrap().then(server => {
    server.listen(3000, () => {
        console.log("Server is Runing Port", 3000);
    });
})