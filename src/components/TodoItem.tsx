import * as React from 'react';
import * as PropTypes from 'prop-types';

interface TodoItemProps {
  item: string;
  idx: number;
  handleDelete: (idx: number) => void;
}

export const TodoItem: React.FC<TodoItemProps> = (props) => {
  const { handleDelete, item, idx } = props;
  return (
    <div>
      <span>
        {item}
        <button type="button" onClick={() => handleDelete(idx)}>
          X
        </button>
      </span>
    </div>
  );
};

TodoItem.propTypes = {
  handleDelete: PropTypes.func.isRequired,
  item: PropTypes.string.isRequired,
  idx: PropTypes.number.isRequired,
};
