import React from 'react';
import { firestore } from '../Firebase'

class Form extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        name: '',
        author: "Supantha Paul",
        author_link: "https://twitter.com/supanthapaul",
        tris: 0,
        img_front: "",
        img_back: "",
        download: "",
        post_success: false,
        post_error: false,
      };
    }
    inputChangeHandler = (event) => {
      let name = event.target.name;
      let val = event.target.value;
      this.setState({[name]: val});
    }
    submitHandler = (event) => {
        event.preventDefault();
        console.log(this.state);
        // reset success/error
        this.setState({post_success: false, post_error: false});
        // write to db
        firestore.collection("models").add({
            name: this.state.name,
            author: this.state.author,
            author_link: this.state.author_link,
            tris: this.state.tris,
            img_front: this.state.img_front,
            img_back: this.state.img_back,
            download: this.state.download,
        })
        .then(docRef => {
            console.log("Document write success!");
            // update state and reset inputs
            this.setState({
                name: '',
                author: "Supantha Paul",
                author_link: "https://twitter.com/supanthapaul",
                tris: 0,
                img_front: "",
                img_back: "",
                download: "",
                post_success: true,
                post_error: false
            });
            console.log(docRef);
        })
        .catch(err => {
            // error state
            this.setState({
                post_success: false,
                post_error: true
            });
            console.log("Error occured: ", err);
        })
    }

    render() {
      return (
        <React.Fragment>
            <form onSubmit={this.submitHandler}>
                <div className="form-group">
                    <label htmlFor="name1">Model Name</label>
                    <input type="text" 
                        name="name" 
                        value={this.state.name}
                        onChange={this.inputChangeHandler}
                        className="form-control" id="name1" />
                </div>
                <div className="form-group">
                    <label htmlFor="author">Author name</label>
                    <input type="text" 
                        name="author" 
                        onChange={this.inputChangeHandler} 
                        value={this.state.author}
                        className="form-control" id="author" />
                </div>
                <div className="form-group">
                    <label htmlFor="author-l">Author Link</label>
                    <input type="text" 
                        name="author_link" 
                        onChange={this.inputChangeHandler} 
                        value={this.state.author_link}
                        className="form-control" id="author-l" />
                </div>
                <div className="form-group">
                    <label htmlFor="tris">Tris</label>
                    <input type="number" 
                    name="tris" 
                    onChange={this.inputChangeHandler} 
                    value={this.state.tris}
                    className="form-control" id="tris" />
                </div>
                <div className="col-md-12">
                    <div className="form-group row">
                        <div className="col-md-6">
                            <label htmlFor="img-f">Front Image</label>
                            <input type="text" 
                                name="img_front" 
                                onChange={this.inputChangeHandler} 
                                value={this.state.img_front}
                                className="form-control inline" id="img-f" />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="img-b">Back Image</label>
                            <input type="text" 
                                name="img_back" 
                                onChange={this.inputChangeHandler} 
                                value={this.state.img_back}
                                className="form-control inline" id="img-b" />
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="download-l">Download Link</label>
                    <input type="text" 
                        name="download" 
                        onChange={this.inputChangeHandler} 
                        value={this.state.download}
                        className="form-control" id="download-l" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>      
            {this.state.post_success && (
                <div className="alert alert-primary" role="alert">
                Model added successfully!
                </div>
            )}
            {this.state.post_error && (
                <div className="alert alert-danger" role="alert">
                Failed adding model!
                </div>
            )}
        </React.Fragment>
      );
    }
}

export default Form;