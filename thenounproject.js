import { OAuth as _OAuth } from 'oauth'
// `npm install oauth` to satisfy
// website: https://github.com/ciaranj/node-oauth

var KEY = "72b326af48ca4b068b7a1019cfce21cf"
var SECRET = "7ed2aca6c9cf4ffd9fcb8c6143d3bd90"

var oauth = new _OAuth(
        'https://api.thenounproject.com',
        'https://api.thenounproject.com',
        KEY,
        SECRET,
        '1.0',
        null,
        'HMAC-SHA1'
)
oauth.get(
        'https://api.thenounproject.com/v2/icon/6324',
        null,
        null,
        function (e, data, res){
                if (e) console.error(e)
                console.log(data)
        }
)