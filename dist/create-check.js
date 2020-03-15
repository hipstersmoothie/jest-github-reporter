"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var strip_ansi_1 = __importDefault(require("strip-ansi"));
var create_check_1 = __importDefault(require("create-check"));
var istanbul_gh_pr_uncovered_1 = __importDefault(require("istanbul-gh-pr-uncovered"));
var groupSequences_1 = __importDefault(require("./groupSequences"));
var APP_ID = 38833;
/**
 * Before you say anything I *know* this is horribly insecure.
 *
 * If we were not to to this then every user would have to create
 * their own GitHub App and manage the APP_ID and PRIVATE_KEY through
 * env vars.
 *
 * How could this go wrong? Well this PRIVATE_KEY only creates jwt
 * tokens that work on people who have installed the Jest Results
 * App. If an attacker got ahold of the token they could only read repo
 * metadata and read/write checks. So the attack surface is really only
 * messing with a users checks, which is not too risky.
 */
var PRIVATE_KEY = "-----BEGIN RSA PRIVATE KEY-----\nMIIEogIBAAKCAQEAwKPGnXvRdbkXXaIzw2YV4ykKCx6Lx1N+FAByUvQ5k7XaaSsi\nX7MFx3XJlUVMNf47ur5NQ2KjkDqA4Q9alb99yxUzSnsLBsHWQKEUZKmP86dqe2Ku\na2XG+GYtUnaaRrAsj8BWqFZ1Hq38P8ge8BIA51+pgpYOsX3imT5PhJfloeMXCMQ4\nGU+nJf8s0DzxRav3THzDKfzbQ487B1CbcTcEM70v+lFCKX36AzssYnKiEEyDOlUO\n6HkwQB+CTvQgB51JatmFFFZfCgnjYPQHtO6YqFWn8QBF0s9wHhoHWBNx+ZKoOVKw\nqOKcFwYmHdAzpuLmt0gGp4ewBswImJVpsekBQQIDAQABAoIBADp5/LKVgXHQ68za\njggElyRLsubJMPki2STNNecEh+3UyCYgl+ChAWIY2UZcsNO7BvqbBe0spiYD/FdV\nR9QpOtBI8Tbsvt4gPR+FRiGAb1gxO9uUiwnC7XE94wgjRJWsqPpCEowrIoZbnjTm\nVK3faTLTESu4zWEHq5+FELJZQbWwJ/SjJkA1viizBLSLCnhlMzsabHZHKtLPvZJ0\ntnRPVidp1hzQzDOIQBdojUvMZ3evLqYL1pwoRnqitotuchDprTUqGfBLFy1A+1iK\nQqPpHnDe8oEeITOi8cJhOmyk2ZmkSIyRmqZi9Cf/lItQBKws8aHUIoex7AfpXK30\n1mP1wAECgYEA+WIhAzEj7wXu/J+fPfZs0eW8htGtxQTQYpLztfxKGqS4spGJcj89\nga0MNvGAexNMsWW+n9SHNhVuJB7XSuxMrvXPuMPfwT1u910Ah/Wh+61saAOHRA+O\n3c+OyI2ojTchsoC3k1VZ0RTeDZXL870+wLmf1MqEOGovvnUx10oGfcECgYEAxcA7\nJJko/IbkCECtxcupIieZJdELDSkRdFZgVVHZcxwujJxyj2O/YZB31c6AaCbWnIO3\ns98SPhLLS4b10pEqR8FbCKKm9MiqWybAeWn14IM4EAgGRReWquTOWv/bDLjKphTr\noMm4lBm1dXrOfIuNyTOAJPIjJvtUCjfAroaCY4ECgYBllKIL0c1oREt3nXFY5PKo\ngOLNK8WTdgWH0YHyBAUPWz9chUmuPrJICvvpuW9zMoZP0DjYk9JLpmkJz4I0o5IM\nxlXJVgfjh6mWmsxnlRdZE+gPajiD8a5pDW2EpacddnKEakfcfKysLMrST80WyGQy\nTqobHC7FaANwmf4mSqHgQQKBgBwgCAlfgzXPVZVa5ZwxKCAEc8KuJZ08jw/1zQO1\nfXDivDghdCWysSCGNJUDJr4pb/KYxULe4jBT6fgW/NVy8gl8lZ73yzkbZSdLrqpW\nCLNi1lFpYsLm5PXvTu4gX55ClgfjB9Q5fHgL5AQOcFnEW2kXWw1mJtu/eSdu4Iex\n98+BAoGAOF4GUl/Aa6rJNgjBUNZjUomV+FJL3htuu1b3t2tLGnozPxFS6RPMWLvd\nAMBi+Wv6FzuOhZx6aIMlz/LEgC+s9o3S+mSlsp0/UoNcy7j1zSosb4C8QqXbTGRG\nsUdulK+rOI5aef3CRA2/j6V1expVZF/ttOsmybZcuUcSGxN1N5Q=\n-----END RSA PRIVATE KEY-----\n";
function getAppId() {
    return process.env.JEST_APP_ID ? Number(process.env.JEST_APP_ID) : APP_ID;
}
function getPrivatekey() {
    return process.env.JEST_PRIVATE_KEY || PRIVATE_KEY;
}
function createAnnotations(results) {
    var e_1, _a;
    var annotations = [];
    var _loop_1 = function (result) {
        var e_2, _a;
        var testFilePath = result.testFilePath, testResults = result.testResults;
        var _loop_2 = function (failure) {
            if ('location' in failure) {
                var _a = failure, _b = _a.location, location_1 = _b === void 0 ? {} : _b, failureMessages_1 = _a.failureMessages;
                if (location_1) {
                    failureMessages_1.forEach(function (message) {
                        var numbers = message.match(new RegExp(result.testFilePath + ":(\\d+):\\d+"));
                        var start_line = numbers ? Number(numbers[1]) : location_1.line || 0;
                        annotations.push({
                            path: path_1.default.relative(process.cwd(), testFilePath),
                            start_line: start_line,
                            end_line: start_line,
                            annotation_level: 'failure',
                            message: failureMessages_1.map(strip_ansi_1.default).join('\n')
                        });
                    });
                }
            }
        };
        try {
            for (var testResults_1 = (e_2 = void 0, __values(testResults)), testResults_1_1 = testResults_1.next(); !testResults_1_1.done; testResults_1_1 = testResults_1.next()) {
                var failure = testResults_1_1.value;
                _loop_2(failure);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (testResults_1_1 && !testResults_1_1.done && (_a = testResults_1.return)) _a.call(testResults_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
    };
    try {
        for (var results_1 = __values(results), results_1_1 = results_1.next(); !results_1_1.done; results_1_1 = results_1.next()) {
            var result = results_1_1.value;
            _loop_1(result);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (results_1_1 && !results_1_1.done && (_a = results_1.return)) _a.call(results_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return annotations;
}
function createUncoveredLinesAnnotations(results) {
    return __awaiter(this, void 0, void 0, function () {
        var annotations, uncoveredPRFiles;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    annotations = [];
                    return [4 /*yield*/, istanbul_gh_pr_uncovered_1.default({
                            coverageMap: results.coverageMap,
                            appId: getAppId(),
                            privateKey: getPrivatekey()
                        })];
                case 1:
                    uncoveredPRFiles = _a.sent();
                    uncoveredPRFiles.forEach(function (ghPrFile) {
                        var sequences = groupSequences_1.default(ghPrFile.lines);
                        // Group the lines together  so that we don't post an annotation for lines that are adjacent to 
                        // each other.
                        sequences.forEach(function (sequenceArray) {
                            var startLine = sequenceArray[0];
                            var endLine = sequenceArray[sequenceArray.length - 1];
                            annotations.push({
                                path: path_1.default.relative(process.cwd(), ghPrFile.filename),
                                start_line: startLine,
                                end_line: endLine,
                                annotation_level: 'failure',
                                message: startLine === endLine ? "This line is uncovered by tests."
                                    : "Lines " + startLine + "-" + endLine + " are uncovered by tests."
                            });
                        });
                    });
                    return [2 /*return*/, annotations];
            }
        });
    });
}
exports.default = (function (results, config) { return __awaiter(void 0, void 0, void 0, function () {
    var annotations, uncoveredLinesAnnotations;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                annotations = createAnnotations(results.testResults);
                if (!config.failOnUncoveredLines) return [3 /*break*/, 2];
                return [4 /*yield*/, createUncoveredLinesAnnotations(results)];
            case 1:
                uncoveredLinesAnnotations = _a.sent();
                annotations.push.apply(annotations, __spread(uncoveredLinesAnnotations));
                _a.label = 2;
            case 2: return [2 /*return*/, create_check_1.default({
                    tool: 'Jest',
                    name: 'Test',
                    annotations: annotations,
                    errorCount: annotations.length,
                    appId: getAppId(),
                    privateKey: getPrivatekey()
                })];
        }
    });
}); });
//# sourceMappingURL=create-check.js.map