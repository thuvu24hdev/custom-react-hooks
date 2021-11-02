import { useRef } from "react";

import classes from "./TaskForm.module.css";

interface TaskFormProps {
  onEnterTask: (enteredValue: string) => {};
  loading: boolean;
}
const TaskForm = (props: TaskFormProps) => {
  const taskInputRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  const submitHandler = (event: React.SyntheticEvent) => {
    event.preventDefault();

    const enteredValue = taskInputRef.current?.value;

    if (enteredValue.trim().length > 0) {
      props.onEnterTask(enteredValue);
    }
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <input type="text" ref={taskInputRef} />
      <button>{props.loading ? "Sending..." : "Add Task"}</button>
    </form>
  );
};

export default TaskForm;
