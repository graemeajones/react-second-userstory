import API from '../api/API.js';

class Accessor {
  constructor(endpoint) {
    this.endpoint = endpoint;
  }

  create = (obj) => API.post(this.endpoint, obj);
  read = (id) => API.get(this.endpoint+'/' + id);
  update = (id, obj) => API.put(this.endpoint+'/' + id, obj);
  delete = (id) => API.delete(this.endpoint+'/' + id);
  list = () => API.get(this.endpoint);
}

export default Accessor;
