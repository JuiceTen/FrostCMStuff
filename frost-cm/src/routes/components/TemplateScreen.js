import React, { useEffect, useRef, useState } from "react";
import '../../scss/components/template.scss'
const TemplateScreen = ({templates}) => {

    //dummy data for visual development
    const dummyTemplates = [
        {template: 'video1', category: ['work', 'dating', '16:9']},
        {template: 'video2', category: ['dating', '9:16']},
        {template: 'video3', category: ['school']},
        {template: 'video4', category: []},
        {template: 'video', category: []},
        {template: 'video', category: []},
        {template: 'video', category: []},
        {template: 'video', category: []},
        
    ]

    const [searchTerm, setSearchTerm] = useState('')
    const [allTemplates, setAllTemplates] = useState(dummyTemplates)
    const [foundTemplates, setFoundTemplates] = useState()
    const [loading, setLoading] = useState(true)
    // const [arrayToMap, setArrayToMap] = useState([])
    const videoRef = useRef()
    const reference = useRef()

    const addDivAroundEveryThree = async() => {
        let arrayToMap = [[]]
        allTemplates.map((template, index) => {
            arrayToMap[arrayToMap.length-1].push(template)
            if ((index+1)%5 === 0) {
                arrayToMap.push([])
                console.log('hello')
            }
            
        })

        // if(arrayToMap[arrayToMap.length-1].length !== 3) {
            console.log(arrayToMap[arrayToMap.length-1].length)
            let i = 0
            while( i<= 5-arrayToMap[arrayToMap.length-1].length) {
                console.log(3-arrayToMap[arrayToMap.length-1].length)
                console.log(i)
                arrayToMap[arrayToMap.length-1].push({})
                i++
            }

            console.log(arrayToMap)
            
        // }

        setFoundTemplates(arrayToMap)
    }

    const searchTemplates = (searchText) => {

        let results = [[]]
        

        allTemplates.filter((data, index) => {
            

            if(data.template.search(searchText) != -1 || data.category.includes(searchText.toLowerCase())){
                results[results.length-1].push(data)
            }
            if((index+1)%5 === 0) {
                results.push([])
            }
        })
        console.log(results)

        results.map((array) => {
            if(array.length !== 5) {
                let i = array.length
                while(i < 5) {
                    array.push({})
                    i++
                }
            }
        })

        

        // results = allTemplates.filter((data) => {
        //     return(data.template.search(searchText)) != 1 || data.category.includes(searchText.toLowerCase())
        // })

        
        setFoundTemplates(results)
    
    }

    useEffect(()=> {
        console.log(loading)
        setLoading(false)
    },[])

    useEffect(() => {
        console.log(searchTerm)
        // console.log(videoRef.current)
        searchTemplates(searchTerm)
    },[searchTerm])

    useEffect(() => {
        console.log(foundTemplates)
    },[foundTemplates])

    useEffect(() => {
        addDivAroundEveryThree()
        console.log(loading)
        // addParent()
    },[loading])



    return (
        <div>

            <div className="search-component">
                <label>Find your perfect video template</label>
                <input onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search Templates"/>
            </div>

            <div className="template-viewport">
                <div className="sort-component">
                    <label>All Templates</label>

                    <div className="dropDown" >
                    <select defaultValue={'Categories'} onChange={(e) => searchTemplates(e.target.value)}>
                        <option disabled hidden>Categories</option>
                        <option value={'Work'}>Work</option>
                        <option value={'School'}>School</option>
                        <option value={'Dating'}>Dating</option>
                    </select>

                    <select defaultValue={'Ratios'}>
                        <option disabled hidden>Ratios</option>
                        <option value={'16:9'}>16:9</option>
                        <option value={'9:16'}>9:16</option>
                    </select>
                    </div>
                </div>

                <div ref={videoRef} className="videos-viewport">
                    {/* Edit once back end templates are complete */}
                    {/* <div className="wrapper" ref={reference}> */}
                    <div className="component-wrapper">
                    {foundTemplates ? foundTemplates.map((template, index) => {
                        { return foundTemplates.length -1 === index ? 
                            <div className="wrapper last-wrapper" key={index}>
                                {template.map((videos, index) => {
                                    return(
                                        <div className="videos" key={`videoId${index}`}>
                                            <div>
                                                <h1>Image</h1>
                                            </div>

                                            <div> 
                                            <p>{videos.template}</p>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        
                            
                            :
                            <div className='wrapper' key={index}>
                                {template.map((videos, index) => {
                                    return(
                                        <div className="videos" key={`videoId${index}`}>
                                            <div>
                                                <h1>Image</h1>
                                            </div>

                                            <div> 
                                            <p>{videos.template}</p>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                    }
                        
                    }) :
                    <div>No Video Templates Found</div>}
                    </div>
                </div>

            </div>

        </div>
    )
}

export default TemplateScreen;