const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const authenticate = require('../auth/authenticate-middleware');
const authRouter = require('../auth/auth-router');
const postsRouter = require('../posts/posts-router');
const recsRouter = require('../recs/recs-router');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api/posts', authenticate, postsRouter);
server.use('/api/recs', authenticate, recsRouter);

server.get('/', (req, res) => {
  res.send(`API is running on port: ${process.env.PORT}`)
})

module.exports = server;
