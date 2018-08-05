import handler0 from './main/index.js';
import handler1 from './main/Off/index.js';
import handler2 from './main/On/index.js';
export default opts => ({
    'main': handler0(opts),
    'main:Off': handler1(opts),
    'main:On': handler2(opts)
});