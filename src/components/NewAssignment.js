import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

class NewAssignment extends React.Component {
    constructor(props) {
        super(props);
        this.state = { assignmentName: '', dueDate: 0, courseID: 0, message: ''};
    };

    handleCreateAssignment = () => {
        fetch(`http://localhost:8081/course/${this.state.courseID}/createAssignment`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                assignmentName: this.state.assignmentName,
                dueDate: this.state.dueDate
            })
        })
            .then(response => response.json() )
            .then(responseData => {
                const { success } = responseData;
                this.setState({
                success: success, 
                message: (success ? 'Success!' : 'Oops, something went wrong.')
                });
            })
            .catch(err => console.error(err))
      }

    handleChange = (event) =>  {
        this.setState({[event.target.name]: event.target.value});
     }

    render() {
        const { assignmentName, dueDate, courseID, message} = this.state;
        return (
            <div align="left">
                <h3> New assignment info </h3>
                <TextField autoFocus style = {{width:200}} 
                    label="Assignment Name" name="assignmentName" 
                    onChange={this.handleChange}  value={assignmentName} /> 
                <br/>
                <TextField style = {{width:200}} label="Due date: YYYYDDMM" name="dueDate" 
                    onChange={this.handleChange}  value={dueDate} /> 
                <br/>
                <TextField style = {{width:200}} label="Course ID" name="courseID" 
                    onChange={this.handleChange}  value={courseID} /> 
                <br/>
                <Button variant="outlined" color="primary" style={{margin: 10}}
                    onClick={this.handleCreateAssignment} >Create Assignment</Button>
                <h3>{message}</h3>
            </div>
        ); 
    }
}

export default NewAssignment;