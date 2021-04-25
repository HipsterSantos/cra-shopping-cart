const express = require('express');
const router = express();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config  = require('config');
const mongoose = require('mongoose');

let {User}   = require('../models/user');

router.get('/me', async (req,res)=>{

})