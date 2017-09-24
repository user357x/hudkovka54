'use strict';

const router = express.Router();

router.get('/', require('./home'));
router.get('/production', require('./production'));
router.get('/about', require('./about'));
router.get('/contacts', require('./contacts'));
router.get('/kak-to-tak', require('./kak-to-tak'));
router.get('/exclusivnaya-kovka', require('./exclusivnaya-kovka'));
router.get('/kovanaya-arhitektura', require('./kovanaya-arhitektura'));
router.get('/kovanaya-chasovnja', require('./kovanaya-chasovnja'));
router.get('/kovanye-lestnitsy', require('./kovanye-lestnitsy'));
router.get('/kovanaya-mebel', require('./kovanaya-mebel'));
router.get('/kovanye-zabory', require('./kovanye-zabory'));
router.get('/kovanye-perila', require('./kovanye-perila'));
router.get('/kovanye-reshotki', require('./kovanye-reshotki'));
router.get('/kovanye-vorota', require('./kovanye-vorota'));
router.get('/ritualnaya-kovka', require('./ritualnaya-kovka'));

module.exports = router;