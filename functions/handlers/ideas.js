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
        likesCount: 0,
        commentsCount: 0,
        createdAt: new Date().toDateString()
        
    };

    db.collection('ideas')
        .add(newIdea)
        .then((doc) => {
            res.json({message: `document ${doc.id} created successfully`});
     
        })
        .catch((err) => {
            res.status(500).json({error: 'something went wrong'});
            console.error(err);
        });
}

exports.postAnswer = (req, res ) =>{
    console.log(req.body);
    req.body.json({success: "done"});
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
    console.log("----------visited----------");
    if(req.body.body.trim() === ''){
        return res.status(400).json({error: "Must not be empty"});
    }
    const newComment = {
        userName: req.body.user,
        ideaId: req.params.ideaId,
        body: req.body.body,
        createdAt: new Date().toDateString(),
        userImage: req.user.imageUrl
    };
    console.log("----------visited----------");
    db.doc(`/ideas/${req.params.ideaId}`).get()
        .then(doc => {
            if(!doc.exists){
                console.log("----------visited----------")
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
        createdAt: new Date().toDateString(),
        userImage: req.user.imageUrl
    };
    
    db.doc(`/ideas/${req.params.ideaId}`).get()
        .then(doc => {
            if(!doc.exists){
                console.log("----------visited----------")
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

