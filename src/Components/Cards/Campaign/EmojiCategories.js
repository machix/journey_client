import React from 'react';
import {Emoji} from 'emoji-mart-lite'

/*import agent from '../../agent';*/

const EmojiCategories = props => {
    const tags = props.tags;
    if (tags) {
        return (
            <div className="categories-list">
                {
                    tags.map(tag => {
                        const handleClick = ev => {
                            ev.preventDefault();

                        };

                        return (
                            <div
                                className="tag-default tag-pill"
                                key={tag}
                                onClick={handleClick}>
                                <Emoji className="emoji-pill" key={tag} emoji={tag} native="true" size={50}/>
                            </div>


                        );
                    })
                }
            </div>
        );
    } else {
        return (
            <div>Loading Users...</div>
        );
    }
};

export default EmojiCategories;
