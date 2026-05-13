import { useRef, useState, type ChangeEvent } from "react";
import { categoriesData } from "../sub_components/categories";




export default function AddPost() {

    const MAX_LENGTH = 2200;
    const [remainingChars, setRemainingChars] = useState(MAX_LENGTH);

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const inputLength = e.target.value.length;
        setRemainingChars(MAX_LENGTH - inputLength);
    };

    const categories = categoriesData;

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

    return (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', padding: '1rem' }}>
            <form style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '.3rem', width: '100%' }}>
                    <label htmlFor="title" style={{ fontWeight: 'bold' }}>Title</label>
                    <input id="title" placeholder="Title: Responsive Web design" required style={{ width: '100%', padding: '.4rem', outline: 'none', border: 'none', borderRadius: '.5rem', fontSize: '1rem' }} />
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

                <div style={{ display: 'flex', flexDirection: 'column', gap: '.3rem', width: '100%' }}>
                    <label htmlFor="prev-link" >Preview Link</label>
                    <input id="prev-link" placeholder="https://myapp.com" style={{ width: '100%', padding: '1rem', outline: 'none', border: 'none', borderRadius: '.5rem', fontSize: '1rem' }} />
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
                <button style={{ width: '100%', padding: '1rem', borderRadius: '1rem', marginBlockStart: '6rem', background: '#010a1b', border: 'none', color: 'white' }}>Post</button>
            </form>
        </div>
    )
}