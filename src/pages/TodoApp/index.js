import React, { useState } from 'react';
import { useFormik } from 'formik';
import { Container, FormGroup, Label, Input, Button, Alert } from 'reactstrap';

const Todo = () => {

   
    const [formValue, formValueFunction] = useState([]);
    const formik = useFormik({
        initialValues: {
            TodoValue: '',
        },
        onSubmit: values => {
            let temp = formValue;
            temp.push(values.TodoValue)
           // console.log(temp)
            formValueFunction([...temp])
        },
    });
    const isEnabled = formik.values.TodoValue.length > 0;

    
    function closeTodo(e, index) {
        let temp = formValue;
        temp.splice(index, 1);
        formValueFunction([...temp]);
        e.preventDefault();
    }
    return (
        
        <div>
            <Container>
            <h5 className="shadow-sm p-3 my-3 bg-white border-left-secondary">Todo</h5>
                <form onSubmit={formik.handleSubmit}>
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0 bg-white p-4">
                        <Label htmlFor="TodoValue">Enter Your Todo</Label>
                        <Input
                            id="TodoValue"
                            name="TodoValue"
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.TodoValue}
                        />
                        <Button type="submit" className="mt-3" disabled={!isEnabled}>Add Todo</Button>
                    </FormGroup>
                </form>
                <div className="py-3">
                    {formValue.map((post, index) =>
                        <Alert color="primary" key={index}>{post} <span onClick={e => closeTodo(e, index)} style={{cursor:"pointer", float:"right"}}>X</span></Alert>
                    )}
                </div>
            </Container>
        </div>
    );
};

export default Todo;