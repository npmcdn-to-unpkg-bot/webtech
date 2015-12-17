var Parser = (function () {
    function Parser() {
        this.templateMatcher = /{{\s?([^{}\s]*)\s?}}/g;
    }
    /**
     * Interpolates a string to replace parameters
     * "This is a {{ key }}" ==> "This is a value", with params = { key: "value" }
     * @param expr
     * @param params
     * @returns {string}
     */
    Parser.prototype.interpolate = function (expr, params) {
        if (!params) {
            return expr;
        }
        else {
            params = this.flattenObject(params);
        }
        return expr.replace(this.templateMatcher, function (substring, b) {
            var r = params[b];
            return typeof r !== 'undefined' ? r : substring;
        });
    };
    /**
     * Flattens an object
     * { key1: { keyA: 'valueI' }} ==> { 'key1.keyA': 'valueI' }
     * @param target
     * @returns {Object}
     */
    Parser.prototype.flattenObject = function (target) {
        var delimiter = '.';
        var maxDepth;
        var currentDepth = 1;
        var output = {};
        function step(object, prev) {
            Object.keys(object).forEach(function (key) {
                var value = object[key];
                var newKey = prev ? prev + delimiter + key : key;
                maxDepth = currentDepth + 1;
                if (!Array.isArray(value) && typeof value === 'object' && Object.keys(value).length && currentDepth < maxDepth) {
                    ++currentDepth;
                    return step(value, newKey);
                }
                output[newKey] = value;
            });
        }
        step(target);
        return output;
    };
    return Parser;
})();
exports.Parser = Parser;
//# sourceMappingURL=translate.parser.js.map