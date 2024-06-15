import { addDoc, getDocs, collection, query, where,deleteDoc,doc } from 'firebase/firestore';
import { db, auth } from "../../config/firebase";
import { useAuthState } from 'react-firebase-hooks/auth';
import { useState, useEffect } from 'react';
import '../../App.css';
export const Post = ({ post, deletePost }) => {
    const [user] = useAuthState(auth);
    const [likes, setLikes] = useState([]);

    const likesRef = collection(db, "likes");
    const likesDoc = query(likesRef, where("postId", "==", post.id));

    const getLikes = async () => {
        const data = await getDocs(likesDoc);
        setLikes(data.docs.map((doc) => ({ userId: doc.data().userId })));
    };

    const addLike = async () => {
        if (user) {
            // Optimistically update the likes state
            setLikes((prev) => [...prev, { userId: user.uid }]);
            
            await addDoc(likesRef, {
                userId: user.uid,
                postId: post.id
            });
            
            // Fetch the updated likes from the database
            getLikes();
        }
    };

    const removeLike = async () => {
        if (user) {
            const likeToDeleteQuery = query(
                likesRef, 
                where("postId", "==", post.id),
                where("userId", "==", user.uid)
            );
            const likeToDeleteData = await getDocs(likeToDeleteQuery);

            if (likeToDeleteData.docs.length > 0) {
                const likeToDelete = doc(db, "likes", likeToDeleteData.docs[0].id);

                // Optimistically update the likes state
                setLikes((prev) => prev.filter((like) => like.userId !== user.uid));

                await deleteDoc(likeToDelete);

                // Fetch the updated likes from the database
                getLikes();
            }
        }
    };

    const deleteLikesForPost = async (postId) => {
        const likesToDeleteQuery = query(likesRef, where("postId", "==", postId));
        const likesToDeleteSnapshot = await getDocs(likesToDeleteQuery);
        
        likesToDeleteSnapshot.forEach(async (doc) => {
            await deleteDoc(doc.ref);
        });
    };

    const handleDeletePost = async (postId) => {
        // Delete likes for the post
        await deleteLikesForPost(postId);
        
        // Delete post
        await deletePost(postId);
    };

    const hasUserLiked = likes.find((like) => like.userId === user?.uid);

    useEffect(() => {
        getLikes();
        // eslint-disable-next-line
    }, []);
     
    return (
        <div className='post'>
            <div className="title">
                <h1>{post.title}</h1>
            </div>
            <div className="body">
                <p>{post.description}</p>
            </div>
            <div className="footer">
                <p>@{post.username}</p>
                <button className='like-button' onClick={hasUserLiked ? removeLike : addLike}>
                    {hasUserLiked ? <>&#128078;</> : <>&#128077;</>}
                </button>
                {likes.length > 0 && <p>Likes: {likes.length}</p>}
                {user && user.uid === post.userId && (
                    <button  onClick={() => handleDeletePost(post.id)} className="delete-button">Delete Post</button>
                )}
            </div>
        </div>
    );
};