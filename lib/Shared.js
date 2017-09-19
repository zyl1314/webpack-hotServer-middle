var MemoryFileSystem = require("memory-fs");

module.exports = function(context) {
    var share = {
        compilerDone() {
            var callbacks = context.callbacks;
            if (!callbacks.length) return;
            callbacks.forEach(function(callback) {
                callback();
            })
            context.callbacks = [];
        },
        handleRequest(filename, processRequest) {
            var state = context.state;
            var callbacks = context.callbacks;
            if (state) {
                processRequest();
            } else {
                callbacks.push(processRequest);
            }
        },
        startWatch() {
            var compiler = context.compiler;
            var options = context.options;
            compiler.watch(options.watchOptions, share.handleCompilerCallback);
        },
        handleCompilerCallback(err) {
            if(err) {
                console.log(err);
            }
        },
        resetState() {
            context.state = false;
        },
        setFs() {
            var compiler = context.compiler;
            context.fs = compiler.outputFileSystem = new MemoryFileSystem();
        }
    }

    context.compiler.plugin('done', share.compilerDone);
    context.compiler.plugin('watch-run', share,resetState);

    share.startWatch();
    share.setFs();

    return share;
}