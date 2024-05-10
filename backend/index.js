const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const WebSocket = require('ws');
const FileOffer = require('./database/schemas/FileOffer');
const ShortUniqueId = require('short-unique-id');

const suid = new ShortUniqueId({ length: 6 });

const PeerServer = require('peer').PeerServer;

const stun = require('stun');
const dgram = require('dgram');

dotenv.config();

require('./database');
require('./database/gc');

const domain =
    process.env.NODE_ENV === 'production' ? process.env.Domain : 'mysite.local';

const app = express();

const jsonParser = bodyParser.json();

app.use(cors());
app.use(jsonParser);

const appRoute = require('./routes/App');
const apiRoute = require('./routes/Api');

app.use('/', appRoute);
app.use('/api/', apiRoute);

const dgramServer = dgram.createSocket('udp4');

const stunOptions = {
    type: 'udp4',
    socket: dgramServer,
};

const stunServer = stun.createServer(stunOptions);

stunServer.on('error', (err) => {
    console.error('STUN server error', err);
});

const port = 3478;
dgramServer.bind(port, () => {
    const address = dgramServer.address();
    console.log(`STUN server listening on ${address.address}:${address.port}`);
});

const server = app.listen(process.env.APP_PORT, () =>
    console.log(`${domain} started on port ${process.env.APP_PORT}`)
);

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
    console.log('WS: Client connected');

    let uuid = '';
    const serviceId = suid.rnd()

    ws.on('message', async (message) => {
        console.log(`WS: Received message: ${message}`);
        const data = JSON.parse(message);

        uuid = data.peerid;

        try {
            await FileOffer.create({
                uuid: data.peerid,
                serviceId: serviceId,
                fileName: data.name,
                fileSize: data.size,
            });
            ws.send(serviceId);
        } catch (err) {
            console.log(err);
        }
    });

    ws.on('close', async () => {
        console.log('WS: Client disconnected');
        try {
            const fileOffer = await FileOffer.findOne({ uuid: uuid });
            await fileOffer.deleteOne();
        } catch (err) {
            console.log(err);
        }
    });
});
