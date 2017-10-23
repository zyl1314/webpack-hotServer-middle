# webpack-simple-dev-middleware

- webpack-dev-middleware事实上主要做一件事，就是根据传入的url返回对应的资源，相当于是启动一个静态服务器。  
- webpack打包是一个耗时的操作，需要考虑到请求资源的时候打包尚未完成，此时需要将请求挂起等待打包完成进行下一步操作。