"use strict";
exports.__esModule = true;
var utils_1 = require("@shlack/utils");
describe("Error tests", function () {
    test("stringifyError", function () {
        var e = new utils_1.HTTPError({ status: 404, statusText: "Not Found" }, "Mock error for testing");
        var result = utils_1.stringifyError("mock error for tests", e);
        expect(result.split("at").length).toBeGreaterThanOrEqual(5);
        expect(result).toContain("mock error for tests");
        expect(result).toContain("HTTPError [status: Not Found (404)]");
        expect(result).toContain("Mock error for testing");
    });
});
