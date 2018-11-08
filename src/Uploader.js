import React from 'react'
import Dropzone from 'react-dropzone'
import axios from 'axios'

class Uploader extends React.Component {
  constructor() {
    super()
    this.state = { files: [], prediction: ''}
  }

  onDrop(files) {
    this.setState({
      files
    });

    const url = 'http://localhost:5000/classifier'
    files.forEach(file => {
      const response = axios.post(url, file, {
        headers: {
          'Content-Type': file.type
        }
      }).then(response => this.setState({ prediction: response.data.prediction }))
    });

    // req.end(callback);
  }

  onCancel() {
    this.setState({
      files: []
    });
  }

  render() {
    return (
      <section>
        <div className="dropzone">
          <Dropzone
            onDrop={this.onDrop.bind(this)}
            onFileDialogCancel={this.onCancel.bind(this)}
          >
            <p>Try dropping some files here, or click to select files to upload.</p>
          </Dropzone>
        </div>
        <aside style={{ fontSize: '2em' }}>
          { this.state.prediction }
        </aside>
      </section>
    );
  }
}

export default Uploader
