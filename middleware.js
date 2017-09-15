var Shared = require('./lib/Shared.js');
var getFilenameFromUrl = require("./lib/GetFilenameFromUrl");

module.exports = function(compiler, options) {
    
    var context = {
        state: false,
        compiler: compiler,
        options: options
    }
    
    var shared = Shared(context);
    
    function webpackDevMiddleware(req, res, next) {
        // 只处理get请求
        if (req.method !== "GET") return next();

        // 如果请求的文件不存在  执行下一个中间件
        // 注意把options的publicPath于webpack配置里面的publicPath一致
        var filename = getFilenameFromUrl(context.options.publicPath, context.compiler, req.url);
        if (!filename) return next();

        shared.handleRequest(filename, processRequest);
        function processRequest() {

        }
    }
}