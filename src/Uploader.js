import React from 'react'
import Dropzone from 'react-dropzone'
import axios from 'axios'
import Spinner from 'react-spinkit'

class Uploader extends React.Component {
  constructor() {
    super()
    this.renderPrediction = this.renderPrediction.bind(this)
    this.state = { files: [], prediction: '', isLoading: false }
  }

  onDrop(files) {
    this.setState({
      files,
      isLoading: true
    });

    const url = 'https://pacific-meadow-70336.herokuapp.com/classifier'
    files.forEach(file => {
    axios.post(url, file, {
        headers: {
          'Content-Type': file.type
        }
      }).then((response) =>{
        this.setState({ prediction: response.data.prediction, isLoading: false })
      })
    });
  }

  onCancel() {
    this.setState({
      files: []
    });
  }

  renderPrediction() {
    if (this.state.isLoading) {
      return <Spinner name="pacman" color="fuchsia" style={{ marginLeft: '2em', marginTop: '.2em' }} />
    }
    return this.state.prediction
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
          { this.renderPrediction() }
        </aside>
      </section>
    );
  }
}

export default Uploader
