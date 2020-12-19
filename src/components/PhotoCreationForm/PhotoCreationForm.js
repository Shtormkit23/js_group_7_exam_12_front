import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import FormElement from "../Form/FormElement";
import FileInput from "../Form/FileInput";
import {useSelector} from "react-redux";

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '100%',
        },
    },
}));

const PhotoCreationForm = ({onSubmit}) => {
    const classes = useStyles();
    const error = useSelector(state => state.photos.error);
    const [state, setState] = useState({
        title: "",
        image: ""
    });

    const submitFormHandler = e => {
        e.preventDefault();
        const formData = new FormData();
        Object.keys(state).forEach(key => {
            formData.append(key, state[key]);
        });
        onSubmit(formData);
    };

    const inputChangeHandler = e => {
        const name = e.target.name;
        const value = e.target.value;
        setState(prevState => {
            return {...prevState, [name]: value};
        });
    };

    const fileChangeHandler = e => {
        const name = e.target.name;
        const file = e.target.files[0];
        setState(prevState => ({...prevState, [name]: file}));
    };

    const getFieldError = fieldName => {
        try {
            return error.errors[fieldName].message;
        } catch(e) {
            return undefined;
        }
    };

    return (
        <form
            className={classes.root}
            autoComplete="off"
            onSubmit={submitFormHandler}
        >
            <FormElement
                error={getFieldError("title")}
                name="title"
                label="Photo title"
                value={state.title}
                onChange={inputChangeHandler}
            />
            <FormControl fullWidth className={classes.margin} variant="outlined">
                <FileInput
                    error={getFieldError("image")}
                    label="Image"
                    name="image"
                    required={true}
                    onChange={fileChangeHandler}
                />
            </FormControl>
            <FormControl fullWidth className={classes.margin} variant="outlined">
                <Button
                    type="submit"
                    color="primary"
                >
                    Create
                </Button>
            </FormControl>
        </form>
    );
};

export default PhotoCreationForm;