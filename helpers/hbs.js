const moment = require('moment');

module.exports = {
  formatDate: function(date){
    return moment(date).format('MMM DD, YYYY');
  },
  formatTime: function(time){
    return moment(time).format('hh:mm A');
  },
  truncate: function(str, len){
    if(str.length > len && str.length > 0){
      var new_str = str + " ";
      new_str = str.substr(0, len);
      new_str = str.substr(0, new_str.lastIndexOf(" "));
      new_str = (new_str.length > 0) ? new_str : str.substr(0, len);
      return new_str + '...';
    }
    return str;
  },
  stripTags: function(input){
    console.log(input);
    return input.replace(/<(?:.|\n)*?>/gm, '');
  }
}
