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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var promises_1 = __importDefault(require("fs/promises"));
var path_1 = __importDefault(require("path"));
// import { ReadLine } from 'readline';
// import { EventEmitter } from 'events';
var statesFileName = 'Estados.json';
var citiesFileName = 'Cidades.json';
var createUfDbDir = function () { return __awaiter(void 0, void 0, void 0, function () {
    var err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, promises_1.default.mkdir(path_1.default.join('src', 'db', 'ufs'), { recursive: false })];
            case 1:
                _a.sent();
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                console.log('UFS dir already exists, moving to next step');
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var writeFiles = function (citiesData, stateUF) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, promises_1.default.writeFile(path_1.default.join('src', 'db', 'ufs', stateUF.Sigla + ".json"), JSON.stringify(citiesData), 'utf-8')];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
var getCitiesForEachUF = function (citiesFileRead, stateFileRead) { return __awaiter(void 0, void 0, void 0, function () {
    var stateID, ufCities;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                stateID = stateFileRead.ID;
                ufCities = [];
                return [4 /*yield*/, Promise.all(citiesFileRead.map(function (city) { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!(city.Estado === stateID)) return [3 /*break*/, 2];
                                    return [4 /*yield*/, ufCities.push(city)];
                                case 1:
                                    _a.sent();
                                    _a.label = 2;
                                case 2: return [2 /*return*/];
                            }
                        });
                    }); }))];
            case 1:
                _a.sent();
                return [2 /*return*/, ufCities];
        }
    });
}); };
var dataToFiles = function (citiesFileRead, stateFileRead) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        Promise.all(stateFileRead.map(function (state) { return __awaiter(void 0, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, getCitiesForEachUF(citiesFileRead, state)];
                    case 1:
                        data = _a.sent();
                        writeFiles(data, state);
                        return [2 /*return*/];
                }
            });
        }); }));
        return [2 /*return*/];
    });
}); };
var readFile = function (filePath) { return __awaiter(void 0, void 0, void 0, function () {
    var fileRead, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _b = (_a = JSON).parse;
                return [4 /*yield*/, promises_1.default.readFile(filePath, 'utf-8')];
            case 1: return [4 /*yield*/, _b.apply(_a, [_c.sent()])];
            case 2:
                fileRead = _c.sent();
                return [2 /*return*/, fileRead];
        }
    });
}); };
var getPath = function (fileName) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    return __awaiter(void 0, void 0, void 0, function () {
        var filePath;
        return __generator(this, function (_a) {
            filePath = path_1.default.join.apply(path_1.default, __spreadArrays(args, [fileName]));
            return [2 /*return*/, filePath];
        });
    });
};
var getCitiesNum = function (uf) { return __awaiter(void 0, void 0, void 0, function () {
    var fileRead, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = readFile;
                return [4 /*yield*/, getPath(uf + ".json", 'src', 'db', 'ufs')];
            case 1: return [4 /*yield*/, _a.apply(void 0, [_b.sent()])];
            case 2:
                fileRead = _b.sent();
                return [2 /*return*/, fileRead.length];
        }
    });
}); };
var main = function () { return __awaiter(void 0, void 0, void 0, function () {
    var cities, _a, ufs, _b, _c, _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                _a = readFile;
                return [4 /*yield*/, getPath(citiesFileName, 'src', 'db', 'cidades-estados-brasil-json')];
            case 1: return [4 /*yield*/, _a.apply(void 0, [_e.sent()])];
            case 2:
                cities = _e.sent();
                _b = readFile;
                return [4 /*yield*/, getPath(statesFileName, 'src', 'db', 'cidades-estados-brasil-json')];
            case 3: return [4 /*yield*/, _b.apply(void 0, [_e.sent()])];
            case 4:
                ufs = _e.sent();
                return [4 /*yield*/, createUfDbDir()];
            case 5:
                _e.sent();
                return [4 /*yield*/, dataToFiles(cities, ufs)];
            case 6:
                _e.sent();
                _d = (_c = console).log;
                return [4 /*yield*/, getCitiesNum('CE')];
            case 7:
                _d.apply(_c, [_e.sent()]);
                return [2 /*return*/];
        }
    });
}); };
main();
