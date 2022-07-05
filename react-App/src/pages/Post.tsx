import React, {useContext} from 'react';
import { deflate } from 'zlib';


type PostProps = {};

const Post = (props: PostProps) => {
    return (
        <div className='page-style'>
            <div className='page-style'>
                <h1>POST PAGE</h1>
                <h2>Saransh Agarwal</h2>
                <h2>N01452387 - Semester 4</h2>
                <h3>Web Programming and Frameworks 2</h3>
                <p>This is a web app built using react as a part of weekly labs</p>
            </div>
        </div>
    )
}

export default Post;