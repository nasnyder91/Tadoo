module.exports = {
  setSortParams: function(sortType){
    switch(sortType){
      case 'date_asc':
        return {dueDate: 'asc', dueTime: 'asc'};
        break;

      case 'date_desc':
        return {dueDate: 'desc', dueTime: 'asc'};
        break;

      case 'title_abc':
        return {title: 'asc'};
        break;

      case 'title_cba':
        return {title:'desc'};
        break;

      case 'date_created_asc':
        return {date: 'asc'};
        break;

      case 'date_created_desc':
        return {date: 'desc'};
        break;

      default:
        return {dueDate: 'asc', dueTime: 'asc'};
    }
  },
  sortTodos: function(todos, sortType){
    let withDate = [];
    let withTime = [];
    let withNeither = [];

    switch(sortType){
      case 'date_asc':
        todos.forEach(todo => {
          if(!todo.dueDate && !todo.dueTime){
            withNeither.push(todo);
          } else if(!todo.dueDate){
            withTime.push(todo);
          } else{
            withDate.push(todo);
          }
        });
        return withDate.concat(withTime,withNeither);
        break;

      case 'title_abc':
        return todos;
        break;

      case 'title_cba':
        return todos;
        break;

      case 'date_created_asc':
        return todos;
        break;

      case 'date_created_desc':
        return todos;
        break;

      default:
        todos.forEach(todo => {
          if(!todo.dueDate && !todo.dueTime){
            withNeither.push(todo);
          } else if(!todo.dueDate){
            withTime.push(todo);
          } else{
            withDate.push(todo);
          }
        });
        return withDate.concat(withTime,withNeither);
    }
  }
}
