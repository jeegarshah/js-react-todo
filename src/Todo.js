import React from 'react';
import * as R from 'ramda';
import classNames from 'classnames';
import { withStyles, withTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import CheckBoxOutlineBlank from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBox from '@material-ui/icons/CheckBox';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import themeColor from '@material-ui/core/colors/lightGreen';

const theme = createMuiTheme({
  palette: {
    primary: themeColor,
  },
});

const styles = theme => ({
    appBar: {
        flexGrow: 1,
    },
    paper: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        flexGrow: 1,
        width: '100%',
        maxWidth: 800,
        // backgroundColor: theme.palette.background.paper,
        margin: '0 auto',
        marginTop: '24px',
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    container: {
        // display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    dense: {
        marginTop: 19,
    },
    menu: {
        width: 200,
    },
    appBarBottom: {
        top: 'auto',
        bottom: 0,
      },
});

 
export class TodoApp extends React.Component {
    state = {
        counter: 1,
        todos: {}
    }

    addTodo = (newTodo) => {
        this.setState({
            todos: {
                ...this.state.todos,
                [this.state.counter]: {
                    id: this.state.counter,
                    value: newTodo,
                    complete: false
                }
            },
            counter: this.state.counter + 1
        })
    }

    toggleTodoState = (id) => {
        this.setState({
            ...this.state,
            todos: {
                ...this.state.todos,
                [id]: {
                    ...this.state.todos[id],
                    complete: !this.state.todos[id].complete
                },
            },

        })
    }
    render() {
        const { classes } = this.props;
        return (
            <MuiThemeProvider theme={theme}>
            <div>
                <AppBar position="static" className={classes.appBar}>
                    <Toolbar>
                        <Typography variant="h6" color="inherit" className={classes.grow}>
                            TODOs
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Paper className={classes.paper} elevation={1}>
                    <TodoForm classes={this.props.classes} addTodo={this.addTodo} />
                    </Paper>

                    <Paper className={classes.paper} elevation={1}>

                    <TodoList classes={this.props.classes} toggleTodoState={this.toggleTodoState} {...this.state} />
                </Paper>
                <AppBar position="fixed" color="primary" className={classes.appBarBottom}>
                    <Toolbar className={classes.toolbar}>
                    <Typography variant="h6" color="inherit" className={classes.grow}>
                            Total : {Object.keys(this.state.todos).length} Done: {R.filter(x => x.complete, R.values(this.state.todos)).length}
                    </Typography>
                    </Toolbar>
                </AppBar>
            </div>
            </MuiThemeProvider>
        )
    }
}

class TodoForm extends React.Component {
    state = {
        todo: ""
    }
    onChange = (e) => {
        this.setState({ todo: e.target.value })
    }

    addTodo = () => {
        if(this.state.todo.length > 0) {
            this.props.addTodo(this.state.todo)
            this.setState({ todo: "" })
        }
    }

    render() {
        const { classes } = this.props; 
        return (
            <div>
                <form className={classes.container} noValidate autoComplete="off">
                    <TextField
                        className={classes}
                        id="todo"
                        label="Enter a new Todo"
                        value={this.state.todo}
                        onChange={this.onChange} />
                    <Button variant="contained" color="primary" className={classes} onClick={this.addTodo}>
                        Add
               </Button>
                </form>
            </div>
        )
    }
}

class TodoList extends React.Component {
    render() {
        return (
            <List>
                {Object.keys(this.props.todos).map((id, i) => 
                    <TodoItem 
                        key={i} 
                        todo={this.props.todos[id]} 
                        toggleTodoState={this.props.toggleTodoState} />)}
            </List>
        )
    }
}

class TodoItem extends React.Component {
    toggleTodoState = () => {
        this.props.toggleTodoState(this.props.todo.id)
    }
    render() {
        return (
            <ListItem onClick={this.toggleTodoState}>
                <ListItemIcon>{this.props.todo.complete ? <CheckBox /> : <CheckBoxOutlineBlank />}</ListItemIcon>
                <ListItemText primary={this.props.todo.value} />
            </ListItem>
        )
    }
}

export default withTheme()(withStyles(styles)(TodoApp));
