import Ember from 'ember';

export default Ember.Route.extend({
  model (params) {
    return $.get('http://localhost:3000/dbf/tl_2015_06_cousub.dbf');
  }
});
