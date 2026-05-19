import { useRef, type SetStateAction, useEffect } from "react"
import { UserComment } from "../data/comments";
import { postsData } from "../data/mockData";
import { useState } from "react";

interface viewcomment {
    setPanelOpen: React.Dispatch<SetStateAction<boolean>>,
    commentId: string
}

interface CommentItem {
    id: number;
    userCommentName: string;
    comment: string;
    time: string;
}

export default function ViewCommentPanel({ setPanelOpen, commentId }: viewcomment) {
    // FIX 1: Convert to 'unknown' first to cleanly map your hook's rigid return shape
    const { comments, setComments } = UserComment() as unknown as {
        comments: Record<string, CommentItem[]>;
        setComments: React.Dispatch<React.SetStateAction<Record<string, CommentItem[]>>>
    };

    const initialComments: CommentItem[] = comments[commentId] ? comments[commentId] : [];
    const [filterComment, setFilterCmt] = useState<CommentItem[]>(initialComments);

    const [commentImage] = postsData.filter(prev => prev.postId === commentId);
    const commentInput = useRef<HTMLInputElement>(null);

    // Prevent body scroll when modal is open
    useEffect(() => {
        document.body.classList.add('modal-open');
        return () => {
            document.body.classList.remove('modal-open');
        };
    }, []);

    const handleComments = () => {
        const value = commentInput.current?.value;
        if (!value) return;

        const newComment: CommentItem = {
            id: filterComment.length + 1,
            userCommentName: 'ElktrumElk',
            comment: value,
            time: 'just now'
        };

        const updatedTargetComments = [newComment, ...filterComment];

        setFilterCmt(updatedTargetComments);
        setComments({
            ...comments,
            [commentId]: updatedTargetComments
        });

        // FIX 2: Added optional chaining verification before reassignment to protect against null values
        if (commentInput.current) {
            commentInput.current.value = '';
        }
    };

    return (
        <>
            <div style={styles.backgroundContainer} className="backgroundContainer">
                <div style={styles.viewCommentCnt} className="viewCard">

                        <header style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                            <h1>Comments</h1>
                            <button style={{ marginInlineStart: 'auto', cursor: 'pointer', background: 'none', border: 'none', padding: '.4rem', borderRadius: '1rem', color: 'white' }} onClick={() => setPanelOpen(false)}>
                                <img src="https://img.icons8.com/?size=100&id=8112&format=png&color=7a7a7a" width={'20'} height={'20'} />
                            </button>
                        </header>
                    <section style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', overflowY: 'auto' }}>
                        <div style={styles.figureImageCnt}>
                            {commentImage && <img style={styles.previewImage} src={commentImage.img} alt="post preview" />}
                        </div>

                        <section style={{ display: 'flex', width: '100%', flexDirection: 'column', gap: '.5rem' }}>
                            {
                                filterComment.map((cmt, idx) => (

                                    <div key={idx} style={{ display: 'flex', gap: '.5rem' }}>
                                        <div style={styles.profileImage} className="p-img-cnt">
                                            <span>{cmt.userCommentName.substring(0, 1)}</span>
                                        </div>

                                        <article style={styles.article} className="article">
                                            <header style={{ width: '100%', display: 'flex', justifyContent: 'space-between', gap: '.5rem' }}>
                                                <div style={{ display: 'flex', gap: '.5rem', alignItems: 'center' }}>
                                                    <h4>{cmt.userCommentName}</h4>
                                                </div>
                                                <div>
                                                    <span style={{ color: 'GrayText', fontSize: '.8rem' }}>{cmt.time}</span>
                                                </div>
                                            </header>
                                            <div>
                                                <p>{cmt.comment}</p>
                                            </div>
                                        </article>
                                    </div>
                                ))
                            }
                            {
                                filterComment.length === 0 &&
                                <div style={{ width: '100%', display: 'flex', height: '15rem', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                    <span style={{ color: "GrayText" }}>No comment Available</span>
                                </div>
                            }
                        </section>
                    </section>

                    <div className="buttonCnt" style={{ display: 'flex', alignItems: 'center', width: '100%', padding: '.2rem', borderRadius: '1rem', background: '#f5f5f5', marginBottom: '1rem', justifyContent: 'space-between', marginBlockStart: 'auto' }}>
                        <input ref={commentInput} style={{ width: '100%', padding: '1rem', fontSize: '20px', outline: 'none', background: 'none', border: 'none' }} placeholder="Leave A comment" />
                        <button onClick={handleComments} style={{ background: 'rgb(10, 0, 17)', width: '100px', padding: '1rem', border: 'none', borderRadius: '1rem', color: '#fff' }}>Send</button>
                    </div>
                </div>
            </div >
        </>
    )
}

const styles: { [key: string]: React.CSSProperties } = {
    backgroundContainer: {
        background: '#11101049',
        inset: 0,
        position: 'fixed',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end',
        zIndex: 2000,
        overflow: 'hidden',
        padding: '3rem',
        
    },
    viewCommentCnt: {
        width: '50rem',
        height: 'auto',
        maxHeight: '100dvh',
        padding: '1rem',
        background: '#fff',
        borderRadius: '1rem',
        gap: '2rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        flex: '0 0 auto',
        flexShrink: '0',
        overflow: 'hidden',
    },
    article: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '.6rem',
        background: '#f5f5f5',
        padding: '1rem',
        borderRadius: '1rem',
    },
    profileImage: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '4rem',
        width: '50px',
        height: '50px',
        flex: '0 0 auto',
        background: '#023139',
        color: 'white'
    },
    figureImageCnt: {
        width: '100%',
        maxHeight: '200px',
        overflow: 'hidden',
        borderRadius: '1rem',
        flex: '0 0 auto'
    },
    previewImage: {
        width: '100%',
        height: '100%',
        objectFit: 'cover'
    }
};
