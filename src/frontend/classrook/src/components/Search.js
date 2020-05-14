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
import CourseCard from './CourseCard';

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


class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query : ' ',
            results : [],
            resultsObtained : false
        }
}

    
    allProvided = () => {
        const missing = []
        if (this.state.query=== ' ' && this.props.location.state.id.info.query === " ") {
            missing.push('Query')
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
        let queryJSON = {
            "query": this.state.query,
        };


        axios.post(`http://localhost:8000/courses/`, queryJSON)
        .then(response => {
            console.log(response.data)
            this.setState({
                results: response.data,
            })
            this.checkResults()
        })
        .catch(error => {
            console.log("ERROR in Category loading ", error)
        })
    console.log("the state is ")
    console.log(this.state.results)
    }

    getPublishButton = (classes) => {
        return <Button onClick={this.handlePost} className={classes.preview}> Search Course </Button>
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

    checkResults = () => {
        if(this.state.results == []){
            this.setState({
                resultsObtained: false
            })
        }
        else{
            this.setState({
                resultsObtained:true
            })
        }

    }

    showTitle = () => {
            return <Typography variant='h5' style={{ marginBottom: '0%', marginTop: '1%' }}> Search for a Course</Typography>
        }
    
    showUpload = () => {
            return <Typography variant='h5' style={{ marginBottom: '0%', marginTop: '1%' }}> Upload a file </Typography>
    }
    handleChange = (e) => {
        this.setState({
            query: e.target.value
        })
    }
    render() {
        const { classes } = this.props
        // if (this.state.redirect && (!this.state.is_admin_window)) {
        //     return (<Redirect to={`/my-articles`} />)
        // }
        if(this.state.resultsObtained){
            return(
                <>
                <div >
                {this.showTitle()}
                <Container className={classes.container}>

                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={5}>
                            <ThemeProvider theme={this.returnTheme()}>
                                <TextField
                                    id="query"
                                    label="Query"
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
            <Grid container direction="column">
            <Grid item container justify="center" alignItems="center">
              <Grid item xs={false} sm={2} />
                <Grid container spacing={8}>
                    {this.state.results.map(contentCardObj => 
                        <Grid item xs={12} sm={4}>
                        <CourseCard {...contentCardObj} />
                      </Grid>
                    )}
                </Grid>
              </Grid>
            </Grid>
            </>
            )
        }
        return (
            <div >
                {this.showTitle()}
                <Container className={classes.container}>

                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={5}>
                            <ThemeProvider theme={this.returnTheme()}>
                                <TextField
                                    id="query"
                                    label="Query"
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

export default withRouter(withStyles(styles)(Search)); 
