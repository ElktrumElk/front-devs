import { useRef, useState, type ChangeEvent } from "react";
import { categoriesData } from "../sub_components/categories";




export default function AddPost() {

    const MAX_LENGTH = 2200;
    const [remainingChars, setRemainingChars] = useState(MAX_LENGTH);

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const inputLength = e.target.value.length;
        setRemainingChars(MAX_LENGTH - inputLength);
    };

    const categories = categoriesData.filter(x => x !== 'All');
    const [cat, setCat] = useState(categories);

    const imageSelector = useRef<HTMLInputElement>(null);
    const [isImageSelected, setImageSelected] = useState(false);
    const [imageSrc, setImageSrc] = useState('');
    const [imageOpacity, setImageOpacity] = useState(1);

    const handleImageSelect = () => {
        imageSelector.current?.click();
    }

    const handleImageSelected = () => {
        const image = imageSelector.current?.files[0];

        if (image.type.startsWith("image/")) {

            requestAnimationFrame(() => {
                setImageOpacity(1);
            });

            const url = URL.createObjectURL(image);
            setImageSrc(url);
            setImageSelected(true);
        }
    }

    const destoryImage = () => {

        setImageOpacity(0);

        setTimeout(() => {
            URL.revokeObjectURL(imageSrc);
            setImageSelected(false);
            setImageSrc('');
        }, 300)
    }

    const [tag, setTag] = useState([]);
    const [addTagPanel, setAddTagPanel] = useState(false);

    const handleTag = (tagName: string) => {
        if (tag.includes(tagName)) { setTag(prev => prev.filter((items => items !== tagName))); return }
        setTag(prev => [...prev, tagName]);
    }

    const handTagPanel = (state: boolean, e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setAddTagPanel(state);
    }

    const tagInputElement = useRef<HTMLInputElement>(null);

    const handleAddTag = () => {
        const value = tagInputElement.current?.value.length !== 0 ? tagInputElement.current?.value : 'unknown'
        handleTag(value);
        setCat(prev => [value, ...prev]);
    }

    return (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', padding: '1rem' }}>
            <form style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '.3rem', width: '100%' }}>
                    <label htmlFor="title" style={{ fontWeight: 'bold' }}>Title</label>
                    <input id="title" placeholder="Title: Responsive Web design" required style={{ width: '100%', padding: '1rem', outline: 'none', border: 'none', borderRadius: '.5rem', fontSize: '1rem' }} />
                </div>

                <div style={{ width: '100%', background: 'white', borderRadius: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1rem' }}>

                    {
                        !isImageSelected &&
                        <>
                            <div onClick={handleImageSelect} style={{ width: '50px', height: '50px', borderRadius: '.5rem', border: '1px dashed red', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                <img src="https://img.icons8.com/?size=100&id=oF7jXJoq6nNX&format=png&color=000000" width={'20px'} height={'20px'} alt="add" />
                                <input ref={imageSelector} onChange={handleImageSelected} type="file" accept="image/*" hidden required />

                            </div>
                        </>
                    }
                    {
                        isImageSelected &&
                        <>

                            <div style={{ width: '100%', opacity: imageOpacity, transition: 'opacity .4s ease', height: '15rem', background: 'black', borderRadius: '1rem', objectFit: 'cover', overflow: 'hidden', position: 'relative' }}>

                                <div onClick={destoryImage} style={{ width: '30px', height: '30px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRadius: '2rem', background: '#191818bc', backdropFilter: 'blur(10px)', position: 'absolute', right: '10px', top: '10px' }}>
                                    <img src="https://img.icons8.com/?size=100&id=1NVn5K29mOSz&format=png&color=ffffff" width={"20"} height={"20"} alt="cancel" />
                                </div>

                                <img style={{ width: '100%' }} src={imageSrc} />
                            </div>
                        </>
                    }


                    <textarea onChange={handleChange} maxLength={2000} required placeholder="Say something about this post..." style={{ width: '100%', height: '5rem', resize: 'none', outline: 'none', border: 'none', fontSize: '1rem' }}></textarea>
                    <div style={{ display: 'flex', color: 'GrayText', fontSize: '.8rem', alignSelf: 'flex-end' }}>
                        <span>{remainingChars}</span>
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '.4rem', width: '100%', position: 'relative', background: 'white', padding: '1rem', borderRadius: '1rem' }}>


                    {
                        tag.length !== 0 &&
                        <>
                            <span>Tags</span>
                            <div style={{ display: 'flex', gap: '.5rem', overflowX: 'auto', background: '#f5f5f5', padding: '.6rem', borderRadius: '.5rem' }}>
                                {
                                    tag.map((tg, idx) => (
                                        <div onClick={() => handleTag(tg)} key={idx} style={{ background: '#ffffff', padding: '.5rem', flex: '0 0 auto', borderRadius: '.5rem' }}>
                                            <span>{tg}</span>
                                        </div>
                                    ))
                                }
                            </div>
                        </>
                    }
                    <span>Add Tags</span>
                    <ul style={{ display: 'flex', background: '#f5f5f5', overflowX: 'auto', listStyle: 'none', gap: '.5rem', position: 'relative', padding: '.5rem', scrollbarColor: 'transparent', scrollbarWidth: 'none' }}>

                        {
                            !addTagPanel &&
                            <>
                                <button onClick={(e) => handTagPanel(true, e)} style={{ background: '#010a1b', display: 'flex', border: 'none', flexDirection: 'column', alignItems: 'center', position: 'sticky', left: '0', justifyContent: 'center', boxShadow: '0 0 .2rem #dfdddde7', flex: '0 0 auto', width: '40px', height: '30px', borderRadius: '.5rem' }}>
                                    <img src="https://img.icons8.com/?size=100&id=oF7jXJoq6nNX&format=png&color=ffffff" width={"20"} height={"20"} />
                                </button>

                                {
                                    cat.map((cat, idx) => (
                                        <li onClick={() => handleTag(cat)} key={idx} style={{ backgroundColor: tag.includes(cat) ? '#1499ec40' : 'white', flex: '0 0 auto', padding: '.2rem 1rem', borderRadius: '1rem' }}>{cat}</li>
                                    ))
                                }
                            </>
                        }

                        {
                            addTagPanel &&
                            <div style={{ display: 'flex', alignItems: 'center', width: '100%', padding: '.5rem', borderRadius: '1rem', background: '#f5f5f5' }}>
                                <input ref={tagInputElement} style={{ padding: '.5rem', fontSize: '1rem', flex: '1', border: 'none', outline: 'none', background: 'none' }} placeholder="Tag name" />
                                <div style={{ display: 'flex', gap: '.5rem', alignItems: 'center' }}>

                                    <button onClick={(e) => handTagPanel(false, e)} type="button" style={{ marginInlineStart: 'auto', background: '#f5f5f5', border: 'none', color: 'black', padding: '.5rem', borderRadius: '.5rem' }}>
                                        <span>Cancel</span>
                                    </button>

                                    <button onClick={(e) => { handTagPanel(false, e); handleAddTag() }} type="button" style={{ marginInlineStart: 'auto', background: '#010a1b', border: 'none', color: 'white', padding: '.5rem', borderRadius: '.5rem' }}>
                                        <span>Add</span>
                                    </button>
                                </div>
                            </div>
                        }
                    </ul>


                </div>

                <div style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '.2rem', width: '100%' }}>
                        <label htmlFor="cat" style={{ fontSize: '.9rem' }}>Add Category</label>
                        <select id="cat" required style={{ width: '100%', padding: '1rem', borderRadius: '.5rem', outline: 'none', border: 'none', background: 'white' }}>
                            {
                                categories.map((cat, idx) => (
                                    <option key={idx} >{cat}</option>
                                ))
                            }
                        </select>
                    </div>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '.3rem', width: '100%' }}>
                    <label htmlFor="prev-link" >Preview Link</label>
                    <input id="prev-link" placeholder="https://myapp.com" style={{ width: '100%', padding: '1rem', outline: 'none', border: 'none', borderRadius: '.5rem', fontSize: '1rem' }} />
                </div>

                <button style={{ width: '100%', padding: '1rem', borderRadius: '1rem', marginBlockStart: '4rem', marginBlockEnd: '1rem', background: '#010a1b', border: 'none', color: 'white' }}>Post</button>
            </form>
        </div>
    )
}