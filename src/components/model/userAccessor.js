import API from '../api/API.js';

const userAccessor = {}; 
userAccessor.create = (user) => API.post('Users',user);
userAccessor.read = (id) => API.get('Users/'+id);
userAccessor.update = (id, user) => API.put('Users/'+id, user);
userAccessor.delete = (id) => API.delete('Users/'+id);
userAccessor.list = () => API.get('Users');

export default userAccessor;
