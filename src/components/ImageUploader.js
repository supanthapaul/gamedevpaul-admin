import React from 'react';
import axios from 'axios'

class ImageUploader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFile: null,
            uploading: false,
            error: null,
            image: null,
            copySuccess: false
        };
    }
    onFileChange = (event) => {
        if(event.target.files[0] == null)
            return;
        // add file to state and reset other states
        this.setState({ 
            selectedFile: event.target.files[0],
            uploading: true,
            error: null,
            image: null,
            copySuccess: false
        }, () => {
            // upload file
            console.log(this.state);
            // configue headers
            const config= {
                headers: {
                    "authorization": "Client-ID " + process.env.REACT_APP_IMGUR_AUTH,
                    "x-rapidapi-host": "imgur-apiv3.p.rapidapi.com",
                    "x-rapidapi-key": process.env.REACT_APP_IMGUR_RAPIDAPI,
                    "content-type": "application/x-www-form-urlencoded"
                }
            }
            // add form data
            const fd = new FormData();
            fd.append("image", this.state.selectedFile, this.state.selectedFile.name);
            fd.append("title", this.state.selectedFile.name);
            // send POST req
            axios.post("https://imgur-apiv3.p.rapidapi.com/3/image", fd, config)
                .then(res => {
                    console.log(res.data);
                    // set image to state and copy the link to clipboard
                    this.setState({
                        image: res.data.data,
                        uploading: false
                    });
                })
                .catch(err => {
                    this.setState({
                        uploading: false,
                        error: err
                    });
                    console.log(err);
                })
        }); 
    }
    copyToClipboard = (event) => {
        event.target.select();
        document.execCommand('copy');
        this.setState({ copySuccess: true });
      };

    render() {
        return (
            <React.Fragment>
                <form>
                    <div className="form-group">
                        <label htmlFor="image1">Choose Image</label>
                        <input type="file" 
                            onChange={this.onFileChange} className="form-control-file" id="image1" />
                    </div>
                    {this.state.uploading && (
                        <div className="spinner-border" role="status">
                            <span className="sr-only">Uploading...</span>
                        </div>
                    )}
                    {this.state.image && (
                        <div>
                            {this.state.copySuccess && (
                                <div className="alert alert-primary" role="alert">
                                Link copied to clipboard!
                                </div>
                            )}
                            <textarea 
                                value={this.state.image.link}
                                onFocus={this.copyToClipboard}
                                readOnly
                                className="form-control"
                                rows="2" />
                            <img className="img-fluid mt-5" src={this.state.image.link} alt={this.state.image.title}/>
                        </div>
                    )}
                    {this.state.error && (
                        <div className="alert alert-danger" role="alert">
                        Upload failed!
                      </div>
                    )}
                </form>
            </React.Fragment>
        );
    }
}

export default ImageUploader;