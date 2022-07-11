import API from '../api/API.js';

const moduleAccessor = {}; 
moduleAccessor.create = (module) => API.post('Modules', module);
moduleAccessor.read = (id) => API.get('Modules/'+id);
moduleAccessor.update = (id, module) => API.put('Modules/' + id, module);
moduleAccessor.delete = (id) => API.delete('Modules/'+id);
moduleAccessor.list = () => API.get('Modules');

export default moduleAccessor;