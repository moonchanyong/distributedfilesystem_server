module.exports = function(app, User)
{
    // GET ALL USERS
    app.get('/api/users', function(req,res){
        User.find(function(err, users){
            if(err) return res.status(500).send({error: 'database failure'});
            //res.writeHead(200,{'Content-Type':'text/json'});
            return res.status(200).json(users);
        })
    });

    
    
    
    
    // GET SINGLE USER
    app.get('/api/users/:user_id', function(req, res){
        User.findOne({_id: req.params.user_id},{_id: 1, name: 1, friend_list: 1} ,function(err, user){
            if(err) return res.status(500).json({error: err});
            if(!user) return res.status(404).json({error: 'user not found'});
            //res.writeHead(200,{'Content-Type':'text/json'});
            return res.status(200).json(user);
        })
    });
    
 app.get('/api/users/email/:email', function(req, res){
        User.findOne({email: req.params.email}, {_id: 1, name: 1, friend_list: 1},  function(err, users){
            if(err) return res.status(500).json({error: err});
        
            // res.writeHead(200,{'Content-Type':'text/json'});
            return res.status(200).json(users);
        })
    });

        // login ID 
 app.get('/login/:email/:password', function(req, res){


       User.findOne( {email: req.params.email }, {_id: 1,password: 1, name: 1, }, function(err, user){
            
    
        var password = req.params.password;
        var result = {};
            
        
        if(err) return res.status(500).json({error: err});
        if(!user) return res.status(500).json({error: err});
           console.log("%s" , user._id);

            if(user.password == password){
                result["success"] = 1;
                result["_id"] = user._id;
            //    res.writeHead(200,{ 'Content-Type' :'text/json'});
                return res.status(200).json(result);
            

            }else{
                result["success"] = 0;
                result["error"] = "incorrect";
            //    res.writeHead(200,{'Content-Type':'text/json'});
                return res.status(500).json(result);
            }
        })
    });
    
    
    // UPDATE remove_friend BY ID 
    app.put('/api/users/remove_friend/:user_id', function(req, res){
        User.findById(req.params.user_id, function(err, user){
        if(err) return res.status(500).json({ error: 'database failure' });
        if(!user) return res.status(404).json({ error: 'user not found' });            
            if(req.body.id){
                    for (var i = 0; i < user.friend_list.length; i++) {
                        if (user.friend_list[i] === req.body.id) {
                            user.friend_list.splice(i, 1);
                            i--;
                        }
                    }                                
                           }
            user.save(function(err){
                if(err) res.status(500).json({error: 'failed to update'});
            res.writeHead(200,{'Content-Type':'text/json'});
                res.json({message: 'freind updated'});
            });
        });
    });
    // UPDATE add_friend BY ID 
    app.put('/api/users/add_friend/:user_id', function(req, res){

        User.findById(req.params.user_id, function(err, user){
        if(err) return res.status(500).json({ error: 'database failure' });
        if(!user) return res.status(404).json({ error: 'user not found' });            
            if(req.body.id) user.friend_list.push(req.body.id);            
            user.save(function(err){
                if(err) res.status(500).json({error: 'failed to update'});
                res.status(200).json({message: 'freind updated'});
            });
        });
    /* [ ANOTHER WAY TO UPDATE THE BOOK ]

    */
    });
    
    
    // GET USER BY email
    app.get('/api/users/email/:email', function(req, res){
        User.find({email: req.params.email}, {_id: 1, name: 1, friend_list: 1},  function(err, users){
            if(err) return res.status(500).json({error: err});
            if(users.length === 0) return res.status(404).json({error: 'user not found'});
            res.json(users);
        })
    });

    // CREATE USER
    app.post('/api/users', function(req, res){
        var user = new User();
        user.email = req.body.email;
        user.name = req.body.name;
        user.password = req.body.password;
        user.friend_list = req.body.friend_list;
        user.save(function(err){
            if(err){
                console.error(err);
                res.json({result: 0});
                return;
            }
            res.writeHead(200,{'Content-Type':'text/json'});
            res.json({result: 1});

        });
    });

    // UPDATE THE USER
    app.put('/api/users/:user_id', function(req, res){
        User.update({ _id: req.params.user_id }, { $set: req.body }, function(err, output){
            if(err) res.status(500).json({ error: 'database failure' });
            console.log(output);
            if(!output.n) return res.status(404).json({ error: 'user not found' });
            res.json( { message: 'user updated' } );
        })
    /* [ ANOTHER WAY TO UPDATE THE BOOK ]
            Book.findById(req.params.book_id, function(err, book){
            if(err) return res.status(500).json({ error: 'database failure' });
            if(!book) return res.status(404).json({ error: 'book not found' });
            if(req.body.title) book.title = req.body.title;
            if(req.body.author) book.author = req.body.author;
            if(req.body.published_date) book.published_date = req.body.published_date;
            book.save(function(err){
                if(err) res.status(500).json({error: 'failed to update'});
                res.json({message: 'book updated'});
            });
        });
    */
    });

    // DELETE USER
    app.delete('/api/users/:user_id', function(req, res){
        User.remove({ _id: req.params.user_id }, function(err, output){
            if(err) return res.status(500).json({ error: "database failure" });

            /* ( SINCE DELETE OPERATION IS IDEMPOTENT, NO NEED TO SPECIFY )
            if(!output.result.n) return res.status(404).json({ error: "book not found" });
            res.json({ message: "book deleted" });
            */

            res.status(204).end();
        })
    });
     
}