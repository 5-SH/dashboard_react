import Node from './Node';
import Map from './Map';

var routes = [
  {
    path: '/node',
    name: 'Node',
    component: Node,
    layout: '/admin'
  },
  {
    path: '/map',
    name: 'Map',
    component: Map,
    layout: '/admin'
  }
];
export default routes;
