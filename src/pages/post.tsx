



export default function AddPost() {

    return (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', padding: '1rem'}}>
            <form style={{width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem'}}>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '.3rem', width: '100%'}}>
                    <label htmlFor="prev-link" style={{fontWeight: 'bold'}}>Preview Link</label>
                    <input id="prev-link" placeholder="https://myapp.com"  style={{ width: '100%', padding: '.4rem', outline: 'none', border: '1px solid gray', borderRadius: '.5rem'}}/>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '.3rem', width: '100%'}}>
                    <label htmlFor="title" style={{fontWeight: 'bold'}}>Title</label>
                    <input id="title" placeholder="Title: Responsive Web design" required style={{ width: '100%', padding: '.4rem', outline: 'none', border: '1px solid gray', borderRadius: '.5rem'}}/>
                </div>
                
                <div style={{width: '100%', }}>
                    <div>
                        <img src="https://" alt="add"/>
                        <input type="file" accept="image/*" hidden/>
                    </div>
                    <textarea maxLength={1000} placeholder="Say something about this post..."></textarea>
                </div>

                <div>
                    <button>Post</button>
                </div>
            </form>
        </div>
    )
}