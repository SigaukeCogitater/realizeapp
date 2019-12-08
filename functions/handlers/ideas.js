const { db } = require('../util/admin');

exports.getAllIdeas = (req, res) => {
    db.collection('ideas')
    .orderBy('createdAt', 'desc')
    .get()
        .then(data => {
            let ideas = [];
            data.forEach(doc => {
                ideas.push({
                    ideaId: doc.id,                    
                    body: doc.data().body,
                    description: doc.data().description,
                    category: doc.data().category,
                    createdAt: doc.data().createdAt,
                    likesCount: doc.data().likesCount,
                    commentsCount: doc.data().commentsCount,
                    userImage: doc.data().userImage,
                    userName: doc.data().userName

                });
            });
            return res.json(ideas);

        })
        .catch((err) => {
        
            console.error(err)
            res.status(500).json({error: err.code});
        });

}



//userIdeas

exports.getAllUserIdeas = (req, res) => {
    db.collection('ideas')
    .orderBy('createdAt', 'desc')
    .where('userName','==',req.params.userName)
    .get()
        .then(data => {
            let ideas = [];
            data.forEach(doc => {
                ideas.push({
                    
                    ideaId: doc.id,                    
                    body: doc.data().body,
                    description: doc.data().description,
                    category: doc.data().category,
                    createdAt: doc.data().createdAt,
                    likesCount: doc.data().likesCount,
                    commentsCount: doc.data().commentsCount,
                    userImage: doc.data().userImage,
                    userName: doc.data().userName

                });
            });
            return res.json(ideas);

        })
        .catch((err) => {
        
            console.error(err)
            res.status(500).json({error: err.code});
        });
}





exports.postIdea = (req, res) => {

    const newIdea = {
        body: req.body.body,
        userName: req.user.userName,
        description: req.body.description,
        category: req.body.category,
        userImage: req.user.imageUrl,
        likesCount: 0,
        commentsCount: 0,
        createdAt: new Date().toISOString()
        
    };

    db.collection('ideas')
        .add(newIdea)
        .then((doc) => {
            const resIdea = newIdea;
            resIdea.ideaId = doc.id;
            res.json(resIdea);
     
        })
        .catch((err) => {
            res.status(500).json({error: 'something went wrong'});
            console.error(err);
        });
}

// fetch idea

exports.getIdea = (req, res) => {
    let ideaData = {};
    db.doc(`/ideas/${req.params.ideaId}`)
        .get()
        .then((doc) => {
            if(!doc.exists){
                return res.status(404).json({error: 'idea not found'});
            }
            ideaData = doc.data();
            ideaData.ideaId = doc.id;
            return db.collection('comments')
                .where('ideaId', '==', req.params.ideaId)
                .orderBy('createdAt', 'desc')
                .get();
        }).then(data => {
            ideaData.comments = [];
            data.forEach(doc => {
                ideaData.comments.push(doc.data());

            })
            return res.json(ideaData);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({error: err.code});


        })

}

//comment on idea

exports.commentOnIdea = (req, res) => {
    
    if(req.body.body.trim() === ''){
        return res.status(400).json({comment: "Must not be empty"});
    }
    const newComment = {
        userName: req.body.user,
        ideaId: req.params.ideaId,
        body: req.body.body,
        createdAt: new Date().toISOString(),
        userImage: req.user.imageUrl
    };
    console.log("----------visited----------");
    db.doc(`/ideas/${req.params.ideaId}`).get()
        .then(doc => {
            if(!doc.exists){
                return res.status(404).json({error: "Idea not found"});
            }
            return db.collection('comments').add(newComment);

        }).then(() => {
            res.json(newComment);
        }).catch(err => {
            console.log(err);
            res.status(500).json({error: 'Something went wrong'});
        }); 

}




exports.postCommentOnIdea = (req, res) => {

    if(req.body.body.trim() === ''){
        return res.status(400).json({error: "Must not be empty"});
    }
    const newComment = {
        userName: req.user.userName,
        ideaId: req.params.ideaId,
        body: req.body.body,
        createdAt: new Date().toISOString(),
        userImage: req.user.imageUrl
    };
    
    db.doc(`/ideas/${req.params.ideaId}`).get()
        .then(doc => {
            if(!doc.exists){
                // console.log("----------visited----------")
                return res.status(404).json({error: "Idea not found"});
            }
            return doc.ref.update({commentsCount: doc.data().commentsCount + 1});

        })
        .then(() => {
            return db.collection('comments').add(newComment);
        })      
        .then(() => {
            res.json(newComment);
        }).catch(err => {
            console.log(err);
            res.status(500).json({error: 'Something went wrong'});
        }); 
}

exports.likeIdea = (req, res) => {
    //console.log(res.cors);
    const likeDocument = db.collection('likes')
        .where('userName', '==', req.user.userName)
        .where('ideaId', '==', req.params.ideaId)
        .limit(1);

    const ideaDocument = db.doc(`ideas/${req.params.ideaId}`);

    let ideaData;

    ideaDocument.get()
        .then(doc => {

            if(doc.exists){
                ideaData = doc.data();
                ideaData.ideaId = doc.id;
                return likeDocument.get();
                
            }else{
                return res.status(404).json({error: 'Idea not found'});

            }
        }).then(data => {
            if(data.empty){
                return db.collection('likes').add({
                    ideaId: req.params.ideaId,
                    userName: req.user.userName
                })
                .then(()=> {
                    ideaData.likesCount++;
                    return ideaDocument.update({likesCount: ideaData.likesCount});
                })
                 .then(()=> {
                    return res.json(ideaData);
                 });
                
            }else {
                res.status(400).json({error: 'Idea already liked' });
            }

        }).catch((err) => {
            console.error(err);
            res.status(500).json({error: err.code});

        });

};

exports.unlikeIdea = (req, res) => {
    const likeDocument = db.collection('likes')
    .where('userName', '==', req.user.userName)
    .where('ideaId', '==', req.params.ideaId)
    .limit(1);

    const ideaDocument = db.doc(`ideas/${req.params.ideaId}`);

    let ideaData;

    ideaDocument.get()
        .then(doc => {

            if(doc.exists){
                ideaData = doc.data();
                ideaData.ideaId = doc.id;
                return likeDocument.get();

            }else{
                return res.status(404).json({error: 'Idea not found'});

            }
        }).then(data => {
            if(data.empty){

                return res.status(400).json({error: 'Idea already unliked' });
                
            }else {
                return db.doc(`/likes/${data.docs[0].id}`).delete()
                    .then(() => {
                        ideaData.likesCount--;
                        return ideaDocument.update({likesCount: ideaData.likesCount});
                    })
                    .then(() => {
                        res.json(ideaData);
                    })
            }

        }).catch((err) => {
            console.error(err);
            res.status(500).json({error: err.code});

    });
}

exports.deleteIdea = (req, res) => {

    const ideaDocument = db.doc(`/ideas/${req.params.ideaId}`);
    ideaDocument.get()
        .then(doc => {
            if(!doc.exists){
                return res.status(404).json({error: 'Idea not found'});
            }
            if(doc.data().userName !== req.user.userName){
                return res.status(403).json({error: 'Unauthorized'});
            }else{
                ideaDocument.delete();
            }
        })
        .then(() => {
            res.json({message: 'Idea deleted successfully'});
            
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({error: err.code});
        });
};