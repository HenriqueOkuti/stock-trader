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
import { createNewStock, deleteStockById, editStockById, findStockById, findStockByName, getSpecificStock, getStocks, } from '../repository/index.js';
import httpStatus from 'http-status';
export function fetchStocks(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var specificStockId, specificStock, stocks, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    specificStockId = +req.query.stockId;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 5, , 6]);
                    if (!specificStockId) return [3 /*break*/, 3];
                    return [4 /*yield*/, getSpecificStock(specificStockId)];
                case 2:
                    specificStock = (_a.sent()).rows;
                    if (specificStock[0]) {
                        return [2 /*return*/, res.status(httpStatus.ACCEPTED).send(specificStock)];
                    }
                    _a.label = 3;
                case 3: return [4 /*yield*/, getStocks()];
                case 4:
                    stocks = (_a.sent()).rows;
                    return [2 /*return*/, res.status(httpStatus.ACCEPTED).send(stocks)]; // OK!
                case 5:
                    error_1 = _a.sent();
                    return [2 /*return*/, res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR)]; // server error
                case 6: return [2 /*return*/];
            }
        });
    });
}
export function createStock(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var newStock, stockExists, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    newStock = res.locals.info;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, findStockByName(newStock.stockName)];
                case 2:
                    stockExists = (_a.sent()).rows[0];
                    if (stockExists) {
                        return [2 /*return*/, res.sendStatus(httpStatus.CONFLICT)]; // conflict
                    }
                    return [4 /*yield*/, createNewStock(newStock)];
                case 3:
                    _a.sent();
                    return [2 /*return*/, res.sendStatus(httpStatus.CREATED)]; // created
                case 4:
                    error_2 = _a.sent();
                    return [2 /*return*/, res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR)]; // server error
                case 5: return [2 /*return*/];
            }
        });
    });
}
export function editStock(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var editedStock, stockExists, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    editedStock = res.locals.info;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, findStockById(editedStock.id)];
                case 2:
                    stockExists = (_a.sent())
                        .rows[0];
                    if (!stockExists) {
                        return [2 /*return*/, res.sendStatus(httpStatus.NOT_FOUND)]; //  not found
                    }
                    if (verifyNameAndTag(stockExists, editedStock)) {
                        return [2 /*return*/, res.sendStatus(httpStatus.BAD_REQUEST)]; // bad request
                    }
                    return [4 /*yield*/, editStockById(editedStock)];
                case 3:
                    _a.sent();
                    return [2 /*return*/, res.sendStatus(httpStatus.OK)]; // OK!
                case 4:
                    error_3 = _a.sent();
                    return [2 /*return*/, res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error_3.detail)]; // server error
                case 5: return [2 /*return*/];
            }
        });
    });
}
function verifyNameAndTag(obj1, obj2) {
    if (obj1.name === obj2.stockName && obj1.stockTag === obj2.stockTag) {
        return true;
    }
    return false;
}
export function deleteStock(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var stockId, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    stockId = req.body.id;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, deleteStockById(stockId)];
                case 2:
                    _a.sent();
                    return [2 /*return*/, res.sendStatus(httpStatus.OK)]; // OK!
                case 3:
                    error_4 = _a.sent();
                    return [2 /*return*/, res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR)]; // server error
                case 4: return [2 /*return*/];
            }
        });
    });
}
