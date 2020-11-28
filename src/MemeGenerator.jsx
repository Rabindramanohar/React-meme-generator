import React, {Component} from 'react';
import './style.css';

class MemeGenerator extends Component {
    constructor() {
        super();
        this.state = {
            topText: "",
            bottomText: "",
            randomImg: "http://i.imgflip.com/1bij.jpg",
            allMemeImgs: []
        }
    }

    componentDidMount() {
        fetch("https://api.imgflip.com/get_memes")
        .then(response => response.json())
        .then(response => {
            const {memes} = response.data;
            // console.log(memes[0]);

            this.setState({ allMemeImgs: memes })
        })
    }

    handleChange = (event) => {
        const {name, value} = event.target;
        this.setState({ [name] : value });
        console.log(this.state.allMemeImgs)
    }

    handleSubmit = (event) => {
        // get a random int (index in the array)
        const randomNum = Math.floor(Math.random() * this.state.allMemeImgs.length);
        // get the meme from that index
        const randomMemeImg = this.state.allMemeImgs[randomNum].url;
        // set `randomImg` to the `.url` of the random item I grabbed
        this.setState({ randomImg : randomMemeImg });
        event.preventDefault();
    }

    render() {
        return(
            <div>
                <form className = "meme-form" onSubmit = {this.handleSubmit}>
                    <input
                        type = "text"
                        name = "topText"
                        onChange = {this.handleChange}   
                        placeholder = "top text" 
                    />
                    <input
                        type = "text"
                        name = "bottomText"
                        onChange = {this.handleChange}    
                        placeholder = "bottom text" 
                    />

                    <button>Gen</button>
                </form>

                <div className="meme">
                    <img src = {this.state.randomImg} alt = "wrong img" />
                    <h2 className="top">{this.state.topText}</h2>
                    <h2 className="bottom">{this.state.bottomText}</h2>
                </div>
            </div>
        )
    }
}

export default MemeGenerator;