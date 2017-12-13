module.exports = function(app)
{
    var fs = require('fs');
    var prepend = require('prepend');
    var path = "./chatlog/"
    
    
    // GET CHAT
    app.get('/api/chats/get_chat/:file_id', function(req, res){
         console.log('check : %s',req.params.file_id);
        var data = fs.readFileSync(path+req.params.file_id+'.txt' ,'utf-8');     
        res.end(data);        
        
    });
    
    // send CHAT 
        app.put('/api/chats/send/:file_id', function(req, res){
        
            
            fs.stat(path+req.params.file_id+'.txt', function(err, stat) {
    if(err == null) {
        try{
    // 6. 동기 방식으로 파일을 생성. 함수의 인자는 앞에서 부터 순서대로 파일명, 입력데이터, 인코딩
    prepend(path+req.params.file_id+'.txt',req.body.text, function(error) {
    if (error)
        console.error(error.message);
    });
                res.end("done");
            }catch(e){
        console.log(e);
            }      
    } else if(err.code == 'ENOENT') {
        
        fs.writeFile(path+req.params.file_id+'.txt',req.body.text);
    } else {
        console.log('Some other error: ', err.code);
    }
});
            
            
            
            
            
    });
    
    
    
    
    /*
    
    
    // GET SINGLE USER
    app.get('/api/users/:user_id', function(req, res){
        User.findOne({_id: req.params.user_id},{_id: 1, name: 1, friend_list: 1} ,function(err, user){
            if(err) return res.status(500).json({error: err});
            if(!user) return res.status(404).json({error: 'user not found'});
            res.json(user);
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
                res.json({message: 'freind updated'});
            });
        });
    })
    // UPDATE add_friend BY ID 
    app.put('/api/users/add_friend/:user_id', function(req, res){

        User.findById(req.params.user_id, function(err, user){
        if(err) return res.status(500).json({ error: 'database failure' });
        if(!user) return res.status(404).json({ error: 'user not found' });            
            if(req.body.id) user.friend_list.push(req.body.id);            
            user.save(function(err){
                if(err) res.status(500).json({error: 'failed to update'});
                res.json({message: 'freind updated'});
            });
        });
        */
    /* [ ANOTHER WAY TO UPDATE THE BOOK ]

    */
    //});
    
    
    

 

    // UPDATE THE USER
    /*app.put('/api/users/:user_id', function(req, res){
        User.update({ _id: req.params.user_id }, { $set: req.body }, function(err, output){
            if(err) res.status(500).json({ error: 'database failure' });
            console.log(output);
            if(!output.n) return res.status(404).json({ error: 'user not found' });
            res.json( { message: 'user updated' } );
        })*/
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
    /*});

    // DELETE USER
    app.delete('/api/users/:user_id', function(req, res){
        User.remove({ _id: req.params.user_id }, function(err, output){
            if(err) return res.status(500).json({ error: "database failure" });
*/
            /* ( SINCE DELETE OPERATION IS IDEMPOTENT, NO NEED TO SPECIFY )
            if(!output.result.n) return res.status(404).json({ error: "book not found" });
            res.json({ message: "book deleted" });
            */
/*
            res.status(204).end();
        })
    });
     */
}