import React, { Component } from 'react'
import {DropzoneDialog} from 'material-ui-dropzone'
import Button from '@material-ui/core/Button';
import axios from 'axios';

export default class DropzoneFile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            files: ''
        };
    }

    handleClose() {
        this.setState({
            open: false
        });
    }

    handleSave(files) {
        //Saving files to state for further use and closing Modal.
        this.setState({
            files: files,
            open: false
        });
        let fileJSON = {
            "user_id" : parseInt(sessionStorage.getItem("user_id")),
            "course_id": parseInt(this.props.id),
            "credit" : 1,
            "file" : this.state.files 
        };
        axios.post(`http://localhost:8000/upload_document/`,fileJSON) //update with correct string
        sessionStorage.setItem("credits", parseInt(sessionStorage.getItem("credits"))+1)
        alert("File uploaded!")
    }

    handleOpen() {
        this.setState({
            open: true,
        });
        console.log("here are the props")
        console.log(this.props)
    }

    render() {
        return (
            <div>
                <Button onClick={this.handleOpen.bind(this)}>
                  Click Here to Drop your file!
                </Button>
                <DropzoneDialog
                    open={this.state.open}
                    onSave={this.handleSave.bind(this)}
                    showPreviews={true}
                    maxFileSize={5000000}
                    onClose={this.handleClose.bind(this)}
                />
            </div>
        );
    }
}