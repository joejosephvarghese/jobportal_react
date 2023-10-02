import {Server} from 'http';
import configKeys from '../../config';




const serverConfig = (server: Server) => {
    const PORT = configKeys.PORT;
    console.log(PORT)
    const startServer = () => {
        server.listen(PORT, () => {
            console.log(`Server is running on port http://localhost:${PORT}`);
        })
    }
    return {
        startServer
    }
}

export default serverConfig;