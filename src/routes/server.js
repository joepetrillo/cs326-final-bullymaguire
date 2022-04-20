import express from 'express';
import logger from 'morgan';
import { readFile, writeFile } from 'fs/promises'


const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use()


router = express.Router();
router.get('/users/', (req, res) => {
    res.send('Hello World!');
}
);

