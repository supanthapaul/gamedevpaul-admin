import React from 'react';

import Form from './Form';
import ImageUploader from './ImageUploader';

const Home = () => {
    return (
        <div className="container mt-5 mb-5">
            <div className="col-md-12">
                <div className="row">
                    <div className="col-md-6">
                        <h2>Post to firestore</h2>
                        <Form />
                    </div>
                    <div className="col-md-6">
                        <h2>Imgur Uploader</h2>
                        <ImageUploader />
                    </div>
                </div>
            </div>
      </div>
    )
}

export default Home;