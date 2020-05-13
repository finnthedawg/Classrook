import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem'
import { withStyles } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid';
import { Container, Typography } from '@material-ui/core';
import { withRouter } from 'react-router-dom';


import axios from 'axios';

const styles = theme => ({

    inputbox: {
        width: "100%",
        maxWidth: "50vw",
        justify : "center",
        position : "absolute",

    },
    preview: {
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(2),
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        background: '#2E3B55',
        color: 'white',
        '&:hover': {
            background: '#586481',
        },
    },
    deleteB: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(2),
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        background: '#93160d',
        color: 'white',
        '&:hover': {
            background: '#ca4b35',
        }


    },
    container: {
        margin: 'auto',
        maxWidth: '1400px'
    },
})


class CreateReview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_id : parseInt(sessionStorage.getItem("user_id")),
            course_id : parseInt(sessionStorage.getItem("course_id")), //to be gotten from props,
            review : ''
        }
}

    
    allProvided = () => {
        const missing = []
        if (this.state.review=== ' ' && this.props.location.state.id.info.review === " ") {
            missing.push('Review')
        }
        
        if (missing.length !== 0) {
            var string = ''
            var i
            for (i = 0; i < missing.length; i++) {
                string = string + ' ' + missing[i]
            }
            alert(`This cannot be blank!: ${string}`)
        }
        else {
            return true
        }

    }
    handlePost = () => {
        console.log("here is the review")
        console.log(this.state.review)
        let reviewJSON = {
            "user_id" : this.state.user_id,
            "course_id": this.state.course_id,
            "review": this.state.review,
        };


        axios.post(`http://localhost:8000/review/`,reviewJSON) //update with correct string
        sessionStorage.setItem("credits", parseInt(sessionStorage.getItem("credits"))+1)
    }

    getPublishButton = (classes) => {
        return <Button onClick={this.handlePost} className={classes.preview}> Post Review </Button>
    }

    returnTheme = () => {
        const theme = createMuiTheme({
            palette: {
                primary: {
                    main: '#2E3B55',
                },
            },
        });
        return theme
    }

    showButtons = (classes) => {
            return <div>
                {this.getPublishButton(classes)}
            </div>

    }

    uploadFile = () => {

    }

    showTitle = () => {
            return <Typography variant='h5' style={{ marginBottom: '0%', marginTop: '1%' }}> Create a new Review </Typography>
        }
    
    showUpload = () => {
            return <Typography variant='h5' style={{ marginBottom: '0%', marginTop: '1%' }}> Upload a file </Typography>
    }
    handleChange = (e) => {
        this.setState({
            review: e.target.value
        })
    }
    render() {
        const { classes } = this.props
        // if (this.state.redirect && (!this.state.is_admin_window)) {
        //     return (<Redirect to={`/my-articles`} />)
        // }
        return (
            <div >
                {this.showTitle()}
                <Container className={classes.container}>

                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={5}>
                            <ThemeProvider theme={this.returnTheme()}>
                                <TextField
                                    id="review"
                                    label="Review"
                                    margin="normal"
                                    variant="outlined"
                                    onChange={this.handleChange}
                                    className={classes.inputbox}
                                    //defaultValue={(this.state.is_edit_window || this.state.is_admin_window) ? this.showDefault().articleTitle : ''}
                                />                               
                            </ThemeProvider>
                        </Grid>
                    </Grid>
                </Container>
                <br/>
                <br/>
                <br/>
                {this.showButtons(classes)}
            </div >
        );
    }
}

export default withRouter(withStyles(styles)(CreateReview)); 
