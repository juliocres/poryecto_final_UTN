Crear el component tweet:
    Recibira por props:
        author_name
        content
        likes
        retweets
        id
    El uso sera:
        <Tweet author_name='Pepe' content='VAMOS ARGENTINA!' likes={50} retweets={20} id={1}>
    Y renderizara:
        <div>
            <h2>{author_name}</h2>
            <p>{content}</p>
            <div>
                <div>
                    <span>{likes}</span>
                    <button>Like</button>
                </div>
                <div>
                    <span>{retweets}</span>
                    <button>Retweetear</button>
                </div>
            </div>
            </hr>
        </div>