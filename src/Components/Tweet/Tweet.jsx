
/* El primer parametro de un componente SIEMPRE es un objeto */
function Tweet({ author_name, content, likes, retweets }) {
    

    return (
        <div className="">
            <h2>{author_name}</h2>
            <p>{content}</p>
            <div>
                <div>
                    <span>{likes}</span>
                    <button>Likes</button>
                </div>
                <div>
                    <span>{retweets}</span>
                    <button>Retweetear</button>
                </div>
            </div>
            <hr />
        </div>
    )

}
export { Tweet };

/* 
Un componente para ser componente tiene que:
    Devolver JSX (El html) 

Una expresion JSX solo puede tener un elemento padre
*/

