import { getDocs, collection,doc,deleteDoc } from "firebase/firestore";
import { db, auth } from "../../config/firebase";
import { useState, useEffect } from 'react';
import { Post } from './post';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';

export const Main = () => {
    const [postList, setPostList] = useState(null);
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();
    const postsRef = collection(db, "posts");

    const getPosts = async () => {
        try {
            const data = await getDocs(postsRef);
            setPostList(data.docs.map((doc) => ({ ...doc.data(), id:doc.id })));
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    }
    
    const deletePost = async (postId) => {
        const postDoc = doc(db, "posts", postId);
        await deleteDoc(postDoc);
        setPostList(prev => prev.filter(post => post.id !== postId));
    };

    useEffect(() => {
        if (user) {
            getPosts();
        } else if (!loading) {
            navigate('/login'); // Redirect to login if not authenticated
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, loading]);

    if (loading) {
        return <p>Loading...</p>; // Show loading state
    }

    if (error) {
        return <p>Error: {error.message}</p>; // Show error message if any
    }

    return (
        <div>
  {user ? (
    <>
      <h1 className="home-page-title">🌟 Welcome to Our Community! 🌟</h1>
      <p className="home-page-description">Share your thoughts, experiences, and inspiration with our vibrant community. Below, you'll find posts from fellow members as well as your own contributions.</p>
      {postList?.map((post) => (<Post key={post.id} post={post} deletePost={deletePost} />))}
    </>
  ) : (
    <p>Please log in to see the posts.</p>
  )}
</div>

    );
}
