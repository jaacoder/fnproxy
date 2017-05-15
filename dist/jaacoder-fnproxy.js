/**
 * @license
 * (c) 2017 jaacoder
 * License: MIT
 */
/* global Function */
(function () {

    Function.prototype.proxy = function (context) {
        var fluentCalls = []
        var fn = this
        var args = Array.prototype.splice.call(arguments, 1)

        var fnProxy = function () {
            var result = fn.apply(context, args)

            for (var i in fluentCalls) {
                result = result[fluentCalls[i][0]].apply(result, fluentCalls[i][1])
            }

            return result
        }

        var methods = Function.prototype._proxyConfig.methods
        var methodsLength = methods.length
        for (var m = 0; m < methodsLength; m++) {
            var method = methods[m]
            fnProxy[method] = function () {
                fluentCalls.push([method, arguments])
                return fnProxy
            }
        }

        return fnProxy
    }

    Function.prototype._proxyConfig = {methods: []}

    // config function
    Function.prototype.proxyConfig = function (config) {
        if (config) {
            Function.prototype._proxyConfig = config
        }
        
        return Function.prototype._proxyConfig
    }


})()