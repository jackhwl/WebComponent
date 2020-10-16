"use strict";
exports.__esModule = true;
var src_1 = require("../src");
describe("isChannel() tests", function () {
    test("valid channel", function () {
        expect(src_1.isChannel({
            id: "123",
            teamId: "12gh",
            description: "channel description",
            iconUrl: "",
            messages: [],
            name: "general"
        })).toEqual(true);
    });
    test("invalid channel", function () {
        expect(src_1.isChannel({
            description: "channel description",
            messages: [],
            name: "general"
        })).toEqual(false);
    });
});
describe("isMessage() tests", function () {
    test("valid message", function () {
        expect(src_1.isMessage({
            id: 131,
            teamId: "12gh",
            channelId: "12gh",
            userId: "12gh",
            body: "hello, world"
        })).toEqual(true);
    });
    test("invalid message", function () {
        expect(src_1.isMessage({
            description: "message description",
            messages: [],
            name: "general"
        })).toEqual(false);
    });
});
describe("isTeam() tests", function () {
    test("valid message", function () {
        expect(src_1.isTeam({
            name: "12gh",
            id: "12gh",
            channels: []
        })).toEqual(true);
    });
    test("invalid message", function () {
        expect(src_1.isTeam({
            name: "12gh",
            id: "12gh"
        })).toEqual(false);
    });
});
describe("isTypedArray() tests", function () {
    test("non-array", function () {
        expect(
        // @ts-expect-error
        src_1.isTypedArray(null, function () { return true; })).toEqual(false);
    });
    test("empty array", function () {
        expect(src_1.isTypedArray([], function (x) { return true; })).toEqual(true);
    });
    test("homogenous array [1, 2, 3]", function () {
        expect(src_1.isTypedArray([1, 2, 3], function (x) { return typeof x === "number"; })).toEqual(true);
    });
    test("mixed array [1, 'a', 3]", function () {
        expect(src_1.isTypedArray([1, "a", 3], function (x) { return ["number"].indexOf(typeof x) >= 0; })).toEqual(false);
    });
});
