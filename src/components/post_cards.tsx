import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postsData } from "../data/mockData"
import { styleResponsive } from "../styles/responsivness";
import RateCard from "../sub_components/rate_card";

const likesharecnt: React.CSSProperties = {
    display: 'flex',
    gap: '.2rem',
    color: 'gray',
    alignItems: 'center',
    cursor: 'pointer'
}

interface pc {
    postByCategory: string,
    expand: React.Dispatch<React.SetStateAction<boolean>>,
    cardId: React.Dispatch<React.SetStateAction<number>>,
    setViewComment: React.Dispatch<React.SetStateAction<boolean>>,
    setCommentId: React.Dispatch<React.SetStateAction<string>>,
    setViewCardCoordinates: React.Dispatch<React.SetStateAction<{ x: number, y: number }>>,
    cardScale: number,
    setCardScale: React.Dispatch<React.SetStateAction<number>>
}

export default function PostCards({ postByCategory, cardScale, setCardScale, expand, cardId, setViewComment, setCommentId, setViewCardCoordinates }: pc) {
    const navigate = useNavigate();
    const postData = postByCategory === 'All' ? postsData : postsData.filter(post => post.category === postByCategory)
    const { isDesktop } = styleResponsive();
    const [israting, setDisplayRating] = useState(false);
    const [isRate, setRate] = useState<{ [key: number]: boolean }>({});
    const [isPostId, setPostId] = useState<number>(0);
    const [thisCard, setThiscard] = useState<number>(0)
    const [longPressTimer, setLongPressTimer] = useState<ReturnType<typeof setTimeout> | null>(null);

    const handleRatingTogglePanel = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) { setDisplayRating(false) }
        //const rect = e.currentTarget.getBoundingClientRect();
        const posX = e.nativeEvent.clientX - e.nativeEvent.offsetX;
        const posY = e.nativeEvent.clientY - e.nativeEvent.offsetY;
        setViewCardCoordinates({ x: posX, y: posY });
    }

    const handlePostScaleDown = () => {
        setCardScale(cardScale === 1 ? 0 : 1);
    }

    // Simple click rating toggle
    const handleQuickRate = (e: React.MouseEvent, postId: number) => {
        e.stopPropagation();
        setRate(prev => ({
            ...prev,
            [postId]: !prev[postId]
        }));
    };

    // Long press for rating panel
    const handleRatingMouseDown = (e: React.MouseEvent, postId: number) => {
        e.stopPropagation();
        const timer = setTimeout(() => {
            setDisplayRating(true);
            setPostId(postId);
        }, 500); // 500ms long press
        setLongPressTimer(timer);
    };

    const handleRatingMouseUp = () => {
        if (longPressTimer) {
            clearTimeout(longPressTimer);
            setLongPressTimer(null);
        }
    };

    const closeRatingPanel = () => {
        setDisplayRating(false);
        setPostId(0);
    };

    

    
    const [follow, setFollow] = useState<number[]>([])
    
    const handleFollow = (idx: number) => {
        if (follow.includes(idx)) {
            setFollow(prev => prev.filter(x => x !== idx))
            return
        }
        setFollow(prev => [...prev, idx])
    }

    return (
        <>
            {
                postData.map((dat, idx) => (
                    <div onClick={(e) => { handleRatingTogglePanel(e); setThiscard(dat.id) }} key={idx} style={{ width: '100%', transform: `scale(${thisCard === dat.id ? cardScale : 1})`, transition: 'transform .1s ease', borderRadius: '20px', backdropFilter: 'blue(10px)', background: 'var(--global-component-bg-b)', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>

                        <div style={{ width: '100%', padding: '.4rem', display: 'flex', justifyContent: 'space-between' }}>

                            <div style={{ display: 'flex', gap: '.3rem', cursor: 'pointer' }} onClick={() => navigate(`/app/user/${dat.username}`)}>
                                <div style={{ background: '#03344b', width: '40px', height: '40px', color: 'white', padding: '20px', borderRadius: '100px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                    <span>{dat.username.substring(0, 1)}</span>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '.3rem' }}>
                                    <h4 style={{color: 'var(--global-txt-cl)'}}>{dat.username}</h4>
                                    <span style={{ color: 'GrayText', fontSize: '.8rem', lineHeight: '.8rem' }}>{dat.usertag}</span>
                                </div>
                            </div>
                            <div onClick={() => handleFollow(idx)}>
                                <span style={{cursor: 'pointer', color: 'gray'}}>{follow.includes(idx) ? 'Following' : 'follow'}</span>
                            </div>
                        </div>

                        <div onClick={() => { expand(true); handlePostScaleDown(); cardId(dat.id) }} style={{ width: '100%', cursor: 'pointer', height: isDesktop ? '350px' : '250px', overflow: 'hidden', background: 'black', borderRadius: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', objectFit: 'cover' }}>
                            <img src={dat.img} style={{ width: 'inherit', height: 'inherit', objectFit: 'cover' }} />
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <strong style={{ fontSize: '.9rem', lineHeight: '.9rem', color: '#033863' }}>{dat.category.toUpperCase()}</strong>
                            <span style={{ color: 'gray', fontSize: '.8rem', lineHeight: '.8rem' }}>{dat.time_posted}</span>
                        </div>

                        <article style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '.5rem' }}>
                            <h2 style={{color: 'var(--global-txt-cl)'}}>{dat.title}</h2>
                            <p style={{ color: 'var(--global-txt-cl)' }}>{dat.description}</p>
                        </article>

                        {israting && isPostId === dat.id && <RateCard closePanel={closeRatingPanel} />}

                        <div style={{ width: '100%', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                            <div style={likesharecnt}>
                                <img
                                    onMouseDown={(e) => handleRatingMouseDown(e, dat.id)}
                                    onMouseUp={handleRatingMouseUp}
                                    onMouseLeave={handleRatingMouseUp}
                                    onTouchStart={(e) => handleRatingMouseDown(e as unknown as React.MouseEvent<Element, MouseEvent>, dat.id)}
                                    onTouchEnd={handleRatingMouseUp}
                                    onClick={(e) => handleQuickRate(e, dat.id)}
                                    src={`https://img.icons8.com/?size=100&id=104&format=png&color=${isRate[dat.id] ? 'dfbf06' : '7a7a7a'}`}
                                    width="20px"
                                    height="20px"
                                  
                                    style={{ cursor: 'pointer' }}
                                />
                                <span>{dat.ratings}</span>
                            </div>
                            <div style={likesharecnt} onClick={() => { setViewComment(true); setCommentId(dat.postId) }}>
                                <img src="https://img.icons8.com/?size=100&id=143&format=png&color=000000" width="20px" height="20px"  />
                                <span>{dat.comment}</span>
                            </div>
                            <div style={likesharecnt}>
                                <img src="https://img.icons8.com/?size=100&id=TDCU7KRViM2Q&format=png&color=000000" width="20px" height="20px"  />
                                <span>{dat.share}</span>
                            </div>
                        </div>
                    </div>
                ))
            }
            {
                postData.length === 0 &&
                <div style={{ width: "100%", display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'GrayText' }}>
                    <span style={{ fontSize: '14px' }}>No post Available for this category yet. You can add Post</span>
                </div>
            }
        </>
    )
}

