import{date_utils} from '../../FD';
import token_factory from './token';

module.exports = token_factory({CreateUtcDate: date_utils.createUTCDate})