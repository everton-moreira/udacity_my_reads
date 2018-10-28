import React, { Component } from 'react'

class Loading extends Component 
{
    render(){
        
        return (
            <div>
                <div className="bg-loading"></div>
                <div className="div-loading">
                    Loading...
                </div>
            </div>
        )
    }

}

export default Loading