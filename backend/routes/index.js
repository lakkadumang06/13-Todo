var express = require('express');
var router = express.Router();
var user = require('../controller/usercontroller');
var auth = require('../middleware/auth');
var todo = require('../controller/todocontroller');

/* GET home page. */
router.post('/register', user.insert);
router.get('/', auth.check_token,user.get_data);

// router.post('/update_data/:id', user.update_data);
router.put('/update_data/:id', user.update_data);

// router.get('/delete_data/:id', user.delete_data);
router.delete('/delete_data/:id', user.delete_data);
router.get('/get_single/:id', user.get_single);

router.post('/login', user.login);



/* todo routes */

router.post('/todo/addtodo', todo.insert);
router.get('/todo',auth.check_token,todo.get_data)
router.put('/todo/:id',todo.update_data)
router.delete('/todo/:id',todo.delete_data)
router.get('/todo/:id',todo.get_single)

module.exports = router;
