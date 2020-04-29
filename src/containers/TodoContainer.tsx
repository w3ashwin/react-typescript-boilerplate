import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import * as MyTypes from 'MyTypes';
import { actionTypes } from '../actions';
import { TodoItem } from '../components';

interface TodoContainerState {
  todoInput: string;
}

interface TodoContainerProps {
  count: number;
  todoList: string[];
  addToDo: (item: string) => object;
  deleteToDo: (idx: number) => object;
}

class TodoContainer extends React.Component<TodoContainerProps, 
TodoContainerState> {
  constructor(props) {
    super(props);
    this.state = {
      todoInput: '',
    };
  }

  handleTextChange = (e) => {
    this.setState({
      todoInput: e.target.value,
    });
  };

  handleButtonClick = () => {
    const { addToDo } = this.props;
    const { todoInput } = this.state;
    addToDo(todoInput);
    this.setState({
      todoInput: '',
    });
  };

  handleDeleteButtonClick = (idx: number) => {
    const { deleteToDo } = this.props;
    deleteToDo(idx);
  };

  render() {
    let todoJSX: JSX.Element[] | JSX.Element;
    const { todoList } = this.props;
    const { todoInput } = this.state;
    if (!todoList.length) {
      todoJSX = <p>No to do</p>;
    } else {
      todoJSX = todoList.map((item, idx) => {
        const key = `key-${idx}`;
        return (<TodoItem 
          item={item} 
          key={key} 
          idx={idx} 
          handleDelete={this.handleDeleteButtonClick}
        />);
      });
    }

    return (
      <div>
        {todoJSX}
        <input 
          onChange={this.handleTextChange} 
          placeholder="New To Do Here" 
          value={todoInput}
        />
        <button type="button" onClick={this.handleButtonClick}>
          Add To Do
        </button>
      </div>
    );
  }
}

const MapStateToProps = (store: MyTypes.ReducerState) => {
  return {
    count: store.todo.count,
    todoList: store.todo.list,
  };
};

const MapDispatchToProps = (dispatch: Dispatch<MyTypes.RootAction>) => ({
  addToDo: (item: string) =>
    dispatch({
      type: actionTypes.ADD,
      payload: item,
    }),
  deleteToDo: (idx: number) =>
    dispatch({
      type: actionTypes.DELETE,
      payload: idx,
    }),
});

export default connect(MapStateToProps, MapDispatchToProps)(TodoContainer);
