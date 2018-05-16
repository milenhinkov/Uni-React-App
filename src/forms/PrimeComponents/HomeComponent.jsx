import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import createCourse from '../../redux/ActionCreators'
import PropTypes from 'prop-types';

class HomePage extends Component {
    constructor(props) {
        super(props)
        this.state={
            course:{title:""}
        }
        this.onTitleChange = this.onTitleChange.bind(this);
        this.onClickSave = this.onClickSave.bind(this);
    }

 

    onTitleChange(event){
        const course = this.state.course;
        course.title = event.target.value;
        this.setState({course: course})
    }

    onClickSave(){
        this.props.createCourse(this.state.course);
    }

    render() {
        return (<div>
            <h1>Courses</h1>
            {this.props.courses.map((r, i) =>{return <div key={i}>{r.title}</div>})}
            <h1>Add Course</h1>
            <input type="text" onChange={this.onTitleChange} value={this.state.course.title} ></input>
            <input type="submit" onClick={this.onClickSave} value="Save" ></input>
            </div>
        )
    }
}

HomePage.propTypes={
    courses: PropTypes.array.isRequired,
    createCourse: PropTypes.func.isRequired
}

function mapStateToProps(state, ownProps) {
   return{
       courses:state.courses
   }
}

function mapDispatchToProps(dispatch) {
    return{
        createCourse: bindActionCreators(createCourse, dispatch)
    }
 }

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);