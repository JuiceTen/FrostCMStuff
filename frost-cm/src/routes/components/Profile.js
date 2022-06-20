import React, {useRef, useEffect, useState, createRef} from 'react'
import '../../scss/components/profile.scss'
import {AiOutlineEdit} from 'react-icons/ai'

const Profile = () => {
    const dummyData = {
        username: 'Justin',
        profilePicture: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg',
        description: 'I am a web-developer and an environmentalist. My goal is to combine both environmental science and computer science to create a better future for our world. some random extra text about myself etct..',
        job: 'Web-Developer and Environmental Advocate',
        videos: [ 
            {title: 'first video', caption: 'this is a caption', videoSrc: ''},
            {title: 'second video', caption: 'this is a caption', videoSrc: ''},
            {title: 'third video', caption: 'this is a caption', videoSrc: ''},
            {title: 'fourth video', caption: 'this is a caption', videoSrc: ''}
        ]

    }
    const textBox = useRef()
    const jobText = useRef()
    const [textHeight, setTextHeight] = useState()
    // const [isReadOnly, setIsReadOnly] = useState(true)
    const [inFocus, setInFocus] = useState(false)
    const [editMode, setEditMode] = useState(false)
    // console.log(textBox.current.scrollHeight)
    // const [clickOut, setClickOut] = useState(false)
    const [currentRef, setCurrentRef] = useState()


    useEffect(() => {
        // console.log(textBox.current.scrollHeight)
        setTextHeight(textBox.current.scrollHeight)
        textBox.current.style.height = textBox.current.scrollHeight + 'px'
        console.log(textBox.current.localName === 'textarea')
    },[])


    // useEffect(() => {
    //     cons
    // },[])
    const clickEdit = (event, ref) => {
        event.preventDefault()
        // setIsReadOnly(false)
        console.log('turn on edit mode')
        setEditMode(true)
        setCurrentRef(ref)
        ref.current.readOnly = false
          
        
    }

    const clickOut = (event, ref) => {
        event.preventDefault()

        if(editMode && event.target.className !== 'text') {
            console.log('turn off Edit Mode')
            setEditMode(false)
            currentRef.current.readOnly = true
        }  
    }

    return (
        <div onClick={(e) => clickOut(e)}>
            {/* will need to be a head nav component */}
            <nav><span>&#8592; </span>Profile</nav>

            <div className='profile-picture'>
                <div className='viewport'>
                    <img src={dummyData.profilePicture} alt='user'/>
                </div>
            </div>

            <h3 className='username'>{dummyData.username}</h3>

            <form className='description'>
                <div className='job-text'>
                <label >
                    <input className='text' ref={jobText} readOnly={true} type={'text'} defaultValue={dummyData.job} placeholder='Enter your job...'/>
                    <span className='edit-btn'><AiOutlineEdit/></span>
                </label>
                </div>
                <div className='text-box' >
                    <label >
                        <textarea className='text' readOnly={true} ref={textBox} defaultValue={dummyData.description}/>
                        <span className='edit-btn' onClick={(e) => clickEdit(e, textBox)}><AiOutlineEdit/></span>
                        
                    </label>
                </div>
            </form>

            <div className='video-container'>
                {dummyData.videos.length > 0 ? 
                    <div className='video-container'>
                        <p>My Videos</p>
                        <div className='video-gallery'>
                            {dummyData.videos.map((videos, index) => {
                                console.log(videos)
                                return (
                                    <div key={index} className='video-card'>
                                        <h4>{videos.title}</h4>
                                        <p>{videos.caption}</p>
                                        <p>temp {videos.src}</p>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    :
                    <div>
                        <p>Upload videos to get started</p>
                    </div>
                }
            </div>
        </div>
    )
}

export default Profile;